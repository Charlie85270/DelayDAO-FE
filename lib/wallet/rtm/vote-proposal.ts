import {
    Fungibles,
    manifestArray,
    manifestBucket,
    manifestProof,
    NFT,
    StringManifestBuilder
} from "@beaker-tools/typescript-toolkit";

export function voteProposalManifest(account: string, votingCard: NFT, proposalAddress: string, propositionsOrdering: number[], votingFee: Fungibles): string {
    return new StringManifestBuilder()
        .nonFungibleProof(account, votingCard.toNonFungibles(), "voting_card")
        .fungibleBucket(account, votingFee, "voting_fee")
        .callMethod(proposalAddress,
            "vote",
            [
                manifestProof("voting_card"),
                manifestArray("U64", propositionsOrdering.map(prop => `${prop}u64`)),
                manifestBucket("voting_fee")
            ]
        )
        .build()
}