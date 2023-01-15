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
                                <li
                                    style={{
                                        margin: '8px 0 0 0',
                                    }}
                                >
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
                'font-size': '0.95em',
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
                                        <span>CGPA: 3.4051/4.00</span>
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
                                            title: 'Write SQL query for data analytics',
                                            descriptions: [
                                                'There is always a need for data analytics, for example, how many agencies had join the company from January to June, how many of them had we retain and so on',
                                                'I need to find out various analytics as requested and show it on holistics.io',
                                                `I raise questions if there's doubt on the queries needed, and also to clarify the purpose of the query, then only proceed to write the queries. During the process of writing queries, I consulted senior engineer on the SQL tables needed and the accuracy of result`,
                                                'In the end some of the analytics will be shown to investors and some will be used to track the progress and KPIs',
                                            ],
                                        },
                                        {
                                            title: 'Optimize price chart scrappers',
                                            descriptions: [
                                                'We needed scrappers to mirror the booking status of various units for non-exclusive projects, but the result of our implementation is slow as we used puppeteer for it, which in turn used Chromium which takes up a lot of resources',
                                                `While I was updating puppeteer or implementing new scrappers, I've noticed that all of the scrappers can be rewritten to use HTTP request and we just have to derived the data from the JSON response, except for 1 project as it generate cookie at the client side`,
                                                'I rewrote all of the scrappers to be more performant and enforce a better assertion in test/runtime as the previous assertion was weak',
                                                'After make all the changes, one of the price chart scrappers reduce the execution time from 2 minutes to 3 seconds and subsequently reduce the time taken to complete the tests as well',
                                            ],
                                        },
                                        {
                                            title: 'Improved the performance of tests',
                                            descriptions: [
                                                'The previous test took long to run, hence affecting pipeline and local testing as we needed a quicker feedback',
                                                'I am curious whether changing the testing framework from jest to vitest would improve test performance. Since vitest emphasis on backward compatibility, I can switch to vitest easily',
                                                'The time taken for test to complete reduced from 11-12 mins to 9-10 mins, I then immediately change testing framework to vitest',
                                                'Although there are problems during the process of making changes, it was worthwhile as developer can quickly get feedback from running tests',
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
                                                'Code duplication must be avoided and be used as the last resort to rewrite NPM packages into Deno modules',
                                                'To avoid wasting effort, I found a NPM package that change NPM package to Deno modules',
                                                'I believe this will be a great tool so I contributed to it. Especially a feature that allows configuration to be defined in another configuration file, like jest.config.js, .prettierrc and .eslintrc',
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
                                                `Caching was implemented in this case as it cache all of the templates locally to improve performance and reduce the possible occurence of network error. It can also auto-detect whether the cache can be updated and prompt accordingly`,
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
                                                `Meanwhile, I needed a topic for my FYP and ended up proposed a solution to solve this issue`,
                                                'I successfully scrapped all the rooms/units and stored it in PostgreSQl Database',
                                                'Display room/unit in a better way',
                                                `Contain features including, but not limited to, showing the location room/unit on Google Map, bookmarking room/unit and one-click button to contact the landlord/owner through WhatsApp right away`,
                                                `Although this project is a success I didn't plan to maintain it or propose it to UTAR due to time constraint - I see myself to be working on other projects instead`,
                                                'Ultimately, I think I learnt a lot, especially in setting up pipeline for project that requires connection to a database, writing test for each implementation and making sure data received from both end are validated',
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
                                            title: 'Implement feature that allow marketing team to edit the Estore Project Teaser',
                                            descriptions: [
                                                'In order to best represent the teaser, marketing team need to add/edit descriptions and pictures of new project for agent to do presentation on a project through an excel sheet and the excel sheet will be given go Design team to design it',
                                                `After discussing with the marketing team, we've decide to let them update the information of Estore Project Teaser through the internal dashboard, mainly to reduce the necessity to rely on excel sheet as we can provide an interface for them to do it`,
                                                `I've implemented it with careful design with GraphQL to reduce data overfetching/underfetching, getting needed data only to perform mutation, no more, no less and it's catered for backward compatibility so it's easier to change the GraphQL implementation`,

                                                `As a result, the Marketing team abandon excel sheet and start to use the the internal dashboard as it's more efficient, more UX friendly and it reduce the back and forth between Tech team and Marketing team`,
                                            ],
                                        },
                                        {
                                            title: 'Implement 4 price chart scrappers',
                                            descriptions: [
                                                'Price Chart scrapper can be in different forms, including, but not limited to, Google Sheet, svg icon in website, normal website',
                                                `I've been tasked to obtain data through svg which can be challenging as it's not straight forward. In the end I was able to solve it even if the diagram can scale since the differences between 2 points are the same but of different vector, with that I calculated the distance between buildings in diagram thus able to scrap the data accordingly`,
                                                'I used HTTP request for the other scrapper to make it more performant, the challenging part is piecing together the various part of HTTP response that forms the cookie. Once the cookie is formed, I can send HTTP request with that cookie as the token',
                                                `In the end, I've obtained skills to scrap data from website as it's an important skill to obtain data from third party`,
                                            ],
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
                                        width: '75%',
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
