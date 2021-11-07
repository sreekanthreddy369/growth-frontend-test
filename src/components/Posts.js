import React, { useState, useEffect, useContext } from "react";
import { get } from "lodash";
import requester from "../requester";
import Post from "./Post";
import { PostsContext } from "./PostsContext";

const Posts = () => {
  const [posts, setPosts] = useContext(PostsContext);
  const [pageCount, setPageCount] = useState(1);
  const [canShowMorePosts, setCanShowMorePosts] = useState(false);

  const retrivePosts = (pageToken = null) => {
    const {
      REACT_APP_GOOGLE_API_KEY = "",
      REACT_APP_PLAYER_LIST_ID = "UUTI5S0PqpgB0DbYgcgRU6QQ",
      REACT_APP_MAX_RESULTS = 5
    } = process.env;
    let postsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails
        %2Cstatus&maxResults=${REACT_APP_MAX_RESULTS}&playlistId=${REACT_APP_PLAYER_LIST_ID}&key=${REACT_APP_GOOGLE_API_KEY}`;

    if (pageToken) {
      postsUrl += `&pageToken=${pageToken}`;
    }
    requester(postsUrl)
      .then(data => {
        const postData = get(data, "data.items", []);
        const pageToken = get(data, "data.nextPageToken", "");
        const totalResults = get(data, "data.pageInfo.totalResults");

        const newPostsObject = {
          items: [...posts.items, ...postData],
          nextPageToken: pageToken,
          totalResults
        };
        setPosts(newPostsObject);

        if (
          newPostsObject.totalResults > 0 &&
          newPostsObject.items.length < newPostsObject.totalResults
        ) {
          setCanShowMorePosts(true);
        } else {
          setCanShowMorePosts(false);
        }
      })
      .catch(err => {
        console.error(err);
        const postsData = {
          items: [],
          nextPageToken: "",
          totalResults: 0
        };

        setPosts(postsData);
      });
  };

  useEffect(() => {
    if (posts.items.length === 0) {
      retrivePosts();
    } else {
      if (posts.nextPageToken) {
        retrivePosts(posts.nextPageToken);
      }
    }
  }, [pageCount]);

  const loadMorePosts = () => {
    if (canShowMorePosts) {
      setPageCount(pageCount + 1);
    }
  };

  return (
    <div>
      {posts.items.length === 0 ? "There are no Posts to display!" : null}
      {posts.items.map(post => (
        <Post key={post.id} post={post} />
      ))}

      {canShowMorePosts ? (
        <button className="load-more-posts-btn" onClick={loadMorePosts}>
          Load More
        </button>
      ) : null}
    </div>
  );
};

export default Posts;
