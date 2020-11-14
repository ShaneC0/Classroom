import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const [classMenu, setClassMenu] = useState(false);
  const [menu, setMenu] = useState(false);
  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);
  const showMenu = () => setMenu(!menu);
  const showClassMenu = () => setClassMenu(!classMenu);

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
            <button onClick={showClassMenu}>
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
          {props.loggedIn ? (
            <>
              <li>{props.user.email}</li>
              <li
                onClick={() => {
                  history.push("/");
                  props.logOut();
                }}
              >
                <i className="fas fa-sign-out-alt"></i> &nbsp;
                <Link to="">Log Out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <i className="fas fa-user-circle"></i> &nbsp;
                <Link to="/signin">Sign in</Link>
              </li>
              <li>
                <i className="fas fa-plus"></i> &nbsp;
                <Link to="/signup">Create account</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className={classMenu ? "menu" : "menu-disabled"}>
        <ul>
          <li>
          <i className="fas fa-sign-in-alt"></i> &nbsp;
            <Link to="/joinclass">Join class</Link>
          </li>
          <li>
          <i className="fas fa-plus"></i> &nbsp;
            <Link to="/createclass">Create class</Link>
          </li>
        </ul>
      </div>

      <div className={sidebar ? "sidebar" : "sidebar-disabled"}>
        <ul>
          <li>
            <Link to="/classes">Classes</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
