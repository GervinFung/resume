import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default (() => {
    const serverConfig = {
        port: 9999,
    };

    return defineConfig({
        root: `${process.cwd()}/src`,
        plugins: [solidPlugin()],
        server: serverConfig,
        preview: serverConfig,
        build: {
            target: 'esnext',
            outDir: `${process.cwd()}/build`,
        },
    });
})();
