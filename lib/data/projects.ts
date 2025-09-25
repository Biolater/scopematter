import { handleQueryOrThrow } from "../http/query";
import { GetProjectsOutput, ProjectDetail, getProjectParams } from "../types/project.types";


export const getProjects = async () => {
    return await handleQueryOrThrow<GetProjectsOutput>("/projects", {
        tags: ["projects"],
        revalidate: 300,
        cache: "force-cache"
    })
}

export const getProject = async (params: getProjectParams) => {
    return await handleQueryOrThrow<ProjectDetail>(`/projects/${params.id}`, {
        tags: ["projects", `project-${params.id}`],
        revalidate: 300,
        cache: "force-cache"
    })
}

