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
    const { me , user } = useSelector( state => state.user) ;
    const { mainPosts } = useSelector( state => state.post );

    useEffect( ()=>{
        dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
        });
    }, []);

    return (
        <>
        <div>
            { me ?<div>{me.nickname}로그인했습니다.</div>: <div>로그아웃했습니다.</div>}
            {me && <PostForm/>}
            {mainPosts.map( (c) => { return ( <PostCard post={c} key={c.id}/>)})}
        </div>
        </>
    );
}

Home.propTypes = {

}

export default Home;
