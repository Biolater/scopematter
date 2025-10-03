import { handleQueryOrThrow } from "../http/query";
import { GetDashboardOutput } from "../types/dashboard.types";


export const getDashboardData = async () => {
    return await handleQueryOrThrow<GetDashboardOutput>("/dashboard", {
        tags: ["dashboard"],
        revalidate: 300,
        cache: "force-cache"
    })
}