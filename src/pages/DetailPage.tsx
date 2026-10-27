import { FC, useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import type { UpsItem } from "../mock";

export const DetailPage: FC = () => {
  const { id } = useParams();
  const { cards } = useOutletContext<{ cards: UpsItem[] }>();
  const [item, setItem] = useState<UpsItem | null>(null);

  useEffect(() => {
    const found = cards.find(c => c.id === Number(id));
    if (found) setItem(found);
  }, [id, cards]);

  if (!item) return <div style={{ padding: 20 }}>Загрузка...</div>;

  return (
    <div style={{ padding: '16px', paddingBottom: '80px' }}>
      <img 
        src={item.image_url || "/default.png"} 
        alt={item.ups_name}
        style={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 6, border: '1px solid #E2E5E9' }} 
      />
      <h2 style={{ fontSize: 20, color: '#1F2429', marginTop: 16 }}>{item.ups_name}</h2>
      <p style={{ color: '#6B7280', fontSize: 14, marginTop: 8 }}>{item.description}</p>
      
      <h4 style={{ fontSize: 16, color: '#1F2429', marginTop: 24, marginBottom: 12 }}>Характеристики:</h4>
      <div style={{ border: '1px solid #E2E5E9', borderRadius: 6, overflow: 'hidden' }}>
        {item.attributes.map((attr, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid #E2E5E9', background: index % 2 === 0 ? '#FFFFFF' : '#F4F5F7' }}>
            <span style={{ color: '#6B7280', fontSize: 14 }}>{attr.name}</span>
            <strong style={{ color: '#1F2429', fontSize: 14 }}>{attr.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};