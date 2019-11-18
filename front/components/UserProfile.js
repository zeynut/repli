import React, { useCallback } from 'react';
import { Card, Avatar, Button } from "antd";
import { useSelector , useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import {Link} from 'next/link';

const UserProfile = () => {
    
    const { me } = useSelector( state => state.user);
    
    const dispatch = useDispatch();

    const onLogout = useCallback( () => {
        dispatch( {type: LOG_OUT_REQUEST} );
    }, []);
    
    return (
        <div>
            <Card 
                    style={{ width: 220 }}
                    actions={[
                        <Link  key="twit" href="/profile" >
                            <a><div >포스트<br/>{me.Posts.length}</div></a>
                        </Link>,
                        <Link  key="following" href="/profile" >
                            <a><div >팔로잉<br/>{me.Followings.length}</div></a>
                        </Link>,
                        <Link  key="followers" href="/profile">
                            <a><div>팔로워<br/>{me.Followers.length}</div></a>
                        </Link>
                    ]}
                    >
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