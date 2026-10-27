import { FC, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import type { UpsItem } from "../mock";

export const GridPage: FC = () => {
  const { cards } = useOutletContext<{ cards: UpsItem[] }>();
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const navigate = useNavigate();

  const filtered = cards.filter(c => c.capacity >= minCapacity);

  return (
    <div className="grid-container">
      <h3>Каталог ИБП</h3>
      
      <div className="filter-form">
        <input 
          type="number" 
          placeholder="Мин. ёмкость (А·ч)"
          value={minCapacity || ''} 
          onChange={(e) => setMinCapacity(Number(e.target.value))} 
        />
      </div>

      <div className="cards-grid">
        {filtered.map(card => (
          <div 
            key={card.id} 
            className="grid-card" 
            onClick={() => navigate(`/detail/${card.id}`)}
          >
            <img 
              src={card.image_url || "/default.png"} 
              alt={card.ups_name} 
              className="card-img" 
            />
            <div className="card-details">
              <h4>{card.ups_name}</h4>
              <div className="card-param">{card.capacity} А·ч</div>
              <div className="card-likes">♥ {card.likes_count}</div>
            </div>
          </div>
        ))}
      </div>
      {!filtered.length && <p style={{ textAlign: 'center', marginTop: 20 }}>Ничего не найдено</p>}
    </div>
  );
};