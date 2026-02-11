export default {
  async load() {
    // fetch remote data
    return (await fetch('https://raw.githubusercontent.com/libremesh/lime-packages/refs/heads/master/README.md'))
  }
}
