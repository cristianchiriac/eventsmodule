angular
	.module('app')
	.component('discardModal', {
		templateUrl: 'assets/js/components/discard-modal/discard-modal.component.html',
		bindings: {
			resolve: '<',
			close: '&'
		},
		controller: function () {
			this.$onInit = function () {
				this.discardChanges = this.resolve.discard;
			};
			this.cancel = function () {
				this.close();
			};
			this.discard = function () {
				this.discardChanges();
				this.close();
			}
		}
	});