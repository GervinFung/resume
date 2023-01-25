import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(() => {
    const serveConfig = {
        port: 9999,
    };
    return {
        root: `${process.cwd()}/src`,
        plugins: [solidPlugin()],
        server: serveConfig,
        preview: serveConfig,
        build: {
            target: 'esnext',
            outDir: `${process.cwd()}/build`,
        },
    };
});
