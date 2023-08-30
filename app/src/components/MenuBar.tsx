import { Nav, Navbar } from "react-bootstrap";
import { useAppContext } from "../ApplicationContext";
import './MenuBar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleInfo, faWrench } from "@fortawesome/free-solid-svg-icons";
import { faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";

const MenuBar = () => {
  const { appState } = useAppContext();

  if (appState?.menuBarHidden) {
    return <></>
  }

  const selectedClass = (index: number) => {
    if (appState?.menuSelectedIndex === index) {
      return "menu-selected";
    }
    return "";
  }

  return (
    <div className="menu-container d-flex">
      <Navbar className="menu-bar flex-column">
        <Navbar.Toggle aria-controls="main-menu-bar"/>
        <Navbar.Collapse id="main-menu-bar">
          <Nav className="flex-column">
            <Nav.Link>
              <FontAwesomeIcon
                icon={faYoutube}
                size="2xl"
                className={`${selectedClass(0)} youtube`}/>
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon
                icon={faSoundcloud}
                size="2xl"
                className={`${selectedClass(1)} soundcloud`} />
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon
                icon={faWrench}
                size="2xl"
                className={`${selectedClass(2)} settings`} />
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon
                icon={faCircleInfo}
                size="2xl"
                className={`${selectedClass(3)} info`} />
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="2xl"
                className="logout"/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MenuBar;
