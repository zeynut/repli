import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Form , Input , Button, Card , Icon, Avatar } from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
    isLoggedIn : true,
    imagePaths : [],
    mainPosts: [{
            User:{
                id:1,
                nickname:"제이넛",
                content: "첫번째글입니다.",
                img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            }
        }],
}

const Home = () => {
    return (
        <>
        <div>
            {dummy.isLoggedIn && <PostForm/>}
            {dummy.mainPosts.map( (c) => { return ( <PostCard post={c} key={c}/>)})}
        </div>
        </>
    );
}

Home.propTypes = {

}

export default Home;
