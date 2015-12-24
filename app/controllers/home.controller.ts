/// <reference path='../../reference.ts'/>

namespace app {
	'use strict';

	export interface IHomeControllerScope extends ng.IScope {
		changeColor: () => void;
		newColor: app.models.Light;
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
			this.businessLight = businessLight;
			this.$scope.newColor = new app.models.Light(1);

			this.$scope.changeColor = () => {
				const re: RegExp = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
				const resultatParse: RegExpExecArray = re.exec(this.$scope.myColor);
				this.$scope.newColor.color.r = parseInt(resultatParse[1], 10) / 255;
				this.$scope.newColor.color.g = parseInt(resultatParse[2], 10) / 255;
				this.$scope.newColor.color.b = parseInt(resultatParse[3], 10) / 255;
			};
		}
	}

	angular.module('starterKit').controller('HomeController', ['$scope', 'business.light', HomeController]);
}