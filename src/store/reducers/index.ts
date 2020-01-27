import {combineReducers} from 'redux';

import {common, ICommonState} from "./common";
import {images, IImagesState} from "./images";
import {texts, ITextsState} from "./texts";

export const reducers = combineReducers({
    common,
    images,
    texts,
});

export interface IReduxState{
    common: ICommonState,
    images: IImagesState,
    texts: ITextsState,
}
