---
outline: deep
---

# Getting Started

## Installation

### Prerequisites
Check the [Table of Hardware](https://toh.openwrt.org) to see if your device is supported by OpenWrt.

::: tip NOTE
It is recommended that the router has **at least**:
  - 16 MB of flash memory and 128 MB of RAM.
  - 1 radio working at 2.4GHz radio and 1 at 5GHz

It is possible to install LibreMesh on routers with 8 MB of flash and 64 MB of RAM    
Read the OpenWrt's [`8/64 warning`](https://openwrt.org/supported_devices/864_warning) and refers to the page [packages selection](/install/packages-selection) for build customization.  
:::

::: warning CAUTION
Ensure to have read the OpenWrt's wiki page for of your device.    
Read the installation instruction and ensure to have the necessary hardware equipment - if needed on your device - to install the firmware, like an [USB-UART/Serial adapter](https://openwrt.org/docs/guide-user/installation/generic.flashing.serial) and/or an
[USB-JTAG adapter](https://openwrt.org/docs/techref/hardware/port.jtag)
:::

### Download the firmware
**Download using the Firmware Selector**    
The Firmware Selector request a firmware build via an [`ASU`](https://github.com/openwrt/asu) (online ImageBuilder) instance.

https://firmware-selector.libremesh.org

**Download old precompiled versions**    
Old releases archive with pre-compiled firmwares via Buildroot are available at:

https://firmware-libremesh.antennine.org

**Build LibreMesh on your host**    
Refers the the page [`Build LibreMesh`](/build/) for instructions on how to build LibreMesh on your host.

### Install the firmware
Install the firmware on your device following the installation method reported in the [wiki of OpenWrt](https://openwrt.org)
or, if not present, search the instruction in the **`git-commit` message** left from who added the support for that device model. See the [Table of Hardware](https://toh.openwrt.org).

::: tip NOTE
It is strongly adviced to **install OpenWrt first**:
1. Download the latest `stable` firmware for your device from the [`OpenWrt Firmware Selector`](https://firmware-selector.openwrt.org).    
   Beware that OpenWrt `SNAPSHOT` versions are meant for testing purposes.   
   Use them at your own risc.
2. Check that the OpenWrt device boot and function properly.    
   Beware that OpenWrt by default doesn't turn on the Wi-Fi.    
   Turn it on from `LuCi` from the menu `Network` / `Wireless`.
3. Upgrade to LibreMesh:
    - via CLI using `sysupgrade -n firmware.bin` 
    - or via the web interface `LuCI` from the menu `System` / `Backup / Flash Firmware`.

:::


## Connecting to the router
The router could be reached via web at http://thisnode.info.    
See the page [Connecting to the router](install/connecting) for detailed options and troubleshooting


## Configuration
LibreMesh come with a [default flavor](reference/flavors) which works out of the box
without requiring a manual configuration.

See the page [configuration](reference/configuration) for detailed options.


## Maintenance
Install newer OpenWrt stable releases to keep updated the device:
- Subscribe to the Newsletter [`OpenWrt Annouce`](https://lists.openwrt.org/mailman/listinfo/openwrt-announce).
- Or follow the [`Openwrt Announcement-Bot`](https://social.tchncs.de/@openwrt) on Mastodon.

### Recommendations
::: warning BEWARE
From times to times it could be that some OpenWrt devices encounter issues upgrading, and result `bricked` or `soft-bricked`
Be sure to have **read the OpenWrt release notes** for the `version`/`branch` you are installing.   

In **production environments with multiple LibreMesh nodes** deployed, it is adviceable to keep at least one device, for each models you are using, to test that upgrades are ok. Or eventually recover it using an `USB Serial Adapter`.
:::

### Tools
Tools to upgrade the base OpenWrt version and LibreMesh packages:
- `eupgrade` - provide semi-automated upgrades checking if a new firmware is available from an https server.
- `owut` - provides upgrades using an [`ASU`](https://github.com/openwrt/asu) (online imagebuilder) instance. Test it installing the package `profile-antennine.org-an-lime-owut`
- `safe-upgrade` - Wrapper around `sysupgrade`. Requires large flash storage, at least the double of the firmware-size, to rollback in case something didn't work.
