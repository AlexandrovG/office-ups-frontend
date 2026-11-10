import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';

export const AddPage: FC = () => {
  return (
    <div className="p-3">
      <h4 className="mb-4">Добавление услуги</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Название ИБП</Form.Label>
          <Form.Control type="text" placeholder="Введите название" />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Фото</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Видео</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        
        <Button variant="primary" className="w-100">Далее</Button>
      </Form>
    </div>
  );
};