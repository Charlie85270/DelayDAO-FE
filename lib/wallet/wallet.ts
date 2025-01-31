
import {RadixDappToolkit} from "@radixdlt/radix-dapp-toolkit";
import {votingCardAddress} from "@/lib/constants";
import {VotingCard, votingCardFrom} from "@/lib/wallet/voting-card";
import {getVotingCardManifest} from "@/lib/wallet/rtm/get-voting-card";
import {
    createProposalMessage,
    getVotingCardMessage,
    lockResourcesMessage,
    redeemResourcesMessage, sponsorProposalMessage, unlockResourcesMessage, voteProposalMessage
} from "@/lib/wallet/wallet-messages";
import {createProposalManifest} from "@/lib/wallet/rtm/create-proposal";
import {Proposition} from "@/lib/dao/proposal-types";
import {lockResourcesManifest} from "@/lib/wallet/rtm/lock-resources";
import {redeemResourcesManifest} from "@/lib/wallet/rtm/redeem-resources";
import {sponsorProposalManifest} from "@/lib/wallet/rtm/sponsor-proposal";
import {unlockResourcesManifest} from "@/lib/wallet/rtm/unlock-resources";
import {voteProposalManifest} from "@/lib/wallet/rtm/vote-proposal";
import {
    defaultOnSuccess,
    Fungibles,
    GatewayProcessor, NFT, NonFungibles,
    WalletInterface,
    WalletResult
} from "@beaker-tools/typescript-toolkit";


export class Wallet {
    private readonly _wallet: WalletInterface;
    private _votingCard: VotingCard | undefined;

    constructor(    processor: GatewayProcessor,
                    toolkit: RadixDappToolkit,
                    ) {
        this._wallet = new WalletInterface(processor, toolkit, undefined, [votingCardAddress()], this.parseVotingCard,false);
    }

    votingCard(): VotingCard | undefined {
        return this._votingCard;
    }

    wallet(): WalletInterface {
        return this._wallet
    }

    async createProposal(proposalName: string, proposalDescription: string, propositions: Proposition[], creationFee: Fungibles): Promise<WalletResult> {
        return await this.withCheckedAccount(
            this.withVotingCard(
                this._wallet.sendTransaction(
                    createProposalManifest(this._wallet.account()!, this.votingCardNFT(), proposalName, proposalDescription, propositions, creationFee),
                    createProposalMessage(proposalName),
                    defaultOnSuccess("Successfully created your proposal!")
                )
            )
        )
    }

    async getVotingCard(): Promise<WalletResult> {
        return await this.withCheckedAccount(
            this._wallet.sendTransaction(
                getVotingCardManifest(this._wallet.account()!),
                getVotingCardMessage(),
                async (_) => {
                    await this.updateVotingCard();
                    return {
                        outcome: "SUCCESS",
                        message: "Successfully minted your voting card!"
                    }
                }
            )
        );
    }

    async lockResources(fungibles: Fungibles[], nonFungibles: NonFungibles[]): Promise<WalletResult> {
        return await this.withCheckedAccount(
            this.withVotingCard(
                this._wallet.sendTransaction(
                    lockResourcesManifest({
                        account: this._wallet.account()!,
                        votingCard: this.votingCardNFT(),
                        fungiblesToLock: fungibles,
                        nonFungiblesToLock: nonFungibles
                    }),
                    lockResourcesMessage(),
                    async (_) => {
                        await this._wallet.updateTokens();
                        return {
                            outcome: "SUCCESS",
                            message: "Successfully minted your voting card!"
                        }
                    }
                )
            )
        )
    }

    async redeemResources(): Promise<WalletResult>  {
        return await this.withCheckedAccount(
            this.withVotingCard(
                this._wallet.sendTransaction(
                    redeemResourcesManifest(this._wallet.account()!, this.votingCardNFT()),
                    redeemResourcesMessage(),
                    async (_) => {
                        await this._wallet.updateNonFungibles();
                        await this._wallet.updateTokens();
                        return {
                            outcome: "SUCCESS",
                            message: "Successfully redeemed your resources!"
                        }
                    }
                )
            )
        )
    }

    async sponsorProposal(proposalAddress: string): Promise<WalletResult>  {
        return await this.withCheckedAccount(
            this.withVotingCard(
                this._wallet.sendTransaction(
                    sponsorProposalManifest(this._wallet.account()!, this.votingCardNFT(), proposalAddress),
                    sponsorProposalMessage(this._votingCard!.votingPower),
                    defaultOnSuccess("Successfully sponsored proposal!")
                )
            )
        )
    }

    async unlockResources(): Promise<WalletResult>  {
        return await this.withCheckedAccount(
            this.withVotingCard(
                this._wallet.sendTransaction(
                    unlockResourcesManifest(this._wallet.account()!, this.votingCardNFT()),
                    unlockResourcesMessage(),
                    defaultOnSuccess("Successfully started the unlocking process!")
                )
            )
        )
    }

    async voteProposal(proposalAddress: string, ordering: number[], votingFee: Fungibles): Promise<WalletResult>  {
        return await this.withCheckedAccount(
            this.withVotingCard(
                this._wallet.sendTransaction(
                    voteProposalManifest(this._wallet.account()!, this.votingCardNFT(), proposalAddress, ordering, votingFee),
                    voteProposalMessage(this._votingCard!.votingPower),
                    defaultOnSuccess("Successfully casted your vote on the proposal!")
                )
            )
        )
    }


    private async updateVotingCard() {
        await this._wallet.updateNonFungible(votingCardAddress());
        await this.parseVotingCard();
    }

    private async parseVotingCard() {
        let ids = this._wallet.nonFungibleIds(votingCardAddress());
        if(ids.length > 0){
            this._votingCard = votingCardFrom(ids[0]);
        }
    }

    private async withCheckedAccount(
        transaction: Promise<WalletResult>,
    ): Promise<WalletResult> {
        if (this._wallet.account() == null) {
            return {
                outcome: 'FAILED',
                message: 'Cannot do this while not connected!',
            };
        } else {
            return transaction;
        }
    }

    private async withVotingCard(transaction: Promise<WalletResult>): Promise<WalletResult> {
        if (this._votingCard == null) {
            return {
                outcome: 'FAILED',
                message: 'This action is for DAO members only!!',
            };
        } else {
            return transaction;
        }
    }

    private votingCardNFT(): NFT {
        return new NFT(votingCardAddress(), this._votingCard!.id)
    }
}