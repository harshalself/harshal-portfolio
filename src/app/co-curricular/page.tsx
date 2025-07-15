import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/co-curricular/Posts";
import { baseURL, coCurricular, person, newsletter } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: coCurricular.title,
    description: coCurricular.description,
    baseURL: baseURL,
    image: "/images/og/home.jpg",
    path: coCurricular.path,
  });
}

export default function CoCurricular() {
  return (
    <Column maxWidth="s">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={coCurricular.title}
        description={coCurricular.description}
        path={coCurricular.path}
        image="/images/og/home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}/co-curricular`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {coCurricular.title}
      </Heading>
      <Column fillWidth flex={1}>
        <Posts range={[1, 1]} thumbnail direction="column" />
        <Posts range={[2, 3]} thumbnail />
        <Posts range={[4]} columns="2" />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
