/// <reference path="../../typings/tsd.d.ts"/>
import * as React from "react";

interface VRModeButtonProps {
	imageSrc: string;
	children?: React.ReactElement<any>;
}

class VRModeButton extends React.Component<VRModeButtonProps, any> {
	constructor(props) {
		this.state = {
			showPanorama: false,
		};
		super();
	}

	showPanorama() {
		this.setState({
			showPanorama: true,
		});
	}

	render(): React.ReactElement<any> {
		if (this.state.showPanorama) {
			return this.props.children;
		} else {
			return (
				<div
					style={{
						position: "relative",
						display: "inline-block",
						cursor: "pointer",
					}}
					onClick={this.showPanorama.bind(this)}
				>
					<img src={this.props.imageSrc} />
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 100,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontSize: "2.4rem",
							fontFamily: "monospace",
							WebkitFilter: "drop-shadow(0 0 3px #000)",
							opacity: 0.85,
						}}
					>
						<img src="vr-expand-icon.svg" />
						<div>Enter VR Mode</div>
					</div>
				</div>
			);
		}
	}
}

export = VRModeButton;