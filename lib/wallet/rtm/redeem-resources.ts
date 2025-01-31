import {daoAddress} from "@/lib/constants";
import {manifestProof, NFT, StringManifestBuilder} from "@beaker-tools/typescript-toolkit";

export function redeemResourcesManifest(account: string, votingCard: NFT): string {
    return new StringManifestBuilder()
        .nonFungibleProof(account, votingCard.toNonFungibles(), "voting_card")
        .callMethod(daoAddress(), "redeem_resources", [manifestProof("voting_card")])
        .depositBatch(account)
        .build();
}