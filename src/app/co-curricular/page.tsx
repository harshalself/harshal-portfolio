import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, coCurricular, person, newsletter } from "@/resources";
import Masonry from "@/components/co-curricular/Masonry";
import { getPosts } from "@/utils/utils";

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
  // Dynamically load all MDX posts from the posts folder
  const posts = getPosts(["src", "app", "co-curricular", "posts"]);
  const items = posts.map((post) => ({
    id: post.metadata.id?.toString() || post.slug,
    img: post.metadata.img || "",
    url: post.metadata.link || "",
    title: post.metadata.title,
    // height removed for dynamic Masonry
  }));
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
        Beyond the Syllabus. . .
      </Heading>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          paddingBottom: "80px",
        }}>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>
    </Column>
  );
}
