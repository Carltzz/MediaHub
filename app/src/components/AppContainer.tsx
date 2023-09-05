// React
import React, { ReactNode } from "react";

// Components
import "./AppContainer.scss";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer = (props: AppContainerProps) => {
	return (
		<div className="app-container">
			{props.children}
		</div>
	);
};

export default AppContainer;
