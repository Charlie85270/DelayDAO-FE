
const PREFIX: string = '[DELAY-DAO]:';

function messageWithPrefix(message: string): string {
    return `${PREFIX}: ${message}`;
}

export function createProposalMessage(name: string): string {
    return messageWithPrefix(`Creating your proposal: "${name}"`);
}

export function getVotingCardMessage(): string {
    return messageWithPrefix("Minting your voting card")
}


export function lockResourcesMessage(): string {
    return messageWithPrefix("Locking your resources to your voting card");
}

export function redeemResourcesMessage(): string {
    return messageWithPrefix("Redeeming your resources from your voting card");
}

export function sponsorProposalMessage(votingPower: number): string {
    return messageWithPrefix(`Sponsoring proposal with ${votingPower} voting power`);
}

export function unlockResourcesMessage(): string{
    return messageWithPrefix("Starting the unlocking process");
}

export function voteProposalMessage(votingPower: number): string {
    return messageWithPrefix(`Casting vote for proposal with ${votingPower} voting power`)
}