export const UPLOAD_IMAGE = (file: string, imagePreviewUrl: string) => {
    return {
        type: "UPLOAD_IMAGE",
        payload: {
            file: file,
            imagePreviewUrl: imagePreviewUrl
        }
    }
};

export const SELECT_IMAGE = (index: number) => {
    return {
        type: "SELECT_IMAGE",
        payload: {
            index: index
        }
    }
};

export const DELETE_IMAGE = (index: number) => {
    return {
        type: "DELETE_IMAGE",
        payload: {
            index: index
        }
    }
};
