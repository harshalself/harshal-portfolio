import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Row,
  Schema,
} from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL } from "@/resources";
import { Mailchimp } from "@/components";
import { ProjectCard } from "@/components/ProjectCard";
import { InfiniteMomentumCarousel } from "@/components/InfiniteMomentumCarousel";
import {
  FaUsers,
  FaTheaterMasks,
  FaCamera,
  FaMedal,
  FaStar,
} from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import { SplineModel } from "@/components/SplineModel";
import { getPosts } from "@/utils/utils";

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]).map(
    (project) => ({
      ...project,
      metadata: {
        ...project.metadata,
        technologies: project.metadata.technologies || [],
        link: project.metadata.link || "",
      },
    })
  );

  // Get co-curricular images from img field
  const coCurricularPosts = getPosts(["src", "app", "co-curricular", "posts"]);
  const coCurricularImages = coCurricularPosts
    .map((post) => post.metadata.img)
    .filter(Boolean);

  const carouselHeight = 380;
  const projectCarouselHeight = 440;
  // Gradient palette for extra-curricular cards (for text and shadow)
  const gradients = [
    "linear-gradient(90deg, #ff512f, #dd2476)", // vibrant orange-pink
    "linear-gradient(90deg, #24c6dc, #5433ff)", // teal to blue-violet
    "linear-gradient(90deg, #f7971e, #ffd200)", // gold to yellow
    "linear-gradient(90deg, #43cea2, #185a9d)", // teal to blue
    "linear-gradient(90deg, #fa709a, #fee140)", // pink to yellow
  ];
  const offWhiteTransparent = "rgba(248,249,250,0.7)";

  // Icon selection for extra-curricular cards
  function getExtraIcon(title: string) {
    const t = title.toLowerCase();
    if (
      t.includes("head") ||
      t.includes("secretary") ||
      t.includes("position") ||
      t.includes("responsibility")
    ) {
      return FaStar;
    }
    if (t.includes("photography")) {
      return FaCamera;
    }
    if (
      t.includes("community") ||
      t.includes("volunteer") ||
      t.includes("member") ||
      t.includes("committee")
    ) {
      return FaUsers;
    }
    if (t.includes("achievement") || t.includes("winner")) {
      return FaMedal;
    }
    if (
      t.includes("ramayana") ||
      t.includes("mahabharat") ||
      t.includes("shivrajyabhishek") ||
      t.includes("drama") ||
      t.includes("geet")
    ) {
      return FaTheaterMasks;
    }
    if (t.includes("dance")) {
      return GiMusicalNotes;
    }
    // Default icon
    return FaStar;
  }

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image="/images/og/home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-end",
            width: "100%",
            gap: 32,
            overflow: "hidden",
          }}>
          <div
            style={{
              width: 620,
              minWidth: 0,
              marginRight: 48,
              overflow: "hidden",
            }}>
            <Column maxWidth="s">
              <RevealFx
                translateY="4"
                fillWidth
                horizontal="start"
                paddingBottom="16">
                <Heading wrap="balance" variant="display-strong-l">
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
                  variant="heading-default-xl">
                  {home.subline}
                </Text>
              </RevealFx>
              <RevealFx
                paddingTop="12"
                delay={0.4}
                horizontal="start"
                paddingLeft="12">
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
          </div>
          {/* Spline 3D model: only show on desktop */}
          <SplineModel />
        </div>
      </Column>
      {/* Replace Projects grid with infinite momentum carousel */}
      <InfiniteMomentumCarousel
        cardWidth={440}
        cardSpacing={48}
        height={projectCarouselHeight}>
        {allProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            href={`work/${project.slug}`}
            images={project.metadata.images || []}
            title={project.metadata.title || ""}
            content={project.content}
            avatars={
              project.metadata.team?.map((member) => ({
                src: member.avatar,
              })) || []
            }
            link={project.metadata.link || ""}
            technologies={project.metadata.technologies || []}
          />
        ))}
      </InfiniteMomentumCarousel>
      {/* Extra-curricular Infinite Carousel */}
      <InfiniteMomentumCarousel
        cardWidth={300}
        cardSpacing={28}
        autoScrollSpeed={-2}
        height={carouselHeight}>
        {getPosts(["src", "app", "extra-curricular", "posts"]).map(
          (post, idx) => {
            const Icon = getExtraIcon(post.metadata.title);
            return (
              <div
                key={post.slug}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 16,
                  background: offWhiteTransparent,
                  position: "relative",
                  overflow: "hidden",
                  padding: 16,
                  boxShadow: "0 2px 24px 0 rgba(0,0,0,0.06)",
                  zIndex: 0,
                }}>
                {/* Glowing animated gradient */}
                <span
                  style={{
                    position: "absolute",
                    top: "-40%",
                    left: "-40%",
                    width: "180%",
                    height: "180%",
                    background: gradients[idx % gradients.length],
                    filter: "blur(20px)",
                    opacity: 0.32,
                    zIndex: 1,
                    borderRadius: "50%",
                    animation: `glowmove 4s linear infinite`,
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{ zIndex: 2, position: "relative", marginBottom: 8 }}>
                  <Icon size={40} color="#fff" />
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    textAlign: "center",
                    color: "#fff",
                    letterSpacing: 0.5,
                    lineHeight: 1.2,
                    zIndex: 2,
                    position: "relative",
                  }}>
                  {post.metadata.title}
                </span>
              </div>
            );
          }
        )}
      </InfiniteMomentumCarousel>
      {/* Co-curricular Infinite Carousel */}
      <InfiniteMomentumCarousel
        cardWidth={440}
        cardSpacing={24}
        autoScrollSpeed={2}
        height={carouselHeight}>
        {coCurricularImages.map((src, idx) => (
          <div
            key={src}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              background: "#fff",
            }}>
            <img
              src={src}
              alt={`Co-curricular ${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </InfiniteMomentumCarousel>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}

//
// Add this to your global CSS (e.g., styles/globals.css):
//
// @keyframes glowmove {
//   0% { transform: translate(0, 0) scale(1); }
//   50% { transform: translate(20px, 20px) scale(1.1); }
//   100% { transform: translate(0, 0) scale(1); }
// }
//
// @media (max-width: 900px) {
//   .spline-desktop {
//     display: none !important;
//   }
// }
//
