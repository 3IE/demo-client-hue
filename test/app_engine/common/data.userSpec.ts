/// <refernece path="../../reference.ts"/>
/// <reference path="../../../app_engine/common/data/data.light.ts"/>

describe('app_engine common data user', () => {

	let dataUser: engine.common.data.Light;
	let $httpBackend: ng.IHttpBackendService;
	let $timeout: ng.ITimeoutService;

	beforeEach(angular.mock.module('common.data'));

	beforeEach(angular.mock.inject(function($injector: any): void {
		$httpBackend = $injector.get('$httpBackend');
		// permet de déclencher les promises (then(), ...)
		$timeout = $injector.get('$timeout');
		dataUser = $injector.get('data.user');

		$httpBackend.whenGET('./users.json').respond(200, [{ 'name': 'Thomson', 'firstname': 'Patric' }]);
	}));

	/*it('should be valid param', (done: () => void): void => {
		const res: ng.IPromise<boolean> = dataUser.isValid('ma chaine');

		res.then((value: boolean) => {
			expect(value).toEqual(true, 'should be equal true');
		}).finally(() => {
			// permet d'indiquer que le test asynchrone est fini
			done();
		});
		// permet de déclencher la réponse de la promise
		$timeout.flush();
	});

	it('should be download file', (done: () => void): void => {
		const res: ng.IPromise<app.models.User[]> = dataUser.getUsers();

		res.then((value: app.models.User[]) => {
			expect(value[0].firstname).toBe('Patric');
		}).finally(() => {
			done();
		});
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		$timeout.flush();
	});*/
});
