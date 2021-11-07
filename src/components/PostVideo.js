import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { get } from "lodash";
import { PostsContext } from "./PostsContext";

const PostVideo = () => {
  const [posts, setPosts] = useContext(PostsContext);
  const { id } = useParams();
  let error;
  const post = posts.find(p => p.id === id);
  if (!post) error = "The Post does not exists! please try again!";

  const videoUrl = `https://www.youtube.com/embed/${get(
    post,
    "snippet.resourceId.videoId",
    null
  )}`;

  const title = get(post, "snippet.title", "");
  const description = get(post, "snippet.description", "");

  return (
    <>
      {error ? (
        <div className="error-post">{error}</div>
      ) : (
        <div className="post-video-container">
          <h1 className="post-video-title">{title}</h1>
          <p className="post-desc">{description}</p>

          <iframe className="post-video-frame" width="540" height="480" src={videoUrl}></iframe>
        </div>
      )}
    </>
  );
};

export default PostVideo;
