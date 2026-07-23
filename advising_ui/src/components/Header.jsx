function Header({ backendStatus }) {
  const connected =
    backendStatus === "Backend connected successfully";

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          🎓
        </div>

        <div className="header__title">
          <h1>AI Academic Advisor</h1>
          <p>
            AI-powered degree planning & graduation optimization
          </p>
        </div>
      </div>

      <div className="header__right">
        <div
          className={`backend-status ${
            connected ? "backend-online" : "backend-offline"
          }`}
        >
          <span className="backend-dot"></span>

          {connected ? "Backend Connected" : "Backend Offline"}
        </div>
      </div>
    </header>
  );
}

export default Header;