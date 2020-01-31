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
        width: "1200px",
        height: "600px",
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
                    {
                        fontWeight: 400
                    }
                ],
            };
        case "SELECT_TEXT":
            return {
                ...state,
                selectedText: action.payload.index
            };
        case "EDIT_TEXT_STYLES":
            return {
                ...state,
                stylesTexts: state.stylesTexts.map((text: any, i: number) => i === action.payload.index ?
                    {
                        ...text,
                        [action.payload.property]: action.payload.value
                    }
                    :
                    text
                )
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
