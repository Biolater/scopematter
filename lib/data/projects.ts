import { handleQueryOrThrow } from "../http/query";
import { GetProjectsOutput } from "../types/project.types";


export const getProjects = async () => {
    return await handleQueryOrThrow<GetProjectsOutput>("/projects", {
        tags: ["projects"],
        revalidate: 300,
        cache: "force-cache"
    })
}