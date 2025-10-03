import { getShareLink } from "@/lib/data/share-link";
import { notFound } from "next/navigation";
import { Divider } from "@heroui/divider";
import type { ShareLinkDetail } from "@/lib/types/shareLink.types";
import ShareHeader from "@/components/public-share/share-header";
import ShareSummary from "@/components/public-share/share-summary";
import {
  ChangeOrdersSection,
  RequestsSection,
  ScopeSection,
} from "@/components/public-share/sections";

const ShareLinkPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  try {
    const { token } = await params;
    const data = (await getShareLink({ token })) as unknown as ShareLinkDetail;

    const { link, project } = data;
    const perms = link.permissions;

    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <ShareHeader
          name={project.name}
          clientName={project.client?.name}
          clientCompany={project.client?.company ?? null}
          status={project.status}
        />
        <ShareSummary
          description={project.description}
          createdAt={project.createdAt}
          updatedAt={project.updatedAt}
        />

        {/* Sections */}
        <div className="space-y-8">
          {perms.showScopeItems && data.scopeItems && (
            <ScopeSection items={data.scopeItems} />
          )}

          {perms.showRequests && data.requests && (
            <RequestsSection requests={data.requests} />
          )}

          {perms.showChangeOrders && data.changeOrders && (
            <ChangeOrdersSection orders={data.changeOrders} />
          )}
        </div>

        {/* Branding footer */}
        <Divider className="my-10" />
        <p className="text-center text-xs text-default-500">
          Shared via ScopeMatter
        </p>
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) {
      notFound();
    }
    throw e;
  }
};

export default ShareLinkPage;
