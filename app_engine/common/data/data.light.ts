/// <reference path='../../../reference.ts'/>

namespace engine.common.data {
	'use strict';

	export class Light {
		/**
		 *
		 */
		private $http: ng.IHttpService;
		private $q: ng.IQService;
		private $rootScope: ng.IRootScopeService;
		private socket: SocketIOClient.Socket;


		constructor($http: ng.IHttpService, $q: ng.IQService, $rootScope: ng.IRootScopeService) {
			this.$http = $http;
			this.$q = $q;
			this.$rootScope = $rootScope;
		}

		/* tslint:disable:typedef */
		public static Factory() {
			const instance = ($http: ng.IHttpService, $q: ng.IQService, $rootScope: ng.IRootScopeService) => {
				return new Light($http, $q, $rootScope);
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

		public realData(eventName: string, callback: Function): void {
			this.socket = io.connect('http://localhost:3000/');
			const that: Light = this;

			this.socket.on(eventName, function() {
				var args = arguments;
				that.$rootScope.$apply(function() {
					callback.apply(that.socket, args);
				});
			});
		}
	}

	angular.module('common.data').factory('data.light', ['$http', '$q', '$rootScope', Light.Factory()]);
}
