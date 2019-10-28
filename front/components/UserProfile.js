import React, { useCallback } from 'react';
import { Icon, Card, Avatar, Button } from "antd";
import { useSelector , useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
    
    const { me, isLoggedIn } = useSelector( state => state.user);
    const {mainPosts}  = useSelector( state => state.post );
    const dispatch = useDispatch();

    const onLogout = useCallback( () => {
        dispatch( {type: LOG_OUT_REQUEST} );
    }, []);
    
    return (
        <div>
            <Card 
                    style={{ width: 220 }}
                    actions={[<div><Icon type="aliwangwang" key="twit"/>포스트<br/>{me.Post.length}</div>,
                             <div><Icon type="usergroup-add" key="following"/>팔로잉<br/>{me.Followings.length}</div>,
                             <div><Icon type="team" key="followers"/>팔로워<br/>{me.Followers.length}</div>]}>
                    <Card.Meta 
                    avatar={<Avatar>{me.nickname[0]}</Avatar>} 
                    title={me.nickname}
                    description="디스크립션입니다." />
                    <Button onClick={onLogout}>로그아웃</Button>
                </Card> 
        </div>
    );
};

export default UserProfile;