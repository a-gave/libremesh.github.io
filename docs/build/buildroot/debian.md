<script setup>
import { data as openwrt } from '/openwrt.data.js'
</script>

# Buildroot

## Build system setup
Refers to the OpenWrt wiki [Build system setup](https://openwrt.org/docs/guide-developer/toolchain/install-buildsystem)
for the package list of other Linux distributions.

### Debian/Ubuntu/Mint
```
sudo apt update
sudo apt install build-essential clang flex bison g++ gawk \
gcc-multilib g++-multilib gettext git libncurses5-dev libssl-dev \
python3-setuptools rsync swig unzip zlib1g-dev file wget
```

## Clone the OpenWrt source code
Refers to the OpenWrt wiki [Build System Usage](https://openwrt.org/docs/guide-developer/toolchain/use-buildsystem).    
Run all the above commands as normal user (do not use root).

::: code-group

``` sh-vue [{{ openwrt.oldstable_version }}]
git clone -b v{{ openwrt.oldstable_version }} --single-branch https://github.com/openwrt/openwrt
cd openwrt
```

``` sh-vue [{{ openwrt.stable_version }}]
git clone -b v{{ openwrt.stable_version }} --single-branch https://github.com/openwrt/openwrt
cd openwrt
```

:::

Copy the defalt OpenWrt repositories file, and add the LibreMesh repositories

::: tip
Use `2024.1` to build the latest LibreMesh release (compatible with OpenWrt 23.05.X)    
Use `master` to build the latest LibreMesh code (compatible with OpenWrt 24.10.X or newer)
:::

::: code-group

``` sh [2024.1]
cp feeds.conf.default feeds.conf
cat << EOF >> feeds.conf
src-git libremesh https://github.com/libremesh/lime-packages.git;v2024.1
src-git profiles https://github.com/libremesh/network-profiles.git
EOF
```

``` sh [master]
cp feeds.conf.default feeds.conf
cat << EOF >> feeds.conf
src-git libremesh https://github.com/libremesh/lime-packages.git;master
src-git profiles https://github.com/libremesh/network-profiles.git
EOF
```

:::


### Update the packages from the feeds
``` sh
scripts/feeds update -a
scripts/feeds install -a
```


### Run the configuration menu
```
make menuconfig
```




Check out the +target+ (e.g. +ATH79+), +subtarget+ (e.g. +generic+) and +profile+ (e.g. +tl-wdr3600-v1+) of your router on https://openwrt.org/toh/start[OpenWrt table of hardware].

Select the _Target System_, _Subtarget_ and _Target Profile_ accordingly.


**Deselect** erroneous feeds locations:

- Image configuration → Separate feed repositories → Enable feed libremesh
- Image configuration → Separate feed repositories → Enable feed profiles

**Deselect** problematic packages:

- Base system -> dnsmasq
- Network -> odhcpd-ipv6only

Optionally, **deselect** unused packages:
- Network -> ppp

If you local community has a profile in the https://github.com/libremesh/network-profiles/[network-profiles repository], you can select it in:

- LibreMesh -> network-profile -> profile-your_community-your_profile

[NOTE]
=========================
Network profiles are the specific configuration from the communities, and are stored in this collective 
https://github.com/libremesh/network-profiles/[repository], but they can also be kept locally, depending on how every community network manages itself. For more instructions on how to create a profile or how to use a local one, check out the link:development-network_profiles.html[network profiles page].
=========================

**Select** (press space until when an asterisk appears, like `<*>`) LibreMesh packages:

* LibreMesh → Offline Documentation → lime-docs-minimal (LibreMesh minimal documentation)
* LibreMesh → lime-app (LibreMeshApp)
* LibreMesh → lime-hwd-openwrt-wan (Respect openwrt wan interface as default)
* LibreMesh → lime-proto-anygw (LibreMesh anygw proto support)
* LibreMesh → lime-proto-babeld (LibreMesh babeld proto support)
* LibreMesh → lime-proto-batadv (LibreMesh batman-adv proto support)
* LibreMesh → shared-state
** shared-state-babeld_hosts (babeld-hosts module for shared-state)
** shared-state-bat_hosts (bat-hosts module for shared-state)
** shared-state-nodes_and_links (nodes_and_links module for shared-state)
* LibreMesh -> babeld-auto-gw-mode

[NOTE]
=========================
If after the compilation you don't see the compiled image in the `bin/targets/.../.../` folder, it is possible that your router has such a small flash memory that the aforementioed packages don't fit in it (it can happen also with routers having 8 MB of flash memory when selecting huge packages to be included). In this case, you can remove the `.config` generated packages list and repeat the packages selection without including `lime-app`. If the compiled image is still too large, try selecting only `lime-proto-anygw`, `lime-proto-batadv` and `lime-proto-babeld` or following https://openwrt.org/docs/guide-user/additional-software/saving_space[this guide].
=========================

Some more packages are recommended but not mandatory for a working LibreMesh network. Consider avoiding to select the following packages _only_ if the created image is too large and does not fit in the router memory.

- LibreMesh -> check-date-http (Keep local date under NTP too far away skew)
- LibreMesh -> Offline Documentation -> lime-docs (LibreMesh full documentation)
- LibreMesh -> lime-debug (libremesh debug utils)

Additionally and optionally, httpS for the web interface can be enabled selecting (beware that the web interace will be shown as *not trusted*):

- Utilities -> Encryption -> px5g-standalone

Finally, also the 802.11s mesh connections can be password protected, this will require a specific configuration and this package to be selected:

- Network -> WirelessAPD -> wpad-mesh-openssl

and this to be **de**-selected:

- Network -> WirelessAPD -> wpad-basic-mbedtls

[NOTE]
=========================
In order to have additional packages, the easiest way is to select them in menuconfig. More packages can be installed afterwards via +opkg+, but some of these require a specific kernel configuration to be in place. This can be achieved following link:development-kernel_vermagic.html[these additional instructions dealing with kernel vermagic]. Beware that this will increase noticeably the time and storage space required for the compilation.
=========================

Save and exit.

At this stage there is the possibility to include custom files in the compiled firmware image. For this, you will have to create, inside the `openwrt/` directory, a `files/` directory containing the directory structure and files you want to add. For example, if you want to have a `/etc/config/lime-community` file you need to do the following:

-----------------------------
mkdir -p files/etc/config/
touch files/etc/config/lime-community
-----------------------------

and then edit the newly created `lime-community` file including your custom content. If a file from a package has the same name and path as a file in this directory, it will be overwritten. This is a quick way to include a custom configuration file, without the need to create an online link:development-network_profiles.html[network profile].

.Finally, compile the images
--------------------------------------------------------------------------------
make -j$(nproc)
--------------------------------------------------------------------------------

If everything goes well you should find the produced binaries inside the +bin/+ directory.

== Emulating on your computer with qemu

Its possible to emulate a image compiled for x86_64 architecture. See link:https://github.com/libremesh/lime-packages/tree/master/tools[script] qemu_dev_start.sh and qemu_dev_stop.sh scripts.

[NOTE]
=========================
You will be running something like:
```
sudo ./qemu_dev_start openwrt-x86-64-combined-ext4.img openwrt-x86-64-ramfs.bzImage
```
More information link:https://github.com/libremesh/lime-packages/blob/master/TESTING.md[here]

=========================

