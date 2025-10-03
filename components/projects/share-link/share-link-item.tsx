"use client";

import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Chip } from "@heroui/chip";
import {
  Link2,
  Eye,
  Calendar,
  Trash2,
  Clock,
  GitPullRequest,
  ClipboardList,
  FolderKanban,
} from "lucide-react";
import type { ShareLink } from "@/lib/types/shareLink.types";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { revokeShareLinkAction } from "@/lib/actions/shareLink.actions";
import { addToast } from "@heroui/toast";
import { shareLinkQueries } from "@/lib/data/queries/share-link.queries";
import { formatDistanceToNow } from "date-fns";

type ShareLinkItemProps = {
  link: ShareLink;
};

export function ShareLinkItem({ link }: ShareLinkItemProps) {
  const { useInvalidate } = shareLinkQueries;
  const invalidate = useInvalidate();
  const { runAction, isPending } = useServerAction(revokeShareLinkAction, {
    onSuccess: () => {
      addToast({ title: "Share link revoked", color: "success" });
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
    <Card shadow="sm" className="rounded-xl border border-divider">
      <CardBody className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
        {/* Left: Metadata */}
        <div className="flex items-start gap-3">
          <Link2
            className={`mt-1 size-5 ${
              link.isActive ? "text-success" : "text-danger"
            }`}
          />
          <div className="flex flex-col gap-2">
            {/* Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-default-600">Status:</span>
              <Chip
                size="sm"
                color={link.isActive ? "success" : "danger"}
                variant="flat"
                radius="full"
                className="w-fit"
              >
                {link.isActive ? "Active" : "Revoked"}
              </Chip>
            </div>

            {/* Views + Created */}
            <div className="flex items-center gap-2 text-xs text-default-500">
              <div className="items-center gap-1 flex">
                <span className="font-medium text-default-600">Views:</span>
                <Eye className="size-3" /> {link.viewCount}
              </div>
              <div className="items-center gap-1 flex">
                <span className="font-medium text-default-600">Created:</span>
                <Calendar className="size-3" />{" "}
                {formatDistanceToNow(new Date(link.createdAt))} ago
              </div>
            </div>

            {/* Last viewed */}
            {link.lastViewedAt && (
              <div className="flex items-center gap-2 text-xs text-default-400">
                <span className="font-medium text-default-600">
                  Last viewed:
                </span>
                <Clock className="size-3" />
                {formatDistanceToNow(new Date(link.lastViewedAt))} ago
              </div>
            )}

            {/* Permissions */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-default-600">
                Permissions:
              </span>
              <div className="flex flex-wrap gap-1">
                {link.permissions.showScopeItems && (
                  <Chip
                    startContent={<FolderKanban className="size-3" />}
                    size="sm"
                    variant="flat"
                  >
                    Scope
                  </Chip>
                )}
                {link.permissions.showRequests && (
                  <Chip
                    startContent={<ClipboardList className="size-3" />}
                    size="sm"
                    variant="flat"
                  >
                    Requests
                  </Chip>
                )}
                {link.permissions.showChangeOrders && (
                  <Chip
                    startContent={<GitPullRequest className="size-3" />}
                    size="sm"
                    variant="flat"
                  >
                    Changes
                  </Chip>
                )}
                {!link.permissions.showScopeItems &&
                  !link.permissions.showRequests &&
                  !link.permissions.showChangeOrders && (
                    <Chip size="sm" variant="bordered" color="default">
                      None
                    </Chip>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Expiry + Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {link.expiresAt && !link.revokedAt && (
            <span className="text-xs text-warning">
              Expires {formatDistanceToNow(new Date(link.expiresAt))} left
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
                aria-label="Revoke link"
              >
                <Trash2 className="size-4" />
              </Button>
            </Tooltip>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
