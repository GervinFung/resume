import { Strings } from './type';

type Experience = Readonly<{
    project: string;
    aboutAndDateList: ReadonlyArray<{
        date: string;
        about: string;
    }>;
    descriptions: ReadonlyArray<
        Readonly<{
            title: string;
            descriptions: Strings;
        }>
    >;
}>;

const data = {
    professionalExperiences: {
        didian: (): Experience => ({
            project: 'Didian',
            aboutAndDateList: [
                {
                    date: 'Jul 2022 - Jan 2023',
                    about: 'Fullstack Developer',
                },
                {
                    date: 'Oct 2021 - Dec 2021',
                    about: 'Internship Fullstack Developer',
                },
            ],
            descriptions: [
                {
                    title: 'Write SQL query for data analytics',
                    descriptions: [
                        'Analyzed key metrics with Holistics.io, identified & resolved issues, wrote complex queries to present insights to investors & track progress & KPIs',
                    ],
                },
                {
                    title: 'Optimize price chart scrapers',
                    descriptions: [
                        'Rewrote scrapers to use HTTP requests and parse JSON responses, improving performance and efficiency with low resource utilization and reduced risks of double booking. Price chart scraper execution time reduced from 2 minutes to 3 seconds',
                    ],
                },
                {
                    title: 'Improved hot-reload and build time of internal dashboard and backend',
                    descriptions: [
                        `Implemented vite for the dashboard and esbuild for the backend to address Webpack's slow performance and long wait times (20s-30s), resulting in increased developer satisfaction as changes are now visible immediately (0.5s-2s)`,
                    ],
                },
                {
                    title: 'Replaced npm with pnpm',
                    descriptions: [
                        `Implemented transition from npm to pnpm as package manager following tech team consultations as npm had slow installation times (11-12 minutes) and security issues. Utilised pnpm's migration command to generate yaml lockfile, resulting 66% improvement of installation time (3-4 minutes) and CI/CD pipeline performance. Documented reasoning and process, providing guidelines and snapshots of CI/CD pipeline as evidence of improvement`,
                    ],
                },
                {
                    title: 'Built tool to allow marketing team to create automated store fronts for agents',
                    descriptions: [
                        `Developed an internal dashboard interface to streamline the process of updating Estore Project Teaser information, reducing need for external applications such as Excel sheets. This improved Marketing Team's working efficiency and accuracy of data, leading to abandonment of Excel sheets`,
                    ],
                },
            ],
        }),
        recogine: (): Experience => ({
            project: 'Recogine',
            aboutAndDateList: [
                {
                    date: 'June 2023 - Aug 2023',
                    about: 'Software Engineer',
                },
                {
                    date: 'Aug 2023 - Jan 2024',
                    about: 'R&D Software Engineer',
                },
            ],
            descriptions: [
                {
                    title: 'Introduced git commit message convention',
                    descriptions: [
                        'Enhanced collaboration and clarity in our codebase with convention for more meaningful and streamlined development workflows',
                    ],
                },
                {
                    title: 'Introduced typescript',
                    descriptions: [
                        'Improved code quality and developer experience with type safety and intellisense for building frontend applications',
                    ],
                },
                {
                    title: 'Bus lane detection',
                    descriptions: [
                        'Created a PWA for detecting bus parking violation system that periodically takes photos of the bus lane and sends them to the backend for processing. The PWA is also able to uniquely identify bus and location of the bus and bus lane on a map',
                    ],
                },
                {
                    title: 'Improved hot-reload and build time of web product',
                    descriptions: [
                        `Implemented vite for recent web app and tackled webpack's slow performance and long wait times (10s-20s), resulting in increased developer satisfaction as changes are now visible immediately (0.5s-2s)`,
                    ],
                },
                {
                    title: 'Introduce pnpm',
                    descriptions: [
                        `Shifted from npm to pnpm as the package manager to address issues related to slow installation times (11-12 minutes) and security concerns. Achieved a 66% improvement in installation time (3-4 minutes) and enhanced CI/CD pipeline performance. Successfully resolved a problematic installation process caused by npm`,
                    ],
                },
                {
                    title: 'Virtual tool plaza',
                    descriptions: [
                        `Engineered a React and TypeScript-powered dashboard for a virtual toll plaza, revolutionizing the toll collection process by eliminating physical stations to prevent congestion and ensure seamless journeys. The dashboard includes comprehensive reporting features, offering insights through hourly, daily, monthly, and annual reports`,
                    ],
                },
            ],
        }),
    },
    openSourceProjects: {
        npmPackages: (): Experience => ({
            project: 'npm package',
            aboutAndDateList: [
                {
                    date: 'Dec 2021 - Present',
                    about: 'publisher / collaborator',
                },
            ],
            descriptions: [
                {
                    title: 'ts-add-js-extension - add javascript file extension',
                    descriptions: [
                        'Developed a tool that resolves import/export paths and automatically adds JavaScript file extensions, effectively resolving a common issue encountered in TypeScript projects. This tool has gained significant recognition with 17 stars and contributions from various users, particularly benefiting npm package maintainers',
                    ],
                },
                {
                    title: 'gen-env-type-def - genereate type definition for environment variables',
                    descriptions: [
                        'Developed a type generation tool for TypeScript projects, leveraging discriminated unions for type safety with environment variables, supporting process.env and import.meta.env. Recognized with 5 stars from developer',
                    ],
                },
                {
                    title: 'denoify - convert npm pckage to deno compatible modules',
                    descriptions: [
                        'Contributed to an npm package that changes npm packages to deno modules. Wrote a configuration file that informs the developer how the npm package will be converted to deno modules, thus avoiding wasting effort on rewriting code. The package has now gained over 800 likes and is used by more than 300 GitHub repositories',
                    ],
                },
            ],
        }),
        gitignored: (): Experience => ({
            project: 'Gitignored',
            aboutAndDateList: [
                {
                    date: 'May 2022 - Present',
                    about: 'A tool to generate .gitignore template',
                },
            ],
            descriptions: [
                {
                    title: 'Web/Terminal application',
                    descriptions: [
                        'Developed a new system with a user-friendly website for easily searching, copying and downloading .gitignore templates. Synced with original GitHub repository for latest versions. Received 8 developer stars',
                        'Also built an equivalent command line program written in Rust. Implemented caching to improve performance and prevent network errors by storing templates locally with an option to update the cache automatically',
                    ],
                },
            ],
        }),
        utari: (): Experience => ({
            project: 'UTARi',
            aboutAndDateList: [
                {
                    date: 'Jan 2022 - March 2022',
                    about: 'Final Year Project',
                },
            ],
            descriptions: [
                {
                    title: 'A web application for UTAR students to find rentable unit/room',
                    descriptions: [
                        'Identified UI/UX issues with the UTAR website for searchable rental rooms/units, proposed a solution to improve UX by implementing a new interface, and selected it as my FYP topic. Scraped rooms/units data and stored it in a PostgreSQL Database, developed features such as showing location on Google Maps, bookmarking, and a one-click contact button for landlords/owners through WhatsApp. I gained experience in setting up CI/CD pipelines, tests, and data validation',
                    ],
                },
            ],
        }),
    },
    closedSourceProjects: {
        malaysianPayGap: (): Experience => ({
            project: 'Malaysian Pay Gap',
            aboutAndDateList: [
                {
                    date: 'April 2023 - Jan 2024',
                    about: 'developer / tech lead',
                },
            ],
            descriptions: [
                {
                    title: 'internal dashboard',
                    descriptions: [
                        'Partnered with founders to craft an internal dashboard that seamlessly integrates event hosting and blog publishing. This collaborative effort, driven by next.js, supabase, pgtyped, and trpc, resulted in a cohesive product experience. Noteworthy features include robust authentication, authorization, role-based access control as well as unit/integration testing',
                    ],
                },
                {
                    title: 'landing page',
                    descriptions: [
                        'Collaborated closely with founders and a designer to build an engaging landing page leveraging next.js and material ui. Offered guidance and consultation throughout the iterative refinement process',
                    ],
                },
            ],
        }),
    },
    technicalSkills: () =>
        ({
            languages: ['TypeScript', 'Java / C#', 'Rust', 'Dart'],
            backend: [
                'Node',
                'Express',
                'GraphQL',
                'MongoDB / PostgreSQl',
                'Trpc',
            ],
            frontend: [
                'React / React Native',
                'Material UI',
                'Swing / JavaFX',
                'Emotion / Styled Components',
            ],
        } as const),
    spokenLanguages: () =>
        ({
            mandarin: 'Native',
            english: 'MUET Band 4',
            malay: 'Conversational',
            cantonese: 'Native',
        } as const),
} as const;

export type { Experience };

export default data;
