import { Link } from "react-router-dom"
import { useState } from "react"


function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
    <header>
      <nav>
        <div>
          <button onClick={showSidebar}><i className="fas fa-bars nav-item"></i></button>
          <Link to="/"><h2 className="nav-item">Classroom</h2></Link>
        </div>

        <div>
          <button><i className="fas fa-plus nav-item"></i></button>
          <Link to="/signup"><i className="fas fa-circle nav-item"></i></Link>
        </div>
      </nav>
    </header>
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
