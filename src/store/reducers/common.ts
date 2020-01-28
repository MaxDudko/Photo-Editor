export interface ICommonState {
    stylesCommon: any,
}

export const initialState = {
    stylesCommon: {},
};

export const common = (state:ICommonState = initialState, action: any) => {
    switch (action.type) {
        case "EDIT_ALL":
            return {
                ...state,
                stylesCommon: {
                    ...state.stylesCommon,
                    ...action.payload.styles
                }
            };
        default:
            return state;
    }
};
