"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";
import {
  SiFlask,
  SiSupabase,
  SiGoogle,
  SiMongodb,
  SiExpress,
  SiChartdotjs,
} from "react-icons/si";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  technologies?: string[];
}

function TechIconRow({ technologies = [] }: { technologies: string[] }) {
  const iconMap: Record<string, JSX.Element> = {
    Python: <FaPython size={28} title="Python" />,
    Flask: <SiFlask size={28} title="Flask" />,
    React: <FaReact size={28} title="React" />,
    "Node.js": <FaNodeJs size={28} title="Node.js" />,
    "Google Gemini AI": <SiGoogle size={28} title="Google Gemini AI" />,
    Supabase: <SiSupabase size={28} title="Supabase" />,
    MongoDB: <SiMongodb size={28} title="MongoDB" />,
    Express: <SiExpress size={28} title="Express" />,
    HTML: <FaHtml5 size={28} title="HTML" />,
    CSS: <FaCss3Alt size={28} title="CSS" />,
    JavaScript: <FaJs size={28} title="JavaScript" />,
    "Chart.js": <SiChartdotjs size={28} title="Chart.js" />,
  };
  return (
    <Flex gap="12" vertical="center">
      {technologies.map((tech) => iconMap[tech] || null)}
    </Flex>
  );
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  technologies = [],
}) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      {/* Title row */}
      {title && (
        <Flex fillWidth paddingX="s" paddingTop="12" paddingBottom="0">
          <Heading as="h2" wrap="balance" variant="heading-strong-xl">
            {title}
          </Heading>
        </Flex>
      )}
      {/* Icons + View Project row */}
      {(technologies.length > 0 || link) && (
        <Flex
          fillWidth
          paddingX="s"
          paddingTop="8"
          paddingBottom="0"
          gap="l"
          horizontal="space-between"
          vertical="center">
          <TechIconRow technologies={technologies} />
          {link && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: "0", width: "fit-content" }}
              href={link}>
              <Text variant="body-default-s">View project</Text>
            </SmartLink>
          )}
        </Flex>
      )}
      {/* Description row */}
      {description?.trim() && (
        <Flex fillWidth paddingX="s" paddingTop="8" paddingBottom="12">
          <Text
            wrap="balance"
            variant="body-default-s"
            onBackground="neutral-weak">
            {description}
          </Text>
        </Flex>
      )}
    </Column>
  );
};
