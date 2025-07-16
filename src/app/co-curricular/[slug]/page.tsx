import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
} from "@once-ui-system/core";
import { baseURL, about, coCurricular, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const coCurricularPosts = getPosts(["src", "app", "co-curricular", "posts"]);
  return coCurricularPosts.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const coCurricularPosts = getPosts(["src", "app", "co-curricular", "posts"]);
  let item = coCurricularPosts.find((item) => item.slug === slugPath);

  if (!item) return {};

  return Meta.generate({
    title: item.metadata.title ?? "",
    description: item.metadata.summary ?? "",
    baseURL: baseURL,
    image:
      item.metadata.image || `/api/og/generate?title=${item.metadata.title}`,
    path: `${coCurricular.path}/${item.slug}`,
  });
}

export default async function CoCurricularPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let item = getPosts(["src", "app", "co-curricular", "posts"]).find(
    (item) => item.slug === slugPath
  );

  if (!item) {
    notFound();
  }

  const avatars =
    item.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row maxWidth={12} hide="m" />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="xs" gap="l">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${coCurricular.path}/${item.slug}`}
            title={item.metadata.title ?? ""}
            description={item.metadata.summary ?? ""}
            datePublished={item.metadata.publishedAt ?? ""}
            dateModified={item.metadata.publishedAt ?? ""}
            image={
              item.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(
                item.metadata.title ?? ""
              )}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          <Button
            data-border="rounded"
            href="/co-curricular"
            weight="default"
            variant="tertiary"
            size="s"
            prefixIcon="chevronLeft">
            Co-curricular
          </Button>
          <Heading variant="display-strong-s">{item.metadata.title}</Heading>
          <Row gap="12" vertical="center">
            {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {item.metadata.publishedAt ?? ""}
            </Text>
          </Row>
          <Column as="article" fillWidth>
            <CustomMDX source={item.content} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        hide="m">
        <Row
          gap="12"
          paddingLeft="2"
          vertical="center"
          onBackground="neutral-medium"
          textVariant="label-default-s">
          <Icon name="document" size="xs" />
          On this co-curricular
        </Row>
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
