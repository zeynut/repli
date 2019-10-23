import React, { useState, useCallback } from 'react';    //usefallback 사용
import PropTypes from 'prop-types';
import {Form , Input, Checkbox, Button } from 'antd';


const Signup = () => {
    
    const [passwordCheck , setPasswordCheck] = useState('');
    const [term , setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const useInput = (initValue = null ) => {
        const [value , setter] = useState(initValue);
        const handler = useCallback( (e) => {       //usefallback 사용
            setter(e.target.value);
        } , []);

        return [value, handler];

    }

    const [id , onChangeId] = useInput('');
    const [password , onChangePassword ] = useInput('');
    const [nick , onChangeNick] = useInput('');

    const onSubmit = useCallback( (e) => {      //usefallback 사용
        e.preventDefault();
        if(password !== passwordCheck ){
            return setPasswordError(true);
        } 
        if(!term){
            return setTermError(true);
        } 
        console.log({
            id, nick, password,passwordCheck, term
        });

    } , [password, passwordCheck , term ]);
   
    const onChangePasswordChk = useCallback( (e) => {       //usefallback 사용
        setPasswordError(e.target.value !== password );
        setPasswordCheck(e.target.value);
    } , [password]);

    const onChangeTerm = useCallback( (e) => {       //usefallback 사용
        setTermError(false);
        setTerm(e.target.checked);
    } , []);
    
    return (
        <>
        <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
           <label htmlFor="user-id">아이디</label>
            <br/>
            <Input name="user-id" value={id} required onChange={onChangeId}></Input>
        </div>
        <div>
            <label htmlFor="user-nick">닉네임</label>
            <br/>
            <Input name="user-nick" value={nick}  required onChange={onChangeNick}></Input>
        </div>
        <div>
           <label htmlFor="user-password">비밀번호</label>
            <br/>
            <Input name="user-password" value={password} type="password" required onChange={onChangePassword}></Input>
        </div>
        <div>
        <label htmlFor="user-password-check">비밀번호체크</label>
            <br/>
        <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePasswordChk}></Input>
        {passwordError && <div style={{ color: 'red' }}>비번이 일치하지 않습니다.</div>}
        </div>
        <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
            {termError && <div style={{ color: 'red'}}>약관에 동의해주세요.</div>}
        </div> 
        <div style={{ marginTop : 20}}>
            <Button type="danger" htmlType="submit">가입하기</Button>
        </div>
        </Form>
        </>
    );
};

Signup.proptypes = {

}

export default Signup;