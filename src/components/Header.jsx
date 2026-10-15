export default function Header({
  currentPage,
  search,
  setSearch,
}) {
  return (
    <header className="header">
      <div className="header-title">
        <h1>{currentPage}</h1>
        <p>Welcome back! Manage your students easily.</p>
      </div>

      <div className="header-tools">
        <div className="header-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search name, roll no, email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="profile">
          <div className="profile-avatar">L</div>
          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
