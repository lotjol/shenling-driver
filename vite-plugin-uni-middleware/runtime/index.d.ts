import { ComponentPublicInstance, Plugin } from 'vue';

interface Page extends ComponentPublicInstance {
    $mpType: string;
    $pages: Record<string, any>;
    $vm: Page;
    route: string;
}
type MiddlewareReturn = void | boolean | string | {
    url: string;
    method: "navigateTo" | "redirectTo" | "switchTab" | "reLaunch";
    options: Record<string, any>;
};
type Middleware = (to: Page, from?: Page) => MiddlewareReturn | Promise<MiddlewareReturn>;

declare function createNavigationGuardPlugin(): Plugin;
declare function defineMiddleware(middleware: Middleware): Middleware;

export { Middleware, MiddlewareReturn, Page, createNavigationGuardPlugin, defineMiddleware };
