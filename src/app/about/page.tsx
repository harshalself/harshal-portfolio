import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiSupabase,
  SiVercel,
  SiRender,
  SiGooglecloud,
  SiGooglecolab,
  SiReplit,
  SiPostman,
  SiNotion,
  SiFigma,
  SiCanva,
  SiAdobe,
} from "react-icons/si";
import { MdImage } from "react-icons/md";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: "/images/og/home.jpg",
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map(
        (experience: any) => experience.company
      ),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map(
        (institution: any) => institution.name
      ),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: [
        ...(about.technical.languagesAndFrameworks || []),
        ...(about.technical.databases || []),
        ...(about.technical.toolsAndPlatforms || []),
        ...(about.technical.designAndMedia || []),
      ],
    },
  ];
  const socialIconMap: Record<string, JSX.Element> = {
    GitHub: <FaGithub />,
    LinkedIn: <FaLinkedin />,
    Instagram: <FaInstagram />,
    Email: <FaEnvelope />,
  };
  const skillIconMap: Record<string, JSX.Element> = {
    HTML: <SiHtml5 />,
    CSS: <SiCss3 />,
    JavaScript: <SiJavascript />,
    TypeScript: <SiTypescript />,
    Python: <SiPython />,
    "C++": <SiCplusplus />,
    "React.js": <SiReact />,
    "Node.js": <SiNodedotjs />,
    "Express.js": <SiExpress />,
    "Tailwind CSS": <SiTailwindcss />,
    MongoDB: <SiMongodb />,
    PostgreSQL: <SiPostgresql />,
    Firebase: <SiFirebase />,
    Git: <SiGit />,
    GitHub: <SiGithub />,
    "GitHub Projects": <SiGithub />,
    Supabase: <SiSupabase />,
    Vercel: <SiVercel />,
    Render: <SiRender />,
    "Google Cloud": <SiGooglecloud />,
    "Google Colab": <SiGooglecolab />,
    Replit: <SiReplit />,
    "Visual Studio Code (VS Code)": <MdImage />,
    Postman: <SiPostman />,
    Notion: <SiNotion />,
    Figma: <SiFigma />,
    Canva: <SiCanva />,
    Lightroom: <SiAdobe />,
    Snapseed: <MdImage />,
    CapCut: <MdImage />,
    "Cursor AI Editor": <MdImage />,
    "Lovable Dev": <MdImage />,
  };
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image="/images/og/home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s">
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center">
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32">
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center">
                <Icon
                  paddingLeft="12"
                  name="linkedin"
                  onBackground="brand-weak"
                />
                <Flex paddingX="8">Message on LinkedIn</Flex>
                <IconButton
                  href="https://www.linkedin.com/in/harshal-patil-534502259/"
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak">
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          key={item.name}
                          href={item.link}
                          size="s"
                          weight="default"
                          variant="secondary">
                          {socialIconMap[item.name] && (
                            <span
                              style={{
                                marginRight: 8,
                                display: "inline-flex",
                                verticalAlign: "middle",
                              }}>
                              {socialIconMap[item.name]}
                            </span>
                          )}
                          {item.name}
                        </Button>
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          key={`${item.name}-icon`}
                          href={item.link}
                          variant="secondary">
                          {socialIconMap[item.name]}
                        </IconButton>
                      </React.Fragment>
                    )
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth>
                    <Flex
                      fillWidth
                      horizontal="space-between"
                      vertical="end"
                      marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: JSX.Element, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}>
                            {achievement}
                          </Text>
                        )
                      )}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex
                        fillWidth
                        paddingTop="m"
                        paddingLeft="40"
                        gap="12"
                        wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}>
                            <Media
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40">
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                <Heading as="h3" variant="heading-strong-m">
                  Languages & Frameworks
                </Heading>
                <div className={styles.skillGrid}>
                  {about.technical.languagesAndFrameworks.map(
                    (skill: string, index: number) => (
                      <div className={styles.skillItem} key={skill + index}>
                        {skillIconMap[skill] || <MdImage />}
                        <span>{skill}</span>
                      </div>
                    )
                  )}
                </div>
                <Heading as="h3" variant="heading-strong-m">
                  Databases
                </Heading>
                <div className={styles.skillGrid}>
                  {about.technical.databases.map(
                    (db: string, index: number) => (
                      <div className={styles.skillItem} key={db + index}>
                        {skillIconMap[db] || <MdImage />}
                        <span>{db}</span>
                      </div>
                    )
                  )}
                </div>
                <Heading as="h3" variant="heading-strong-m">
                  Tools & Platforms
                </Heading>
                <div className={styles.skillGrid}>
                  {about.technical.toolsAndPlatforms.map(
                    (tool: string, index: number) => (
                      <div className={styles.skillItem} key={tool + index}>
                        {skillIconMap[tool] || <MdImage />}
                        <span>{tool}</span>
                      </div>
                    )
                  )}
                </div>
                <Heading as="h3" variant="heading-strong-m">
                  Design & Media
                </Heading>
                <div className={styles.skillGrid}>
                  {about.technical.designAndMedia.map(
                    (media: string, index: number) => (
                      <div className={styles.skillItem} key={media + index}>
                        {skillIconMap[media] || <MdImage />}
                        <span>{media}</span>
                      </div>
                    )
                  )}
                </div>
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
