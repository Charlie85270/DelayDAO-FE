"use client";

import { WalletDataState } from "@radixdlt/radix-dapp-toolkit";

import { useEffect, useState } from "react";

import { rdt } from "./providers";

export const useRadix = () => {
  const [state, setState] = useState<WalletDataState>();

  useEffect(() => {
    const subscription = rdt?.walletApi.walletData$.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (rdt === undefined) {
    throw new Error("useRdt must be used within a RdtProvider");
  }

  return { rdt, state };
};
