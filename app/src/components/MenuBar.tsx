// React
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faCircleInfo,
	faHome,
	faSearch,
	faWrench
} from "@fortawesome/free-solid-svg-icons";
import {
	faSoundcloud,
	faYoutube
} from "@fortawesome/free-brands-svg-icons";

// Components
import "./MenuBar.scss";
import { useAppContext } from "../ApplicationContext";

const MenuBar = () => {
	const { appState } = useAppContext();

	if (appState?.menuBarHidden) {
		return <></>;
	}

	/* Each navbar item has an index, and it highlights the selected
		 menu icon if its index matches the current app state. */
	const selectedClass = (index: number) => {
		if (appState?.menuSelectedIndex === index) {
			return "menu-selected";
		}
		return "";
	};

	return (
		<div className="menu-container d-flex">
			<Navbar className="menu-bar flex-column">
				<Navbar.Toggle aria-controls="main-menu-bar"/>
				<Navbar.Collapse id="main-menu-bar">
					<Nav className="flex-column">
						<Nav.Link as={Link} to='/home'>
							<FontAwesomeIcon
								icon={faHome}
								size="2xl"
								className={`${selectedClass(0)} app-home`}
							/>
						</Nav.Link>
						<Nav.Link as={Link} to='/search'>
							<FontAwesomeIcon
								icon={faSearch}
								size="2xl"
								className={`${selectedClass(1)} app-search`}
							/>
						</Nav.Link>
						<Nav.Link as={Link} to='/search/youtube/'>
							<FontAwesomeIcon
								icon={faYoutube}
								size="2xl"
								className={`${selectedClass(2)} youtube`}
							/>
						</Nav.Link>
						<Nav.Link as={Link} to='/search/soundcloud/'>
							<FontAwesomeIcon
								icon={faSoundcloud}
								size="2xl"
								className={`${selectedClass(3)} soundcloud`}
							/>
						</Nav.Link>
						<Nav.Link as={Link} to='/settings'>
							<FontAwesomeIcon
								icon={faWrench}
								size="2xl"
								className={`${selectedClass(4)} settings`}
							/>
						</Nav.Link>
						<Nav.Link as={Link} to='/info'>
							<FontAwesomeIcon
								icon={faCircleInfo}
								size="2xl"
								className={`${selectedClass(5)} info`} />
						</Nav.Link>
						<Nav.Link as={Link} to='/login'>
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
};

export default MenuBar;
