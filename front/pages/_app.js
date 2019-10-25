import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import { createStore , compose , applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper'
import reducer from '../reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';


const Repli = ({Component , store}) => {
    return (
        <>
        <Provider store={store}>
            <Head>
                 <title>Repli</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout style={{ padding: "5px"}}>
                <Component/>
            </AppLayout>
        </Provider>
        </>
    );
}
Repli.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
}

export default withRedux( (initialState , options ) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV ==='product' ?
        compose(applyMiddleware(...middlewares))
     : compose(applyMiddleware(...middlewares),
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,);
    const store = createStore( reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(Repli);
