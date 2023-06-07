"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/runtime/index.ts
var runtime_exports = {};
__export(runtime_exports, {
  createNavigationGuardPlugin: () => createNavigationGuardPlugin,
  defineMiddleware: () => defineMiddleware
});
module.exports = __toCommonJS(runtime_exports);
var import_virtual_uni_middleware = require("virtual:uni-middleware");
function createNavigationGuardPlugin() {
  let from;
  let to;
  return {
    install(app) {
      app.mixin({
        async onShow() {
          var _a;
          const pages = getCurrentPages();
          const page = pages[pages.length - 1];
          if (!page)
            return;
          if (page.route === (from == null ? void 0 : from.route))
            return;
          to = page;
          try {
            const pageMiddlewares = import_virtual_uni_middleware.middlewares.global.concat(
              (_a = import_virtual_uni_middleware.middlewares[to.route]) != null ? _a : []
            );
            for (let middleware of pageMiddlewares) {
              const result = await middleware(to, from);
              if (result === void 0) {
                continue;
              } else if (typeof result === "boolean" && result) {
                continue;
              } else if (typeof result === "boolean" && !result) {
                if (pages.length >= 2) {
                  uni.navigateBack();
                } else {
                  uni.reLaunch({
                    url: from.route
                  });
                }
              } else if (typeof result === "string") {
                uni.redirectTo({
                  url: result
                });
              } else {
                const { method, options, url } = result;
                uni[method]({
                  url,
                  ...options
                });
              }
            }
          } catch (error) {
          }
          from = to;
        }
      });
    }
  };
}
function defineMiddleware(middleware) {
  return middleware;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNavigationGuardPlugin,
  defineMiddleware
});
//# sourceMappingURL=index.cjs.map