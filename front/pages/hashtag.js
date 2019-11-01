import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';


const Hashtag = ({tag}) => {
    console.log('!해쉬테그의TAG:',tag);
    
    const dispatch = useDispatch();
    const {mainPosts} = useSelector( state => state.post);

    useEffect ( () => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        })
    } , []);
    
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
    return { tag: context.query.tag };
};

export default Hashtag;