export interface IStylesState {
    stylesCommon: any,
    files: any,
    images: string[],
    selectedImage: number,
    stylesImages: any,
    texts: string[],
    selectedText: number,
    stylesTexts: any,
}

export const initialState = {
    stylesCommon: {
        backgroundColor: "#ffffff",
        width: "calc(100% - 340px)",
        height: "70vh"
    },
    files: [],
    images: [],
    selectedImage: 0,
    stylesImages: [],
    texts: [],
    selectedText: 0,
    stylesTexts: [],
};

export const styles = (state:IStylesState = initialState, action: any) => {
    switch (action.type) {
        case "EDIT_COMMON_STYLES":
            return {
                ...state,
                stylesCommon: {
                    ...state.stylesCommon,
                    ...action.payload.styles
                }
            };
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                files: [
                    ...state.files,
                    action.payload.file
                ],
                images: [
                    ...state.images,
                    action.payload.imagePreviewUrl
                ]
            };
        case 'SELECT_IMAGE':
            return  {
                ...state,
                selectedImage: action.payload.index
            };
        case 'DELETE_IMAGE':
            return {
                ...state,
                images: state.images.filter((e, i) => {
                    return i !== action.payload.index
                })
            };
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
