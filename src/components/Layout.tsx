import { Link, NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand" aria-label="홈으로">
          <span className="brand-mark">M</span>
          <span>Moira</span>
        </Link>
        <nav className="nav" aria-label="메인 메뉴">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/about">소개</NavLink>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          Moira · 운명을 비추는 타로 · ⓒ {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
