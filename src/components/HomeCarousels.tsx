"use client";

import React, { useState, useEffect, useMemo } from "react";
import { InfiniteMomentumCarousel } from "@/components/InfiniteMomentumCarousel";
import { ProjectCard } from "@/components/ProjectCard";
import { Mailchimp } from "@/components/Mailchimp";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  OptimizedIcon,
  usePreloadCriticalIcons,
} from "@/components/OptimizedIcons";
import { PreloadImages } from "@/components/PreloadImages";
import { LazyImage } from "@/components/LazyImage";

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

  // Preload critical icons for better performance
  usePreloadCriticalIcons();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload critical carousel images
  const criticalImages = coCurricularImages.slice(0, 3);

  // Optimized icon selection for extra-curricular cards
  const getExtraIcon = useMemo(
    () => (title: string) => {
      const t = title.toLowerCase();
      if (
        t.includes("head") ||
        t.includes("secretary") ||
        t.includes("position") ||
        t.includes("responsibility") ||
        t.includes("achievement") ||
        t.includes("winner")
      ) {
        return "FaStar" as const;
      }
      if (t.includes("photography")) {
        return "FaCamera" as const;
      }
      if (
        t.includes("community") ||
        t.includes("volunteer") ||
        t.includes("member") ||
        t.includes("committee")
      ) {
        return "FaUsers" as const;
      }
      if (t.includes("achievement") || t.includes("winner")) {
        return "FaMedal" as const;
      }
      if (
        t.includes("ramayana") ||
        t.includes("mahabharat") ||
        t.includes("shivrajyabhishek") ||
        t.includes("drama") ||
        t.includes("geet")
      ) {
        return "FaTheaterMasks" as const;
      }
      if (t.includes("dance")) {
        return "GiMusicalNotes" as const;
      }
      // Default icon
      return "FaStar" as const;
    },
    []
  );

  return (
    <>
      {/* Preload component for critical images */}
      <PreloadImages images={criticalImages} count={3} />

      <InfiniteMomentumCarousel
        cardWidth={isMobile ? 300 : 440}
        cardSpacing={isMobile ? 16 : 48}
        height={isMobile ? 360 : projectCarouselHeight}>
        {allProjects.map((project: Project, idx: number) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            style={{ height: "100%", width: "100%" }}>
            <ProjectCard
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
          </motion.div>
        ))}
      </InfiniteMomentumCarousel>
      {/* Extra-curricular Infinite Carousel */}
      <InfiniteMomentumCarousel
        cardWidth={isMobile ? 180 : 300}
        cardSpacing={isMobile ? 8 : 28}
        autoScrollSpeed={-2}
        height={isMobile ? 260 : 380}>
        {extraCurricularPosts.map((post: Post, idx: number) => {
          const iconName = getExtraIcon(post.metadata.title);
          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              style={{ height: "100%", width: "100%" }}>
              <div
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
                {/* Optimized icon component */}
                <span
                  style={{ zIndex: 2, position: "relative", marginBottom: 8 }}>
                  <OptimizedIcon name={iconName} size={40} />
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
            </motion.div>
          );
        })}
      </InfiniteMomentumCarousel>
      {/* Co-curricular Infinite Carousel */}
      <InfiniteMomentumCarousel
        cardWidth={isMobile ? 300 : 440}
        cardSpacing={isMobile ? 8 : 24}
        autoScrollSpeed={2}
        height={isMobile ? 260 : 380}>
        {coCurricularImages.map((src, idx) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            style={{ height: "100%", width: "100%" }}>
            <div
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
              <LazyImage
                src={src}
                alt={`Co-curricular ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 300px, (max-width: 1024px) 400px, 440px"
                quality={85}
                loadingPriority={idx < 3 ? "high" : idx < 6 ? "medium" : "low"}
              />
            </div>
          </motion.div>
        ))}
      </InfiniteMomentumCarousel>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </>
  );
}
