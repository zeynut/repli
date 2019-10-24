import React from 'react';
import { Form , Input , Button } from 'antd';
import {useSelector, useDispatch } from 'react-redux';

const PostForm = () => {
    const { user, isLoggedIn} = useSelector( state => state.user);
    const { mainPosts, imagePaths } = useSelector( state => state.post );
    return (
    <>
        <Form style={{ margin : '10px 0 20px' }}encType="multipart/form-data">
        <Input.TextArea maxLength={140} placeholder="무슨일입니까??" />
        <div>
            <input type="file" multiple hidden/>
            <Button>이미지 업로도</Button>
            <Button type="primary" style={{ float: "right"}} htmlType="submit">포스트</Button>
        </div>
        <div>
        {imagePaths.map( (v) => {
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