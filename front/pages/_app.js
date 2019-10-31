import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import { createStore , compose , applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper'
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';


const Repli = ({Component , store, pageProps}) => {
    return (
        <>
        <Provider store={store}>
            <Head>
                 <title>Repli</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout style={{ padding: "5px"}}>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
        </>
    );
}

Repli.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired
}

Repli.getInitialProps = async (context) => {
    console.log(context);
    const { ctx , Component } = context;
    let pageProps = {};
    if( Component.getInitialProps ){
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

const configureStore = (initialState , options ) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV ==='production' ?
        compose(applyMiddleware(...middlewares))
     : compose(applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,);
    const store = createStore( reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};



export default withRedux(configureStore)(Repli);
