import {daoAddress} from "@/lib/constants";
import {
    Fungibles,
    manifestArray,
    manifestBucket,
    NFT,
    NonFungibles,
    StringManifestBuilder
} from "@beaker-tools/typescript-toolkit";

export function lockResourcesManifest({account, votingCard, fungiblesToLock, nonFungiblesToLock}: {
    account: string,
    fungiblesToLock: Fungibles[],
    nonFungiblesToLock: NonFungibles[],
    votingCard: NFT
}): string {
    let ret: StringManifestBuilder;
    ret = new StringManifestBuilder().nonFungibleProof(account, votingCard.toNonFungibles(), "voting_card_proof");
    let buckets: string[] = [];

    fungiblesToLock.forEach((fungible, count) => {
        ret = ret.fungibleBucket(account, fungible, `fungible_${count}`);
        buckets.push(manifestBucket(`fungible_${count}`));
    });
    nonFungiblesToLock.forEach((nonFungible, count) => {
        ret = ret.nonFungibleBucket(account, nonFungible, `non_fungible_${count}`)
        buckets.push(manifestBucket(`non_fungible_${count}`));
    });

    return ret
        .callMethod(daoAddress(), "lock_resources", [manifestArray("Bucket", buckets)])
        .build();
}