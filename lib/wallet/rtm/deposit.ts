import {
    Fungibles,
    manifestArray,
    manifestBucket,
    NonFungibles,
    StringManifestBuilder
} from "@beaker-tools/typescript-toolkit";
import {daoAddress} from "@/lib/constants";

export function depositManifest(account: string, fungibles: Fungibles[], nonFungibles: NonFungibles[]): string {
    let buckets: string[] = [];
    let bucketCount = 0;
    let manifest = new StringManifestBuilder();

    fungibles.forEach(fungible => {
        manifest.fungibleBucket(account, fungible, `bucket_${bucketCount}`);
        buckets.push(manifestBucket(`bucket_${bucketCount}`));
        bucketCount += 1;
    });

    nonFungibles.forEach(nonFungible => {
        manifest.nonFungibleBucket(account, nonFungible, `bucket_${bucketCount}`);
        buckets.push(manifestBucket(`bucket_${bucketCount}`));
        bucketCount += 1;
    })

    return manifest.callMethod(daoAddress(), "deposit", [manifestArray("Bucket", buckets)]).build()
}