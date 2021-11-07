import React, {useState, createContext} from 'react'

export const PostsContext = createContext();

export const PostsProvider = props => {
    const postsData = {
        items: [],
        nextPageToken: '',
        totalResults: 0
    }
    const [posts, setPosts] = useState(postsData);

    return (
        <PostsContext.Provider value={[posts, setPosts]}>
            {props.children}
        </PostsContext.Provider>
    )
}