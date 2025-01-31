export type ProposalPhase =
    | "Sponsorship"
    | "Voting"
    | "SponsorshipEnded"
    | "VotingEnded";

export type Proposition = {
    name: string;
    description: string;
}

export type ProposalTypes = {
    name: string;
    description: string;
    currentPhase: ProposalPhase;
    propositions: Proposition[];
    proposalVotingPeriod: number;
}