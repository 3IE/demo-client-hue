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

			this.$scope.isCollapsed = true;
			this.$scope.pseudo = 'BeHappy';
		}
	}

	angular.module('starterKit').controller('NavBarController', ['$scope', NavBarController]);
}
