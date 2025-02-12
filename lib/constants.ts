export const NETWORK_ID: number = 2;

export const votingCardAddress = (): string => {
    if(NETWORK_ID == 1) {
        return ""
    }
    else {
        return "resource_tdx_2_1ntf96cmnx42tjrwnkpz6m5em25wcrsa2da6v7dw95vusqdfy7wak9r"
    }
}

export const daoAddress = (): string => {
    if(NETWORK_ID == 1) {
        return ""
    }
    else {
        return "component_tdx_2_1cra9ztncpfakp9mkcf34k4fpqdygva5lppzyww4x8lvlncd8r2vjdd"
    }
}


export const adminBadgeAddress = (): string => {
    if(NETWORK_ID == 1) {
        return ""
    }
    else {
        return "resource_tdx_2_1tk0xdx2anl3qplket6237g2k2eqdjxwnpvjw7latq3l8h9tkk2astg"
    }
}
