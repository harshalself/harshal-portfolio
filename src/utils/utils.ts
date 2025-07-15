import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  technologies?: string[];
  // Extra-curricular fields
  category?: string;
  description?: string;
  duration?: string;
  achievement?: string;
  // Add these for co-curricular
  id?: string | number;
  img?: string;
  order?: number;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    technologies: data.technologies || [],
    // Extra-curricular fields
    category: data.category || "",
    description: data.description || "",
    duration: data.duration || "",
    achievement: data.achievement || "",
    img: data.img || "", // Add this line to support Masonry images
    order:
      typeof data.order === "number"
        ? data.order
        : typeof data.order === "string"
        ? parseInt(data.order, 10)
        : undefined,
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
