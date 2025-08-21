"use client";

import { startTransition, useActionState } from "react";
import type { ActionResult } from "@/lib/http/action";

export function useServerAction<TParams, TResponse>(
  action: (params: TParams) => Promise<ActionResult<TResponse>>,
  opts?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (err: ActionResult<TResponse>) => void;
  }
) {
  const [state, dispatch, isPending] = useActionState<
    ActionResult<TResponse>,
    TParams
  >(
    async (_prev, params: TParams) => {
      const res = await action(params);
      if (res.ok) opts?.onSuccess?.(res.data);
      else opts?.onError?.(res);
      return res;
    },
    // initial error-like state keeps types happy; UI can ignore empty message
    { ok: false, message: "", code: undefined, details: [] }
  );

  // Wrap dispatch in a transition so React is happy
  const runAction = (params: TParams) => {
    startTransition(() => {
      console.log("runAction", params);
      // do NOT await: dispatch is not promise-returning
      dispatch(params);
    });
  };

  return { state, runAction, isPending };
}
