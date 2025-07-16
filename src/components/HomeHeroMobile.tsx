"use client";
import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Flex,
} from "@once-ui-system/core";
import { home, about, person } from "@/resources";

export default function HomeHeroMobile() {
  return (
    <Column fillWidth gap="m" style={{ marginBottom: 24 }}>
      <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
        <Heading
          wrap="balance"
          variant="display-strong-l"
          className="hero-title-responsive">
          {home.headline}
        </Heading>
      </RevealFx>
      <RevealFx
        translateY="8"
        delay={0.2}
        fillWidth
        horizontal="start"
        paddingBottom="32">
        <Text
          wrap="balance"
          onBackground="neutral-weak"
          variant="heading-default-xl"
          className="hero-subline-responsive">
          {home.subline}
        </Text>
      </RevealFx>
      <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
        <Button
          id="about"
          data-border="rounded"
          href={about.path}
          variant="secondary"
          size="m"
          weight="default"
          arrowIcon>
          <Flex gap="8" vertical="center" paddingRight="4">
            {about.avatar.display && (
              <Avatar
                marginRight="8"
                style={{ marginLeft: "-0.75rem" }}
                src={person.avatar}
                size="m"
              />
            )}
            {about.title}
          </Flex>
        </Button>
      </RevealFx>
    </Column>
  );
}
