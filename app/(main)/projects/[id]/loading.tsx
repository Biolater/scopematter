// app/projects/[id]/loading.tsx
"use client";

import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

export default function Loading() {
  return (
    <div
      className="flex flex-col gap-6"
      role="status"
      aria-label="Loading project details"
    >
      {/* Overview Header Skeleton */}
      <div className="rounded-3xl border border-default-200 bg-content1 p-8 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          {/* Left side */}
          <div className="space-y-4">
            {/* Chip */}
            <Skeleton className="h-6 w-32 rounded-full" />

            {/* Title + description */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 rounded" />
              <Skeleton className="h-4 w-[28rem] max-w-full rounded" />
              <Skeleton className="h-4 w-[22rem] max-w-full rounded" />
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-40 rounded-full" />
              <Skeleton className="h-6 w-36 rounded-full" />
              <Skeleton className="h-6 w-40 rounded-full" />
            </div>
          </div>

          {/* Edit button */}
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Summary Cards (Client / Status / Progress) */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* ClientCard */}
        <Card className="h-full shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-5 w-44 rounded" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-40 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-56 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40 rounded" />
            </div>
          </CardBody>
        </Card>

        {/* StatusCard (generic skeletons since content can vary) */}
        <Card className="h-full shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-5 w-40 rounded" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-52 rounded" />
              <Skeleton className="h-4 w-40 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-44 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
          </CardBody>
        </Card>

        {/* ProgressCard */}
        <Card className="h-full shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-5 w-44 rounded" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardBody className="space-y-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-40 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                  <Skeleton className="h-4 w-10 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded" />
              </div>
            ))}
          </CardBody>
        </Card>
      </section>

      {/* Tabs header skeleton (Scope / Requests / Change Orders) */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-xl" />
        <Skeleton className="h-8 w-28 rounded-xl" />
        <Skeleton className="h-8 w-40 rounded-xl" />
      </div>

      {/* Scope Items Table Skeleton (default selected tab) */}
      <div className="mt-2">
        {/* Table top content: title + add button */}
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>

        <Table
          aria-label="Loading scope items"
          classNames={{
            table: "min-w-full",
            thead: "rounded-lg",
            wrapper: "shadow-sm border border-default-200 rounded-2xl",
          }}
          isStriped
        >
          <TableHeader>
            <TableColumn className="text-xs font-semibold text-default-600">
              Name
            </TableColumn>
            <TableColumn className="text-xs font-semibold text-default-600">
              Description
            </TableColumn>
            <TableColumn className="text-xs font-semibold text-default-600">
              Status
            </TableColumn>
            <TableColumn className="text-xs font-semibold text-default-600">
              Created
            </TableColumn>
            <TableColumn className="text-xs font-semibold text-default-600">
              Actions
            </TableColumn>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Skeleton className="h-4 w-40 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[28rem] max-w-full rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24 rounded" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-16 rounded-xl" />
                    <Skeleton className="h-8 w-20 rounded-xl" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
