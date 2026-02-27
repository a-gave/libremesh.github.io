//copyfile.js
import fs from 'fs'
import downdoc from 'downdoc'

const lime_pkgs_path = './lime-packages/packages/'
let lime_packages = fs.readdirSync(lime_pkgs_path)

let lime_feed = {
  main: await (await fetch('https://feed.libremesh.org/master/openwrt-main/x86_64/index.json')).json(),
  stable: await (await fetch('https://feed.libremesh.org/master/openwrt-24.10/x86_64/index.json')).json(),
  oldstable: await (await fetch('https://feed.libremesh.org/master/openwrt-23.05/x86_64/index.json')).json()
}

async function copyFiles(from_dir, to_dir, from_file, to_file) {
  let from = from_dir+from_file
  let to = to_file && to_dir+to_file || to_dir+from_file
  fs.mkdirSync(to_dir, {recursive:true})
  if (!fs.existsSync(from)) { return }

  // if (from_file.endsWith('adoc')) {
  //   let tmp_from = '/tmp/.vitepress-tmp'
  //   fs.writeFileSync(tmp_from,downdoc(fs.readFileSync(from)))
  //   from = tmp_from
  // }
  fs.copyFile(from, to, (err) => {
    if (err) throw err;
    console.log('File '+to+' was copied to destination');
  })
}

lime_packages.forEach(async (pa) => {
  if (!fs.lstatSync(lime_pkgs_path+pa).isDirectory()) return 
  if (pa.startsWith('.')) { return }

  console.log(pa)

  const from_dir = lime_pkgs_path+pa+'/'
  const to_dir = './docs/packages/'+pa+'/'
  
  const makefile_path = to_dir+'/Makefile'
  const makefileExist = fs.existsSync(makefile_path)
  const readme_path = to_dir+'/README.md'
  const readmeExist = fs.existsSync(readme_path)
  let readme = ''
  let description = ''
  let makefile = ''

  await copyFiles(from_dir, to_dir, 'Makefile')
  await copyFiles(from_dir, to_dir, 'README.md')
  // copyFiles(from_dir, to_dir, 'README', 'README.md')
  // copyFiles(from_dir, to_dir, 'Readme.md', 'README.md')
  // copyFiles(from_dir, to_dir, 'README.adoc', 'README.md')


  if (readmeExist) {
    readme = fs.readFileSync(readme_path, { encoding: 'utf-8', flag: 'r'}) || ''
    if (readme !== '') {
      readme = "---\n"+readme.replace(/^# .*/, '')
    }
  }

  if (makefileExist) {
    makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || ''

    if (makefile !== '' && makefile.includes('description')) {
      const regex = /\/description([\s\S]*?)endef/
      // let makefile_cleaned = makefile.replace(/^\s*['"]?/g, '').replace(/['"]?\s*$/, '').replace('/(\s*\+\s*)/g','')
      // let makefile_cleaned = makefile.replace(', '')
      // console.log(makefile)
      
      let matches = makefile.match(regex)
      // console.log(matches)

      description = matches?.[1] || ''
      if (description === '') {
        console.log('regex2')
        const regex2 = /\/description([\s\S\t\t].*?)endef/
        let matches2 = makefile.match(regex2)
        console.log(matches2)
        description = matches2?.[1] || ''
      }
      if (description === '') {
        console.log('regex3')
        const regex3 = /\/description([\s\S\t]*?)endef/
        let matches3 = makefile.match(regex3)
        console.log(matches3)
        description = matches3?.[1] || ''
      }
    }

    description = description.trim()
    makefile = "## Makefile\n\
```\n\
<!--@include: Makefile-->\n\
```"
  }

  const fm = "---\ntitle: "+pa+"\n---\n"
  const content = "# {{ $frontmatter.title }}\n\
\n\
"+description+"\n\
\n\
"+readme+"\n\
\n\
"+makefile+"\n"

  const file = fm+content

  fs.writeFileSync('./docs/packages/'+pa+'/index.md', file)

  Object.entries(lime_feed.main.packages).find(p => {
    if (p[0] === pa) {
      fs.writeFileSync('./docs/packages/'+pa+'/.built_main', p[1])
    }
  }) 
  Object.entries(lime_feed.stable.packages).find(p => {
    if (p[0] === pa) {
      fs.writeFileSync('./docs/packages/'+pa+'/.built_stable', p[1])
    }
  }) 
  Object.entries(lime_feed.oldstable.packages).find(p => {
    if (p[0] === pa) {
      fs.writeFileSync('./docs/packages/'+pa+'/.built_oldstable', p[1])
    }
  }) 
})