import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';


const Hashtag = ({tag}) => {
    console.log('!해쉬테그의TAG:',tag);
    
    const {mainPosts,hasMorePost} = useSelector( state => state.post);
    
    const onScroll = useCallback(  () => {
      if(window.scrollY + document.documentElement.clientHeight 
        > document.documentElement.scrollHeight -300){  
        if(hasMorePost){
            dispatch({
                type: LOAD_HASHTAG_POSTS_REQUEST.REQUEST,
                lastId: mainPosts[mainPosts.length - 1].id,
                data: tag,
            });
        }
        }
    } , [hasMorePost , mainPosts.length]);

    useEffect( () => { 
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
       };
   }, [mainPosts.length]);

    return (
        <div>
            {mainPosts.map( c => (
                console.log(c),
                <PostCard key={+c.createdAt} post={c} />
            ))}
        </div>
    );
};

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
}

Hashtag.getInitialProps = async (context) => {
    console.log('!해쉬테그겟이니셜프롭스: ',context.query.tag);
    
    const tag = context.query.tag;

    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag
    })

    return { tag : tag };
};

export default Hashtag;