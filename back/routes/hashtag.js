const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async( req,res,next) => {
    try{
        console.log('!레큐파람스테그:',req.params.tag);
        const posts =  await db.Post.findAll({
            include:[{ model :db.Hashtag, where : {name: decodeURIComponent(req.params.tag)}},
                     { model: db.User, attributes:['id','nickname']},
                     { model : db.Image},
                     { model: db.User, through: 'Like', as: 'Likers', attributes: ['id']},
                     { model: db.Post, as: 'Retweet',include:[{ model: db.User , attributes:['id', 'nickname']}] },
                    ],
        });
        console.log('!hashtag_posts결과는:',posts);
        res.json(posts);

    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;