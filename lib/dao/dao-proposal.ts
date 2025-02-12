import {ProposalPhase, Proposition} from "@/lib/dao/proposal-types";
import {
    DESCRIPTION_FIELD,
    END_OF_PHASE_FIELD,
    getFields,
    NAME_FIELD,
    parseArray,
    parseKVS,
    parseLocalId,
    parseNumber,
    parseProposalPhase,
    parseProposition, parseAddress,
    parseString, PROP_FEE_RESOURCE_FIELD, PROP_VOTING_FEE_FIELD, PROP_VOTING_PERIOD_FIELD,
    PROPOSAL_ID_FIELD,
    PROPOSAL_PHASE_FIELD,
    PROPOSITIONS_FIELD,
    SPONSORS_KVS_FIELD,
    SPONSORSHIP_REQUIRED_FIELD,
    TOTAL_SPONSORED_FIELD, VOTERS_KVS_FIELD, VOTES_FIELD,
} from "@/lib/dao/dao-parser";
import {ProgrammaticScryptoSborValue} from "@radixdlt/babylon-gateway-api-sdk";
import {GatewayProcessor} from "@beaker-tools/typescript-toolkit";

export class DaoProposal {
    private readonly _processor: GatewayProcessor;
    private readonly _address : string;

    private _proposalId: number;
    private _name: string;
    private _description: string;
    private _propositions: Proposition[];
    private _proposalPhase: ProposalPhase;
    private _endOfPhase: number | undefined;
    private _sponsorshipRequired: number;
    private _sponsorsKVS: string;
    private _sponsors: Map<string, number>;
    private _totalSponsored: number;
    private _votingPeriod: number;
    private _votersKVS: string;
    private _voters: Map<string, number>;
    private _votes: number[];
    private _votingFee: number;
    private _feeResource: string;
    private _collectedFees: number;

    constructor(processor: GatewayProcessor, address: string) {
        this._processor = processor;
        this._address = address;

        this._proposalId = 0;
        this._name = "";
        this._description = "";
        this._propositions = [];
        this._proposalPhase = "SponsorshipEnded";
        this._endOfPhase = 0;
        this._sponsorshipRequired = 0;
        this._sponsorsKVS = "";
        this._sponsors = new Map<string, number>();
        this._totalSponsored = 0;
        this._votingPeriod = 0;
        this._votersKVS = "";
        this._voters = new Map<string, number>();
        this._votes = [];
        this._votingFee = 0;
        this._feeResource = "";
        this._collectedFees = 0;
    }

    async init(): Promise<void> {
        let response = await this._processor.entityDetails([this._address]);
        let fields = getFields(response);

        this._proposalId = parseNumber(fields[PROPOSAL_ID_FIELD]);
        this._name = parseString(fields[NAME_FIELD]);
        this._description = parseString(fields[DESCRIPTION_FIELD]);
        this._propositions = parseArray(fields[PROPOSITIONS_FIELD], parseProposition);
        this._proposalPhase = parseProposalPhase(fields[PROPOSAL_PHASE_FIELD]);
        this._endOfPhase = parseNumber(fields[END_OF_PHASE_FIELD]);
        this._sponsorshipRequired = parseNumber(fields[SPONSORSHIP_REQUIRED_FIELD]);

        this._sponsorsKVS = parseKVS(fields[SPONSORS_KVS_FIELD]);
        await this.updateSponsors();

        this._votingPeriod = parseNumber(fields[PROP_VOTING_PERIOD_FIELD]);

        this._votersKVS = parseKVS(fields[VOTERS_KVS_FIELD]);
        await this.updateVoters(fields);

        this._votingFee = parseNumber(fields[PROP_VOTING_FEE_FIELD]);

        this._feeResource = parseAddress(fields[PROP_FEE_RESOURCE_FIELD]);

        let fees = response.items[0]?.fungible_resources?.items[0];
        if(fees) {
            this._collectedFees = fees.aggregation_level == "Global"? parseFloat(fees.amount): 0;
        }
        else {
            this._collectedFees = 0;
        }
    }


    async updateSponsors(fields?: ProgrammaticScryptoSborValue[]) {
        if(!fields) {
            let response = await this._processor.entityDetails([this._address]);
            let fields = getFields(response);
            await this.updateSponsors(fields);
        }
        else {
            this._sponsors = await this.updateRegister(this._sponsorsKVS);
            this._totalSponsored = parseNumber(fields[TOTAL_SPONSORED_FIELD]);
        }
    }

    async updateVoters(fields?: ProgrammaticScryptoSborValue[]) {
        if(!fields) {
            let response = await this._processor.entityDetails([this._address]);
            let fields = getFields(response);
            await this.updateVoters(fields);
        }
        else {
            this._voters = await this.updateRegister(this._votersKVS);
            this._votes = parseArray(fields[VOTES_FIELD], parseNumber);
        }

    }

    private async updateRegister(address: string): Promise<Map<string, number>> {
        let register = new Map<string, number>();

        let kvsData = await this._processor.getKeyValueStoreData(address);
        kvsData.map(keyVP => {
            const id = parseLocalId(keyVP.key.programmatic_json);
            const amount = parseNumber(keyVP.value.programmatic_json);
            register.set(id, amount);
        });

        return register;
    }

    get address(): string {
        return this._address;
    }

    get proposalId(): number {
        return this._proposalId;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get propositions(): Proposition[] {
        return this._propositions;
    }

    get proposalPhase(): ProposalPhase {
        return this._proposalPhase;
    }

    get endOfPhase(): number | undefined {
        return this._endOfPhase;
    }

    get sponsorshipRequired(): number {
        return this._sponsorshipRequired;
    }

    get sponsors(): Map<string, number> {
        return this._sponsors;
    }

    get totalSponsored(): number {
        return this._totalSponsored;
    }

    get votingPeriod(): number {
        return this._votingPeriod;
    }

    get voters(): Map<string, number> {
        return this._voters;
    }

    get votes(): number[] {
        return this._votes;
    }

    get votingFee(): number {
        return this._votingFee;
    }

    get feeResource(): string {
        return this._feeResource;
    }

    get collectedFees(): number {
        return this._collectedFees;
    }
}