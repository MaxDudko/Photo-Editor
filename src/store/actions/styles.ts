export const EDIT_COMMON_STYLES = (styles: any) => {
    return {
        type: "EDIT_COMMON_STYLES",
        payload: {
            styles: styles,
        }
    }
};

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

export const ADD_TEXT = (text: string) => {
    return {
        type: "ADD_TEXT",
        payload: {
            text: text,
        }
    }
};

export const DELETE_TEXT = (index: number) => {
    return {
        type: "DELETE_TEXT",
        payload: {
            index: index
        }
    }
};

export const SELECT_TEXT = (index: number) => {
    return {
        type: "SELECT_TEXT",
        payload: {
            index: index
        }
    }
};

export const EDIT_TEXT = (index: number, property: string, value: any) => {
    return {
        type: "EDIT_TEXT",
        payload: {
            index: index,
            property: property,
            value: value,
        }
    }
};
