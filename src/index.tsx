/* @refresh reload */
import * as SolidJs from 'solid-js';
import * as SolidWeb from 'solid-js/web';
import envs from './env';
import type { Strings } from './type';
import data, { Experience, TechnicalSkills } from './data';

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

const Section = ({ project, descriptions, aboutAndDateList }: Experience) => (
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

const ListSection = ({ title, items }: TechnicalSkills) => (
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

    const { openSourceProjects, professionalExperiences } = data;

    const education = data.education();
    const technicalSkills = data.technicalSkills();
    const spokenLanguages = data.spokenLanguages();

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
                                    {...professionalExperiences.didian()}
                                />
                            </VerticalView>
                            <VerticalView>
                                <Title>OPEN SOURCE PROJECTS</Title>
                                <Section
                                    {...openSourceProjects.npmPackages()}
                                />
                                <Section {...openSourceProjects.gitignored()} />
                                <Section {...openSourceProjects.utari()} />
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
                                                {education.univerisity}
                                            </BoldText>
                                            <span> - </span>
                                            <span>{education.campus}</span>
                                        </div>
                                        <span>{education.date}</span>
                                    </ParallelApart>
                                    <ParallelApart>
                                        <span>{education.degree}</span>
                                        <span>CGPA: {education.cgpa}/4.00</span>
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
                                        items={technicalSkills.languages}
                                    />
                                    <ListSection
                                        title="Frontend Development"
                                        items={technicalSkills.frontend}
                                    />
                                    <ListSection
                                        title="Backend Development"
                                        items={technicalSkills.backend}
                                    />
                                </div>
                            </VerticalView>
                            <VerticalView>
                                <Title>SPOKEN LANGUAGES</Title>
                                <span>
                                    Mandarin ({spokenLanguages.mandarin}),
                                    English ({spokenLanguages.english}), Malay (
                                    {spokenLanguages.malay}), Cantonese (
                                    {spokenLanguages.cantonese})
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
