import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';


const Hashtag = ({tag}) => {
    console.log('!해쉬테그의TAG:',tag);
    
    const {mainPosts} = useSelector( state => state.post);

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