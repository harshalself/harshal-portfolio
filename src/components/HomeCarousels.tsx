"use client";

import React, { useState, useEffect } from "react";
import { InfiniteMomentumCarousel } from "@/components/InfiniteMomentumCarousel";
import { ProjectCard } from "@/components/ProjectCard";
import { Mailchimp } from "@/components/Mailchimp";
import Image from "next/image";

interface Project {
  slug: string;
  metadata: any;
  content: string;
}
interface Post {
  slug: string;
  metadata: any;
}
interface HomeCarouselsProps {
  allProjects: Project[];
  coCurricularImages: string[];
  newsletter: any;
  gradients: string[];
  offWhiteTransparent: string;
  carouselHeight: number;
  projectCarouselHeight: number;
  extraCurricularPosts: Post[];
}

export default function HomeCarousels({
  allProjects,
  coCurricularImages,
  newsletter,
  gradients,
  offWhiteTransparent,
  carouselHeight,
  projectCarouselHeight,
  extraCurricularPosts,
}: HomeCarouselsProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Icon selection for extra-curricular cards
  function getExtraIcon(title: string) {
    const t = title.toLowerCase();
    if (
      t.includes("head") ||
      t.includes("secretary") ||
      t.includes("position") ||
      t.includes("responsibility")
    ) {
      return require("react-icons/fa").FaStar;
    }
    if (t.includes("photography")) {
      return require("react-icons/fa").FaCamera;
    }
    if (
      t.includes("community") ||
      t.includes("volunteer") ||
      t.includes("member") ||
      t.includes("committee")
    ) {
      return require("react-icons/fa").FaUsers;
    }
    if (t.includes("achievement") || t.includes("winner")) {
      return require("react-icons/fa").FaMedal;
    }
    if (
      t.includes("ramayana") ||
      t.includes("mahabharat") ||
      t.includes("shivrajyabhishek") ||
      t.includes("drama") ||
      t.includes("geet")
    ) {
      return require("react-icons/fa").FaTheaterMasks;
    }
    if (t.includes("dance")) {
      return require("react-icons/gi").GiMusicalNotes;
    }
    // Default icon
    return require("react-icons/fa").FaStar;
  }

  return (
    <>
      <InfiniteMomentumCarousel
        cardWidth={isMobile ? 300 : 440}
        cardSpacing={isMobile ? 16 : 48}
        height={isMobile ? 360 : projectCarouselHeight}>
        {allProjects.map((project: Project) => (
          <ProjectCard
            key={project.slug}
            href={`work/${project.slug}`}
            images={project.metadata.images || []}
            title={project.metadata.title || ""}
            content={project.content}
            avatars={
              project.metadata.team?.map((member: { avatar: string }) => ({
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
        cardWidth={isMobile ? 180 : 300}
        cardSpacing={isMobile ? 8 : 28}
        autoScrollSpeed={-2}
        height={260}>
        {extraCurricularPosts.map((post: Post, idx: number) => {
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
        })}
      </InfiniteMomentumCarousel>
      {/* Co-curricular Infinite Carousel */}
      <InfiniteMomentumCarousel
        cardWidth={isMobile ? 300 : 440}
        cardSpacing={isMobile ? 8 : 24}
        autoScrollSpeed={2}
        height={260}>
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
              position: "relative",
            }}>
            <Image
              src={src}
              alt={`Co-curricular ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 600px) 100vw, 440px"
            />
          </div>
        ))}
      </InfiniteMomentumCarousel>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </>
  );
}
