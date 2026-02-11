# Flavors

The libremesh default `flavor` contains these packages:

## Default flavor
LibreMesh with the default configuration

### packages list 
- babeld-auto-gw-mode
- batctl-default
- check-date-http
- lime-app
- lime-debug
- lime-docs
- lime-docs-minimal
- lime-hwd-ground-routing
- lime-hwd-openwrt-wan
- lime-proto-anygw
- lime-proto-babeld
- lime-proto-batadv
- shared-state
- shared-state-babeld_hosts
- shared-state-bat_hosts
- shared-state-nodes_and_links

### `wan` port
Configure as WAN
Configure default protocols on top of it:
-  `babeld:17` - creates a 8021ad soft vlan number 17 and run babel on it
-  `batadv:%N1` - creates a 8021ad soft vlan number %N1 and add it to list of batman-adv interfaces

This creates 3 interfaces:
- `wan@eth0` - dhcp client
- `wan_17@eth0` - babeld vlan 17 8021ad
- `wan_29@eth0` - babeld vlan 29 8021ad

### `lan` ports
Add each lan port to the main bridge `br-lan`
Configure default protocols on top of each port:
-  `babeld:17` - creates a 8021ad soft vlan number 17 and run babel on it
-  `batadv:%N1` - creates a 8021ad soft vlan number %N1 and add it to list of batman-adv interfaces

Configure the br-lan with network options
`main_ipv4_address`
`main_ipv6_address`

Creates 3 interfaces for each :
- `lan@eth1` - raw device unmanaged: untagged packets will go to the interface `br-lan`
- `lan_17@eth1` - babeld vlan 17 8021ad
- `lan_29@eth1` - babeld vlan 29 8021ad

### `2ghz` and `5ghz` radios
Configure default modes `ieee80211s`, `ap`, `apname`

Configure default protocols on top of each port:
-  `babeld:17` - creates a 8021ad soft vlan number 17 and run babel on it
-  `batadv:%N1` - creates a 8021ad soft vlan number %N1 and add it to list of batman-adv interfaces

### anygw
The bridge br-lan includes ethernet `lan` ports as well as radio interfaces configured as Access Point (`ap` or `apname` mode)

On top of `br-lan` it is configured a `mac-vlan` interface with for the `anygateway` feature.     
The MAC/ipv4/ipv6 addresses of this interface are the same for all nodes with that share the same `lime-autogen.wifi.ap_ssid`

### shared-state
a Conflict-Free Replicated Data Type (CRDT) daemon.     
This module enables seamless information exchange between nodes in a decentralized network, ensuring consistency and reliability.

Files are not persisted by default in flash, they can be seen in `/tmp/shared-state/data/`
The information shared by default depends from shared-state's `publishers` installed

- shared-state-babeld_hosts - `babeld` connected nodes
- shared-state-bat_hosts - `batadv` connected nodes
- shared-state-nodes_and_links

### Mini
This
- babeld-auto-gw-mode
- check-date-http
- lime-docs-minimal
- lime-hwd-openwrt-wan
- lime-proto-anygw
- lime-proto-babeld
- lime-proto-batadv
- shared-state
- shared-state-babeld_hosts
