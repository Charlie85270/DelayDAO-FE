import {NonFungibleItem} from "@beaker-tools/typescript-toolkit";

export type VotingCard = {
    name: string;
    imageUrl: string;
    id: string;
    lockedFungibleResources: Map<string, number>;
    lockedNonFungibleResources: Map<string, NonFungibleItem[]>;
    votingPower: number;
    beingLocked?: { endOfLockedPeriod: number, voting_power: number};
    endOfUnlockedPeriod?: number;
}

function lockedFungibleResourceFrom(string: string): Map<string, number> {
    const regex = /([a-zA-Z0-9_]+) => (\d+)/g;
    const lockedMap = new Map<string, number>();

    let match;
    while ((match = regex.exec(string)) !== null) {
        lockedMap.set(match[1], parseInt(match[2], 10));
    }
    return lockedMap;
}



function lockedNonFungibleResourceFrom(string: string): Map<string, NonFungibleItem[]> {
    return new Map<string, NonFungibleItem[]>();
}

function beingLocked(string?: string): { endOfLockedPeriod: number, voting_power: number} | undefined {
    if(string && string !== "None") {
        return undefined;
    }
    else {
        return undefined;
    }
}

function optNumber(string?: string): number|undefined {
    return string && string !== "None" ? parseInt(string, 10) : undefined;
}


export function votingCardFrom(item: NonFungibleItem): VotingCard {
    return {
        name: item.name!,
        imageUrl: item.imageUrl!,
        id: item.id,
        lockedFungibleResources: lockedFungibleResourceFrom(item.nonFungibleData!.get("locked_fungible_resources")!),
        lockedNonFungibleResources: lockedNonFungibleResourceFrom(item.nonFungibleData!.get("locked_non_fungible_resources")!),
        votingPower: parseFloat(item.nonFungibleData!.get("voting_power")!),
        beingLocked: beingLocked(item.nonFungibleData!.get("being_locked")!),
        endOfUnlockedPeriod: optNumber(item.nonFungibleData!.get("end_of_unlocked_period")),
    }
}