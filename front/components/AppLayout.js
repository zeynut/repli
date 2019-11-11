import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Input, Button, Row, Col, Card, Avatar, Icon, Form } from 'antd';
import Link from 'next/link';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { useSelector }  from 'react-redux';


const AppLayout = ({children}) => {
    const { me } = useSelector( state => state.user);
 
    return (
        <div>
        <Menu mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>리플라이</a></Link></Menu.Item>
            <Menu.Item key="profile"><Link href="/profile"><a>나의프로필</a></Link></Menu.Item>
            <Menu.Item key="mail">
                <Input.Search enterButton style={{ verticalAlign : "middle"}} />
            </Menu.Item>
        </Menu>
        <Row gutter={[16,16]}>
            <Col xs={11} md={8} >
                 {me?  <UserProfile/> :  <LoginForm/>     } 
            </Col>
            <Col xs={11} md={8} >
                {children}
            </Col>
            <Col xs={2} md={8} >
                세번째컬럼
            </Col>
        </Row>

            
        </div>
    );
}

AppLayout.prototype = {
    children: PropTypes.node,
}

export default AppLayout;
