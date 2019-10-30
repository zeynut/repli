import React, { useCallback, useState, useEffect } from 'react';
import { Form , Input , Button } from 'antd';
import {useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
    const dispatch = useDispatch();
    const { user, isLoggedIn} = useSelector( state => state.user);
    const { mainPosts, imagePaths, isAddingPost, postAdded } = useSelector( state => state.post );

    const [text, setText] = useState('');

    useEffect( () => {
        setText('');
    }, [postAdded === true])

    const onSubmitForm = useCallback(  (e) =>{
        e.preventDefault();
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.')
        }
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                content: text.trim(),
            },
        });
         
    } , [text]);

    const onChangeText = useCallback( (e)=> {
        setText(e.target.value);
    }, [text]);

    return (
    <>
        <Form style={{ margin : '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
        <Input.TextArea maxLength={140} placeholder="무슨일입니까??" value={text} onChange={onChangeText}/>
        <div>
            <input type="file" multiple hidden/>
            <Button>이미지 업로도</Button>
            <Button type="primary" style={{ float: "right"}} htmlType="submit" loading={isAddingPost}>포스트</Button>
        </div>
        <div>
        {imagePaths.map( (v) => {
                        <div key={v} style={{ display: 'inline-block'}}>
                        <img src={'http://localhost:3065/${v}'} style={{ width:"220px"}} alt={v}/>
                        <div><Button>제거</Button></div>
                    </div>
                
            })}
        </div>
        </Form>
    </>
     );
};

export default PostForm;