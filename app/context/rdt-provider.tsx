import React from 'react';
import { RdtContext } from './rdt-context';
import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit';

export const RdtProvider = (
  input: React.PropsWithChildren<{
    value: RadixDappToolkit | null;
  }>
) => (
  <RdtContext.Provider value={input.value}>
    {input.children}
  </RdtContext.Provider>
);
