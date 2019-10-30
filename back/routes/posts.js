const express = require('express');
const db = require('../models');
const router = express.Router();


router.get('/', async (req,res,next) => {
    try{
        const posts = await db.Post.findAll({
            include: [{ model: db.User, attributes:['id', 'nickname']}],
            order: [['createdAt', 'DESC']],
        });
        res.json(posts);

    }catch(e){
        console.error(e);
        next(e);
    }
});

router.post('/', (req,res) => {

});

router.get('/', (req,res) => {

});

module.exports = router;
