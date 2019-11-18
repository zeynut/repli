import React, { useEffect, useCallback, useRef} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch , useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector( state => state.user) ;
    const mainPosts = useSelector( state => state.post.mainPosts );
    const hasMorePost = useSelector( state => state.post.hasMorePost );
   
    const countRef = useRef([]);
    
    const onScroll = useCallback(  () => {
        if( window.scrollY + document.documentElement.clientHeight >
               document.documentElement.scrollHeight - 300){
               if(hasMorePost){
                   const lastId = mainPosts[mainPosts.length -1].id;
                   if(!countRef.current.includes(lastId)){
                       dispatch({
                           type: LOAD_MAIN_POSTS_REQUEST,
                           lastId,
                           date: +new Date(),
                       });
                       countRef.current.push(lastId);
                   }
                }
       }
   }, [hasMorePost , mainPosts.length]);

    useEffect( () => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };

    } , [mainPosts.length]);

    return (
        <>
        <div>
            {me && <PostForm/>}
            {mainPosts.map( c => ( <PostCard key={c.createdAt + c.User.id}  post={c} />))}
        </div>
        </>
    );
}

Home.getInitialProps = async ( context ) => {
    console.log('!겟이니셜프롭스의 context의내용:' , Object.keys(context));
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
}

export default Home;
