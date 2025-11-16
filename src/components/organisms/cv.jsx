import classNames from "classnames";
import { GithubIcon, MailIcon, PhoneIcon } from "lucide-react";

const Title = ({ children }) => {
    return <h1 className="text-5xl font-bold text-black merriweather-black my-4">{children}</h1>;
};

const Subtitle = ({ children }) => {
    return <h2 className="text-xl font-bold text-amber-600 heebo-900">{children}</h2>;
};

const Heading = ({ children }) => {
    return <h3 className="text-lg font-bold text-black merriweather-bold">{children}</h3>;
};

const Paragraph = ({ children, variant = "primary" }) => {
    return (
        <p className={classNames("text-sm text-black merriweather-light  leading-6", {
            "text-sm max-w-md": variant === "primary",
            "text-xs max-w-xs": variant === "secondary",
        })}>
            {children}
        </p>
    );
};

const Section = ({ children }) => {
    return <section className="my-4">{children}</section>;
};

const Article = ({ children }) => {
    return <article className="flex flex-col gap-0 my-4">{children}</article>;
};

const UnorderedList = ({ children }) => {
    return <ul className="flex gap-4 justify-center items-center">{children}</ul>;
};

const Tag = ({ children }) => {
    return <span className="text-sm text-gray-500">{children}</span>;
};

const Tags = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Webpack",
    "Docker",
    "Kubernetes",
    "Tailwind CSS",
    "Storybook",
    "HTML",
    "CSS",
];

const Link = ({ children, href }) => {
    return <a href={href} className="flex text-black items-center justify-start gap-2">{children}</a>;
};

const ListItem = ({ children }) => {
    return <li className="w-1/3">{children}</li>;
};

export const CurriculumVitae = () => {
    return (
        <main className="">
            <Title><span className="text-yellow-500 text-[3.4rem]">☀</span> Eliran Shemesh</Title>
            <div className="flex flex-col gap-4">
                {/* Contact information */}
                <UnorderedList>
                    <ListItem>
                        <Link href="https://github.com/EliranSun">
                            <GithubIcon size={16} />
                            <span className="text-gray-500 text-xs">github.com/EliranSun</span>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="mailto:piro27@gmail.com">
                            <MailIcon size={16} />
                            <span className="text-gray-500 text-xs">piro27@gmail.com</span>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="tel:+972503443947">
                            <PhoneIcon size={16} />
                            <span className="text-gray-500 text-xs">050-344-3947</span>
                        </Link>
                    </ListItem>
                </UnorderedList>
                <div className="flex flex-col">
                    <Section>
                        <Subtitle>Profile</Subtitle>
                        <Article>
                            <Paragraph>
                                Dedicated, hard-working & positive.  Collaborative and team-oriented. Seeing the big picture while focusing on the details. Creative and passionate - yet methodological and thorough. Coding == life.
                            </Paragraph>
                        </Article>
                    </Section>
                    <Section>
                        <Subtitle>Experience</Subtitle>
                        <Article>
                            <Heading>Frontend Engineer, Atly: 2022-2025</Heading>
                            <Paragraph>
                                Implementing best practices and refactored an admin application. Migrating existing React projects to Next.js. Single handedly responsible of SEO, performance, the design system, architecture and technologies.
                            </Paragraph>
                        </Article>
                        <Article>
                            <Heading>Full Stack Engineer, Fiverr: 2021-2022</Heading>
                            <Paragraph>
                                Developing production-ready, high scale and optimized performant features. Developing front-end packages for consumers using the micro-frontend architecture.
                            </Paragraph>
                        </Article>
                        <Article>
                            <Heading>Full Stack Team Leader, Netomedia: 2020-2021</Heading>
                            <Paragraph>
                                Leading 3 senior web developers. Emphasizing on quality over quantity and building excellent communication in the team.
                            </Paragraph>
                        </Article>
                        <Article>
                            <Heading>Full Stack Developer, Netomedia: 2016-2020</Heading>
                            <Paragraph>
                                Writing technical specs, collaborating with tech leads & software architectures on new features & infrastructures. Quick responses to design changes due to the nature of the online gaming arena.
                            </Paragraph>
                        </Article>
                        <Article>
                            <Heading>Full Stack Developer, Homismart: 2016</Heading>
                            <Paragraph>
                                Developing a frontend application from scratch.
                            </Paragraph>
                        </Article>
                    </Section>
                    <Section>
                        <Subtitle>Education</Subtitle>
                        <Article>
                            <Heading>500Tech — Full Stack Internship</Heading>
                            <Heading>HackerU — Full Stack Developer</Heading>
                        </Article>
                    </Section>
                    <Section>
                        <Subtitle>Skills</Subtitle>
                        <Article>
                            <div className="flex flex-wrap gap-2 max-w-md">
                                {Tags.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </Article>
                    </Section>
                </div>
            </div>
        </main>
    );
};
