import {manifestProof, NFT, StringManifestBuilder} from "@beaker-tools/typescript-toolkit";

export function sponsorProposalManifest(account: string, votingCard: NFT, proposalAddress: string): string {
    return new StringManifestBuilder()
        .nonFungibleProof(account, votingCard.toNonFungibles(), "voting_card")
        .callMethod(proposalAddress, "sponsor", [manifestProof("voting_card")])
        .build()
}