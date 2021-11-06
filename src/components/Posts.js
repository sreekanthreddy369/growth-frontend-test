import React, { useState, useEffect, useContext } from "react";
import { get } from "lodash";
import requester from "../requester";
import Post from "./Post";
import { PostsContext } from "./PostsContext";

const Posts = () => {
  const [posts, setPosts] = useContext(PostsContext);

  useEffect(() => {
    if (posts.length === 0) {
      const {
        REACT_APP_GOOGLE_API_KEY = "",
        REACT_APP_PLAYER_LIST_ID = "UUTI5S0PqpgB0DbYgcgRU6QQ",
        REACT_APP_MAX_RESULTS = 5
      } = process.env;
      const postsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails
        %2Cstatus&maxResults=${REACT_APP_MAX_RESULTS}&playlistId=${REACT_APP_PLAYER_LIST_ID}&key=${REACT_APP_GOOGLE_API_KEY}`;

      requester(postsUrl)
        .then(data => {
          const postData = get(data, "data.items", []);
          setPosts(postData);
        })
        .catch(err => {
          console.error(err);
          setPosts([]);
        });
    }
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
