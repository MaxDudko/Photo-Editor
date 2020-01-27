export interface IImagesState {
    files: any,
    images: string[],
    selectedImage: number,
    stylesImages: any
}

export const initialState = {
    files: [],
    images: [],
    selectedImage: 0,
    stylesImages: [],
};

export const images = (state:IImagesState = initialState, action: any) => {
    switch (action.type) {
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
        // case 'SELECT_IMAGE':
        //     return  {
        //         ...state,
        //         selectedImage: action.payload.index
        //     };
        case 'DELETE_IMAGE':
            return {
              ...state,
              images: state.images.filter((e, i) => {
                  return i !== action.payload.index
              })
            };
        default:
            return state;
    }
};
