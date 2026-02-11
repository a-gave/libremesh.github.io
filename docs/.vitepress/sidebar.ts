import { glob } from 'glob'
import fs from 'fs'
import matter from 'gray-matter'

export interface INavItem {
  title: string;
  id: string;
  link: string;
}

export interface INavMenuItem {
  text: string;
  link: string;
}

export function getFiles(path: string): Promise<INavItem[]> {
  return new Promise((resolve, reject) => {
    let navigation: INavItem[] = [];
    const filePath = path;
    const files: string[] = glob.sync(filePath);
    files.sort();
    for (const file of files) {
      const fileData = fs.readFileSync(file).toString();
      const fm = matter(fileData);

      let title = fm.data.title;
      if (fm.data.title === undefined) {
        title = file;
      }

      navigation.push({
        title,
        id: fm.data.id, // Custom data
        link: file.replace('docs', ''), // Passing in the entire docs folder path, so removing this manually
      });
    }
    resolve(navigation);
  });
}

export function generateSidebarItems(module: any) {
  let processedLinks: INavMenuItem[] = [];
  for(let i = 0; i < module.length; i++) {
    let title = '';
    const moduleData: INavItem = module[i];
    title += `<span class="custom-class">${moduleData.title}</span>`;
    processedLinks.push({
      text: title,
      link: moduleData.link,
    })
  }
  return processedLinks;
}