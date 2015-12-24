/// <reference path='../../../reference.ts'/>

namespace engine.common.business {
	'use strict';

	export class Light {
		/**
		 *
		 */
		private $q: ng.IQService;
		private dataLight: common.data.Light;

		constructor($q: ng.IQService, dataLight: common.data.Light) {
			this.$q = $q;
			this.dataLight = dataLight;
		}

		/* tslint:disable:typedef */
		public static Factory() {
			const instance = ($q: ng.IQService, dataUser: common.data.Light) => {
				return new Light($q, dataUser);
			};
			return instance;
		}
		/* tslint:enable:typedef */

		public on(light: app.models.Light): ng.IPromise<app.models.ApiResult> {
			return this.dataLight.on(light);
		}

		public off(lightId: number): ng.IPromise<app.models.ApiResult> {
			return this.dataLight.off(lightId);
		}
	}

	angular.module('common.business').factory('business.light', ['$q', 'data.light', Light.Factory()]);
}
