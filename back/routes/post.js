const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req,res,next)=> {
    try{
        const 

    }catch(e){
        console.error(e);
    }

});

router.post('/', async (req,res,next)=> {
    try{
        const hashtags = req.body.content.match(/#[^\s]+/g);
        
        const newPost = await db.Post.create({
            content: req.body.content,
            UseId: req.user.id
        });

        if(hashtags){
            const result = await Promise.all(hashtags.map(
                tag => db.Hashtag.findOrCreate({where: { name: tag.slice(1).toLowerCase()},
                })
            ));
            console.log('result: ', result);
            await newPost.addHashtags(result.map( r => r[0]));
        }

        const fullPost = await db.Post.findOne({
            where:{ id: newPost.id },
            include: [{ model: db.User}],
        });

        res.json(fullPost);

    }catch(e){
        console.error(e);
        next(e);
    }

});


module.exports = router;