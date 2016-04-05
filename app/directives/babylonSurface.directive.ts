/// <reference path='../../reference.ts'/>

namespace app.directive {
	'use strict';

	interface IBabylonSurfaceDirectiveScope extends ng.IScope {
		newColor: app.models.Light;
	}

	interface IBabylonSurfaceDirectiveAttribute extends ng.IAttributes { }

	export class BabylonSurface implements ng.IDirective {
		constructor(businessLight: engine.common.business.Light) {
			this.template = '<canvas id="renderCanvas" style="width:800px;height:500px"> </canvas>';
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
			let worldManager: app.game_engine.WorldManager = new app.game_engine.WorldManager(scope.newColor, that.businessLight);

			window.addEventListener('resize', function(): any {
				this.engine.resize();
			});

			BABYLON.SceneLoader.Load('', 'lamp.babylon', that.engine, function(scene: BABYLON.Scene): void {
				worldManager.CreateScene(scene);

				scene.executeWhenReady(() => {
					// scene.activeCamera = camera;
					scene.activeCamera.attachControl(that.canvasRender);
					that.engine.runRenderLoop(function(): void {
						// scene.render();
						worldManager.RenderLoop(scene);
					});
				});
			});
		}

	}
	angular.module('clientHUE').directive('babylonSurface', ['business.light', BabylonSurface.Factory()]);
}
