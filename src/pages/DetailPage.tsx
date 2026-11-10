import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { UpsItem } from "../mock";

export const DetailPage = () => {
  const { id } = useParams();
  const { items } = useSelector((state: RootState) => state.ups);
  const [item, setItem] = useState<UpsItem | null>(null);

  useEffect(() => {
    const found = items.find(c => c.id === Number(id));
    if (found) setItem(found);
  }, [id, items]);

  if (!item) return <div className="p-3">Загрузка...</div>;

  return (
    <div style={{ padding: '16px', paddingBottom: '80px' }}>
      <img 
        src={item.image_url || "/no-image.png"} 
        alt={item.ups_name}
        onError={(e) => { e.currentTarget.src = "/no-image.png"; }}
        style={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 6, border: '1px solid #E2E5E9' }} 
      />
      <h2 style={{ fontSize: 20, color: '#1F2429', marginTop: 16 }}>{item.ups_name}</h2>
      <p style={{ color: '#6B7280', fontSize: 14, marginTop: 8 }}>{item.description}</p>
      
      <h4 style={{ fontSize: 16, color: '#1F2429', marginTop: 24, marginBottom: 12 }}>
        Характеристики:
      </h4>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E2E5E9', borderRadius: '6px', overflow: 'hidden' }}>
        <tbody>
          {item.attributes && item.attributes.map((attr) => (
            <tr key={attr.id} style={{ borderBottom: '1px solid #E2E5E9' }}>
              <td style={{ padding: '10px 12px', color: '#6B7280', fontSize: 14, width: '50%', background: '#F4F5F7' }}>
                {attr.name}
              </td>
              <td style={{ padding: '10px 12px', color: '#1F2429', fontSize: 14, fontWeight: 'bold', background: '#FFFFFF' }}>
                {attr.value || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};