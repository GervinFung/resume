import fs from 'fs';
import puppeteer from 'puppeteer';
import childProcess from 'child_process';
import promisifiedViteConfig from '../../vite.config';

const generateAsPdf = async () => {
    const viteConfig = await promisifiedViteConfig;
    if (typeof viteConfig === 'function') {
        throw new Error('Vite config is function');
    }

    const browser = await puppeteer.launch({
        defaultViewport: null,
        args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    const port = viteConfig.preview?.port;
    const goto = `http://localhost:${port}`;
    const server = childProcess
        .exec('make start')
        .on('spawn', () => console.log(`Going to ${goto}`))
        .on('error', console.error)
        .on('kill', () => {
            server.kill('SIGINT');
        });
    server.stdout?.setEncoding('utf-8');
    server.stderr?.setEncoding('utf-8');
    await new Promise<void>((resolve) => {
        server?.stdout?.on('data', (data) => {
            console.log(data);
            if (data.includes(goto)) {
                console.log('Generating Resume');
                resolve();
            }
        });
    });
    await page.goto(goto);
    const dir = 'dist';
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, {
            force: true,
            recursive: true,
        });
    }
    fs.mkdirSync(dir);
    const path = `${dir}/GervinFungDaXuen-Résumé.pdf` as const;
    const height = await page.evaluate(
        () => document.documentElement.offsetHeight
    );
    await page.screenshot({
        fullPage: true,
    });
    await page.pdf({
        path,
        height: `${height}px`,
    });
    await page.close();
    await browser.close();
    server.kill('SIGINT');
    return {
        type: 'complete',
        path,
    } as const;
};

const main = () => {
    generateAsPdf()
        .then(console.log)
        .catch(console.error)
        .finally(() => process.kill(0));
};

main();
