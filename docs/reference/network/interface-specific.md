---
outline: deep
---

# Network interface specific options

These options are included using their own `named` config section

## Raw example
Create a section named `port2` for the network device `lan2`   
Do not put any `.` in the section name.
```
config net port2
  option linux_name 'eth0.2'
  ...
```

Available protocols: `apbb, batadv, babeld, bgp, bmx7, client, lan, manual, olsr, olsr2, olsr6, static, wan`   
proto:vlan_number - define the VLAN number i.e. bmx7:18    
proto:vlan_number:vlan_type - define the VLAN type (default is 8021ad) i.e. bmx7:18:8021q    

If you use the protocol 'manual' do not specify other protocols, may result in an unpredictable behavior/configuration (likely you loose connection to the node)


## WAN port


### wan (DHCP)
Use `wan` protocol to get Internet connectivity via DHCP
```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'wan'

```

### static
Use `static` protocols and specify the router 'IPv4/subnet' and the gateway IPv4.
```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'static'
  option static_ipv4 '192.168.1.2/24'
  option static_gateway_ipv4 '192.168.1.1'
```

### static
Use `static` protocols and specify the router 'IPv6/subnet' and the gateway IPv6.
```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'static'
  option static_ipv6 '2a00:1508:0a00::1234/64'
  option static_gateway_ipv6 'fe80::1'
```



## LAN port

```
config net port1
    option linux_name 'lan1'
    list protocols 'lan'
```

Configure lan1 for users to connect to, not for connection to other nodes:


## Mesh port

```
config net port1
    option linux_name 'lan1'
    list protocols 'batadv:%N1'
    list protocols 'babeld:17'
```
The protocol `batadv:%N1` needs to be specified if the other node is in the same mesh cloud i.e. same `ap_ssid`