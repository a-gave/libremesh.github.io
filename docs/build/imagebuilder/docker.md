---
aside: false
---

<script setup>
import { data as openwrt } from '/openwrt.data.js'
import { data as packages } from '/packages.data.js'

// console.log(packages)

const default_build = {
    arch: 'mips_24kc',
    target: 'ath79-generic'
}

openwrt.stable_branch = openwrt.stable_version.substr(0,5)
openwrt.oldstable_branch = openwrt.oldstable_version.substr(0,5)

</script>
# ImageBuilder Docker

Refers to the OpenWrt wiki [Using the Image Builder](https://openwrt.org/docs/guide-user/additional-software/imagebuilder)
for detailed options

::: tip
Find the `target-subtarget` of your device using the [OpenWrt's Table of Hardware](https://toh.openwrt.org) or the [firmware-selector](https://firmware-selector.libremesh.org)
:::


## Build on Docker

Export to the environment the `target-subtarget` and the package `architecture`
``` sh-vue
export TARGET={{ default_build.target }}
export ARCH=$(curl -s https://downloads.openwrt.org/snapshots/.targets.json | \
    sed 's/\//-/' | jq -r '."${TARGET}"')
```

Start an ImageBuilder of your choice, for example {{ default_build.target }} if your device is supported within it

::: code-group

```sh-vue [{{ openwrt.oldstable_version }}]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET-v{{ openwrt.oldstable_version }}
```


```sh-vue [{{ openwrt.stable_version }}]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET-v{{ openwrt.stable_version }}
```

```sh-vue [SNAPSHOT]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET
```

:::

Within the container add the `lime-packages` feeds.
::: code-group

```sh-vue [opkg - openwrt-23.05]
cat << EOF >> repositories.conf
src/gz libremesh_packages https://feed.libremesh.org/master/openwrt-23.05/x86_64
src/gz libremesh_arch_packages https://feed.libremesh.org/master/openwrt-23.05/$ARCH
src/gz profiles https://feed.libremesh.org/profiles/openwrt-23.05/x86_64
EOF

cat << EOF > keys/a71b3c8285abd28b
untrusted comment: signed by libremesh.org key a71b3c8285abd28b
RWSnGzyChavSiyQ+vLk3x7F0NqcLa4kKyXCdriThMhO78ldHgxGljM/8
EOF
```

```sh-vue [opkg - openwrt-24.10]
cat << EOF >> repositories.conf
src/gz libremesh_packages https://feed.libremesh.org/master/openwrt-24.10/x86_64
src/gz libremesh_arch_packages https://feed.libremesh.org/master/openwrt-24.10/$ARCH
src/gz profiles https://feed.libremesh.org/profiles/openwrt-24.10/x86_64
EOF

cat << EOF > keys/a71b3c8285abd28b
untrusted comment: signed by libremesh.org key a71b3c8285abd28b
RWSnGzyChavSiyQ+vLk3x7F0NqcLa4kKyXCdriThMhO78ldHgxGljM/8
EOF
```

```sh-vue [apk - openwrt-SNAPSHOT]
cat << EOF >> repositories
https://feed.libremesh.org/master/openwrt-main/x86_64/packages.adb
https://feed.libremesh.org/master/openwrt-main/$ARCH/packages.adb
https://feed.libremesh.org/profiles/openwrt-main/x86_64/packages.adb
EOF

cat << EOF > keys/libremesh.pem
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEdFJZ2qVti49Ol8LJZYuxgOCLowBS
8bI86a7zqhSbs5yon3JON7Yee7CQOgqwPOX5eMALGOu8iFGAqIRx5YjfYA==
-----END PUBLIC KEY-----
EOF
```

:::

### Custom files
Ideally add your own `lime-community` files within the container in the folder `./files/etc/config/`.    
To find all possible options consult the [lime-example][lime-example] file.    

Now create an image of your choice, to see the names of supported profiles run
`make info` first.


### Build

```sh
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only \
        lime-system lime-proto-babeld lime-proto-batadv lime-proto-anygw \
        lime-hwd-openwrt-wan lime-hwd-ground-routing \
        babeld-auto-gw-mode check-date-http batctl-default \
        lime-app lime-debug lime-docs lime-docs-minimal \
        shared-state-babeld_hosts shared-state-bat_hosts \
        shared-state-dnsmasq_hosts shared-state-nodes_and_links" 
```

### Build using Network Profiles

Refers to [Network Profiles](/network-profiles)

```sh
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only profile-libremesh-suggested-packages"
```
