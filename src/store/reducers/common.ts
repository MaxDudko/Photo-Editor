export interface ICommonState {
    stylesCommon: any,
}

export const initialState = {
    stylesCommon: {},
};

export const common = (state:ICommonState = initialState, action: any) => {
    switch (action.type) {
        case "":
            return {};
        default:
            return state;
    }
};
