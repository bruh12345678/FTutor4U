import "./navBar.css";

const Header: React.FC = () => {
  return (
    <header className="header">
        <h1 className="logo">FTUTOR4U</h1>
        <nav className="nav-links">
            <ul>
                <li><a href="/homepage" className="nav-item">Home</a></li>
                <li><a href="/news" className="nav-item">News</a></li>
                <li><a href="/search" className="nav-item">Search</a></li>
            </ul>
            <a href="/login" className="logout">Logout</a>
        </nav>
    </header>
  );
};

export default Header;