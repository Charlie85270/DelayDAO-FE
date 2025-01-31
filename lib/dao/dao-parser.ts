import {ProgrammaticScryptoSborValue, StateEntityDetailsResponse} from "@radixdlt/babylon-gateway-api-sdk";
import {ProposalPhase, Proposition} from "@/lib/dao/proposal-types";

// Fields count for DAO
export const VOTING_WEIGHT_FIELD = 3;
export const LOCKED_RESOURCES_FIELD = 4;
export const TOTAL_VOTING_POWER_FIELD = 5;
export const LOCKING_PERIOD_FIELD = 6;
export const UNLOCKING_PERIOD_FIELD = 7;
export const PROPOSALS_COUNT_FIELD = 8;
export const SPONSORSHIP_PERIOD_FIELD = 9;
export const SPONSORSHIP_THRESHOLD_FIELD = 10;
export const VOTING_PERIOD_FIELD = 11;
export const PROPOSALS_KVS_FIELD = 12;
export const VOTING_FEE_FIELD = 13;
export const PROPOSAL_CREATION_FEE_FIELD = 14;
export const FEE_RESOURCE_FIELD = 15;
export const TREASURY_KVS_FIELD = 16;


// Fields count for DAO Proposal
export const PROPOSAL_ID_FIELD = 0;
export const NAME_FIELD = 1;
export const DESCRIPTION_FIELD = 2;
export const PROPOSITIONS_FIELD = 3;
export const PROPOSAL_PHASE_FIELD = 4;
export const END_OF_PHASE_FIELD = 5;
export const SPONSORSHIP_REQUIRED_FIELD = 6;
export const SPONSORS_KVS_FIELD = 7;
export const TOTAL_SPONSORED_FIELD = 8;
export const PROP_VOTING_PERIOD_FIELD = 9;
export const VOTERS_KVS_FIELD = 10;
export const VOTES_FIELD = 11;
export const PROP_VOTING_FEE_FIELD = 13;
export const PROP_FEE_RESOURCE_FIELD = 14;


export function getFields(response: StateEntityDetailsResponse): ProgrammaticScryptoSborValue[] {
    let details = response.items[0].details!;
    let fields: ProgrammaticScryptoSborValue[] = [];
    if(details.type == "Component" && details.state) {
        let state = details.state as ProgrammaticScryptoSborValue;

        if(state.kind == "Tuple") {
            fields = state.fields;
        }
    }

    return fields;
}

export function parseVotingWeights(value: ProgrammaticScryptoSborValue): Map<string, number> {
    let ret = new Map<string, number>();
    if(value.kind == "Map") {
        value.entries.forEach(entry => {
            ret.set(parseAddress(entry.key), parseNumber(entry.value));
        })
    }

    return ret;
}

export function parseKVS(value: ProgrammaticScryptoSborValue): string {
    if(value.kind == "Own") {
        return value.value
    }else {
        return ""
    }
}

export function parseNumber(value: ProgrammaticScryptoSborValue): number {
    if(value.kind == "I64" || value.kind == "U64" || value.kind == "Decimal") {
        return parseFloat(value.value)
    }
    else {
        return 0;
    }
}


export function parseAddress(value: ProgrammaticScryptoSborValue): string {
    if(value.kind == "Reference" && (value.type_name == "ResourceAddress" || value.type_name == "ComponentAddress")) {
        return value.value
    }
    else{
        return "";
    }
}

export function parseLocalId(value: ProgrammaticScryptoSborValue): string {
    if(value.kind == "NonFungibleLocalId") {
        return value.value;
    }
    else {
        return "";
    }
}

export function parseVault(value: ProgrammaticScryptoSborValue): string {
    if(value.kind == "Own" && (value.type_name == "FungibleVault" || value.type_name == "NonFungibleVault" || value.type_name == "Vault")) {
        return value.value
    }
    else {
        return "";
    }
}

export function parseString(value: ProgrammaticScryptoSborValue): string{
    if(value.kind == "String") {
        return value.value;
    }
    else {
        return "";
    }
}

export function parseArray<T>(
    value: ProgrammaticScryptoSborValue,
    innerParser: (inner: ProgrammaticScryptoSborValue) => T
): T[] {
    if(value.kind == "Array") {
        return value.elements.map(element => innerParser(element))
    }
    else{
        return []
    }
}

export function parseProposition(value: ProgrammaticScryptoSborValue): Proposition {
    if(value.kind == "Tuple") {
        return {
            name: parseString(value.fields[0]),
            description: parseString(value.fields[1])
        }
    }
    else {
        return {
            name: "",
            description: ""
        }
    }
}

export function parseProposalPhase(value: ProgrammaticScryptoSborValue) : ProposalPhase {
    if(value.kind == "Enum") {
        return value.variant_name as ProposalPhase;
    }
    else {
        return "SponsorshipEnded";
    }
}