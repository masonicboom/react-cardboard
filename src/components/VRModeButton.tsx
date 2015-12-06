/// <reference path="../../typings/tsd.d.ts"/>
import * as React from "react";

interface VRModeButtonProps {
	imageSrc: string;
	children?: React.ReactElement<any>;
}

const TOP_Z_INDEX = 100;

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
			return (
				<div
					style={{
						position: "fixed",
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						zIndex: TOP_Z_INDEX,
						backgroundColor: "black",
					}}
				>
					{this.props.children}
				</div>
			);
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
							zIndex: TOP_Z_INDEX,
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