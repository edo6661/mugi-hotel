"use client";
import { useState } from "react";
import { useMutation } from "convex/react";

export default function useApiMutation(mutationFn: any) {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFn);

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
}
