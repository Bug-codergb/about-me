import fs from "fs";
import path from "path";
const exclusion = [".vitepress", "node_modules",".gitignore",".git",".idea","docs",".github","public"];
const rootPath = process.cwd();

function getPageJson(path) {
  try {
    fs.accessSync(path);
    const data = fs.readFileSync(path, "utf8");
    const jsonData = JSON.parse(data); // 解析 JSON 数据
    return jsonData;
  } catch (e) {
    return null
  }
}

let nav = [];
let sidebar = {}

function generateRoute(rootPath, parentPath,nav, recur) {
  try {
    const files = fs.readdirSync(rootPath);
   
    for (let file of files) {
      const filePath = path.resolve(rootPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory() && !exclusion.includes(file)) {
        try {
          const jsonPath = path.resolve(filePath, "page.json");
          const jsonData = getPageJson(jsonPath);
          let route = {
            text: jsonData ? jsonData.name : `${file}`,
            link: `${parentPath}${file}/index.html`,
            children: [],
          };
          recur++;
          //生成侧边栏  
          if(jsonData && jsonData.sidebar){
            if(sidebar[parentPath]){
              sidebar[parentPath][0].items.push({
                text:jsonData.name,
                link:route.link
              })
            }else{
              sidebar[parentPath]=[
                {
                  items:[
                    {text:jsonData.name,"link":route.link}
                  ]
                }
              ]
            }
            
          }

          const n = generateRoute(filePath, `${parentPath}${file}/`,[], recur);
          route.children = n && n.length!==0 ? n : undefined;
          nav.push(route);
          
        } catch (e) {
        }
      } else if (stats.isFile()) {
      }
    }
    return nav;
  } catch (e) {
  }
}
generateRoute(rootPath,"/", nav, 0);

export {
  nav,
  sidebar
}

