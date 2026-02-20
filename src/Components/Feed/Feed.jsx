import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
// import thumbnail2 from "../../assets/thumbnail2.png";
// import thumbnail3 from "../../assets/thumbnail3.png";
// import thumbnail4 from "../../assets/thumbnail4.png";
// import thumbnail5 from "../../assets/thumbnail5.png";
// import thumbnail6 from "../../assets/thumbnail6.png";
// import thumbnail7 from "../../assets/thumbnail7.png";
// import thumbnail8 from "../../assets/thumbnail8.png";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

function Feed({ category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const VideoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    try {
      const response = await fetch(VideoList_url);
      const data = await response.json();
      setData(data?.items || []);
    } catch (err) {
      console.error("Feed fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((items,index) => {
        return (
          <Link to={`/video/${items.id}`} className="card">
            <img src={items.snippet.thumbnails.medium.url} alt="" />
            <h2>{items.snippet.title}</h2>
            <h3>{items.snippet.channelTitle}</h3>
            <p>{value_converter(items.statistics.viewCount)} Views &bull; {moment(items.snippet.publishedAt).fromNow()}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;
