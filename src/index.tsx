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
    <div>
        <FlexCenter>
            <div>
                <BoldText>{project}</BoldText>
                <span> - </span>
                <span>{about}</span>
            </div>
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
                        padding: '16px',
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
                                        <span>CGPA: 3.4051/4.00</span>
                                    </ParallelApart>
                                </div>
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
                                                'Analyze key metrics including, but not limited to, agency acquisition and retention rates from January to June',
                                                'I gather and analyze data, as requested, utilizing Holistics.io for presentation of finding. I also identified and resolved potential issues by communicating with stakeholders and consulting with senior engineers to ensure the proper SQL tables were utilized and the accuracy of results, while writing complex queries',
                                                'The analytical findings will be utilized to present key insights to investors and track progress and KPIs for the business',
                                            ],
                                        },
                                        {
                                            title: 'Optimize price chart scrappers',
                                            descriptions: [
                                                'Implemented web scraping solutions to mirror the booking status of various units for non-exclusive projects, utilizing Puppeteer and Chromium, however, resulted in decreased performance due to high resource utilization',
                                                `I identified and implemented an optimized solution for web scraping by rewriting existing scrapers to utilize HTTP requests and parsing JSON responses, resulting in improved performance and efficiency. Exceptionally, one project required maintaining the use of a client-side cookie generation`,
                                                'As a result, rewriting web scrapers result in significant time savings. Specifically, one price chart scraper reduced execution time from 2 minutes to just 3 seconds',
                                            ],
                                        },
                                        {
                                            title: 'Improved the performance of tests',
                                            descriptions: [
                                                'I noticed that tests took long to run, especially on the backend, reducing testing efficiency on CI/CD and local testing',
                                                'I carefully evaluated various testing frameworks and, after consulting with senior engineers, decided to migrate from jest to vitest, based on positive feedback from the community and to improve testing efficiency',
                                                'After that, I implemented a migration to vitest testing framework overcome challenges such as compatibility issues with some dependencies and the need to adjust configuration settings, such as disabling multithreading to run node-canvas for snapshot tests, and splitting tests into smaller groups for simultaneous execution',
                                                'There is a reduction of backend testing time from 11-12 minutes to 9-10 minutes after implementing changes to the testing framework. I also communicated the changes to the tech team due to subtle compatibility with the previous framework, jest',
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
                                                'Previously I encountered difficulty using JetBrains IDE for Gradle in identifying files and directories to be ignored by git',
                                                'I resolved the issue by discovering a GitHub repository that provides various .gitignore templates, but found the process of searching, copying and pasting the template to be tedious and time-consuming',
                                                'So, I decided to develop a new system which utilizes MongoDB to store .gitignore templates, and built a website to allow developers to easily search, copy and download the templates in a user-friendly manner',
                                                'The templates are kept updated by synchronizing with the original GitHub repository, and the updates are automatically triggered when users visit the website, ensuring they have access to the latest versions of the templates',
                                                'The repository received 8 developer stars due to its ease of use and user-friendly interface',
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
                                                'Identify and addressed issues with the UI/UX of the UTAR website for finding room/unit rentals',
                                                `Proposed a solution to improve the UI/UX of the UTAR website for finding room/unit rentals and selected as the topic for my FYP`,
                                                'Successfully scrapped all rooms/units and stored the data in a PostgreSQL Database and developed features such as displaying room/unit location on Google Maps, bookmarking options, and one-click contact button for landlords/owners through WhatsApp. This will enhance the UX by providing easy access to relevant information and direct communication with landlords/owners',
                                                `Despite the project's success, I did't plan to maintain it or propose it to UTAR due to time constraints, and instead chose to focus on other projects because `,
                                                'Ultimately, I gained valuable experience in setting up pipelines for projects that require a database connection, writing tests for each implementation, and ensuring data validation',
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
                                                'Marketing team need to edit and update Estore Project Teaser details with excel sheet, then handed it over to tech/design team for implementation',
                                                'Collaborated with the marketing team to streamline the process of updating the Estore Project Teaser information by implementing an interface on internal dashboard for them to use, reducing the need for external applications such as excel sheets and providing a more user-friendly interface',
                                                `Implemented it with a careful design that utilizes GraphQL to minimize data overfetching/underfetching, ensuring that only necessary data is retrieved for mutation, and catering for backward compatibility to allow for future changes to the GraphQL implementation`,
                                                `Resulted in the marketing team abandoning the use of excel sheets in favor of the new system as it improved working efficiency`,
                                            ],
                                        },
                                        {
                                            title: 'Implement 4 price chart scrappers',
                                            descriptions: [
                                                'A price chart scraper can take on various forms, including Google Sheets, SVG icons on websites, or traditional website formats',
                                                `Tasked to obtain data through svg which can be challenging as it's not straight forward. In the end I was able to solve it even if the diagram can scale, since the differences between 2 points are the same but of different vector, with that I calculated the distance between buildings in diagram thus able to scrap the data accordingly`,
                                                'Utilized HTTP requests for another scraper to improve performance. The challenging aspect was assembling the various parts of the HTTP response to form the cookie. Once this was accomplished, I was able to send HTTP requests with the cookie as the authentication token',
                                                `Through this project, I gained valuable skills in web scraping, an important tool for obtaining data from third-party website`,
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
