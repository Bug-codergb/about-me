import fs from "fs";
import path from "path";
const exclusion = [".vitepress", "node_modules"];
const rootPath = process.cwd();

function getPageJson(path) {
  try {
    fs.accessSync(path);
    const data = fs.readFileSync(path, "utf8");
    const jsonData = JSON.parse(data); // 解析 JSON 数据
    return jsonData;
  } catch (e) {
    return null;
  }
}

let nav = [];

function generateRoute(rootPath, nav, recur) {
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
            link: `/${file}`,
            children: [],
          };
          recur++;
          const n = generateRoute(filePath, route.children, recur);
          route.children = n;
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
generateRoute(rootPath, nav, 0);
export {
  nav
}

