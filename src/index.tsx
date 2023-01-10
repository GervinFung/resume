/* @refresh reload */
import * as SolidJs from 'solid-js';
import * as SolidWeb from 'solid-js/web';
import envs from './env';

type Strings = ReadonlyArray<string>;

type Children = Readonly<{
    children: SolidJs.JSXElement;
}>;

const VerticalDashContainer = () => (
    <div
        style={{
            margin: '0 16px',
        }}
    >
        |
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
                margin: '16px 0 0 0',
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

const SectionView = ({ children }: Children) => (
    <div
        style={{
            margin: '0 0 16px 0',
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
            'grid-gap': '4px',
        }}
    >
        {children}
    </div>
);

const Section = ({
    date,
    about,
    project,
    descriptions,
}: Readonly<{
    date: string;
    about: string;
    project: string;
    descriptions: ReadonlyArray<
        Readonly<{
            title: string;
            descriptions: Strings;
        }>
    >;
}>) => (
    <SectionView>
        <ParallelApart>
            <div
                style={{
                    margin: '0 0 16px 0',
                }}
            >
                <BoldText>{project}</BoldText>
                <span> - </span>
                <span
                    style={{
                        margin: '0 0 16px 0',
                    }}
                >
                    {about}
                </span>
            </div>
            <span>{date}</span>
        </ParallelApart>
        <ParallelApart>
            <VerticalView>
                <SolidJs.Index each={descriptions}>
                    {(lazyDescription) => {
                        const description = lazyDescription();
                        return (
                            <>
                                <li>{description.title}</li>
                                <SolidJs.Index each={description.descriptions}>
                                    {(description) => (
                                        <div>{description()}</div>
                                    )}
                                </SolidJs.Index>
                            </>
                        );
                    }}
                </SolidJs.Index>
            </VerticalView>
        </ParallelApart>
    </SectionView>
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
            'grid-gap': '4px',
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
            margin: '0 0 64px 0',
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
}>) => {
    return (
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
};

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
                        padding: '64px 32px',
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
                                    'Tenom, Sabah, Malaysia',
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
                                <Title>EDUCATION</Title>
                                <SectionView>
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
                                        <span>CGPA: 3.4728/4.00</span>
                                    </ParallelApart>
                                </SectionView>
                            </VerticalView>
                            <VerticalView>
                                <Title>
                                    WORKING / PROJECT EXPERIENCES / OPEN SOURCES
                                </Title>
                                <Section
                                    project="Didian"
                                    about="Fullstack Developer"
                                    date="Jul 2022 - Current"
                                    descriptions={[
                                        {
                                            title: 'Implemented a feature that allow agents to reattach documents',
                                            descriptions: [],
                                        },
                                        {
                                            title: 'Gather requirements and implementation of features',
                                            descriptions: [''],
                                        },
                                        {
                                            title: 'Improved the performance of tests',
                                            descriptions: [
                                                'The previous test took long to run, hence affecting pipeline and local testing',
                                            ],
                                        },
                                    ]}
                                />
                                <Section
                                    project="NPM package"
                                    about="Publisher / Collaborator"
                                    date="Dec 2021 - Present"
                                    descriptions={[
                                        {
                                            title: 'parse-dont-validate - verify the shape of data without using schema',
                                            descriptions: [],
                                        },
                                        {
                                            title: 'ts-add-js-extension - append .js to relative import of transpiled file',
                                            descriptions: [],
                                        },
                                        {
                                            title: 'denoify - convert NPM pckage to Deno compatible package',
                                            descriptions: [],
                                        },
                                    ]}
                                />
                                <Section
                                    project="Gitignored"
                                    about="A UX friendlier tools to generate .gitignore template"
                                    date="May 2022 - Present"
                                    descriptions={[
                                        {
                                            title: 'Web application made with NextJS and Mongo',
                                            descriptions: [
                                                `I am using JetBrains IDE for Gradle and I can't figure out what directories/files are to be ignored`,
                                                `I've searched for templates through Github and found a repository for it, but they don't have a website for developers to pick a template`,
                                                `As such, I decided to scrap the templates in the repository found and build a website for better UI/UX experience`,
                                                `I didn't measure traffic but there's 8 developers that starred the repo`,
                                            ],
                                        },
                                        {
                                            title: 'Terminal application made with Rust',
                                            descriptions: [],
                                        },
                                    ]}
                                />
                                <Section
                                    project="UTARi"
                                    about="Final Year Project (unmaintained)"
                                    date="Jan 2022 - March 2022"
                                    descriptions={[
                                        {
                                            title: 'A web application for UTAR students to find room/unit for rent',
                                            descriptions: [
                                                'The website provided by UTAR to find room/unit for rent has a bad UI/UX',
                                                'I had a very hard time finding room to rent with it',
                                                `As I have the urge to solve this issue, I've decided to use it as my FYP`,
                                                `Although this project is a success, I am not willing to propose it to UTAR due to maintenance issue`,
                                            ],
                                        },
                                    ]}
                                />
                                <Section
                                    project="Didian"
                                    about="Internship Fullstack Developer"
                                    date="Oct 2021 - Dec 2021"
                                    descriptions={[
                                        {
                                            title: 'Implement feature that allow marketing team to update the feature of a project',
                                            descriptions: [],
                                        },
                                        {
                                            title: 'Implement feature that allow developer to chose booking cancellation reason',
                                            descriptions: [],
                                        },
                                        {
                                            title: 'Implement and optimize 4 price chart scrappers',
                                            descriptions: [],
                                        },
                                    ]}
                                />
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
                                            'Java',
                                            'TypeScript',
                                            'Rust',
                                            'C#',
                                            'Dart',
                                            'Python',
                                        ]}
                                    />
                                    <ListSection
                                        title="Frontend Development"
                                        items={[
                                            'React',
                                            'React Native',
                                            'SolidJs',
                                            'Material UI',
                                            'Swing / JavaFX',
                                            'Emotion / Styled Components',
                                        ]}
                                    />
                                    <ListSection
                                        title="Backend Development"
                                        items={[
                                            'Node',
                                            'Fastify',
                                            'Express ',
                                            'GraphQL',
                                            'MongoDB',
                                            'PostgreSQl',
                                        ]}
                                    />
                                    <ListSection
                                        title="Testing Development"
                                        items={[
                                            'Unit',
                                            'Integration',
                                            'UI Snapshot',
                                            'E2E',
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

export default App;

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
