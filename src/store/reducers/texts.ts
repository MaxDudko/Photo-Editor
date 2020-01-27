export interface ITextsState {
    texts: string[],
    selectedText: number,
    stylesTexts: any,
}

export const initialState = {
    texts: [],
    selectedText: 0,
    stylesTexts: [],
};

export const texts = (state:ITextsState = initialState, action: any) => {
    switch (action.type) {
        case "ADD_TEXT":
            return {
                ...state,
                texts: [
                    ...state.texts,
                    action.payload.text
                ]
            };
        case "SELECT_TEXT":
            return {
              ...state,
              selectedText: action.payload.index
            };
        case "EDIT_TEXT":
            return {
                ...state,
                stylesTexts: [
                    ...state.stylesTexts,
                    state.stylesTexts[action.payload.index] = action.payload.styles
                ]
            };
        case 'DELETE_TEXT':
            return {
                ...state,
                texts: state.texts.filter((e, i) => {
                    return i !== action.payload.index
                })
            };
        default:
            return state;
    }
};
