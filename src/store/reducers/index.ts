import {combineReducers} from 'redux';

import {styles, IStylesState} from "./styles";

export const reducers = combineReducers({
    styles,
});

export interface IReduxState{
    styles: IStylesState,
}
