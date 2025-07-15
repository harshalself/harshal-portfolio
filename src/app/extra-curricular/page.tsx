import { Flex, Meta, Schema, Grid } from "@once-ui-system/core";
import { ExtraCurricularCard } from "@/components/extra-curricular/ExtraCurricularCard";
import { baseURL, extraCurricular, person } from "@/resources";
import { getPosts } from "@/utils/utils";

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
  const posts = getPosts(["src", "app", "extra-curricular", "posts"]);
  return (
    <Flex maxWidth="l" direction="column">
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
      <Grid columns="2" mobileColumns="1" fillWidth gap="l" marginBottom="40">
        {posts.map((post) => (
          <ExtraCurricularCard
            key={post.slug}
            title={post.metadata.title || ""}
            duration={post.metadata.duration || ""}
            description={post.metadata.description || ""}
            achievement={post.metadata.achievement || ""}
          />
        ))}
      </Grid>
    </Flex>
  );
}
