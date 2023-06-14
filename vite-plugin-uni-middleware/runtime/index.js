// src/runtime/index.ts
import { middlewares } from 'virtual:uni-middleware'
function createNavigationGuardPlugin() {
  let from
  let to
  return {
    install(app) {
      app.mixin({
        async onShow() {
          var _a
          const pages = getCurrentPages()
          const page = pages[pages.length - 1]
          if (!page) return
          if (page.route === (from == null ? void 0 : from.route)) return
          to = page
          try {
            const pageMiddlewares = middlewares.global.concat(
              (_a = middlewares[to.route]) != null ? _a : []
            )
            for (let middleware of pageMiddlewares) {
              const result = await middleware(to, from)
              if (result === void 0) {
                continue
              } else if (typeof result === 'boolean' && result) {
                continue
              } else if (typeof result === 'boolean' && !result) {
                if (pages.length >= 2) {
                  uni.navigateBack()
                } else {
                  uni.reLaunch({
                    url: from.route,
                  })
                }
              } else if (typeof result === 'string') {
                uni.redirectTo({
                  url: result,
                })
              } else {
                const { method, options, url } = result
                uni[method]({
                  url,
                  ...options,
                })
              }
            }
          } catch (error) {}
          from = to
        },
      })
    },
  }
}

export { createNavigationGuardPlugin }
//# sourceMappingURL=index.js.map
