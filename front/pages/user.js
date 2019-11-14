import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card} from 'antd';
import PostCard from '../components/PostCard';
import { useDispatch , useSelector } from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const User = ({id}) => {
  
    const { mainPosts } = useSelector( state => state.post);
    const { userInfo } = useSelector( state => state.user);
    
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
            {mainPosts.map ( c => ( <PostCard key={c.id} post={c}/> ))}
        </div>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
}

User.getInitialProps = async ( context ) => {
    
    const id = parseInt(context.query.id , 10);
    console.log('!user getinitial props :' , id);

    context.store.dispatch({ type: LOAD_USER_REQUEST , data: id});
    context.store.idispatch({ type: LOAD_USER_POSTS_REQUEST, data: id});
    
    return { id };
}


export default User;