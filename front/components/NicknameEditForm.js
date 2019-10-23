import React from 'react';
import { Form , Input, Button } from 'antd';

const NicknameEditForm = () => {
    return (
        <div>
              <Form style={{ marginTop: "20px" , border: " 1px solid #d9d9d9", padding: "15px"}}>
                    <Input addonBefore="닉네임"></Input>
                    <Button type="primary">수정</Button>
              </Form>
        </div>
       
    );
};
export default NicknameEditForm;