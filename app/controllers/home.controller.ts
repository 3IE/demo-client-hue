/// <reference path='../../reference.ts'/>

namespace app {
	'use strict';

	export interface IHomeControllerScope extends ng.IScope {
		/**
		 * méthode pour faire la transformation du colorPicker vers
		 * la couleur typée 
		 */
		changeColor: () => void;
		/**
		 * représentation de la couleur typée
		 */
		newColor: app.models.Light;
		/**
		 * variable de la couleur binder sur le colorPicker 
		 */
		myColor: string;
	}

	export class HomeController {
		/**
		 *
		 */
		private $scope: IHomeControllerScope;
		private businessLight: engine.common.business.Light;

		constructor($scope: IHomeControllerScope, businessLight: engine.common.business.Light) {
			this.$scope = $scope;
			let that: HomeController = this;
			this.businessLight = businessLight;
			let newLight: app.models.Light = new app.models.Light(1);
			newLight.state = false;
			this.$scope.newColor = newLight;

			this.$scope.changeColor = () => {
				const re: RegExp = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
				const resultatParse: RegExpExecArray = re.exec(this.$scope.myColor);
				that.$scope.newColor.color.r = parseInt(resultatParse[1], 10) / 255;
				that.$scope.newColor.color.g = parseInt(resultatParse[2], 10) / 255;
				that.$scope.newColor.color.b = parseInt(resultatParse[3], 10) / 255;
			};
		}
	}

	angular.module('clientHUE').controller('HomeController', ['$scope', 'business.light', HomeController]);
}
