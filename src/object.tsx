/// <reference path="../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
let R3:any = require("react-three");
import * as THREE from "three";
let THREEOrbitControls:any = require("three-orbit-controls")(THREE);

// Load up three.js plugins to display in stereo and control camera using device sensors.
// See https://github.com/webpack/exports-loader and https://github.com/webpack/imports-loader to understand these require statements.
let THREEStereoEffect:any = require("imports?THREE=three!exports?THREE.StereoEffect!../bower_components/three.js/examples/js/effects/StereoEffect");
let THREEVRControls:any = require("imports?THREE=three!exports?THREE.VRControls!../bower_components/three.js/examples/js/controls/VRControls");
let THREETeapotBufferGeometry:any = require("imports?THREE=three!exports?THREE.TeapotBufferGeometry!../bower_components/three.js/examples/js/geometries/TeapotBufferGeometry");

// Load "polyfill" to make the VR controls work on iPhone.
// TODO: see if there's a cleaner way to expose window.THREE to webvr-polyfill.
window.THREE = THREE;
require("webvr-polyfill");


class App extends React.Component<any, any> {
	render(): React.ReactElement<any> {
		let w = window.innerWidth;
		let h = window.innerHeight;

		// Teapot parameters adapted from https://github.com/erich666/three.js/blob/91c804c7a189620afc95a2f22768a3f0ac59b1b3/examples/webgl_buffergeometry_teapot.html#L194.
		let teapotSize = 1;
		let newTess = 15;
 		let bottom = false;
		let lid = true;
		let body = true;
		let fitLid = false;
		let nonblinn = false;
		let teapotGeometry = new THREETeapotBufferGeometry(teapotSize, newTess, bottom, lid, body, fitLid, nonblinn);

		let teapotName = "teapot";
		let teapot =
			<R3.Mesh
				name={teapotName}
				geometry={teapotGeometry}
				material={new THREE.MeshBasicMaterial({
					color: 0x00ff00,
					wireframe: true,
				})}
				position={new THREE.Vector3(0, 5, -10)}
				scale={new THREE.Vector3(-1, 1, 1)}
			/>

		return (
			<R3.Scene
				width={w}
				height={h}
				camera="maincamera"
				orbitControls={THREEOrbitControls}
				VRControls={THREEVRControls}
				VRControlsTarget={teapotName}
				effect={THREEStereoEffect}
			>
				<R3.PerspectiveCamera
					name="maincamera"
					fov={75}
					aspect={w/h}
					near={1}
					far={5000}
					position={new THREE.Vector3(0, 0, 0)}
					lookat={new THREE.Vector3(0, 0, 1)}
				/>

				{teapot}
			</R3.Scene>
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