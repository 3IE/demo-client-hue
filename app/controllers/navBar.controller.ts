/// <reference path='../../reference.ts'/>

namespace app {
	'use strict';

	export interface INavBarControllerScope extends ng.IScope {
		isCollapsed: boolean;
		pseudo: string;
	}

	export class NavBarController {
		private $scope: INavBarControllerScope;

		constructor($scope: INavBarControllerScope) {
			this.$scope = $scope;
		}
	}

	angular.module('clientHUE').controller('NavBarController', ['$scope', NavBarController]);
}
