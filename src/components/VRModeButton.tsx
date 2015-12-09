/// <reference path="../../typings/tsd.d.ts"/>
import * as React from "react";
let MediaQuery:any = require("react-responsive");

const topZIndex = 100;
const phoneMaxWidthBreakpointPx = 1242;
const escapeKeyKeyCode = 27;

interface ExitVRButtonProps {
	onClick: () => void;
}
class ExitVRButton extends React.Component<ExitVRButtonProps, any> {
	render() {
		return (
			<div
				style={{
					position: "absolute",
					top: "24px",
					left: "24px",
					fontSize: "6rem",
					fontFamily: "sans-serif",
					cursor: "pointer",
				}}
				onClick={this.props.onClick}
			>
				X
			</div>
		);
	}
}

interface DesktopVRModeState {
	desktopInstructionsDismissed: boolean;
}

interface DesktopVRModeProps {
	onExit: () => void;
	children?: React.ReactElement<any>;
}

class DesktopVRMode extends React.Component<DesktopVRModeProps, DesktopVRModeState> {
	constructor(props) {
		super();
		this.state = {
			desktopInstructionsDismissed: false,
		};
	}

	componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
	}

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
	}

	// NOTE: fat-arrow syntax is used so that "this" is bound properly for event handling.
	handleKeyPress = (e: KeyboardEvent) => {
		if (e.keyCode === escapeKeyKeyCode) {
			this.props.onExit();
		}
	};

	render(): React.ReactElement<any> {
		if (this.state.desktopInstructionsDismissed) {
			return this.props.children;
		} else {
			return (
				<div
					style={{
						color: "white",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						fontSize: "2rem",
					}}
				>
					<ExitVRButton onClick={this.props.onExit} />
					<div
						style={{
							maxWidth: "30rem",
						}}
					>
						<p>It looks like you are not using a phone. For the best VR experience, view this site using your phone, with a <a href="https://www.google.com/get/cardboard/">Google Cardboard viewer</a>.</p>

						<p>To continue anyway, click the button below.</p>

						<div style={{
							textAlign: "center",
							marginTop: "2rem",
						}}>

							<button
								onClick={
									() => this.setState({ desktopInstructionsDismissed: true })
								}
								style={{
									fontSize: "2rem",
								}}
							>
								Show me the VR!
							</button>
						</div>
					</div>
				</div>
			);
		}
	}
}

interface PhoneInstructionsProps {
	onExit: () => void;
}

class PhoneInstructions extends React.Component<PhoneInstructionsProps, any> {
	render(): React.ReactElement<any> {
		return (
			<div
				style={{
					color: "white",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					fontSize: "2rem",
					padding: "4rem",
				}}
			>
				<ExitVRButton onClick={this.props.onExit} />
				<div>
					<p>Place your phone into your <a href="https://www.google.com/get/cardboard/">Google Cardboard viewer</a>, and hold it in landscape mode.</p>
				</div>
			</div>
		);
	}
}

interface VRModeProps {
	onExit: () => void;
	children?: React.ReactElement<any>;
}

class VRMode extends React.Component<VRModeProps, any> {
	render(): React.ReactElement<any> {
		return (
			<div
				style={{
					position: "fixed",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					zIndex: topZIndex,
					backgroundColor: "black",
				}}
			>
				<MediaQuery maxDeviceWidth={phoneMaxWidthBreakpointPx}>
					<MediaQuery orientation="portrait">
						<PhoneInstructions onExit={this.props.onExit} />
					</MediaQuery>
					<MediaQuery orientation="landscape">
						{this.props.children}
					</MediaQuery>
				</MediaQuery>
				<MediaQuery minDeviceWidth={phoneMaxWidthBreakpointPx+1}>
					<DesktopVRMode onExit={this.props.onExit}>
						{this.props.children}
					</DesktopVRMode>
				</MediaQuery>
			</div>
		);
	}
}

interface VRModeButtonProps {
	imageSrc: string;
	children?: React.ReactElement<any>;
}

interface VRModeButtonState {
	showVR: boolean;
}

class VRModeButton extends React.Component<VRModeButtonProps, VRModeButtonState> {
	constructor(props) {
		this.state = {
			showVR: false,
		};
		super();
	}

	showVR() {
		this.setState({ showVR: true });
	}

	render(): React.ReactElement<any> {
		if (this.state.showVR) {
			return (
				<VRMode
					onExit={
						() => this.setState({ showVR: false })
					}
				>
					{this.props.children}
				</VRMode>
			);
		} else {
			return (
				<div
					style={{
						position: "relative",
						display: "inline-block",
						cursor: "pointer",
					}}
					onClick={this.showVR.bind(this)}
				>
					<img src={this.props.imageSrc} />
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: topZIndex,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							WebkitFilter: "drop-shadow(0 0 3px #000)",
						}}
					>
						<img
							style={{
								opacity: 0.8,
								width: 120,
							}}
							src="vr-expand-icon.svg"
						/>
					</div>
				</div>
			);
		}
	}
}

export = VRModeButton;