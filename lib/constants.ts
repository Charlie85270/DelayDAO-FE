export const NETWORK_ID: number = 2;

export const votingCardAddress = (): string => {
    if(NETWORK_ID == 1) {
        return ""
    }
    else {
        return "resource_tdx_2_1ngp0s9w7pghjg7lgugsyhl0skrwgn53h8axcrtczp3qcnwp46l3768"
    }
}

export const daoAddress = (): string => {
    if(NETWORK_ID == 1) {
        return ""
    }
    else {
        return "component_tdx_2_1cpp4w22c4zshufe2atqqv37vycw66z3mw00d57cezdwsd5z84qenm0"
    }
}


export const adminBadgeAddress = (): string => {
    if(NETWORK_ID == 1) {
        return ""
    }
    else {
        return "resource_tdx_2_1t460yx6c2wyrgexzcdgxm90s0unmnnmwe4a5w3de6s2r5z36r9p69m"
    }
}
