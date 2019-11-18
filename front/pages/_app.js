import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import { createStore , compose , applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';
import Helmet from 'react-helmet';
import App  , {Container} from 'next/app';

class Repli extends App {

    static propTypes = {
        Component: PropTypes.elementType.isRequired,
        store: PropTypes.object.isRequired,
        pageProps: PropTypes.object.isRequired,
        isServer: PropTypes.bool.isRequired
    }


static defaultProps = {
    pageProps: {}
}

//만약 getinitialprops 가 있는 페이지는 context(ctx) 를 pageprops 에 넣어서 잔달한다//
//받는쪽..다른페이지..에서는 context 로 받음
//서버 관련 명령어들도 다 여기에 씀
  
static getInitialProps = async (context) => {
    const { ctx } = context;
    const { store } = ctx;
    let pageProps = {};
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    console.log(context);
    console.log('!cookie쿠키입니다:' , cookie);

    if( ctx.isServer && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    const state = ctx.store.getState();

    if(!state.user.me){
        store.dispatch({type:LOAD_USER_REQUEST});
    }
    if( context.Component.getInitialProps ){
        pageProps = await context.Component.getInitialProps(ctx);
    }
    
    return { pageProps , isServer: ctx.isServer };
};

render(){

    const {Component , store, pageProps, isServer} = this.props;
   
    return (
        <>
        <Container>
        <Provider store={store}>
            <Helmet
                title="Repli"
                htmlAttributes={{ lang: 'ko'}}
                meta={[{
                    charset: 'UTF-8',
                },{
                    name: 'viewport',
                    content:'vidth=device-width,initial-scale=1.0,minimul-scale=1.0,maxium-scale=1.0, user-scalable=yes, viewport-fit=cover'
                },{
                    'http-equiv': 'X-UA-Compatible', content: 'IE= edge'
                },{
                    name: 'description' , content: 'zeynut node sns',    
                },{
                    name: 'og:title' , content: 'sns',
                },{
                    name: 'og:description' , content: 'zeynut node sns'
                },{
                    property: 'og:type' , content: 'website'
                },{
                    property: 'og.image', content: 'http://localhost:3060/favicon.ico',
                }]}
                link={[{
                    rel: 'shortcut icon' , href: '/favicon.ico'
                },{
                    rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
                },{
                    rel: "stylesheet",href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"

                },{
                    rel: "stylesheet",href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"

                }]}
            />
            <AppLayout isServer={isServer}>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
        </Container>
        </>
     );
    }
}

   



    
const configureStore = (initialState , options ) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        next(action);
    }];
    const enhancer = process.env.NODE_ENV === 'production' ?
       compose(applyMiddleware(...middlewares))
     : compose(applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 
        'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,);
    const store = createStore( reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(withReduxSaga(Repli));
