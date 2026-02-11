# Packages selection

::: danger ath9k
Atheros radios `ath9k` have a known bug that cause them to become deaf, if you are using an OpenWrt older than 24.10.6 add the libremesh package `wifi-unstuck-wa` 
:::

::: danger ath10k
Atheros radios `ath10k`: replace the OpenWrt default driver ath10k-ct (ath10k made by CandelaTech) with ath10k that works with 802.11s on most devices [read more](https://openwrt.org/docs/guide-user/network/wifi/mesh/80211s)
:::


## Saving space and RAM

- https://openwrt.org/supported_devices/864_warning
- https://openwrt.org/docs/guide-user/additional-software/saving_space


# Flavors

