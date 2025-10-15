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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;

  try {
    const data = await getShareLink({ token });
    const project = data.project;
    const client = project?.client;

    const titleBase = project?.name
      ? `${project.name}${client?.name ? ` for ${client.name}` : ""}`
      : "Shared Project";

    const description =
      project?.description ??
      "View this shared project including scope, requests, and approved change orders.";

    return {
      title: `${titleBase}`,
      description: `${description} — Shared securely via ScopeMatter.`,
      openGraph: {
        title: `${titleBase} | ScopeMatter`,
        description,
        url: `https://scopematter.xyz/share/${token}`,
        siteName: "ScopeMatter",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `${titleBase} | ScopeMatter`,
        description,
      },
      robots: {
        index: false, // prevent indexing of private share links
        follow: false,
        noarchive: true,
        nocache: true,
      },
    };
  } catch {
    // fallback for invalid or expired token
    return {
      title: "Shared Project Not Found",
      description:
        "This shared project link is invalid or has expired. Contact the freelancer for a new link.",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
        nocache: true,
      },
    };
  }
}

const ShareLinkPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  try {
    const { token } = await params;
    const data = await getShareLink({ token });

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
