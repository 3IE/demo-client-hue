/// <reference path='../../reference.ts'/>

namespace app.directive {
	'use strict';

	interface INgEnterDirectiveScope extends ng.IScope { }

	interface INgEnterDirectiveAttribute extends ng.IAttributes {
		ngEnter: () => void;
	}

	export class NgEnter implements ng.IDirective {

		constructor() {
			//
		}

		public link: ng.IDirectiveLinkFn = (scope: INgEnterDirectiveScope, element: ng.IAugmentedJQuery, attrs: INgEnterDirectiveAttribute) => {
			element.bind('keydown keypress', function(event: JQueryEventObject): void {
				if (event.which === 13) {
					scope.$apply(function(): void {
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
		};

		/* tslint:disable:typedef */
		public static Factory() {
			const directive = () => {
				return new NgEnter();
			};
			return directive;
		};
		/* tslint:enable:typedef */
	}

	angular.module('starterKit').directive('ngEnter', [NgEnter.Factory()]);
}
