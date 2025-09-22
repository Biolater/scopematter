"use client";

import { GetProjectsOutput } from "@/lib/types/project.types";
import ProjectCard from "./project-card";
import { motion } from "framer-motion";
import { listContainer, listItemRise } from "@/lib/animations";
const ProjectsContent = ({ projects }: { projects: GetProjectsOutput }) => {
  return (
    <motion.div
      variants={listContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={listItemRise}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectsContent;
