import { FC } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { MOCK_DATA } from "../mock";

export const AppLayout: FC = () => {
  return (
    <>
      <main style={{ flex: 1 }}>
        <Outlet context={{ cards: MOCK_DATA }} />
      </main>
      
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Лента</NavLink>
        <span className="disabled">Добавление</span>
        <NavLink to="/grid" className={({ isActive }) => isActive ? "active" : ""}>Плитка</NavLink>
        <span className="disabled">Вход</span>
      </nav>
    </>
  );
};