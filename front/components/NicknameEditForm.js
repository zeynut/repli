import React , { useCallback , useState } from 'react';
import { Form , Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
    const [ editedName , setEditedName ] = useState('');
    const dispatch = useDispatch();
    const { me , isEditingNickname } = useSelector( state => state.user );
    
    const onChangeNickname = useCallback( (e) => {
        setEditedName( e.target.value );
    } , []); 

    const onEditNickname = useCallback( (e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName
        });
    } , [editedName]);

    return (
        <div>
              <Form onSubmit={onEditNickname} 
                    style={{ marginTop: "20px" , 
                             border: " 1px solid #d9d9d9", 
                             padding: "15px"}}>
                    <Input addonBefore="닉네임"
                           value={ editedName || me && me.nickname } 
                           onChange={onChangeNickname}>
                    </Input>
                    <Button type="primary" htmlType="submit" loading={isEditingNickname}>수정</Button>
              </Form>
        </div>
       
    );
};
export default NicknameEditForm;