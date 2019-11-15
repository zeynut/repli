import React , { useCallback, useState, useEffect } from 'react';
import { Input , Form, Button } from 'antd';
import { useDispatch , useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST } from '../reducers/post';


const CommentForm = ({post}) => {
    const [commentText , setCommentText] = useState('');

    const dispatch = useDispatch();
    const { me } = useSelector( state => state.user );
    const {isAddingComment , commentAdded } = useSelector( state => state.post );
    
    const onChangeCommentText = useCallback( (e) => {
        setCommentText(e.target.value);
        console.log(e.target.value);
     } , []);
     
    const onSubmitComment = useCallback( (e) => {
        e.preventDefault();
        if(!me) {
            return alert('로그인이 필요합니다.');
        }
        console.log('!psost.id:입니다',post.id);
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
                },
        });
    }, [me && me.id, commentText]);

    useEffect( () => {
        setCommentText('');
    } , [ commentAdded === true ])

    return (
        <div>
             <Form onSubmit={onSubmitComment}>
                    <Form.Item>
                        <Input.TextArea rows={4} value={commentText} 
                        onChange={onChangeCommentText} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" 
                    loading={isAddingComment}>댓글 포스트</Button>
                </Form>
        </div>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm;