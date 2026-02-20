import React, { useEffect, useState } from "react";
import "./Recommented.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

function Recommented({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items || []));
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommented">
      {apiData.map((items, index) => {
        const snippet = items?.snippet || {};
        const thumb = snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || thumbnail1;
        const title = snippet.title || "No title";
        const channel = snippet.channelTitle || "Unknown";
        const views = items?.statistics?.viewCount ? value_converter(items.statistics.viewCount) : "0";
        return (
          <Link to={`/video/${items.id}`} key={items.id || index} className="side-video-list">
            <img src={thumb} alt={title} />
            <div className="vid-info">
              <h4>{title.slice(0, 60)}</h4>
              <p>{channel}</p>
              <p>{views} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  )
}

export default Recommented;
