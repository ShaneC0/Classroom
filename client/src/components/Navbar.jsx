import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [menu, setMenu] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showMenu = () => setMenu(!menu);

  return (
    <>
      <header>
        <nav>
          <div>
            <button onClick={showSidebar}>
              <i className="fas fa-bars nav-item"></i>
            </button>
            <Link to="/">
              <h2 className="nav-item">Classroom</h2>
            </Link>
          </div>

          <div>
            <button>
              <i className="fas fa-plus nav-item"></i>
            </button>

            <button onClick={showMenu}>
              <i className="fas fa-circle nav-item"></i>
            </button>

          </div>
        </nav>
      </header>

      <div className={menu ? "menu" : "menu-disabled"}>
        <ul>
          <li><Link to="/signin">Sign in</Link></li>
          <li><Link to="/signup">Create account</Link></li>
        </ul>
      </div>

      <div className={sidebar ? "sidebar" : "sidebar-disabled"}>
        <ul>
          <li>Classes</li>
          <li>Calendar</li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
