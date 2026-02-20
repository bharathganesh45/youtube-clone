import React from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobile from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import parithabangal from "../../assets/parithabangal.jpg";
import village from "../../assets/village.jpg";
import academy from "../../assets/4gsilver.jpg";
import rishipedia from "../../assets/Rishi.jpg";
import epaphra from "../../assets/epaphra.png";

function Sidebar({sidebar, category, setCategory}) {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
      <div className="shortcut-links">
        <div className={`side-links ${category===0?"active":""}`} onClick={() => setCategory(0)}>
          <img src={home} alt="" />
          <span>Home</span>
        </div>
        <div className={`side-links ${category===20?"active":""}`} onClick={() => setCategory(20)}>
          <img src={game_icon} alt="" />
          <span>Gaming</span>
        </div>
        <div className={`side-links ${category===2?"active":""}`} onClick={() => setCategory(2)}>
          <img src={automobile} alt="" />
          <span>Automobile</span>
        </div>
        <div className={`side-links ${category===17?"active":""}`} onClick={() => setCategory(17)}>
          <img src={sports} alt="" />
          <span>Sports</span>
        </div>
        <div className={`side-links ${category===24?"active":""}`} onClick={() => setCategory(24)}>
          <img src={entertainment} alt="" />
          <span>Entertainment</span>
        </div>
        <div className={`side-links ${category===28?"active":""}`} onClick={() => setCategory(28)}>
          <img src={tech} alt="" />
          <span>Tech</span>
        </div>
        <div className={`side-links ${category===10?"active":""}`} onClick={() => setCategory(10)}>
          <img src={music} alt="" />
          <span>Music</span>
        </div>
        <div className={`side-links ${category===22?"active":""}`} onClick={() => setCategory(22)}>
          <img src={blogs} alt="" />
          <span>Blogs</span>
        </div>
        <div className={`side-links ${category===25?"active":""}`} onClick={() => setCategory(25)}>
          <img src={news} alt="" />
          <span>News</span>
        </div>
        <hr />
      </div>
      <div className="subscribed-list">
        <h3>Subscribed</h3>
        <div className="side-links">
          <img src={parithabangal} alt="" />
          <span>Parithabangal</span>
        </div>
        <div className="side-links">
          <img src={epaphra} alt="" />
          <span>Epaphra</span>
        </div>
        <div className="side-links">
          <img src={academy} alt="" />
          <span>4G Silver Academy</span>
        </div>
        <div className="side-links">
          <img src={rishipedia} alt="" />
          <span>Rishipedia</span>
        </div>
        <div className="side-links">
          <img src={village} alt="" />
          <span>Village Cooking Chanel</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
