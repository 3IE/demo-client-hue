/// <reference path="../reference.ts"/>

namespace app {
	'use strict';

	angular.module('clientHUE', [
		'ui.router',
		'ui.validate',
		'color.picker',
		'app_engine'
	]);
	angular.module('clientHUE').config(configureStates);
	configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configureStates($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
		const otherwise: string = '/';

		const states: ng.ui.IState[] = getStates();
		states.forEach(function(state: ng.ui.IState): void {
			$stateProvider.state(state);
		});
		$urlRouterProvider.otherwise(otherwise);

		function getStates(): ng.ui.IState[] {
			return [
				{
					name: 'home',
					url: '/',
					templateUrl: 'views/home.html',
					controller: 'HomeController'
				}
			];
		}
	}

}
