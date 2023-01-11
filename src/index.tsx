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
                                        width: '75%',
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
                                                    } 0`,
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
                                            descriptions: [
                                                `It's impossible to know the type/shape of a data when it's received from resources outside the boundary of the application`,
                                                'Assertion on type of data received must be done to reduce the possible occurence of type error',
                                                `The problem with most schema/data validator is that it's quite magical, therefore hard to debug. Not to mention that some of it don't even return the data in the proper type, merely asserting`,
                                                `This package was built to return the data in the expected type/shape with function and not schema, therefore it's intuitive and easier to debug`,
                                                `It has now over 1000 weekly downloads and it's used by 33 repositories`,
                                            ],
                                        },
                                        {
                                            title: 'ts-add-js-extension - append .js to relative import/export of transpiled file',
                                            descriptions: [
                                                `When TypeScript code gets transpiled to JavaScript ESM format, it can't be executed because the relative import/export statement doesn't end with JavaScript file extension`,
                                                `There are many packages that handle this situation very well, but it's limited only to TypeScript and is tightly coupled to the TypeScript compiler`,
                                                `This package is not tightly coupled to any compiler, so it requires less setup and configuration`,
                                                `Moreover, it can be used on JavaScript files too, since it deal with JavaScript files directly`,
                                                `As the creator of this package, I envision this package to have over 500 weekly download and be used across different repositories in the future`,
                                                `Most importantly, as the first NPM package I created, I learnt a lot and now have the capability to debug many NPM packages`,
                                            ],
                                        },
                                        {
                                            title: 'denoify - convert NPM pckage to Deno compatible modules',
                                            descriptions: [
                                                `Since Node and Deno are 2 different runtime environment, I expected that there will be 2 codebase for 1 package/module`,
                                                'Code duplication must be avoided and be used as the last resort to publish NPM packages to Deno platform as it means more tedious work',
                                                'Therefore, I found a NPM package that change NPM package to Deno modules',
                                                'I believe this will be a great tool so I contributed to it. Especially a feature that allows configuration to be defined in another config file, like that of jest, prettier and eslint',
                                                'As of now, this package has over 800 likes and is used by more than 300 repositories',
                                            ],
                                        },
                                    ]}
                                />
                                <Section
                                    project="Gitignored"
                                    about="A UX friendlier tools to generate .gitignore template"
                                    date="May 2022 - Present"
                                    descriptions={[
                                        {
                                            title: 'Web application made with NextJS and MongoDB',
                                            descriptions: [
                                                `I once used JetBrains IDE for Gradle and couldn't figure out what to be ignored by git`,
                                                `Then I Found a GitHub repository with various .gitignore templates, but it is tedious to search, copy and paste a template from GitHub`,
                                                `So I scrap it and store it in MongoDB then build a website to allow developers to copy/download various .gitignore templates in a UX friendly manner`,
                                                `The templates will updated if there's an update to that GitHub repository and the update will be triggerd when user visit the website`,
                                                `As a result of ease of use and UX friendliness, 8 developers had starred the repo`,
                                            ],
                                        },
                                        {
                                            title: 'Terminal application made with Rust',
                                            descriptions: [
                                                `I figured that some developers use terminal quite often too`,
                                                `I dived into research on which low-level language is suitable for the task and subsequently I can benefit from it`,
                                                `Rust came out on top for its borrow-checking feature, emphasis on immutability and it's fast`,
                                                `The implementation concept is the same as that of the web version`,
                                                `Except that it cache all of the templates locally to improve performance and reduce the possible occurence of network error. It can also auto-detect whether the cache can be updated and prompt accordingly`,
                                                'Ultimately, I learnt a lot by making a terminal application in Rust',
                                            ],
                                        },
                                    ]}
                                />
                                <Section
                                    project="UTARi"
                                    about="Final Year Project (unmaintained)"
                                    date="Jan 2022 - March 2022"
                                    descriptions={[
                                        {
                                            title: 'A web application for UTAR students to find rentable unit/room',
                                            descriptions: [
                                                'The website provided by UTAR to find room/unit for rent has a bad UI/UX',
                                                `Proposed a solution as my FYP to solve this issue`,
                                                'I scrapped all the rooms/units and stored it in PostgreSQl Database',
                                                'Display room/unit in a better way',
                                                `Contain features like showing the room/units' location on Google Map, bookmarking room/unit`,
                                                'Contains one-click button to contact the landlord/owner',
                                                `Although this project is a success, I didn't propose it to UTAR due to time constraint`,
                                                'It is also unmaintained because I think I learnt enough from it and moved on to other projects',
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
                                            'Node / Deno',
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
