import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchUpsList } from '../slices/upsSlice';

export const FeedPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  

  const { items } = useSelector((state: RootState) => state.ups);
  
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);


  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchUpsList());
    }
  }, [dispatch, items.length]);

  const item = items[index];

  if (!item) return <div className="p-3">Загрузка...</div>;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
    setExpanded(false);
    setLiked(false);
  };

  return (
    <div className="feed-container">
      {item.video_url ? (
        <video src={item.video_url} autoPlay loop muted playsInline className="feed-video" />
      ) : (
        <img 
          src={item.image_url || "/no-image.png"} 
          alt={item.ups_name} 
          onError={(e) => { e.currentTarget.src = "/no-image.png"; }}
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