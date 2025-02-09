import {StringManifestBuilder} from "@beaker-tools/typescript-toolkit";
import {adminBadgeAddress} from "@/lib/constants";

export function collectFeesManifest(account: string, proposalAddress: string): string {
    return new StringManifestBuilder()
        .proofOfAmount(account, adminBadgeAddress(), 1)
        .callMethod(proposalAddress, "collect_fees", [])
        .build()
}