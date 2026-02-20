import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

function Playvideo({videoId}) {

  
   
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    // Fetching Videos Data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=IN&key=${API_KEY}`;
    try {
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      setApiData(data?.items?.[0] || null);
    } catch (err) {
      console.error("fetchVideoData error:", err);
    }
  };

  const fetchotherData = async () => {
    if (!apiData?.snippet) return;
    try {
      //Fetching channel Data
      const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const chRes = await fetch(channelDetails_url);
      const chData = await chRes.json();
      setChannelData(chData?.items?.[0] || null);

      //Fetching comment Data
      const commentsDetails_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
      const cRes = await fetch(commentsDetails_url);
      const cData = await cRes.json();
      setCommentData(cData?.items || []);
    } catch (err) {
      console.error("fetchotherData error:", err);
    }
  };

  useEffect(() => {
    if (videoId) fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) fetchotherData();
  }, [apiData, videoId]);

  return (
    <div className="play-video">
      <iframe
        title="YouTube video player"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <h3>{apiData ? apiData.snippet.title : "Tittle Here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"}
          Views &bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />
            742
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || user_profile}
          alt="channel icon"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "tittle"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1m"}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData ? apiData.snippet.description.slice(0, 250) : "Description"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 111}
          Comments
        </h4>
        {commentData?.map((items, index) => {
          const comment = items?.snippet?.topLevelComment?.snippet;
          if (!comment) return null;
          return (
            <div key={items.id || index} className="comment">
              <img src={comment.authorProfileImageUrl || user_profile} alt="user avatar" />
              <div>
                <h3>
                  {comment.authorDisplayName}
                  <span>{moment(comment.publishedAt).fromNow()}</span>
                </h3>
                <p dangerouslySetInnerHTML={{ __html: comment.textDisplay }} />
                <div className="comment-action">
                  <img src={like} alt="like" />
                  <span>{comment.likeCount ? value_converter(comment.likeCount) : 0}</span>
                  <img src={dislike} alt="dislike" />
                </div>
              </div>
            </div>
          );
        })
      </div>
    </div>
  );
}

export default Playvideo;
