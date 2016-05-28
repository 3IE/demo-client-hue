/// <reference path='../../reference.ts'/>

namespace app.game_engine {
	'use strict';

	export class WorldManager {
		private activeLight: boolean;
		private businessLight: engine.common.business.Light;

		private newColor: app.models.Light;
		private isRemoteChange: boolean;

		public RenderLoop(scene: BABYLON.Scene): void {
			//if (this.IsUpdating(scene) && !this.isRemoteChange) {
				if (this.IsUpdating(scene)) {

				this.ManageLight(scene);
			}

			scene.lights[1].diffuse.b = this.newColor.color.b;
			scene.lights[1].diffuse.r = this.newColor.color.r;
			scene.lights[1].diffuse.g = this.newColor.color.g;
			scene.lights[1].setEnabled(this.newColor.state);
			this.isRemoteChange = false;
			scene.render();
		}

		public CreateScene(scene: BABYLON.Scene): void {
			let that: WorldManager = this;
			scene.cameras.pop();
			scene.lights[1].setEnabled(false);
			scene.meshes.forEach((mesh: BABYLON.Mesh) => {
				mesh.isPickable = false;
				// l'interrupteur de la scene
				if (mesh.name === 'Box001') {
					mesh.isPickable = true;
					mesh.actionManager = new BABYLON.ActionManager(scene);

					mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(evt: BABYLON.ActionEvent): void {
						scene.beginAnimation(mesh, 0, 100, false, 10, () => {
							that.activeLight = !that.activeLight;
							that.ManageLight(scene);
						});
					}));
				}
			});

			let camera: BABYLON.TouchCamera = new BABYLON.TouchCamera('TouchCamera', new BABYLON.Vector3(-72, 103, 228), scene);
			camera.rotation = new BABYLON.Vector3(0, Math.PI, 0);

			scene.setActiveCameraByName('TouchCamera');

		}

		public constructor(newColor: app.models.Light, businessLight: engine.common.business.Light) {
			let that: WorldManager = this;
			this.activeLight = false;
			this.businessLight = businessLight;
			this.newColor = newColor;
			this.isRemoteChange = false;

			// this.businessLight.realData('stateLight', function(data: models.Light): void {
			// 	that.isRemoteChange = true;
			// 	that.newColor.color.r = data.color.r;
			// 	that.newColor.color.g = data.color.g;
			// 	that.newColor.color.b = data.color.b;
			// 	that.newColor.lightId = data.lightId;
			// 	that.newColor.state = data.state;
			// 	that.activeLight = data.state;

			// })
		}


		private IsUpdating(scene: BABYLON.Scene): boolean {
			return !(scene.lights[1].diffuse.b === this.newColor.color.b &&
				scene.lights[1].diffuse.r === this.newColor.color.r &&
				scene.lights[1].diffuse.g === this.newColor.color.g
				//&& scene.lights[1].isEnabled() === this.newColor.state
			);
		}

		private ManageLight(scene: BABYLON.Scene): void {
			let lightModel: app.models.Light = new app.models.Light(1);
			lightModel.color.r = this.newColor.color.r;
			lightModel.color.g = this.newColor.color.g;
			lightModel.color.b = this.newColor.color.b;
			if (this.activeLight) {
				this.businessLight.on(lightModel).then(function(data: models.ApiResult) {
					scene.lights[1].setEnabled(data.result);
				});
			} else {
				this.businessLight.off(lightModel.lightId).then(function(data: models.ApiResult) {
					scene.lights[1].setEnabled(data.result);
				});
			}
		}
	}
}
