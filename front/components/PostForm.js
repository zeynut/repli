import React from 'react';
import { Form , Input , Button } from 'antd';

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

const PostForm = () => {
    return (
    <>
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
        </Form>
    </>
     );
};

export default PostForm;