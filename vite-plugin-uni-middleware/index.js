// src/index.ts
import { resolve as resolve3 } from "path";
import { normalizePath as normalizePath2 } from "vite";

// src/constant.ts
var virtualModuleId = "virtual:uni-middleware";
var resolvedVirtualModuleId = "\0" + virtualModuleId;

// src/context.ts
import { readFileSync } from "fs";
import { parse } from "jsonc-parser";
import { resolve as resolve2 } from "path";

// src/scan.ts
import fg from "fast-glob";
import { basename, dirname, extname, join, relative, resolve } from "path";
import { pascalCase, splitByCase, camelCase } from "scule";
import { normalizePath } from "vite";
var scanMiddlewares = async (options) => {
  const middlewares = [];
  const files = await fg("**/*.(js|ts)", {
    ignore: ["node_modules", ".git", "**/__*__/*"],
    onlyFiles: true,
    cwd: resolve(options.programRoot, options.middlewareDir)
  });
  files.sort();
  const dir = resolve(options.programRoot, options.middlewareDir);
  for (let file of files) {
    const filePath = join(dir, file);
    const dirNameParts = splitByCase(
      normalizePath(relative(dir, dirname(filePath)))
    );
    let fileName = basename(filePath, extname(filePath));
    if (fileName.toLowerCase() === "index") {
      fileName = basename(dirname(filePath));
    }
    const fileNameParts = splitByCase(fileName);
    const middlewareNameParts = [];
    while (dirNameParts.length && (dirNameParts[0] || "").toLowerCase() !== (fileNameParts[0] || "").toLowerCase()) {
      middlewareNameParts.push(dirNameParts.shift());
    }
    const middlewareName = pascalCase(middlewareNameParts) + pascalCase(fileNameParts);
    const value = pascalCase(middlewareName).replace(/["']/g, "");
    const name = camelCase(value);
    if (!middlewares.find((m) => m.name === name)) {
      middlewares.push({
        name,
        value,
        path: normalizePath(filePath)
      });
    }
  }
  return middlewares;
};

// src/context.ts
var Context = class {
  constructor(options) {
    this.middlewares = [];
    this.pagesJson = {};
    this.options = options;
  }
  async virtualModule() {
    this.middlewares = await scanMiddlewares(this.options);
    const pagesJsonRaw = readFileSync(
      resolve2(this.config.root, this.options.pagesJsonPath),
      {
        encoding: "utf-8"
      }
    );
    this.pagesJson = parse(pagesJsonRaw);
    return `${this.middlewareImports.join("\n")}
    export const middlewares = {
      global: [${this.globalMiddlewares.map((v) => v.value).join(",")}],
      ${this.pagesMiddlewaresCode.join(",\n")}
    }`;
  }
  get pagesMiddlewaresCode() {
    return this.pagesMiddlewares.map(
      (v) => `"${v.key}": [${v.value.map((v2) => v2.value).join(",")}]`
    );
  }
  get middlewareImports() {
    return this.middlewares.map((v) => `import ${v.value} from "${v.path}";`);
  }
  get globalMiddlewares() {
    return this.findMiddlewaresByMiddlewareNameList(this.pagesJson.middleware);
  }
  get pagesMiddlewares() {
    if (!this.pagesJson.pages) {
      return [];
    }
    return this.pagesJson.pages.map((page) => {
      const middlewares = this.findMiddlewaresByMiddlewareNameList(
        page.middleware
      );
      return {
        value: middlewares,
        key: page.path
      };
    });
  }
  findMiddlewaresByMiddlewareNameList(names = []) {
    return this.middlewares.filter((m) => {
      return names.find((name) => m.name === name);
    });
  }
};

// src/index.ts
var resolveOptions = (userOptions) => {
  return {
    middlewareDir: "src/middleware",
    pagesJsonPath: "src/pages.json",
    programRoot: process.cwd(),
    ...userOptions
  };
};
var VitePluginUniMiddleware = (userOptions = {}) => {
  const options = resolveOptions(userOptions);
  const ctx = new Context(options);
  return {
    name: "vite-plugin-uni-middleware",
    configureServer({ watcher, moduleGraph, ws }) {
      const pagesJsonPath = normalizePath2(
        resolve3(ctx.config.root, options.pagesJsonPath)
      );
      watcher.add(pagesJsonPath);
      const reloadModule = (module, path = "*") => {
        if (module) {
          moduleGraph.invalidateModule(module);
          if (ws) {
            ws.send({
              path,
              type: "full-reload"
            });
          }
        }
      };
      const updateVirtualModule = () => {
        const module = moduleGraph.getModuleById(resolvedVirtualModuleId);
        reloadModule(module);
      };
      watcher.on("change", async (path) => {
        path = normalizePath2(path);
        if (pagesJsonPath === path || path.includes(options.middlewareDir)) {
          updateVirtualModule();
        }
      });
      watcher.on("add", async (path) => {
        path = normalizePath2(path);
        if (path.includes(options.middlewareDir)) {
          updateVirtualModule();
        }
      });
      watcher.on("unlink", async (path) => {
        path = normalizePath2(path);
        if (path.includes(options.middlewareDir)) {
          updateVirtualModule();
        }
      });
    },
    configResolved(_config) {
      ctx.config = _config;
    },
    async resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return ctx.virtualModule();
      }
    }
  };
};
var src_default = VitePluginUniMiddleware;
export {
  VitePluginUniMiddleware,
  src_default as default
};
//# sourceMappingURL=index.js.map