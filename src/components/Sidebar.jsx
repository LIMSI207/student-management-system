export default function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Students", icon: "🎓" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🎓</span>
        <h2>StudentHub</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`nav-item ${
              currentPage === item.name ? "active" : ""
            }`}
            onClick={() => setCurrentPage(item.name)}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Student Management</p>
      </div>
    </aside>
  );
}
