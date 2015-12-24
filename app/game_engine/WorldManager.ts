/// <reference path='../../reference.ts'/>

namespace app.game_engine {
	'use strict';

	export class WorldManager {
		private activeLight: boolean;
		// pattern memento pour eviter les appels en boucle
		private businessLight: engine.common.business.Light;

		private newColor: app.models.Light;

		public RenderLoop(scene: BABYLON.Scene): void {
			if (this.IsUpdating(scene)) {
				scene.lights[1].diffuse.b = this.newColor.color.b;
				scene.lights[1].diffuse.r = this.newColor.color.r;
				scene.lights[1].diffuse.g = this.newColor.color.g;
				this.ManageLight();
			}

			scene.render();
		}

		public CreateScene(scene: BABYLON.Scene): void {
			let that: WorldManager = this;
			scene.cameras.pop();
			scene.meshes.forEach((mesh: BABYLON.Mesh) => {
				mesh.isPickable = false;
				if (mesh.name === 'Box001') {
					mesh.isPickable = true;
					mesh.actionManager = new BABYLON.ActionManager(scene);

					mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(evt: BABYLON.ActionEvent): void {
						scene.beginAnimation(mesh, 0, 100, false, 10, () => {
							that.activeLight = !that.activeLight;
							scene.lights[1].setEnabled(that.activeLight);
							that.ManageLight();
						});
					}));
				}
			});
			// var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(-3, 4, 35), scene);
			let camera: BABYLON.TouchCamera = new BABYLON.TouchCamera('TouchCamera', new BABYLON.Vector3(-72, 103, 228), scene);
			camera.rotation = new BABYLON.Vector3(0, Math.PI, 0);

			scene.setActiveCameraByName('TouchCamera');

		}

		public constructor(newColor: app.models.Light, businessLight: engine.common.business.Light) {
			this.activeLight = false;
			this.businessLight = businessLight;
			this.newColor = newColor;
		}


		private IsUpdating(scene: BABYLON.Scene): boolean {
			return !(scene.lights[1].diffuse.b === this.newColor.color.b &&
				scene.lights[1].diffuse.r === this.newColor.color.r &&
				scene.lights[1].diffuse.g === this.newColor.color.g);
		}

		private ManageLight(): void {
			let lightModel: app.models.Light = new app.models.Light(1);
			lightModel.color.r = this.newColor.color.r;
			lightModel.color.g = this.newColor.color.g;
			lightModel.color.b = this.newColor.color.b;
			if (this.activeLight) {
				this.businessLight.on(lightModel);
			} else {
				this.businessLight.off(lightModel.lightId);
			}
		}
	}
}
