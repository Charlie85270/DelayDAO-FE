import {daoAddress} from "@/lib/constants";
import { StringManifestBuilder } from "@beaker-tools/typescript-toolkit";

export function getVotingCardManifest(account: string): string {
    return new StringManifestBuilder()
        .callMethod(daoAddress(), "get_voting_card", [])
        .depositBatch(account)
        .build();
}