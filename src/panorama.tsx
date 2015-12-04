/// <reference path="../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
let R3:any = require("react-three");
import * as THREE from "three";
import VRPanoramaViewer = require("./components/VRPanoramaViewer");

class App extends React.Component<any, any> {
	render(): React.ReactElement<any> {
		return (
			<VRPanoramaViewer
				radius={100}
				height={200}
				src="PIA16440_McMurdo_Merged_Cyl_L456atc.jpg"
			/>
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