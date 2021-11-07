import React from "react";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import { truncateText, generatePostMeta } from "../helpers";

const Post = ({ post }) => {
  const { id, snippet, contentDetails } = post;

  const title = get(snippet, "title", "");
  const description = get(snippet, "description", "");
  const videoOwnerChannelTitle = get(snippet, "videoOwnerChannelTitle", "");
  const channelTitle = get(snippet, "channelTitle", "");
  const mediumImg = get(snippet, "thumbnails.medium.url", "");
  const videoPublishedAt = get(contentDetails, "videoPublishedAt", new Date());
  const altForThumbnail = `${channelTitle} Thumbnail`;

  const history = useHistory();

  return (
    <div className="post-block" onClick={() => history.push(`/posts/${id}`)}>
      <div className="img-container">
        <img src={mediumImg} alt={altForThumbnail} />
      </div>
      <div className="desc-container">
        <h1 className="post-title"> {truncateText(title, 100)} </h1>
        <p className="post-desc"> {truncateText(description, 150)} </p>
        <p className="post-meta">
          <span>
            {generatePostMeta(videoPublishedAt, videoOwnerChannelTitle)}{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Post;
