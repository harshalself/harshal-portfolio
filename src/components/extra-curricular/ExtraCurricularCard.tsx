import { Column, Heading, Text, Background, Flex } from "@once-ui-system/core";
import { mailchimp } from "@/resources";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { FaStar, FaRegCalendarAlt } from "react-icons/fa";

interface ExtraCurricularCardProps {
  title: string;
  duration: string;
  description: string;
  achievement?: string;
}

export const ExtraCurricularCard = ({
  title,
  duration,
  description,
  achievement,
}: ExtraCurricularCardProps) => {
  return (
    <Column
      overflow="hidden"
      fillWidth
      paddingY="s"
      paddingX="m"
      radius="l"
      marginBottom="xs"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      style={{
        minHeight: 280,
        maxHeight: 280,
        height: 280,
        justifyContent: "center",
        position: "relative",
      }}>
      <Background
        top="0"
        position="absolute"
        mask={mailchimp.effects.mask}
        gradient={{
          ...mailchimp.effects.gradient,
          opacity: mailchimp.effects.gradient.opacity as opacity,
        }}
        dots={{
          ...mailchimp.effects.dots,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
        }}
        grid={{
          ...mailchimp.effects.grid,
          opacity: mailchimp.effects.grid.opacity as opacity,
        }}
        lines={{
          ...mailchimp.effects.lines,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
        }}
      />
      <Flex
        fillWidth
        horizontal="space-between"
        style={{ position: "relative", marginBottom: 4 }}>
        <Flex vertical="center" gap="s" style={{ flex: 1, minWidth: 0 }}>
          <FaStar size={18} color="#FFD700" style={{ flexShrink: 0 }} />
          <Heading
            variant="display-strong-xs"
            style={{
              fontWeight: 700,
              textAlign: "left",
              lineHeight: 1.2,
              minWidth: 0,
              wordBreak: "break-word",
              fontSize: "1.5rem",
            }}>
            {title}
          </Heading>
        </Flex>
        {duration && (
          <Flex
            vertical="center"
            gap="xs"
            style={{ marginLeft: 12, whiteSpace: "nowrap" }}>
            <FaRegCalendarAlt size={14} style={{ marginRight: 0.5 }} />
            <Text
              variant="label-default-s"
              onBackground="neutral-weak"
              style={{ textAlign: "right" }}>
              {duration}
            </Text>
          </Flex>
        )}
      </Flex>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
          textAlign: "left",
          fontSize: "1.15rem",
          lineHeight: 1.5,
        }}
        wrap="balance"
        marginBottom="xs"
        onBackground="neutral-medium"
        variant="body-default-l">
        {description}
      </Text>
      {achievement && (
        <Text
          style={{ position: "relative", textAlign: "left" }}
          wrap="balance"
          marginBottom="xs"
          onBackground="brand-weak">
          {achievement}
        </Text>
      )}
    </Column>
  );
};
