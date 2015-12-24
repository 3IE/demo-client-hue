/// <reference path='../../../reference.ts'/>

namespace engine.common.data {
	'use strict';

	export class Light {
		/**
		 *
		 */
		private $http: ng.IHttpService;
		private $q: ng.IQService;

		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.$http = $http;
			this.$q = $q;
		}

		/* tslint:disable:typedef */
		public static Factory() {
			const instance = ($http: ng.IHttpService, $q: ng.IQService) => {
				return new Light($http, $q);
			};
			return instance;
		}
		/* tslint:enable:typedef */

		public on(light: app.models.Light): ng.IPromise<app.models.ApiResult> {
			const deferred: ng.IDeferred<{}> = this.$q.defer();

			this.$http({
				url: '/light/on',
				method: 'POST',
				data: light
			}).success(function(result: app.models.ApiResult): void {
				deferred.resolve(result);
			}).error(function(e: any): void {
				deferred.reject(e);
			});

			return deferred.promise;
		}

		public off(lightId: number): ng.IPromise<app.models.ApiResult> {
			const deferred: ng.IDeferred<{}> = this.$q.defer();

			this.$http({
				url: '/light/off?lightId=' + lightId,
				method: 'GET'
			}).success(function(result: app.models.ApiResult): void {
				deferred.resolve(result);
			}).error(function(e: any): void {
				deferred.reject(e);
			});

			return deferred.promise;
		}
	}

	angular.module('common.data').factory('data.light', ['$http', '$q', Light.Factory()]);
}
