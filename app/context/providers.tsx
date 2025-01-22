"use client";

import { useEffect } from "react";
import {
  DataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Create the RDT instance only in browser environment
export const rdt = isBrowser
  ? RadixDappToolkit({
      dAppDefinitionAddress:
        process.env.NEXT_PUBLIC_DAPP_DEFINITION_ADDRESS ||
        "account_rdx128ytn835ayu0k3d0vs22qcelgh9lpds7jvnjgw2a729uth2lw7r86g",
      networkId: RadixNetwork.Mainnet,
      applicationName: "Radix Web3 dApp",
      applicationVersion: "1.0.0",
    })
  : null;

// Create a RadixProvider component
export function RadixProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Radix configuration after component mounts
    rdt?.buttonApi.setTheme("black");
    rdt?.walletApi.setRequestData(
      DataRequestBuilder.persona(),
      DataRequestBuilder.accounts().exactly(1)
    );
  }, []);

  return <>{children}</>;
}
