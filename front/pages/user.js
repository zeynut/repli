import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card} from 'antd';
import PostCard from '../components/PostCard';
import { useDispatch , useSelector } from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const User = ({id}) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector( state => state.post);
    const { userInfo } = useSelector( state => state.user);
    
    useEffect( () => {
        dispatch({ type: LOAD_USER_REQUEST , data: id});
        dispatch({ type: LOAD_USER_POSTS_REQUEST, data: id});
    }, [])

    return (
        <div>
            { userInfo? 
                (<Card actions ={[ 
                            <div key="twit">포스트<br/>{userInfo.Posts}</div>,
                            <div key="following">팔로잉 <br/>{userInfo.Followings}</div>,
                            <div key="follower">팔로워<br/>{userInfo.Followers}</div>,
                        ]} 
                        >
                        <Card.Meta
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                </Card> 
                ) : null}
            {mainPosts.map ( c => ( <PostCard key={+c.createdAt} post={c}/> ))}
        </div>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
}

User.getInitialProps = async ( context ) => {
    console.log('!user getinitial props :' , context.query.id);
    return { id:parseInt(context.query.id , 10)};
}


export default User;