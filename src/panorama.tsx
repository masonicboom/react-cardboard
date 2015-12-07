/// <reference path="../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
let R3:any = require("react-three");
import * as THREE from "three";
import VRPanoramaViewer = require("./components/VRPanoramaViewer");
import VRModeButton = require("./components/VRModeButton");

class App extends React.Component<any, any> {
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
		let button = (
			<VRModeButton
				imageSrc="panorama-preview.jpg"
			>
				<VRPanoramaViewer
					radius={100}
					height={200}
					src="PIA16440_McMurdo_Merged_Cyl_L456atc.jpg"
				/>
			</VRModeButton>
		);

		return (
			<div>
				<img src="vacation.jpg" />
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						left: 15,
						top: 108,
					}}
				>
					{button}
				</div>
			</div>
		);
	}
}

function mount() {
	var container = document.getElementById("app");
	if (container == null) {
		container = document.createElement("div");
		document.body.appendChild(container);
	}
	let c = React.createFactory(App);
	ReactDOM.render(c(), container);
}
document.addEventListener("DOMContentLoaded", mount);