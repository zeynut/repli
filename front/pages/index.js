import React, { useEffect} from 'react';
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
    const { mainPosts } = useSelector( state => state.post );

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
