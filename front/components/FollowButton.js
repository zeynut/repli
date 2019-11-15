import React , { memo } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import PropType from 'prop-types';

const FollowButton = memo( ({ post , onFollow , onUnfollow }) => {
    const { me } = useSelector( state => state.user);
        
    return (
             !me || post.User.id === me.id ?
              null : me.Followings && me.Followings.find( v => v.id === post.User.id) ?
              <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button> 
              : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
            );
});

FollowButton.propType = {
    post : PropType.object.isRequired,
    onUnfollow: PropType.func.isRequired,
    onFollow: PropType.func.isRequired,
}

export default FollowButton;