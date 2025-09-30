"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Link2, Eye, Calendar, Trash2, Shield } from "lucide-react";
import type { ShareLink } from "@/lib/types/shareLink.types";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { revokeShareLinkAction } from "@/lib/actions/shareLink.actions";
import { addToast } from "@heroui/toast";
import { shareLinkQueries } from "@/lib/data/queries/share-link.queries";

type ShareLinkItemProps = {
  link: ShareLink;
};

export function ShareLinkItem({ link }: ShareLinkItemProps) {
  const { useInvalidate } = shareLinkQueries;
  const invalidate = useInvalidate();
  const { runAction, isPending } = useServerAction(revokeShareLinkAction, {
    onSuccess: () => {
      addToast({
        title: "Share link revoked",
        color: "success",
      });
      invalidate.params({ projectId: link.projectId });
    },
    onError: (e) => {
      addToast({
        title: e.message ?? "Failed to revoke share link",
        color: "danger",
      });
    },
  });
  return (
    <li className="py-3 flex items-center justify-between gap-4">
      {/* Left: Status + Metadata */}
      <div className="flex items-center gap-3">
        <Link2
          className={`size-5 ${link.isActive ? "text-success" : "text-danger"}`}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {link.isActive ? "Active" : "Revoked"}
          </span>
          <span className="text-xs text-default-500 flex items-center gap-2">
            <Eye className="size-3" /> {link.viewCount} views
            <Calendar className="size-3" />{" "}
            {new Date(link.createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs text-default-400 flex items-center gap-2">
            <Shield className="size-3" /> Permissions:{" "}
            {[
              link.permissions.showScopeItems && "Scope",
              link.permissions.showRequests && "Requests",
              link.permissions.showChangeOrders && "Changes",
            ]
              .filter(Boolean)
              .join(", ") || "None"}
          </span>
        </div>
      </div>

      {/* Right: Expiry + Actions */}
      <div className="flex items-center gap-3">
        {link.expiresAt && !link.revokedAt && (
          <span className="text-xs text-warning">
            Expires {new Date(link.expiresAt).toLocaleDateString()}
          </span>
        )}

        {link.isActive && (
          <Tooltip content="Revoke link">
            <Button
              isIconOnly
              variant="light"
              color="danger"
              size="sm"
              onPress={() =>
                runAction({ projectId: link.projectId, id: link.id })
              }
              isLoading={isPending}
              isDisabled={isPending}
            >
              <Trash2 className="size-4" />
            </Button>
          </Tooltip>
        )}
      </div>
    </li>
  );
}
