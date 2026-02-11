# Getting Started

## Installation

### Prerequisites
Check the [Table of Hardware](https://toh.openwrt.org) to see if the device is supported by OpenWrt

::: tip
It is recommended that the router has **at least**:
  - 16 MB of flash memory and 128 MB of RAM.
  - 1 radio working at 2.4GHz radio and 1 at 5GHz
:::

::: warning
It is possible to install LibreMesh on routers with 8 MB of flash and 64 MB of RAM    
with some build customization. Read these first: 
  - https://openwrt.org/supported_devices/864_warning
  - https://openwrt.org/docs/guide-user/additional-software/saving_space
:::

::: danger CAUTION
Ensure to have read the wiki page of OpenWrt of your device, particularly the installation instruction.    
Ensure to have the necessary hardware equipment - if needed on your device - to install the firmware, 
like an [USB-UART/Serial adapter](https://openwrt.org/docs/guide-user/installation/generic.flashing.serial) and/or an
[USB-JTAG adapter](https://openwrt.org/docs/techref/hardware/port.jtag)
:::

## Download the firmware

You can request a firmware build via the firmware-selector.    
Refers to the page [packages selection](/packages-selection) for build customization.

https://firmware-selector.libremesh.org

## Build it from sources

- [ImageBuilder](/build/imagebuilder/docker)
- [Buildroot](/build/buildroot/debian)
