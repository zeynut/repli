import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Form , Input , Button, Card , Icon, Avatar } from 'antd';

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
            {dummy.isLoggedIn && 
            <Form encType="multipart/form-data">
                <Input.TextArea maxLength={140} placeholder="무슨일입니까??" />
                <div>
                    <input type="file" multiple hidden/>
                    <Button>이미지 업로도</Button>
                    <Button type="primary" style={{ float: "right"}} htmlType="submit">포스트</Button>
                </div>
                <div>
                    {dummy.imagePaths.map( (v, i) => {
                        return (
                            <div key={v} style={{ display: 'inline-block'}}>
                                <img src={'http://localhost:3065/'+ v} style={{ width:"320px"}} alt={v}/>
                                <div><Button>제거</Button></div>
                            </div>
                        )
                    })}
                </div>
            </Form>}
            {dummy.mainPosts.map( (c) => {
                return (
                    <Card
                         key={+c.createdAt}
                         cover={c.User.img && <img alt="example" src={c.User.img} />}
                         actions={[
                            <Icon type="retweet" key="retweet"/>,
                            <Icon type="heart" key="heart"/>,
                            <Icon type="message" key="message"/>,
                            <Icon type="ellipsis" key="ellipsis"/>,
                        ]}
                        extra={<Button>팔로우</Button>}
                         >
                        <Card.Meta 
                            avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                            title={c.User.nickname}
                            description={c.User.content}
                        />
                    </Card>
                )
            })}
        </div>
        </>
    );
}

Home.propTypes = {

}

export default Home;
