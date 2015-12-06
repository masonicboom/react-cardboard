/// <reference path="../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as THREE from "three";
import VRObjectViewer = require("./components/VRObjectViewer");
import VRModeButton = require("./components/VRModeButton");

// See https://github.com/webpack/exports-loader and https://github.com/webpack/imports-loader to understand this require statements.
let THREETeapotBufferGeometry:any = require("imports?THREE=three!exports?THREE.TeapotBufferGeometry!../bower_components/three.js/examples/js/geometries/TeapotBufferGeometry");

class App extends React.Component<any, any> {
	render(): React.ReactElement<any> {
		// Teapot parameters adapted from https://github.com/erich666/three.js/blob/91c804c7a189620afc95a2f22768a3f0ac59b1b3/examples/webgl_buffergeometry_teapot.html#L194.
		let teapotSize = 1;
		let newTess = 15;
 		let bottom = false;
		let lid = true;
		let body = true;
		let fitLid = false;
		let nonblinn = false;
		let teapotGeometry = new THREETeapotBufferGeometry(teapotSize, newTess, bottom, lid, body, fitLid, nonblinn);

		let button = (
			<VRModeButton
				imageSrc="teapot-preview.png"
			>
				<VRObjectViewer
					geometry={teapotGeometry}
					material={new THREE.MeshBasicMaterial({
						color: 0x00ff00,
						wireframe: true,
					})}
					scale={new THREE.Vector3(-1.25, 1.25, 1.25)}
				/>
			</VRModeButton>
		);

		return (
			<div>
				<img src="ecommerce.jpg" />
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						left: 25,
						top: 360,
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