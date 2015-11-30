/// <reference path="../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
let R3:any = require("react-three");
import * as THREE from "three";
let THREEOrbitControls:any = require("three-orbit-controls")(THREE);

// See https://github.com/webpack/exports-loader and https://github.com/webpack/imports-loader to understand what is going on here.
let THREEStereoEffect:any = require("imports?THREE=three!exports?THREE.StereoEffect!../bower_components/three.js/examples/js/effects/StereoEffect");

// See https://github.com/webpack/exports-loader and https://github.com/webpack/imports-loader to understand what is going on here.
let THREEVRControls:any = require("imports?THREE=three!exports?THREE.VRControls!../bower_components/three.js/examples/js/controls/VRControls");

// TODO: see if there's a cleaner way to expose window.THREE to webvr-polyfill.
window.THREE = THREE;
require("webvr-polyfill");


class App extends React.Component<any, any> {
	render(): React.ReactElement<any> {
		let w = document.body.clientWidth;
		let h = document.body.clientHeight;
		return (
			<div>
				<R3.Scene
					width={w}
					height={h}
					camera="maincamera"
					orbitControls={THREEOrbitControls}
					VRControls={THREEVRControls}
					effect={THREEStereoEffect}
				>
					<R3.PerspectiveCamera
						name="maincamera"
						fov={75}
						aspect={w/h}
						near={1}
						far={5000}
						position={new THREE.Vector3(0, 0, 600)}
						lookat={new THREE.Vector3(0, 0, 0)}
					/>

					<R3.Mesh
						geometry={new THREE.BoxGeometry(100, 100, 100)}
						material={new THREE.MeshBasicMaterial({ color: 0x00ff00 })}
						position={new THREE.Vector3(0, 0, 0)}
						scale={new THREE.Vector3(1, 1, -1)}
						quaternion={new THREE.Quaternion()}
					/>
				</R3.Scene>
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