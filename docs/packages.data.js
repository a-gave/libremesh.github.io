// import { glob } from 'glob'
import fs from 'fs'

export default {
  async load() {
    let packages = []
    let packages_list = fs.readdirSync('docs/packages/');
    // const profile_path = '../network-profiles/'
    let profiles = []
    // let profiles_list = []
    // let community_list = fs.readdirSync(profile_path);
    // community_list.forEach(c => {
    //   if (!fs.lstatSync(profile_path+c).isDirectory()) return 
    //   if (c.startsWith('.')) { return }
    //   const community_path = profile_path+c+'/'
    //   if (!fs.existsSync(profile_path)) { return }
    //   const community_files = fs.readdirSync(community_path)

    //   community_files.forEach(cf => {
    //     if (!fs.lstatSync(profile_path+c).isDirectory()) { return }
    //     if (c.startsWith('.')) { return }
    //     profiles_list.push('profile-'+c+'-'+cf)
    //   })
    // })
    // console.log(packages_list)

    packages_list.forEach(p => {

      // const libremesh_mk_path = '../lime-packages/libremesh.mk'
      const makefile_path = 'docs/packages/'+p+'/Makefile'
      if (!fs.existsSync(makefile_path)) { return }
      // const libremesh_mk = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || '';
      let makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || '';
      let pkgarch = makefile.match(/PKGARCH\:\=(.*)/)?.[1] || ''
      let maintainer = makefile.match(/MAINTAINER\:\=(.*)/)?.[1] || ''
      let license = makefile.match(/PKG_LICENSE\:\=(.*)/)?.[1] || ''
      if (license === '') {
        license = makefile.match(/SPDX-License-Identifier\:(.*)/)?.[1] || ''
      }
      // if (license === '') {
      //   license = libremesh_mk.match(/PKG_LICENSE\:(.*)/)?.[1] || ''
      // }
      let section = makefile.match(/SECTION\:\=(.*)/)?.[1] || ''
      let category = makefile.match(/CATEGORY\:\=(.*)/)?.[1] || ''

      let built_main = fs.existsSync('docs/packages/'+p+'/.built_main')
      let built_stable = fs.existsSync('docs/packages/'+p+'/.built_stable')
      let built_oldstable = fs.existsSync('docs/packages/'+p+'/.built_oldstable')

      let version_stable = built_stable && fs.readFileSync('docs/packages/'+p+'/.built_stable', { encoding: 'utf-8', flag: 'r'}) || ''

      packages.push({
        name: p,
        version_stable: version_stable,
        makefile: makefile,
        pkgarch: pkgarch,
        maintainer: maintainer,
        license: license,
        section: section,
        category: category,
        built_main: built_main,
        built_stable: built_stable,
        built_oldstable: built_oldstable,

      })
    })
    // console.log(packages)



    // profiles_list.forEach(p => {
      // console.log(p)

      // const makefile_path = '../lime-packages/packages/'+p+'/Makefile'
      // if (!fs.existsSync(makefile_path)) { return }
      // let makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || '';
      // let pkgarch = makefile.match(/PKGARCH\:\=(.*)/)?.[1] || ''
      // let maintainer = makefile.match(/MAINTAINER\:\=(.*)/)?.[1] || ''
      // let license = makefile.match(/PKG_LICENSE\:\=(.*)/)?.[1] || ''
      // if (license === '') {
      //   license = makefile.match(/SPDX-License-Identifier\:(.*)/)?.[1] || ''
      // }

      // profiles.push({
      //   name: p,
      //   makefile: makefile,
      //   pkgarch: pkgarch,
      //   maintainer: maintainer,
      //   license: license,

      // })
    // })
    // console.log(profiles)


    return { packages, profiles }

  }
}
