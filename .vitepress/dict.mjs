import fs from "fs";
import path from "path";

const exclusion = [".vitepress", "node_modules", ".gitignore", ".git", ".idea", "docs", ".github", "public"];
const rootPath = process.cwd();

/**
 * 获取目录下的 page.json 配置
 */
function getPageJson(jsonPath) {
  try {
    if (fs.existsSync(jsonPath)) {
      const data = fs.readFileSync(jsonPath, "utf8");
      return JSON.parse(data);
    }
    return null;
  } catch (e) {
    return null;
  }
}

let nav = [];
let sidebar = {};

/**
 * 递归生成路由和侧边栏
 * @param {string} currentDirPath 当前扫描的绝对路径
 * @param {string} parentPath 当前扫描的 URL 父路径 (以 / 结尾)
 */
function generateRoute(currentDirPath, parentPath) {
  const currentRoutes = [];
  try {
    const files = fs.readdirSync(currentDirPath);

    for (let file of files) {
      const filePath = path.resolve(currentDirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !exclusion.includes(file)) {
        const jsonPath = path.resolve(filePath, "page.json");
        const jsonData = getPageJson(jsonPath);
        
        // 生成当前项的 URL 路径
        const currentPath = `${parentPath}${file}/`;
        
        let route = {
          text: jsonData ? jsonData.name : file,
          link: currentPath, // 不再强制使用 index.html，指向目录即可
          // 关键点：添加 activeMatch 正则，确保子路径也能激活顶部菜单高亮
          activeMatch: `^${currentPath}`
        };

        // 处理侧边栏逻辑
        if (jsonData && jsonData.sidebar) {
          // sidebar 的 key 通常是基础路径，例如 "/fragments/"
          if (!sidebar[parentPath]) {
            sidebar[parentPath] = [{ items: [] }];
          }
          sidebar[parentPath][0].items.push({
            text: jsonData.name,
            link: currentPath
          });
        }

        // 递归处理子目录
        const childRoutes = generateRoute(filePath, currentPath);
        if (childRoutes && childRoutes.length > 0) {
          // VitePress 导航栏子项使用 items 属性
          route.items = childRoutes;
        }

        currentRoutes.push(route);
      }
    }
    return currentRoutes;
  } catch (e) {
    return [];
  }
}

// 执行生成逻辑
nav = generateRoute(rootPath, "/");

export {
  nav,
  sidebar
}
