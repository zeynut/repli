import React from 'react';
import { Input, Button, Form, List, Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
    return (
        <>
            <div>
            <NicknameEditForm/>
            <List
                style={{ marginBottom: "20px"}}
                grid={{ gutter:4, xs: 2, md: 3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{ width: "100%"}}>더 보기</Button>}
                bordered
                dataSource={["제이넛", "ekhub" , "다람쥐"]}
                renderItem={
                    item => (
                        <List.Item style={{ marginTop : "20px"}}>
                            <Card actions={[ <Icon key="stop" type="stop"/>]}>
                                <Card.Meta description={item} />
                            </Card>
                        </List.Item>
                    )}
                 />            
            <List
                style={{ marginBottom: "20px"}}
                grid={{ gutter:4, xs: 2, md: 3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{ width: "100%"}}>더 보기</Button>}
                bordered
                dataSource={["제이넛", "ekhub" , "다람쥐"]}
                renderItem={
                    item => (
                        <List.Item style={{ marginTop : "20px"}}>
                            <Card actions={[ <Icon key="stop" type="stop"/>]}>
                                <Card.Meta description={item} />
                            </Card>
                        </List.Item>
                    )}
                 />            
            </div>
        </>
    );
}

Profile.proptypes = {

}

export default Profile;
