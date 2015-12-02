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

// Load "polyfill" to make the VR controls work on iPhone.
// TODO: see if there's a cleaner way to expose window.THREE to webvr-polyfill.
window.THREE = THREE;
require("webvr-polyfill");


class App extends React.Component<any, any> {
	render(): React.ReactElement<any> {
		let w = window.innerWidth;
		let h = window.innerHeight;

		let panoramaTexture = THREE.ImageUtils.loadTexture("PIA16440_McMurdo_Merged_Cyl_L456atc.jpg");
		panoramaTexture.minFilter = THREE.NearestFilter;
		let panorama =
			<R3.Mesh
				geometry={new THREE.CylinderGeometry(100, 100, 200, 128, 1, true)}
				material={new THREE.MeshBasicMaterial({
					map: panoramaTexture
				})}
				position={new THREE.Vector3(0, 0, 0)}
				scale={new THREE.Vector3(-1, 1, 1)}
			/>

		return (
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
					position={new THREE.Vector3(0, 0, 0)}
					lookat={new THREE.Vector3(0, 0, 1)}
				/>

				{panorama}
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