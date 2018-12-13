angular
	.module('app')
	.service('templateService',
		[
			'generalServices',

			function (
				generalServices
			) {
				/**
				 * Parse json object and update content fields
				 * @param content {Object}
				 * @returns {Object}
				 */
				this.prepareContent = (content) => {
					if (!content) return;
					content.forEach(
						component => {
							this.updateComponentValue(component);
						}
					);
					return content;
				};
				/**
				 * Parse component to check value
				 * @param component {Object}
				 */
				this.updateComponentValue = function (component) {
					let allowed = ['text', 'textnode'];
					if (component.components.length <= 0 && allowed.includes(component.type)) {
						this.setTranslatedValue(component);
					}
					this.prepareContent(component.components);
				};
				/**
				 * Set component value
				 * @param component {Object}
				 */
				this.setTranslatedValue = component => {
					let id = (component.attributes['data-component']) ? component.attributes['data-component'] : component.attributes['translationID'];
					if (component.content !== ' ') component.content = this.getTranslationById(id);
				};
				/**
				 * Get translation value by id
				 * @param id {String}
				 * @returns {String}
				 */
				this.getTranslationById = (id) => {
					//TODO: temporary translations, will be replaced with translations from response
					let translations = {
						"c90785": "Sehr - trans ",
						"0.4930219738024444": " ",
						"0.19146552084189916": " ",
						"0.581243111575753": ",",
						"c2756": "Insert text here - trans",
						"c6191": "Bestellübersicht - trans",
						"c81": "Menge - trans",
						"c2771": "Artikelnummer - trans",
						"c2574": "Bezeichnung - trans",
						"c6320": "Lieferzeit - trans",
						"c487": "Einzel Preis - trans",
						"c2580": "Preisnachlass - trans",
						"c899": "Summe - trans",
						"c8160": "Express-/Wunschterminlieferung - trans",
						"c7182": "Versandkosten: - trans",
						"c1473": "Enthaltene MwSt: - trans",
						"c346": "Rechnungssumme: - trans"
					};
					return translations[id];
				};
				/**
				 * Creates a list of translations from the content received
				 * @param content {String}
				 * @param translations {Object}
				 * @returns {Object} {key: {value: string, translated: boolean}}
				 */
				this.getTranslations = (content, translations) => {
					if (!translations) translations = {};
					content.forEach(
						component => {
							return this.setTranslation(component, translations)
						}
					);
					return translations;
				};
				/**
				 * Parse object recursive and set translation value
				 * @param component {Object}
				 * @param translations {Object}
				 * @returns {Void}
				 */
				this.setTranslation = function(component, translations) {
					let allowed = ['text', 'textnode'];
					if (component.components.length <= 0 && allowed.includes(component.type)) {
						return this.setValue(component, translations);
					}
					this.getTranslations(component.components, translations);
				};
				/**
				 *
				 * @param component {Object}
				 * @param translations {Object}
				 * @returns {Object} List of translations
				 */
				this.setValue = (component, translations) => {
					/* nested textnodes do not have component id's, we set up a dynamic id to be used as a
					separate translation */
					if (!component.attributes['data-component'] || !component.attributes['translationID']) {
						component.attributes.translationID = Math.random(123);
					}
					if (component.attributes['data-component']) {
						translations[component.attributes['data-component']] = component.content;
					} else {
						translations[component.attributes['translationID']] = component.content;
					}
					return translations;
				};
				/**
				 * Set content json model to localStorage
				 * @param content {String}
				 */
				this.setContent = content => {
					localStorage.setItem('gjs-components', JSON.stringify(content));
				}
				/**
				 * Creates a translation object
				 * @param translation {String}
				 * @returns {Object} {value: string, translated: boolean}
				 */
				this.createTranslationField = translation => {
					let value = (typeof translation === 'string') ? translation : translation.value;
					return {
						value: generalServices.selfClosingTag(value),
						translated: true
					}
				};
				/**
				 * Create a DOMElement from a string representation of a DOMElement
				 * @param string {String}
				 * @returns {HTMLElement}
				 */
				this.stringToDOM = string => {
					let $element = document.createElement('DIV');
					$element.classList.add('wrapper');
					$element.innerHTML = string;
					return $element;
				};
				/**
				 * Extracts conditions from data-attributes and creates a th-switch block
				 * @param content {HTMLElement}
				 * @returns {HTMLElement}
				 */
				this.createConditionalBlock = content => {
					let condition = JSON.parse(content.getAttribute('data-condition')),
						$variable = document.createElement('th:block');
					$variable.setAttribute('data-th-switch', `\${${content.innerText.trim()}}`)

					condition.forEach(item => {
						let $element = document.createElement('th:block');
						if (item.type === 'equals') {
							$element.setAttribute('data-th-case', `'${item.input}'`);
							$element.setAttribute('data-th-text', `'${item.textArea}'`);
						} else {
							$element.setAttribute('data-th-case', '*');
							$element.setAttribute('data-th-text', `'${item.textArea}'`);
						}
						$variable.appendChild($element);
					});
					return $variable;
				}
			}]);