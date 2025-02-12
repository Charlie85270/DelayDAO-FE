import {daoAddress} from "@/lib/constants";
import {manifestProof, NFT, StringManifestBuilder} from "@beaker-tools/typescript-toolkit";

export function unlockResourcesManifest(account: string, votingCard: NFT): string {
    return new StringManifestBuilder()
        .nonFungibleProof(account, votingCard.toNonFungibles(), "voting_card")
        .callMethod(daoAddress(), "unlock_resources", [manifestProof("voting_card")])
        .build()
}