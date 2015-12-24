/// <reference path='../../reference.ts'/>

namespace app.directive {
	'use strict';

	interface IBabylonSurfaceDirectiveScope extends ng.IScope {
		newColor: app.models.Light;
	}

	interface IBabylonSurfaceDirectiveAttribute extends ng.IAttributes { }

	export class BabylonSurface implements ng.IDirective {
		constructor(businessLight: engine.common.business.Light) {
			this.template = '<canvas id="renderCanvas" style="width:600px;height:400px"> </canvas>';
			this.link = this.unboundLink.bind(this);
			this.businessLight = businessLight;
		}

		public template: any;
		public link: ng.IDirectiveLinkFn;

		private businessLight: engine.common.business.Light;
		private canvasRender: HTMLCanvasElement;
		private engine: BABYLON.Engine;

		/* tslint:disable:typedef */
		public static Factory() {
			const directive = (businessLight: engine.common.business.Light) => {
				return new BabylonSurface(businessLight);
			};
			return directive;
		};
		/* tslint:enable:typedef */

		private unboundLink(scope: IBabylonSurfaceDirectiveScope, element: ng.IAugmentedJQuery, attrs: IBabylonSurfaceDirectiveAttribute): void {
			let that: BabylonSurface = this;
			that.canvasRender = element.children()[0] as HTMLCanvasElement;
			that.engine = new BABYLON.Engine(this.canvasRender, true);

			let activeLight: boolean = false;

			window.addEventListener('resize', function(): any {
				this.engine.resize();
			});


			BABYLON.SceneLoader.Load('', 'lamp.babylon', that.engine, function(scene: BABYLON.Scene): void {
				// let camera: BABYLON.Camera = new BABYLON.ArcRotateCamera('Camera', 10, 10, 100, BABYLON.Vector3.Zero(), scene);

				/* scene.onPointerDown = (evt: PointerEvent, pickInfo: BABYLON.PickingInfo): void => {
					if (pickInfo.hit) {
						let meshPicking = pickInfo.pickedMesh;

						if (meshPicking.name === 'Box001') { }
					}
				} */

				scene.meshes.forEach((mesh: BABYLON.Mesh) => {
					mesh.isPickable = false;
					if (mesh.name === 'Box001') {


						mesh.isPickable = true;
						mesh.actionManager = new BABYLON.ActionManager(scene);

						mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(evt: BABYLON.ActionEvent): void {
							scene.beginAnimation(mesh, 0, 100, false, 10, () => {
								let lightModel: app.models.Light = new app.models.Light(1);
								lightModel.color.r = scope.newColor.color.r;
								lightModel.color.g = scope.newColor.color.g;
								lightModel.color.b = scope.newColor.color.b;
								activeLight = !activeLight;
								scene.lights[1].setEnabled(activeLight);
								if (activeLight) {
									that.businessLight.on(lightModel);
								} else {
									that.businessLight.off(lightModel.lightId);
								}

							});
						}));
					}
				});

				scene.lights[1].setEnabled(activeLight);



				scene.executeWhenReady(() => {
					// scene.activeCamera = camera;
					scene.activeCamera.attachControl(that.canvasRender);
					that.engine.runRenderLoop(function(): void {
						scene.lights[1].diffuse.b = scope.newColor.color.b;
						scene.lights[1].diffuse.r = scope.newColor.color.r;
						scene.lights[1].diffuse.g = scope.newColor.color.g;

						scene.render();
					});
				});
			});
		}
	}
	angular.module('starterKit').directive('babylonSurface', ['business.light', BabylonSurface.Factory()]);
}
