
const PREFIX: string = '[DELAY-DAO]:';

function messageWithPrefix(message: string): string {
    return `${PREFIX}: ${message}`;
}

export function changeParametersMessage(): string {
    return messageWithPrefix("Updating DAO with new parameters");
}

export function collectFeesMessage(): string {
    return messageWithPrefix("Collecting fees from proposal");
}

export function createProposalMessage(name: string): string {
    return messageWithPrefix(`Creating your proposal: "${name}"`);
}

export function depositMessage(): string {
    return messageWithPrefix("Depositing resources into DAO");
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

export function takeFromTreasuryMessage(): string {
    return messageWithPrefix("Taking resources from DAO treasury");
}

export function unlockResourcesMessage(): string{
    return messageWithPrefix("Starting the unlocking process");
}

export function voteProposalMessage(votingPower: number): string {
    return messageWithPrefix(`Casting vote for proposal with ${votingPower} voting power`)
}