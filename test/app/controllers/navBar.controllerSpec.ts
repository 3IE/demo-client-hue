/// <reference path="../../reference.ts"/>
/// <reference path="../../../app/controllers/navBar.controller.ts"/>

describe('app_controllers navBar', () => {

	let $rootScope: ng.IRootScopeService;
	let scope: app.INavBarControllerScope;

	beforeEach(angular.mock.module('starterKit'));

	beforeEach(angular.mock.inject(function($injector: any, $controller: any): void {
		$rootScope = $injector.get('$rootScope');
		scope = $rootScope.$new() as app.INavBarControllerScope;
		$controller('NavBarController', { $scope: scope });
	}));

	it('should be valid param', (): void => {
		expect(scope.pseudo).toBe('BeHappy', 'should be BeHappy');
	});

	it('should be collapse', (): void => {
		expect(scope.isCollapsed).toBe(true, 'should be true');
	});
});
