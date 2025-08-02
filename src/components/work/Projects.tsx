import { getPosts } from "@/utils/utils";
import { Column, Grid } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { DynamicScrollRevealCard } from "@/components/DynamicComponents";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    const orderA = a.metadata.order ?? 9999;
    const orderB = b.metadata.order ?? 9999;
    return orderA - orderB;
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Grid
      columns="2"
      mobileColumns="1"
      fillWidth
      gap="xl"
      marginBottom="40"
      paddingX="l">
      {displayedProjects.map((post, index) => (
        <DynamicScrollRevealCard key={post.slug} duration={0.4}>
          <ProjectCard
            priority={index < 2}
            href={`work/${post.slug}`}
            images={post.metadata.images || []}
            title={post.metadata.title || ""}
            description={post.metadata.summary || ""}
            content={post.content}
            avatars={
              post.metadata.team?.map((member) => ({ src: member.avatar })) ||
              []
            }
            link={post.metadata.link || ""}
            technologies={post.metadata.technologies || []}
          />
        </DynamicScrollRevealCard>
      ))}
    </Grid>
  );
}
