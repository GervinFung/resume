import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { serveConfig } from './config/serve';

export default defineConfig({
    root: `${process.cwd()}/src`,
    plugins: [solidPlugin()],
    server: serveConfig,
    preview: serveConfig,
    build: {
        target: 'esnext',
        outDir: `${process.cwd()}/build`,
    },
});
