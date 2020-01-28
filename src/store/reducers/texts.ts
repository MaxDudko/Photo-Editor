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
                ],
                stylesTexts: [
                    ...state.stylesTexts,
                    {}
                ],
            };
        case "SELECT_TEXT":
            return {
              ...state,
              selectedText: action.payload.index
            };
        case "EDIT_TEXT":
            return {
                ...state,
                stylesTexts: state.stylesTexts.map((e: any, i: number) => {
                    if(i === action.payload.index) return Object.assign(e, action.payload.styles)
                })
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
