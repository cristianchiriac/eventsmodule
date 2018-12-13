angular
	.module('app')
	.component('publishModal', {
		templateUrl: 'assets/js/components/publish-modal/publish-modal.component.html',
		bindings: {
			resolve: '<',
			close: '&',
			dismiss: '&',
			publish: '<'
		},
		controller: function () {
			this.$onInit = function () {
				this.publishEvent = this.resolve.publish;
			};
			this.cancel = function () {
				this.close();
			};
			this.pub = function () {
				this.publishEvent();
				this.close();
			}
		}
	});