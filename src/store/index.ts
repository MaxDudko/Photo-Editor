import {compose, createStore, applyMiddleware} from 'redux'
import {reducers, IReduxState} from "./reducers";

const reduxDevTools = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION__ && (window as any)
    .__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = compose(
    applyMiddleware(),
    reduxDevTools
);

// @ts-ignore
export const store = createStore<IReduxState, any, any, any>(reducers, middlewares);


