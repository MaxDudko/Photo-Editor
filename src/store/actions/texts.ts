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

export const EDIT_TEXT = (index: number, styles: any) => {
    return {
        type: "EDIT_TEXT",
        payload: {
            index: index,
            styles: styles,
        }
    }
};