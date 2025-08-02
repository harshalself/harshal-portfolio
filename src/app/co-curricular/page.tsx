import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, coCurricular, person, newsletter } from "@/resources";
import { DynamicMasonry } from "@/components/DynamicComponents";
import { getPosts } from "@/utils/utils";
import { RevealFx } from "@once-ui-system/core";

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
  let posts = getPosts(["src", "app", "co-curricular", "posts"]);
  posts = posts.sort((a, b) => {
    const orderA = a.metadata.order ?? 9999;
    const orderB = b.metadata.order ?? 9999;
    return orderA - orderB;
  });
  const items = posts.map((post) => ({
    id: post.metadata.id?.toString() || post.slug,
    img: post.metadata.img || "",
    url: post.metadata.link || "",
    title: post.metadata.title,
    // height removed for dynamic Masonry
  }));
  return (
    <Column maxWidth={1800}>
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
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="start"
          paddingBottom="16">
          <Heading marginBottom="l" variant="display-strong-s">
            Beyond the Syllabus. . .
          </Heading>
        </RevealFx>
      </div>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          width: "100%",
          paddingBottom: "80px",
        }}>
        <DynamicMasonry
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
