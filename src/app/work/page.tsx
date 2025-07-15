import { Column, Meta, Schema, Heading } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { RevealFx } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: "/images/og/home.jpg",
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image="/images/og/home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <div style={{ maxWidth: 950, margin: "0 auto", width: "100%" }}>
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="start"
          paddingBottom="16">
          <Heading marginBottom="l" variant="display-strong-s">
            From Idea to Execution. . .
          </Heading>
        </RevealFx>
      </div>
      <Projects />
    </Column>
  );
}
