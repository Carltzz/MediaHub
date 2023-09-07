// React
import React, { useEffect } from "react";

// FontAwesome
import {
	faWindowMaximize,
	faWindowMinimize,
	faWindowRestore,
	faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import "./Titlebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setMaximised } from "../redux/Window";
import { RootStore } from "../redux/store";

const ipc: any = (window as any).api;

const Titlebar = () => {
	const dispatch = useDispatch();
	const isMaximised = useSelector((state: RootStore) =>
		state.window.isMaximised
	);

	useEffect(() => {
		ipc.registerListener("set-minimise-button", (event: any, data: boolean) => {
			dispatch(setMaximised(!data))
		});

		return () => {
			ipc.unregisterListener("set-minimise-button");
		};
	});

	const minimiseWindow = () => {
		ipc.sendMessage("minimise-window");
	};

	const maximiseWindow = () => {
		ipc.sendMessage("maximise-window");
	};

	const closeWindow = () => {
		ipc.sendMessage("close-window");
	};

	return (
		<div className='titlebar'>
			<div className='title'>MediaHub - YouTube</div>
			<div className='windowControls'>
				<FontAwesomeIcon
					icon={faWindowMinimize}
					className='minimise'
					onClick={minimiseWindow} />
				<FontAwesomeIcon
					icon={isMaximised ? faWindowRestore : faWindowMaximize}
					className='maximise'
					onClick={maximiseWindow}/>
				<FontAwesomeIcon
					icon={faXmark}
					className='close'
					onClick={closeWindow}/>
			</div>
		</div>
	);
};

export default Titlebar;
