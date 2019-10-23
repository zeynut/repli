import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Input, Button, Row, Col, Card, Avatar, Icon } from 'antd';
import Link from 'next/link';

const dummy ={
    id: "",
    nickname: "zeynut",
    Post:[],
    Followings:[],
    Followers: [],

}

const AppLayout = ({children}) => {
    return (
        <div>
        <Menu mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>리플라이</a></Link></Menu.Item>
            <Menu.Item key="profile"><Link href="/profile"><a>나의프로필</a></Link></Menu.Item>
            <Menu.Item key="mail">
                <Input.Search enterButton style={{ verticalAlign : "middle"}} />
            </Menu.Item>
        </Menu>
        <Row>
            <Col xs={24} md={8} >
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
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </Col>
            <Col xs={24} md={8} >
                {children}
            </Col>
            <Col xs={24} md={8} >
                세번째 컬럼
            </Col>
        </Row>

            
        </div>
    );
}

AppLayout.prototype = {
    children: PropTypes.node,
}

export default AppLayout;
