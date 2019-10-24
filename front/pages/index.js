import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Form , Input , Button, Card , Icon, Avatar } from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch , useSelector } from 'react-redux';
import { LOG_IN } from '../reducers/user';

const Home = () => {
    const dispatch = useDispatch();
    const { isLoggedIn , user } = useSelector( state => state.user) ;
    const { mainPosts } = useSelector( state => state.post );

    return (
        <>
        <div>
            { user ?<div>{user.nickname}로그인했습니다.</div>: <div>로그아웃했습니다.</div>}
            {isLoggedIn && <PostForm/>}
            {mainPosts.map( (c) => { return ( <PostCard post={c} key={c}/>)})}
        </div>
        </>
    );
}

Home.propTypes = {

}

export default Home;
