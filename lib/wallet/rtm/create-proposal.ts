import {Proposition} from "@/lib/dao/proposal-types";
import {daoAddress} from "@/lib/constants";
import {
    Fungibles,
    manifestArray,
    manifestBucket,
    manifestTuple,
    NFT,
    StringManifestBuilder
} from "@beaker-tools/typescript-toolkit";


export function createProposalManifest(account: string, votingCard: NFT, proposalName: string, proposalDescription: string, propositions: Proposition[], creationFee: Fungibles): string {
    return new StringManifestBuilder()
        .nonFungibleProof(account, votingCard.toNonFungibles())
        .fungibleBucket(account, creationFee, "creation_fee")
        .callMethod(daoAddress(), "create_proposal", [proposalName, proposalDescription, manifestArray("Tuple", propositions.map(prop => {
            return manifestTuple([prop.name, prop.description])
        })), manifestBucket("creation_fee")]).depositBatch(account).build();
}