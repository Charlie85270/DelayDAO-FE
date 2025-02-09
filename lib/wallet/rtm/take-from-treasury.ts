import {
    Fungibles,
    manifestDecimal,
    manifestLocalIdArray, manifestMap,
    NonFungibles,
    StringManifestBuilder
} from "@beaker-tools/typescript-toolkit";
import {adminBadgeAddress, daoAddress} from "@/lib/constants";

export function takeFromTreasury(account: string, fungibles: Fungibles[], nonFungibles: NonFungibles[]): string {
    let fungibleMap = new Map<string, string>();
    fungibles.forEach(fungible => {
        fungibleMap.set(fungible.address, manifestDecimal(fungible.amount));
    })

    let nonFungibleMap = new Map<string, string>();
    nonFungibles.forEach(nonFungible => {
        nonFungibleMap.set(nonFungible.address, manifestLocalIdArray(nonFungible.ids));
    })

    return new StringManifestBuilder()
        .proofOfAmount(account, adminBadgeAddress(), 1)
        .callMethod(daoAddress(),
            "take_from_treasury",
            [
                manifestMap("Address", "Decimal", fungibleMap),
                manifestMap("Address", "Array", nonFungibleMap),
            ]
        )
        .depositBatch(account)
        .build()
}