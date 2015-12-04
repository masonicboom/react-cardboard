/// <reference path="../../typings/tsd.d.ts"/>
import * as React from "react";
let R3:any = require("react-three");
import * as THREE from "three";
let THREEOrbitControls:any = require("three-orbit-controls")(THREE);

// Load up three.js plugins to display in stereo and control camera using device sensors.
// See https://github.com/webpack/exports-loader and https://github.com/webpack/imports-loader to understand these require statements.
let THREEStereoEffect:any = require("imports?THREE=three!exports?THREE.StereoEffect!../../bower_components/three.js/examples/js/effects/StereoEffect");
let THREEVRControls:any = require("imports?THREE=three!exports?THREE.VRControls!../../bower_components/three.js/examples/js/controls/VRControls");

// Load "polyfill" to make the VR controls work on iPhone.
// TODO: see if there's a cleaner way to expose window.THREE to webvr-polyfill.
window.THREE = THREE;
require("webvr-polyfill");

// TODO: nail down this interface. It's probably better to just receive a full R3.Mesh and add the name in using React.cloneElement (https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement). scale probably has an interaction with camera position that will need to be resolved.
interface VRObjectViewerProps {
	geometry: THREE.Geometry;
	material: THREE.Material;
	scale: THREE.Vector3;
}

class VRObjectViewer extends React.Component<VRObjectViewerProps, any> {
	render(): React.ReactElement<any> {
		let w = window.innerWidth;
		let h = window.innerHeight;

		let objectName = "object";
		let cameraName = "camera";

		return (
			<R3.Scene
				width={w}
				height={h}
				camera={cameraName}
				orbitControls={THREEOrbitControls}
				VRControls={THREEVRControls}
				VRControlsTarget={objectName}
				effect={THREEStereoEffect}
			>
				<R3.PerspectiveCamera
					name={cameraName}
					fov={75}
					aspect={w/h}
					near={1}
					far={5000}
					position={new THREE.Vector3(0, 0, 0)}
					lookat={new THREE.Vector3(0, 0, 1)}
				/>

				<R3.Mesh
					name={objectName}
					geometry={this.props.geometry}
					material={this.props.material}
					scale={this.props.scale}
					position={new THREE.Vector3(0, 5, -10)}
				/>
			</R3.Scene>
		);
	}
}

export = VRObjectViewer;