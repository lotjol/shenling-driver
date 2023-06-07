"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  VitePluginUniMiddleware: () => VitePluginUniMiddleware,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_path3 = require("path");
var import_vite2 = require("vite");

// src/constant.ts
var virtualModuleId = "virtual:uni-middleware";
var resolvedVirtualModuleId = "\0" + virtualModuleId;

// src/context.ts
var import_fs = require("fs");
var import_jsonc_parser = require("jsonc-parser");
var import_path2 = require("path");

// src/scan.ts
var import_fast_glob = __toESM(require("fast-glob"), 1);
var import_path = require("path");
var import_scule = require("scule");
var import_vite = require("vite");
var scanMiddlewares = async (options) => {
  const middlewares = [];
  const files = await (0, import_fast_glob.default)("**/*.(js|ts)", {
    ignore: ["node_modules", ".git", "**/__*__/*"],
    onlyFiles: true,
    cwd: (0, import_path.resolve)(options.programRoot, options.middlewareDir)
  });
  files.sort();
  const dir = (0, import_path.resolve)(options.programRoot, options.middlewareDir);
  for (let file of files) {
    const filePath = (0, import_path.join)(dir, file);
    const dirNameParts = (0, import_scule.splitByCase)(
      (0, import_vite.normalizePath)((0, import_path.relative)(dir, (0, import_path.dirname)(filePath)))
    );
    let fileName = (0, import_path.basename)(filePath, (0, import_path.extname)(filePath));
    if (fileName.toLowerCase() === "index") {
      fileName = (0, import_path.basename)((0, import_path.dirname)(filePath));
    }
    const fileNameParts = (0, import_scule.splitByCase)(fileName);
    const middlewareNameParts = [];
    while (dirNameParts.length && (dirNameParts[0] || "").toLowerCase() !== (fileNameParts[0] || "").toLowerCase()) {
      middlewareNameParts.push(dirNameParts.shift());
    }
    const middlewareName = (0, import_scule.pascalCase)(middlewareNameParts) + (0, import_scule.pascalCase)(fileNameParts);
    const value = (0, import_scule.pascalCase)(middlewareName).replace(/["']/g, "");
    const name = (0, import_scule.camelCase)(value);
    if (!middlewares.find((m) => m.name === name)) {
      middlewares.push({
        name,
        value,
        path: (0, import_vite.normalizePath)(filePath)
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
    const pagesJsonRaw = (0, import_fs.readFileSync)(
      (0, import_path2.resolve)(this.config.root, this.options.pagesJsonPath),
      {
        encoding: "utf-8"
      }
    );
    this.pagesJson = (0, import_jsonc_parser.parse)(pagesJsonRaw);
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
      const pagesJsonPath = (0, import_vite2.normalizePath)(
        (0, import_path3.resolve)(ctx.config.root, options.pagesJsonPath)
      );
      watcher.add(pagesJsonPath);
      const reloadModule = (module2, path = "*") => {
        if (module2) {
          moduleGraph.invalidateModule(module2);
          if (ws) {
            ws.send({
              path,
              type: "full-reload"
            });
          }
        }
      };
      const updateVirtualModule = () => {
        const module2 = moduleGraph.getModuleById(resolvedVirtualModuleId);
        reloadModule(module2);
      };
      watcher.on("change", async (path) => {
        path = (0, import_vite2.normalizePath)(path);
        if (pagesJsonPath === path || path.includes(options.middlewareDir)) {
          updateVirtualModule();
        }
      });
      watcher.on("add", async (path) => {
        path = (0, import_vite2.normalizePath)(path);
        if (path.includes(options.middlewareDir)) {
          updateVirtualModule();
        }
      });
      watcher.on("unlink", async (path) => {
        path = (0, import_vite2.normalizePath)(path);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VitePluginUniMiddleware
});
//# sourceMappingURL=index.cjs.map