export default {
  async load() {
    // fetch remote data
    return (await fetch('https://downloads.openwrt.org/.versions.json')).json()
  }
}
