import { FC } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../slices/authSlice';
import { resetFilters } from '../slices/upsSlice';
import axios from 'axios';

export const AppLayout: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch(e) {}
    dispatch(logout());
    dispatch(resetFilters());
    navigate('/');
  };

  return (
    <div className="app-shell">
      <main>
        <Outlet />
      </main>
      
      {/* 4 КНОПКИ НИЖНЕЙ ПАНЕЛИ */}
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Лента</NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "active" : ""}>Добавление</NavLink>
        <NavLink to="/grid" className={({ isActive }) => isActive ? "active" : ""}>Плитка</NavLink>
        
        {isAuthenticated ? (
          <span onClick={handleLogout} style={{cursor:'pointer', color:'#ff4757', fontWeight: 'bold'}}>Выйти</span>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Вход</NavLink>
        )}
      </nav>
    </div>
  );
};