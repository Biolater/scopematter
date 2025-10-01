"use client";

import { startTransition, useActionState } from "react";
import type { ActionResult } from "@/lib/http/action";

export function useServerAction<TParams, TResponse>(
  action: (params: TParams) => Promise<ActionResult<TResponse>>,
  opts?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (err: Extract<ActionResult<TResponse>, { ok: false }>) => void;
    onSettled?: () => void;
  }
) {
  const [state, dispatch, isPending] = useActionState<
    ActionResult<TResponse>,
    TParams
  >(
    async (_prev, params: TParams) => {
      try {
        const res = await action(params);

        if (res.ok) {
          opts?.onSuccess?.(res.data);
        } else {
          opts?.onError?.(res);
        }

        return res;
      } finally {
        // ✅ always run this after success or error
        opts?.onSettled?.();
      }
    },
    // initial state: "fake error" to satisfy type
    { ok: false, message: "", code: undefined, details: [] }
  );

  const runAction = (params: TParams) => {
    startTransition(() => {
      dispatch(params);
    });
  };

  return { state, runAction, isPending };
}
