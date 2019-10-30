const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

//사용자 불러오기
router.get('/', (req,res) => {
    if(!req.user){
        return res.status(401).send('로그인 정보가 없습니다.');
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});


router.post('/' , async(req,res,next) => {
    try{
        const exUser = await db.User.findOne({
            where:{ userId: req.body.userId},
        });
        if(exUser){
            return res.status(403).send('이미 사용하는 아이디가 있습니다. 사용불가');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword
        });
        console.log('회원가입완료: ',newUser);
        return res.status(200).json(newUser);

    }catch(e){
        console.error(e);
        
        return next(e);
    }
});

router.post('/login', (req,res,next) => {
    passport.authenticate('local', (err,user,info)=> {
        if(err){
            console.error(e);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login( user, async (loginErr) => {
           try{
                if(loginErr){
                return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: {id: user.id},
                    include: [{model: db.Post, as: 'Posts', attributes:['id']},
                              {model: db.User, as: 'Followings', attributes:['id']},
                              {model: db.User, as: 'Followers', attributes: ['id']}],
                    attributes: ['id', 'nickname','userId'],
                });
                console.log('fulluser는: ', fullUser);
                return res.json(fullUser);
                // const filteredUser = Object.assign({}, user.toJSON());
                //     delete filteredUser.password;
                //      return res.json(filteredUser);
           }catch(e){
               console.error(e);
               next(e);
           }
           
        });
    })(req,res,next);
});


router.post('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send('logout성공!');    
});

router.get('/:id', (req,res) => {
    
});

router.get('/:id/follow', (req,res) => {
    
});

router.post('/:id/follow', (req,res) => {
    
});

router.delete('/:id/follow', (req,res) => {
    
});

router.delete('/:id/follower', (req,res) => {
    
});

router.get('/:id/posts', (req,res) => {
    
});

module.exports = router;