import React, { useCallback } from 'react';
import { Icon, Card, Avatar, Button } from "antd";
import { useSelector , useDispatch } from 'react-redux';
import { LOG_OUT } from '../reducers/user';

const UserProfile = () => {
    
    const { user, isLoggedIn } = useSelector( state => state.user);
    const {mainPosts}  = useSelector( state => state.post );
    const dispatch = useDispatch();

    const onLogout = useCallback( () => {
        dispatch( {type: LOG_OUT} );
    }, []);
    
    return (
        <div>
            <Card 
                    style={{ width: 250 }}
                    actions={[<div><Icon type="aliwangwang" key="twit"/>포스트<br/>{user.Post.length}</div>,
                             <div><Icon type="usergroup-add" key="following"/>팔로잉<br/>{user.Followings.length}</div>,
                             <div><Icon type="team" key="followers"/>팔로워<br/>{user.Followers.length}</div>]}>
                    <Card.Meta 
                    avatar={<Avatar>{user.nickname[0]}</Avatar>} 
                    title={user.nickname}
                    description="디스크립션입니다." />
                    <Button onClick={onLogout}>로그아웃</Button>
                </Card> 
        </div>
    );
};

export default UserProfile;