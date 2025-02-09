import {StringManifestBuilder} from "@beaker-tools/typescript-toolkit";
import {adminBadgeAddress, daoAddress} from "@/lib/constants";

export function changeParametersManifest(
    account: string,
    newSponsorshipPeriod: number | undefined,
    newSponsorshipThreshold: number | undefined,
    newVotingPeriod: number | undefined,
    newVotingFee: number | undefined,
    newCreationFee: number | undefined,
    newDappDefinition: string | undefined
    ): string {

    return new StringManifestBuilder()
        .proofOfAmount(account, adminBadgeAddress(), 1)
        .callMethod(
            daoAddress(),
            "change_parameters",
            [
                optionI64(newSponsorshipPeriod),
                optionDecimal(newSponsorshipThreshold),
                optionI64(newVotingPeriod),
                optionDecimal(newVotingFee),
                optionDecimal(newCreationFee),
                newDappDefinition? `Some(GlobalAddress("${newDappDefinition}"))`: "None"
            ])
        .build()
}

function optionI64(opt: number | undefined): string {
    if (opt === undefined) {
        return "None"
    }
    else {
        return `Some(${opt}i64)`
    }
}

function optionDecimal(opt: number | undefined): string {
    if (opt === undefined) {
        return "None"
    }
    else {
        return `Some(Decimal("${opt}"))`
    }
}