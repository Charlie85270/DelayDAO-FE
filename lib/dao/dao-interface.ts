import {DaoProposal} from "@/lib/dao/dao-proposal";
import {ProgrammaticScryptoSborValue} from "@radixdlt/babylon-gateway-api-sdk";
import {
    FEE_RESOURCE_FIELD,
    getFields,
    LOCKED_RESOURCES_FIELD, LOCKING_PERIOD_FIELD,
    parseKVS,
    parseNumber,
    parseAddress,
    parseVault,
    parseVotingWeights, PROPOSAL_CREATION_FEE_FIELD,
    PROPOSALS_COUNT_FIELD, PROPOSALS_KVS_FIELD,
    SPONSORSHIP_PERIOD_FIELD, SPONSORSHIP_THRESHOLD_FIELD,
    TOTAL_VOTING_POWER_FIELD,
    TREASURY_KVS_FIELD,
    UNLOCKING_PERIOD_FIELD, VOTING_FEE_FIELD, VOTING_PERIOD_FIELD,
    VOTING_WEIGHT_FIELD
} from "@/lib/dao/dao-parser";
import {FungibleResource, GatewayProcessor, NonFungibleResource, ResourceInformation} from "@beaker-tools/typescript-toolkit";

export class DaoInterface {
    private readonly _processor: GatewayProcessor;
    private readonly _address : string;

    private _resourceVotingWeights: Map<ResourceInformation, number>;
    private _lockedResourcesVault: string;
    private _lockedFungibleResources: Map<string, FungibleResource>;
    private _lockedNonFungibleResources: Map<string, NonFungibleResource>;
    private _totalVotingPower: number;
    private _lockingPeriod: number;
    private _unlockingPeriod: number;
    private _proposalsCount: number;
    private _proposalSponsorshipPeriod: number;
    private _proposalSponsorshipThreshold: number;
    private _proposalVotingPeriod: number;
    private _proposalsKVS: string;
    private _proposals: Map<number, DaoProposal>;
    private _votingFee: number;
    private _proposalCreationFee: number;
    private _feeResource: string;
    private _treasuryVault: string;
    private _fungibleTreasury: Map<string, FungibleResource>;
    private _nonFungibleTreasury: Map<string, NonFungibleResource>;

    constructor(processor: GatewayProcessor, address: string) {
        this._processor = processor;
        this._address = address;

        this._resourceVotingWeights = new Map<ResourceInformation, number>();
        this._lockedResourcesVault = "";
        this._lockedFungibleResources = new Map<string, FungibleResource>;
        this._lockedNonFungibleResources = new Map<string, NonFungibleResource>();
        this._totalVotingPower = 0;
        this._lockingPeriod = 0;
        this._unlockingPeriod = 0;
        this._proposalsCount = 0;
        this._proposalSponsorshipPeriod = 0;
        this._proposalSponsorshipThreshold = 0;
        this._proposalVotingPeriod = 0;
        this._proposalsKVS = "";
        this._proposals = new Map<number, DaoProposal>();
        this._votingFee = 0;
        this._proposalCreationFee = 0;
        this._feeResource = "";
        this._treasuryVault = "";
        this._fungibleTreasury = new Map<string, FungibleResource>();
        this._nonFungibleTreasury = new Map<string, NonFungibleResource>();
    }

    getProposal(proposalNumber: number): DaoProposal {
        return this._proposals.get(proposalNumber)!;
    }

    async update(): Promise<void> {
        let response = await this._processor.entityDetails([this._address]);
        let fields = getFields(response);

        await this.updateVotingWeights();

        this._lockedResourcesVault = parseKVS(fields[LOCKED_RESOURCES_FIELD]);
        await this.updateLockedResources();

        this._totalVotingPower = parseNumber(fields[TOTAL_VOTING_POWER_FIELD]);
        this._lockingPeriod = parseNumber(fields[LOCKING_PERIOD_FIELD]);
        this._unlockingPeriod = parseNumber(fields[UNLOCKING_PERIOD_FIELD]);
        this._proposalsCount = parseNumber(fields[PROPOSALS_COUNT_FIELD]);
        this._proposalSponsorshipPeriod = parseNumber(fields[SPONSORSHIP_PERIOD_FIELD]);
        this._proposalSponsorshipThreshold = parseNumber(fields[SPONSORSHIP_THRESHOLD_FIELD]);
        this._proposalVotingPeriod = parseNumber(fields[VOTING_PERIOD_FIELD]);

        this._proposalsKVS = parseKVS(fields[PROPOSALS_KVS_FIELD]);
        await this.initProposals();

        this._votingFee = parseNumber(fields[VOTING_FEE_FIELD]);
        this._proposalCreationFee = parseNumber(fields[PROPOSAL_CREATION_FEE_FIELD]);;
        this._feeResource = parseAddress(fields[FEE_RESOURCE_FIELD]);

        this._treasuryVault = parseKVS(fields[TREASURY_KVS_FIELD]);
        await this.updateTreasury();
    }

    async updateVotingWeights(fields?: ProgrammaticScryptoSborValue[]) {
        if(!fields) {
            let response = await this._processor.entityDetails([this._address]);
            let fields = getFields(response);
            await this.updateVotingWeights(fields);
        }
        else{
            let rawWeights = parseVotingWeights(fields[VOTING_WEIGHT_FIELD]);
            let resourceInformation = await this._processor.getResourcesInformation(Array.from(rawWeights.keys()));
            this._resourceVotingWeights = new Map<ResourceInformation, number>();
            resourceInformation.forEach((resource, address) => {
                this._resourceVotingWeights.set(resource, rawWeights.get(address)!);
            })
        }
    }

    async updateLockedResources() {
        let update = await this.updateKVSVaults(this._lockedResourcesVault);
        this._lockedFungibleResources = update[0];
        this._lockedNonFungibleResources = update[1];
    }

    async updateTreasury() {
        let update = await this.updateKVSVaults(this._treasuryVault);
        this._fungibleTreasury = update[0];
        this._nonFungibleTreasury = update[1];
    }

    private async initProposals() {

        let proposals = await this._processor.getKeyValueStoreData(this._proposalsKVS);

        await Promise.all(
            proposals.map(async proposal =>{
                const proposalId = parseNumber(proposal.key.programmatic_json);
                const proposalAddress = parseAddress(proposal.value.programmatic_json);

                let newProposal = new DaoProposal(this._processor, proposalAddress);
                await newProposal.init();

                this._proposals.set(proposalId, newProposal);
            })
        );
    }


    private async updateKVSVaults(kvsAddress: string): Promise<[Map<string, FungibleResource>, Map<string, NonFungibleResource>]> {
        let [fungibles, nonFungibles] = [new Map<string, FungibleResource>, new Map<string, NonFungibleResource>];

        let kvsData = await this._processor.getKeyValueStoreData(kvsAddress);
        kvsData.map(keyValuePair => {
            let resource = parseAddress(keyValuePair.key.programmatic_json);
            let vaultAddress = parseVault(keyValuePair.value.programmatic_json);
            // TODO: Retrieve vaults details
        });

        return [fungibles, nonFungibles];
    }

    get address(): string {
        return this._address;
    }

    get resourceVotingWeights(): Map<ResourceInformation, number> {
        return this._resourceVotingWeights;
    }

    get lockedFungibleResources(): Map<string, FungibleResource> {
        return this._lockedFungibleResources;
    }

    get lockedNonFungibleResources(): Map<string, NonFungibleResource> {
        return this._lockedNonFungibleResources;
    }

    get totalVotingPower(): number {
        return this._totalVotingPower;
    }

    get lockingPeriod(): number {
        return this._lockingPeriod;
    }

    get unlockingPeriod(): number {
        return this._unlockingPeriod;
    }

    get proposalsCount(): number {
        return this._proposalsCount;
    }

    get proposalSponsorshipPeriod(): number {
        return this._proposalSponsorshipPeriod;
    }

    get proposalSponsorshipThreshold(): number {
        return this._proposalSponsorshipThreshold;
    }

    get proposalVotingPeriod(): number {
        return this._proposalVotingPeriod;
    }

    get proposals(): Map<number, DaoProposal> {
        return this._proposals;
    }

    get votingFee(): number {
        return this._votingFee;
    }

    get proposalCreationFee(): number {
        return this._proposalCreationFee;
    }

    get feeResource(): string {
        return this._feeResource;
    }

    get fungibleTreasury(): Map<string, FungibleResource> {
        return this._fungibleTreasury;
    }

    get nonFungibleTreasury(): Map<string, NonFungibleResource> {
        return this._nonFungibleTreasury;
    }
}