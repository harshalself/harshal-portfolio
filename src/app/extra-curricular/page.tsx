import { Flex, Meta, Schema } from "@once-ui-system/core";
import MasonryGrid from "@/components/extra-curricular/MasonryGrid";
import { baseURL, extraCurricular, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: extraCurricular.title,
    description: extraCurricular.description,
    baseURL: baseURL,
    image: "/images/og/home.jpg",
    path: extraCurricular.path,
  });
}

export default function ExtraCurricular() {
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={extraCurricular.title}
        description={extraCurricular.description}
        path={extraCurricular.path}
        image="/images/og/home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${extraCurricular.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <MasonryGrid />
    </Flex>
  );
}
