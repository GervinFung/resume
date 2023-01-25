import fs from 'fs';
import puppeteer from 'puppeteer';
import childProcess from 'child_process';
import treeKill from 'tree-kill';

const generateAsPdf = async () => {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        args: ['--start-maximized', '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    const port = 9999;
    const goto = `http://localhost:${port}`;
    const server = childProcess
        .exec('make start')
        .on('spawn', () => console.log(`Going to ${goto}`))
        .on('error', console.error)
        .on('kill', () => {
            kill();
        });
    const kill = () => {
        const { pid } = server;
        if (!pid) {
            throw new Error('pid is undefined');
        }
        treeKill(pid);
    };
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
    await page.goto(goto, {
        waitUntil: 'networkidle0',
    });
    await page.evaluateHandle('document.fonts.ready');
    const dir = 'dist';
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, {
            force: true,
            recursive: true,
        });
    }
    fs.mkdirSync(dir);
    const path = `${dir}/GervinFungDaXuen-Résumé.pdf` as const;
    await page.pdf({
        path,
        width: `${
            (await page.evaluate(() => document.documentElement.offsetWidth)) /
            1.5
        }px`,
        height: `${
            (await page.evaluate(() => document.documentElement.offsetHeight)) +
            200
        }px`,
    });
    await page.close();
    await browser.close();
    kill();
    return {
        type: 'complete',
        path,
    } as const;
};

const main = () => {
    generateAsPdf().then(console.log).catch(console.error);
};

main();
