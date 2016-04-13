/// <reference path="../reference.ts" />

namespace app.models {
	'use strict';

	export class Light {
		constructor(lightId: number) {
			this.color = new Color();
			this.lightId = lightId;
		}
		public lightId: number;
		public color: Color;
		public state: boolean;
	}
}
