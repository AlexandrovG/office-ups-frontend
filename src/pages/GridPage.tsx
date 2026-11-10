import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchUpsList, setFilterMin } from '../slices/upsSlice';
import { Card, Col, Row, Form, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const GridPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, filterMinCapacity } = useSelector((state: RootState) => state.ups);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUpsList());
  }, [dispatch]);

  const handleFilterChange = (e: any) => {
    dispatch(setFilterMin(Number(e.target.value)));
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Каталог ИБП</h4>
      <Form.Group className="mb-3 d-flex gap-2">
        <Form.Control 
          type="number" 
          value={filterMinCapacity || ''} 
          onChange={handleFilterChange} 
          placeholder="Мин. ёмкость (А·ч)"
        />
        <Button variant="primary" onClick={() => dispatch(fetchUpsList())}>Поиск</Button>
      </Form.Group>

      {loading ? (
        <div className="text-center mt-5"><Spinner animation="border" /></div>
      ) : (
        <Row xs={2} className="g-2">
          {items.map(card => (
            <Col key={card.id}>
              <Card onClick={() => navigate(`/detail/${card.id}`)} style={{ cursor: 'pointer' }}>
                <Card.Img 
                  variant="top" 
                  src={card.image_url || "/no-image.png"} 
                  onError={(e) => {
                    e.currentTarget.src = "/no-image.png";
                  }}
                  style={{ height: 120, objectFit: "cover" }} 
                />
                <Card.Body className="p-2">
                  <Card.Title style={{ fontSize: 14 }}>{card.ups_name}</Card.Title>
                  <Card.Text className="mb-0" style={{ fontSize: 12 }}>
                    {card.capacity} А·ч
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};