import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { UpsItem } from "../mock";

export const FeedPage: FC = () => {
  const { cards } = useOutletContext<{ cards: UpsItem[] }>();
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const item = cards[index];

  if (!item) return <div>Нет данных</div>;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setExpanded(false);
    setLiked(false);
  };

  return (
    <div className="feed-container">
      {item.video_url ? (
        <video src={item.video_url} autoPlay loop muted playsInline className="feed-video" />
      ) : (
        <img 
          src={item.image_url || "/default.png"} 
          alt={item.ups_name} 
          className="feed-video" 
        />
      )}

      <div className="feed-overlay-info">
        <h3>{item.ups_name}</h3>
        <p style={{ fontSize: 12, margin: '4px 0' }}>
          {expanded ? item.description : `${item.description.substring(0, 40)}...`}
          <span 
            style={{ color: "#9CA3AF", cursor: "pointer", marginLeft: 5, fontSize: 12 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Свернуть" : "Ещё"}
          </span>
        </p>
        <div style={{ fontWeight: "bold", fontSize: 13, marginTop: 6 }}>
          ⚡ {item.capacity} А·ч &nbsp;|&nbsp; Ток {item.max_current} А
        </div>
      </div>

      <div className="feed-overlay-actions">
        <button className="action-btn" onClick={() => setLiked(!liked)}>
          <span style={{ color: liked ? "#EF4444" : "white" }}>♥</span>
          <span>{item.likes_count + (liked ? 1 : 0)}</span>
        </button>
        <button className="action-btn" onClick={handleNext}>
          ➔
        </button>
      </div>
    </div>
  );
};