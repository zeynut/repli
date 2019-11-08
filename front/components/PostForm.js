import React, { useCallback, useState, useEffect , useRef } from 'react';
import { Form , Input , Button } from 'antd';
import {useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST , UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';




const PostForm = () => {
    const dispatch = useDispatch();
    const { user, isLoggedIn} = useSelector( state => state.user);
    const { mainPosts, imagePaths, isAddingPost, postAdded } = useSelector( state => state.post );

    const [text, setText] = useState('');
    const imageInput = useRef();

    useEffect( () => {
        setText('');
    }, [postAdded === true])

    const onSubmitForm = useCallback(  (e) =>{
        e.preventDefault();
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach( (i) => {
            formData.append('image' , i);
        });
        formData.append('content' , text );
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
         
    } , [text, imagePaths]);

    const onChangeText = useCallback( (e)=> {
        setText(e.target.value);
    }, [text]);

  
    const onChangeImages = useCallback( (e) => {
        console.log(e.target.files);

        const imageFormData = new FormData();
        
        [].forEach.call( e.target.files , (f) => {
            imageFormData.append('image', f);
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData
        })
    } , []);

    const onClickImageUpload = useCallback(  () =>{
        imageInput.current.click();
    } , [imageInput.current]);

    const onRemoveImage = useCallback( index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        })
    } , []);

    return (
    <>
        <Form style={{ margin : '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
        <Input.TextArea maxLength={140} placeholder="무슨일입니까??" value={text} onChange={onChangeText}/>
        <div>
            <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
            <Button onClick={onClickImageUpload}>이미지 업로도</Button>
            <Button type="primary" style={{ float: "right"}} htmlType="submit" loading={isAddingPost}>포스트</Button>
        </div>
        <div>여기에 이미지 미리보기 표시
        {imagePaths.map( (v, i) => (
                        <div key={v} style={{ display: 'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} 
                        style={{ width: '200px'}} 
                        alt={v}/>
                        <div><Button onClick={onRemoveImage(i)}>제거</Button></div>
                    </div>
                
        ))}
        </div>
        </Form>
    </>
     );
};

export default PostForm;