import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import type { AppDispatch } from '../store';

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { login, password });
      dispatch(loginSuccess({ 
        userID: response.data.user_id,
        token: response.data.access_token 
      }));
      navigate('/');
    } catch (error) {
      alert('Ошибка входа. Проверь логин/пароль.');
    }
  };

  return (
    <div className="p-3 mt-5">
      <h3 className="text-center mb-4">Вход в систему</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Логин</Form.Label>
          <Form.Control value={login} onChange={e => setLogin(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="w-100">Войти</Button>
      </Form>
    </div>
  );
};