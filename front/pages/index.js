import React, { useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Form , Input , Button, Card , Icon, Avatar } from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch , useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector( state => state.user) ;
    const { mainPosts, hasMorePost } = useSelector( state => state.post );

    const countRef = useRef([]);
    
    const onScroll = useCallback(  () => {
        if( window.scrollY + document.documentElement.clientHeight >
               document.documentElement.scrollHeight - 300){
               if(hasMorePost){
                   const lastId = mainPosts[mainPosts.length -1].id;
                   if(!countRef.current.includes(lastId)){
                       dispatch({
                           type: LOAD_MAIN_POSTS_REQUEST,
                           lastId: mainPosts[mainPosts.length -1 ].id,
                       });
                       countRef.current.push(lastId);
                   }
                }
       }
   }, [hasMorePost , mainPosts.length]);

    useEffect( () => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };

    } , [hasMorePost,mainPosts.length]);

    return (
        <>
        <div>
            { me ?<div>{me.nickname}로그인했습니다.</div>: <div>로그아웃했습니다index.js</div>}
            {me && <PostForm/>}
            {mainPosts.map( (c) => { return ( <PostCard key={c.id}  post={c} />)})}
        </div>
        </>
    );
}

Home.propTypes = {

}

Home.getInitialProps = async ( context ) => {
    console.log('!겟이니셜프롭스의 context의내용:  ' , Object.keys(context));
   return  context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
}

export default Home;
