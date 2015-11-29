/// <reference path="../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
let R3:any = require("react-three");
import * as THREE from "three";
let THREEOrbitControls:any = require("three-orbit-controls")(THREE);

class App extends React.Component<any, any> {
	render(): React.ReactElement<any> {
		let w = 500;
		let h = 500;
		return (
			<div>
				<R3.Scene
					width={w}
					height={h}
					camera="maincamera"
					orbitControls={THREEOrbitControls}
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