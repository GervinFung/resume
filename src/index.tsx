/* @refresh reload */
import * as SolidJs from 'solid-js';
import * as SolidWeb from 'solid-js/web';
import envs from './env';

type Strings = ReadonlyArray<string>;

type Children = Readonly<{
    children: SolidJs.JSXElement;
}>;

const VerticalDash = () => <span>|</span>;

const VerticalDashContainer = () => (
    <div
        style={{
            margin: '0 16px',
        }}
    >
        <VerticalDash />
    </div>
);
const HorizontalViews = (
    props: Readonly<
        | {
              type: 'text';
              items: Strings;
          }
        | {
              type: 'link';
              items: ReadonlyArray<
                  Readonly<{
                      name: string;
                      link: string;
                  }>
              >;
          }
    >
) => {
    const { length } = props.items;

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            {props.type === 'text' ? (
                <SolidJs.Index each={props.items}>
                    {(item, index) => (
                        <>
                            <span>{item()}</span>
                            {index >= length - 1 ? null : (
                                <VerticalDashContainer />
                            )}
                        </>
                    )}
                </SolidJs.Index>
            ) : (
                <SolidJs.Index each={props.items}>
                    {(item, index) => {
                        const { link, name } = item();

                        return (
                            <>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {name}
                                </a>
                                {index >= length - 1 ? null : (
                                    <VerticalDashContainer />
                                )}
                            </>
                        );
                    }}
                </SolidJs.Index>
            )}
        </div>
    );
};

const FlexCenter = ({ children }: Children) => (
    <div
        style={{
            display: 'flex',
            'align-items': 'center',
            margin: '0 0 8px 0',
        }}
    >
        {children}
    </div>
);

const ParallelApart = ({ children }: Children) => (
    <div
        style={{
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'space-between',
        }}
    >
        {children}
    </div>
);

const BoldText = ({ children }: Children) => (
    <span
        style={{
            'font-weight': 'bold',
        }}
    >
        {children}
    </span>
);

const VerticalView = ({ children }: Children) => (
    <div
        style={{
            width: '100%',
            display: 'grid',
        }}
    >
        {children}
    </div>
);

const ItalicFont = ({ children }: Children) => (
    <span
        style={{
            'font-style': 'italic',
        }}
    >
        {children}
    </span>
);

const Section = ({
    project,
    descriptions,
    aboutAndDateList,
}: Readonly<{
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
}>) => (
    <div>
        <FlexCenter>
            <div
                style={{
                    margin: '0 8px 0 0',
                }}
            >
                <BoldText>{project}</BoldText>
                <span> - </span>
            </div>
            {
                <SolidJs.Index each={aboutAndDateList}>
                    {(aboutAndDate, index) => {
                        const { about, date } = aboutAndDate();

                        return (
                            <>
                                <span>{about}</span>
                                <div>
                                    <span
                                        style={{
                                            visibility: 'hidden',
                                        }}
                                    >
                                        {' '}
                                        -{' '}
                                    </span>
                                    <ItalicFont>{`(${date})`}</ItalicFont>
                                </div>
                                {index >= aboutAndDateList.length - 1 ? null : (
                                    <VerticalDashContainer />
                                )}
                            </>
                        );
                    }}
                </SolidJs.Index>
            }
        </FlexCenter>
        <FlexCenter>
            <VerticalView>
                <SolidJs.Index each={descriptions}>
                    {(lazyDescription) => {
                        const description = lazyDescription();
                        const { length } = description.descriptions;
                        const [title, subDescription] =
                            description.title.split(' - ');
                        return (
                            <>
                                <li>
                                    <BoldText>{title}</BoldText>
                                    {!subDescription
                                        ? null
                                        : ` - ${subDescription}`}
                                </li>
                                <ul
                                    class="dashed"
                                    style={{
                                        margin: 0,
                                        'list-style-type': 'none',
                                    }}
                                >
                                    <SolidJs.Index
                                        each={description.descriptions}
                                    >
                                        {(description, index) => (
                                            <li
                                                style={{
                                                    'text-indent': '-20px',
                                                    margin: `8px 0 ${
                                                        index !== length - 1
                                                            ? 0
                                                            : '8px'
                                                    } -16px`,
                                                }}
                                            >
                                                {description()}
                                            </li>
                                        )}
                                    </SolidJs.Index>
                                </ul>
                            </>
                        );
                    }}
                </SolidJs.Index>
            </VerticalView>
        </FlexCenter>
    </div>
);

const ListSection = ({
    title,
    items,
}: Readonly<{
    title: string;
    items: Strings;
}>) => (
    <div>
        <VerticalView>
            <BoldText>{title}</BoldText>
            <div>
                <ol>
                    <SolidJs.Index each={items}>
                        {(item) => (
                            <li>
                                <span>{item()}</span>
                            </li>
                        )}
                    </SolidJs.Index>
                </ol>
            </div>
        </VerticalView>
    </div>
);

const InformationView = ({ children }: Children) => (
    <div
        style={{
            display: 'grid',
        }}
    >
        {children}
    </div>
);

const IntroInformationView = ({ children }: Children) => (
    <div
        style={{
            'place-items': 'center',
            display: 'grid',
            margin: '0 0 32px 0',
        }}
    >
        {children}
    </div>
);

const Title = ({ children }: Children) => (
    <div
        style={{
            'font-weight': 'bold',
            'text-decoration': 'underline',
            'font-size': '1.2em',
            margin: '0 0 8px 0',
        }}
    >
        {children}
    </div>
);

const Font = ({
    family,
}: Readonly<{
    family: string;
}>) => (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link
            href={`https://fonts.googleapis.com/css2?family=${family
                .split(' ')
                .join('+')}:wght@${Array.from(
                { length: 9 },
                (_, index) => (index + 1) * 100
            ).join(';')}&display=swap`}
            rel="stylesheet"
        />
    </>
);

const App = () => {
    const fontFamily = 'JetBrains Mono';

    const links = {
        gmail: 'gervinfungdaxuen@gmail.com',
        github: 'https://github.com/GervinFung',
        linkedin: 'https://www.linkedin.com/in/gervin-fung-387409209',
        domain: envs.domain,
    } as const;

    return (
        <div
            style={{
                width: '100%',
                display: 'grid',
                'place-items': 'center',
                'font-family': fontFamily,
                'background-color': '#FFF',
                color: '#000',
                'font-size': '0.9m',
            }}
        >
            <Font family={fontFamily} />
            <div
                style={{
                    display: 'grid',
                    'place-items': 'center',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        padding: '60px 48px',
                        width: '100%',
                        'box-sizing': 'border-box',
                    }}
                >
                    <InformationView>
                        <IntroInformationView>
                            <BoldText>Gervin Fung Da Xuen</BoldText>
                            <HorizontalViews
                                type="text"
                                items={[
                                    links.gmail,
                                    '011-5548-4654',
                                    'Puchong, Selangor, Malaysia',
                                ]}
                            />
                            <HorizontalViews
                                type="link"
                                items={[
                                    {
                                        name: links.domain,
                                        link: links.domain,
                                    },
                                    {
                                        name: [
                                            links.linkedin.split('/in/').at(0),
                                            'GervinFung',
                                        ].join('/'),
                                        link: links.linkedin,
                                    },
                                    {
                                        name: links.github,
                                        link: links.github,
                                    },
                                ]}
                            />
                        </IntroInformationView>
                        <InformationView>
                            <VerticalView>
                                <Title>PROFESSIONAL EXPERIENCE</Title>
                                <Section
                                    project="Didian"
                                    aboutAndDateList={[
                                        {
                                            date: 'Jul 2022 - Jan 2023',
                                            about: 'Fullstack Developer',
                                        },
                                        {
                                            date: 'Oct 2021 - Dec 2021',
                                            about: 'Internship Fullstack Developer',
                                        },
                                    ]}
                                    descriptions={[
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
                                                `Implemented transition from npm to pnpm as package manager following tech team consultations as npm had slow installation times (11-12 minutes) and security issues. Utilised pnpm's migration command to generate yaml lockfile, resulting X% improvement of installation time (3-4 minutes) and CI/CD pipeline performance. Documented reasoning and process, providing guidelines and snapshots of CI/CD pipeline as evidence of improvement`,
                                            ],
                                        },
                                        {
                                            title: 'Built tool to allow marketing team to create automated store fronts for agents',
                                            descriptions: [
                                                `Developed an internal dashboard interface to streamline the process of updating Estore Project Teaser information, reducing need for external applications such as Excel sheets. This improved Marketing Team's working efficiency and accuracy of data, leading to abandonment of Excel sheets`,
                                            ],
                                        },
                                    ]}
                                />
                            </VerticalView>
                            <VerticalView>
                                <Title>OPEN SOURCE PROJECTS</Title>
                                <Section
                                    project="npm package"
                                    aboutAndDateList={[
                                        {
                                            date: 'Dec 2021 - Present',
                                            about: 'publisher / collaborator',
                                        },
                                    ]}
                                    descriptions={[
                                        {
                                            title: 'parse-dont-validate - verify the shape of data without using schema',
                                            descriptions: [
                                                'Asserting the type of data received is essential to reduce type errors. Published and currently maintain this package which has over 1000 weekly downloads and is used by 33 repositories to return data in the expected type/shape with functions to make it easier to debug',
                                            ],
                                        },
                                        {
                                            title: 'denoify - convert npm pckage to deno compatible modules',
                                            descriptions: [
                                                'Contributed to an npm package that changes npm packages to deno modules. Wrote a configuration file that informs the developer how the npm package will be converted to deno modules, thus avoiding wasting effort on rewriting code. The package has now gained over 800 likes and is used by more than 300 GitHub repositories',
                                            ],
                                        },
                                    ]}
                                />
                                <Section
                                    project="Gitignored"
                                    aboutAndDateList={[
                                        {
                                            date: 'May 2022 - Present',
                                            about: 'A tool to generate .gitignore template',
                                        },
                                    ]}
                                    descriptions={[
                                        {
                                            title: 'Web/Terminal application',
                                            descriptions: [
                                                'Developed a new system with a user-friendly website for easily searching, copying and downloading .gitignore templates. Synced with original GitHub repository for latest versions. Received 8 developer stars',
                                                'Also built an equivalent command line program written in Rust. Implemented caching to improve performance and prevent network errors by storing templates locally with an option to update the cache automatically',
                                            ],
                                        },
                                    ]}
                                />
                                <Section
                                    project="UTARi"
                                    aboutAndDateList={[
                                        {
                                            date: 'Jan 2022 - March 2022',
                                            about: 'Final Year Project',
                                        },
                                    ]}
                                    descriptions={[
                                        {
                                            title: 'A web application for UTAR students to find rentable unit/room',
                                            descriptions: [
                                                'Identified UI/UX issues with the UTAR website for searchable rental rooms/units, proposed a solution to improve UX by implementing a new interface, and selected it as my FYP topic. Scraped rooms/units data and stored it in a PostgreSQL Database, developed features such as Google Maps, bookmarking, and a one-click contact button for landlords/owners through WhatsApp. I gained experience in setting up CI/CD pipelines, tests, and data validation',
                                            ],
                                        },
                                    ]}
                                />
                            </VerticalView>
                            <VerticalView>
                                <Title>EDUCATION</Title>
                                <div
                                    style={{
                                        margin: '0 0 16px 0',
                                    }}
                                >
                                    <ParallelApart>
                                        <div>
                                            <BoldText>
                                                Universiti Tunku Abdul Rahman
                                            </BoldText>
                                            <span> - </span>
                                            <span>
                                                Sungai Long, Selangor, Malaysia
                                            </span>
                                        </div>
                                        <span>May 2019 - Dec 2022</span>
                                    </ParallelApart>
                                    <ParallelApart>
                                        <span>
                                            Bachelor of Science (Honours)
                                            Software Engineering
                                        </span>
                                        <span>CGPA: 3.40/4.00</span>
                                    </ParallelApart>
                                </div>
                            </VerticalView>
                            <VerticalView>
                                <Title>TECHNICAL SKILLS</Title>
                                <div
                                    style={{
                                        display: 'flex',
                                        'justify-content': 'space-between',
                                    }}
                                >
                                    <ListSection
                                        title="Languages"
                                        items={[
                                            'TypeScript',
                                            'Java / C#',
                                            'Rust',
                                            'Dart',
                                        ]}
                                    />
                                    <ListSection
                                        title="Frontend Development"
                                        items={[
                                            'React / React Native',
                                            'Material UI',
                                            'Swing / JavaFX',
                                            'Emotion / Styled Components',
                                        ]}
                                    />
                                    <ListSection
                                        title="Backend Development"
                                        items={[
                                            'Node',
                                            'Express',
                                            'GraphQL',
                                            'MongoDB / PostgreSQl',
                                        ]}
                                    />
                                </div>
                            </VerticalView>
                            <VerticalView>
                                <Title>SPOKEN LANGUAGES</Title>
                                <span>
                                    Mandarin (Native), English (MUET Band 4),
                                    Malay (Conversational), Cantonese (Native)
                                </span>
                            </VerticalView>
                        </InformationView>
                    </InformationView>
                </div>
            </div>
        </div>
    );
};

SolidWeb.render(
    App,
    (() => {
        const root = document.getElementById('root');
        if (!root) {
            throw new Error('there is no element with id of root');
        }
        return root;
    })()
);
