import React from 'react';
import { Icon, Card, Avatar } from "antd";

const dummy ={
    id: "",
    nickname: "zeynut",
    Post:[],
    Followings:[],
    Followers: [],
    isLoggedIn: false,
}


const UserProfile = () => {
    return (
        <div>
            <Card 
                    style={{ width: 320 }}
                    actions={[<div><Icon type="aliwangwang" key="twit"/>포스트<br/>{dummy.Post.length}</div>,
                             <div><Icon type="usergroup-add" key="following"/>팔로잉<br/>{dummy.Followings.length}</div>,
                             <div><Icon type="team" key="followers"/>팔로워<br/>{dummy.Followers.length}</div>]}>
                    <Card.Meta 
                    avatar={<Avatar>{dummy.nickname[0]}</Avatar>} 
                    title={dummy.nickname}
                    description="이것은 디스크립션입니다." />
                </Card> 
        </div>
    );
};

export default UserProfile;