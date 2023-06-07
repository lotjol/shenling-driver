import { Plugin } from 'vite';

interface Options {
    /**
     * @default "src/middleware"
     */
    middlewareDir: string;
    /**
     * @default "src/pages.json"
     */
    pagesJsonPath: string;
    /**
     * @default "process.cwd()"
     */
    programRoot: string;
}
interface UserOptions extends Partial<Options> {
}

declare const VitePluginUniMiddleware: (userOptions?: UserOptions) => Plugin;

export { VitePluginUniMiddleware, VitePluginUniMiddleware as default };
