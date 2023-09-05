// React
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Components
import Titlebar from "./components/Titlebar";
import AppContainer from "./components/AppContainer";
import MenuBar from "./components/MenuBar";
import { ApplicationProvider } from "./ApplicationContext";

// Pages
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
import LoginScreen from "./pages/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<ApplicationProvider>
			<AppContainer>
				<Titlebar />
				<div className="screen">
					<HashRouter>
						<MenuBar />
						<Routes>
							<Route path="/home" element={<Home />}/>
							<Route path="/login" element={<LoginScreen />}/>
							<Route path='/search/:platform?/:query?'
								element={<SearchPage />}/>
							<Route path="/player/:platform/:id" element={<VideoPlayer />}/>
							<Route path='*' />
						</Routes>
					</HashRouter>
				</div>
			</AppContainer>
		</ApplicationProvider>
	</React.StrictMode>
);
