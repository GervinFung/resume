import axios from 'axios';
import fs from 'fs';

const generateAsEnv = async () => {
    const { data } = await axios.get(
        'https://api.github.com/repos/GervinFung/my-web'
    );
    const domain = data.homepage as string;
    const envs = [
        'const envs = {',
        `domain: '${domain}'`,
        '} as const',
        'export default envs',
    ].join('\n');
    fs.writeFileSync(`${process.cwd()}/src/env.ts`, envs);
    return `Generated:\n${envs}`;
};

const main = () => {
    generateAsEnv().then(console.log).catch(console.error);
};

main();
