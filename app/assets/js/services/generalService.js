angular
	.module('app')
	.service(
		'generalServices', [
			'$http',
			'$q',
			'$localStorage',
			'$state',
			'DataService',
			'$timeout',
			'defaults',
			'cleanCSS',

			function (
				$http,
				$q,
				$localStorage,
				$state,
				DataService,
				$timeout,
				defaults,
				cleanCSS
			) {
				this.formatter = new cleanCSS({
					level: {
						2: {
							mergeAdjacentRules: true,
							mergeIntoShorthands: true,
							mergeMedia: true,
							mergeNonAdjacentRules: true,
							mergeSemantically: false,
							overrideProperties: true,
							removeEmpty: true,
							reduceNonAdjacentRules: true,
							removeDuplicateFontRules: true,
							removeDuplicateMediaBlocks: true,
							removeDuplicateRules: true,
							removeUnusedAtRules: false,
							restructureRules: false
						}
					}
				});

				this.setHeader = function (key, value) {
					$http.defaults.headers.common[key] = value;
				};
				this.hasClass = function (element, selector) {
					if (element && selector) return element.classList.contains(selector);
				};
				this.getWidth = function (element) {
					var span = document.createElement('span');
					span.setAttribute('style', 'font: 16px Arial, sans-serif;');
					span.innerHTML = element.innerHTML;
					document.getElementsByClassName('main')[0].appendChild(span);
					var width = span.offsetWidth;
					document.getElementsByClassName('main')[0].removeChild(span);
					return width;
				};
				this.createDOMElement = function (element, classes, id, value, placeholder, label) {
					var DOMElement, DOMLabel, DOMElementPlaceholder, type;
					var innerTextElements = ['div', 'span', 'textarea', 'label', 'a'];

					/*
					  Because there is no dom element of type radio or checkbox, we need to set the
					  elemet to be of type input with a type of radio or checkbox
					  Instead of <radio> this will generate <input type="radio">
					*/
					switch (element) {
						case 'radio':
							element = 'input';
							type = 'radio';
							break;
						case 'checkbox':
							element = 'input';
							type = 'checkbox';
							break;
					}
					/*
					  Create a placeholder in case we need to add a form-group or label
					*/
					DOMElementPlaceholder = document.createElement('div');
					DOMElementPlaceholder.classList.add('form-group');
					/*
					  Create dom element by given type
					*/
					DOMElement = document.createElement(element);
					DOMElementPlaceholder.appendChild(DOMElement);
					/*
					  Add specified classes
					*/
					if (classes) {
						for (var i = 0; i < classes.length; i++) {
							DOMElement.classList.add(classes[i]);
						}
					}
					/*
					  Add specified id
					*/
					if (id) {
						DOMElement.setAttribute('id', id);
					}
					/*
					  Add specific class for custom radio and checkbox
					*/
					if (type === 'radio' || type === 'checkbox') {
						DOMElementPlaceholder.classList.add('radio');
						DOMElementPlaceholder.classList.add('custom');
						DOMElement.setAttribute('type', type);
						DOMElement.setAttribute('name', id);
					}
					/*
					  In case of div/span or textarea, the value need to be set as innerText,
					  in case of form elements (except textarea) the value has to be set as 'value' attribute
					*/

					if (value) {
						if (innerTextElements.indexOf(element) > -1) {
							DOMElement.innerText = value;
						} else if (type === 'radio' || type === 'checkbox') {
							DOMElement.setAttribute('name', value);
						} else if (element === 'select') {
							for (var j = 0; j < value.length; j++) {
								var $option = document.createElement('option');
								$option.value = value[j].value;
								$option.innerText = value[j].key;
								DOMElement.appendChild($option);
							}
						} else {
							DOMElement.setAttribute('value', value);
							DOMElement.setAttribute('name', id);
						}
					}
					/*
					  Add bootstrap class for form elements
					*/
					if (element === 'textarea' || element === 'input' || element === 'select') {
						DOMElement.classList.add('form-control');
					}
					if (element === 'select') {
						DOMElementPlaceholder.classList.add('form-element');
						DOMElementPlaceholder.classList.add('select');
						DOMElementPlaceholder.classList.remove('form-group');
						DOMElementPlaceholder.appendChild(DOMElement);
					}
					/*
					  Add placeholder if specified
					*/
					if (placeholder) {
						DOMElement.setAttribute('placeholder', placeholder);
					}
					/*
					  Create and append the label
					*/
					if (label) {
						DOMLabel = document.createElement('label');
						DOMLabel.innerText = label;
						DOMLabel.setAttribute('for', id);
						DOMElementPlaceholder.appendChild(DOMLabel);
					}
					/*
					  if we have a div, span or no label, we return the dom element created,
					  for all other dom elements, we return the placeholder that contains the dom element
					*/
					if ((element === 'div' || element === 'span' || !label) && element !== 'select') {
						return DOMElement;
					} else {
						return DOMElementPlaceholder;
					}
				};

				this.openTemplate = function (template, state, isDraft) {
					var toState = (state === 'edit') ? 'app.template' : 'app.compare',
						draft = (template.status === 'UNPUBLISHED' || template.hasDraft || isDraft) ? true : false;
					$localStorage.draft = draft;
					$state.go(toState, {
						slug: template.slug,
						draft: draft
					});
				};
				this.getVariables = function (url, template, tenant) {
					var payload, contentType;
					if (template) {
						payload = {
							"type": "text/html",
							"subject": template.subject || '',
							"body": template.body
						};
					} else {
						payload = null;
					}
					contentType = 'application/x.com.media-saturn.rea.email-template-data+json';
					return DataService.putData(
						url,
						payload,
						'POST', {
							'Content-Type': contentType,
							'X-Tenant': tenant
						}
					);
				};
				this.removeDuplicates = function (a, b) {
					for (var i = 0, len = a.length; i < len; i++) {
						for (var j = 0, len2 = b.length; j < len2; j++) {
							if (a[i].name === b[j].name) {
								b.splice(j, 1);
								len2 = b.length;
							}
						}
					}
					return b;
				};
				this.publish = function (templateUrl, slug, tenant) {
					var version = $localStorage.draftVersion;
					var url = templateUrl + '/published';
					return DataService.putData(
						url,
						'',
						'POST', {
							'X-Tenant': tenant,
							'If-None-Match-Version': version
						}
					);
				};

				this.getEventVariables = (tenant, actions) => {
					let promises = [];
					actions.map((action) => {
						// Verify if attachments exists and get the variables for them
						if (action.attachments) {
							action.attachments.map((attachment) => {
								if (attachment.template && attachment.template.version !== null) {
									promises.push(DataService.getData('/documents/templates/' + attachment.template.slug + '/versions/' + attachment.template.version + '/published/variables', 0, {
										'X-Tenant': tenant,
										'Accept': 'application/x.com.media-saturn.rea.template-variable-list+json'
									}))
								}
							})
						}
						;
						//Get the variables for e-mail templates
						if (action.template.version !== null && action.type == 'EMAIL') {
							promises.push(DataService.getData('/notifications/templates/' + action.template.slug + '/versions/' + action.template.version + '/published/variables', 0, {
								'X-Tenant': tenant,
								'Accept': 'application/x.com.media-saturn.rea.template-variable-list+json'
							}))
						}
						;
						//Get the variables for sms templates
						if (action.template.version !== null && action.type == 'SMS')
							promises.push(DataService.getData('/notifications/templates/' + action.template.slug + '/versions/' + action.template.version + '/published/variables', 0, {
								'X-Tenant': tenant,
								'Accept': 'application/x.com.media-saturn.rea.sms-template-variable-list+json'
							}));
					});
					//Create a list off all variables
					return $q.all(promises).then((results) => {
						let aggregatedData = [];
						results.forEach((result) => {
							aggregatedData = aggregatedData.concat(result.data);
						});
						return aggregatedData;
					});
				};
				/**
				 * create an url based on received parameters and baseurl
				 * @param  Object parameters [object containing all parameters]
				 * @param  String url        [baseurl uppon we append the parameters]
				 * @param Array exclude      [parametrs to exclude from url]
				 * @return String            [url containing all parameters appended]
				 */
				this.buildURL = function (parameters, url, exclude) {
					var i = 0,
						separator,
						tempParameters = _.clone(parameters);

					if (exclude && exclude.length > 0) {
						for (var j = 0; j < exclude.length; j++) {
							delete tempParameters[exclude[j]];
						}
					}
					for (var parameter in tempParameters) {
						//append only parameters that are not null or undefined;
						//skip distributionChannel parameter - it is used just to obtain tenant
						if (tempParameters[parameter] && parameter) {
							/* for the first parameter prepend '?', for the rest '&' */
							separator = (i <= 0 && url.slice(-1) !== '?') ? '?' : '&';
							url += separator + parameter + '=' + tempParameters[parameter];
							i++;
						}
					}
					return url;
				};
				/**
				 * convert timestamp to human readable date. also checks for seconds or miliseconds
				 * @param  String timestamp   [timestamp in seconds/miliseconds]
				 * @param  Boolean divide     [true: timestamp will be converted to miliseconds]
				 * @return String             [date in format yy-mm-dd; hh-mm]
				 */
				this.convertTimestamp = function (timestamp, divide) {
					timestamp = (divide) ? (timestamp / 1000) : timestamp;
					var date = new Date(timestamp),
						year = date.getFullYear(),
						month = ('0' + (date.getMonth() + 1)).slice(-2),
						day = ('0' + date.getDate()).slice(-2),
						hours = date.getHours(),
						hour = hours,
						minutes = ('0' + date.getMinutes()).slice(-2),
						ampm = 'AM',
						time,
						h;

					if (hours > 12) {
						h = hours - 12;
						ampm = 'PM';
					} else if (hours === 12) {
						h = 12;
						ampm = 'PM';
					} else if (hours === 0) {
						h = 12;
					}

					return year + '-' + month + '-' + day + ', ' + hour + ':' + minutes + ' ' + ampm;
				};

				/**
				 * get a list of countries
				 * @return List of strigs containing countries names
				 */
				this.getCountries = function () {
					return defaults.countries
						.filter(country => country.hasOwnProperty('name'))
						.map(country => country.name)
				};

				/**
				 * get a pdf file (base64)
				 * @param  String url            [url from where to get the pdf]
				 * @param  String responseType   [description]
				 * @return Promise              [description]
				 */
				this.getPDF = function (url, responseType, headers) {
					return $http.get('/api' + url, {
						responseType: responseType,
						headers: headers
					}).then(function (response) {
						return response;
					});
				};
				/**
				 * Converts byteArray to blob
				 * @param  byteArray
				 * @return DOMString in case of IE / Blob for all non-IE
				 */
				this.base64ToBlob = function (base64) {
					var byteArray = [];
					byteArray.push(base64);
					var blob = new Blob(byteArray, {
						type: 'application/pdf',
					});
					return (window.navigator && window.navigator.msSaveOrOpenBlob) ? blob : URL.createObjectURL(blob);
				};
				/**
				 * checks if an object exists in a list, by a specific object property
				 * @param  Object   object        [object you wish to check if exists]
				 * @param  Array    list          [list of object (can be of different structure than [object])]
				 * @param  String   objectProperty  [property of the object to use when comparing]
				 * @param  String   listProperty  [property of the object from the array to compare against]
				 * @return Boolean  [returns true if object exists; false if object doesn't exist]
				 */
				this.containsObject = function (object, list, objectProperty, listProperty) {
					for (var i = 0; i < list.length; i++) {
						if (list[i][listProperty] === object[objectProperty]) {
							return true;
						}
					}
					return false;
				};
				/**
				 * Converts all keys of an object to lowercase
				 * @param  Object object [The object that you wish to convert the keys to]
				 * @return Object        [return a new object with all the keys to lowercase]
				 */
				this.keysToLowercase = function (object) {
					var newObject = {};
					for (var key in object) {
						newObject[key.toLowerCase()] = object[key];
					}
					if ((typeof object[key]) == 'object') {
						this.keysToLowercase(object[key]);
					}
					return newObject;
				};
				/**
				 * convert string representing of css to object
				 * @param  {String} css String representation of a css file/content
				 * @return {Array}      Array of object of the form: [{selector: 'name', cssText: 'padding: 10px;'}]
				 */
				this.convertCSS2JS = (css) => {
					const regex = /([\w.#]*)({(.*?)})/g;
					let m, result = [];

					while ((m = regex.exec(css)) !== null) {
						// This is necessary to avoid infinite loops with zero-width matches
						if (m.index === regex.lastIndex) {
							regex.lastIndex++;
						}
						// Only push styles that have a matching selector
						if (m[1]) {
							result.push({
								selector: m[1],
								cssText: m[3]
							});
						}
					}
					return result;
				};
				/**
				 * Extracts conditions from data-attributes and creates a th-switch block
				 * @param  {HTMLElement} content element containing data-condition attribute
				 * @return {HTMLElement}
				 */
				this.conditionalBlock = (content) => {
					let condition = JSON.parse(content.getAttribute('data-condition')),
						$variable = document.createElement('th:block');
					$variable.setAttribute('data-th-switch', `\${${content.innerText.trim()}}`)

					condition.forEach(item => {
						let $element = document.createElement('th:block');
						if (item.type == 'equals') {
							$element.setAttribute('data-th-case', `'${item.input}'`);
							$element.setAttribute('data-th-text', `'${item.textArea}'`);
						} else {
							$element.setAttribute('data-th-case', '*');
							$element.setAttribute('data-th-text', `'${item.textArea}'`);
						}
						$variable.appendChild($element);
					});
					return $variable;
				};
				this.getLanguages = (list) => {
					let result = [];
					for (let key in list) {
						result.push(key);
					}
					return result;
				};

				this.getCountryLanguage = (tenant) => {
					let result = [];
					defaults.countries.some((country) => {
						if (country.tenants.includes(tenant)) {
							result = country.languages;
						}
					});
					return result;
				}
				/**
				 * Converts a string to a HTMLElement
				 * @param  {String} string string representation of the content
				 * @return {HTMLElement} return first child so that we don't include the parent node we temporary created
				 */
				this.stringToHTML = (string) => {
					let $placeholder;
					/* transform string to a DOM Element */
					$placeholder = document.createElement('DIV');
					$placeholder.classList.add('wrapper');
					$placeholder.innerHTML = string;
					return $placeholder;
				};

				this.prepareComponents = (comp, language, languages) => {
					for (let key in comp) {
						if (comp[key].components) {
							if (comp[key].type === 'text') {
								let id = (comp[key].attributes) ? comp[key].attributes.id : null;
								if (languages && languages[language]) {
									if (comp[key].classes.length > 0) {
										comp[key].classes.forEach((item, index) => {
											if (item.name == 'undefined') {
												comp[key].classes.splice(index, 1);
											}
										});
									}
									// TODO: Add logic to check each language
								} else {
									comp[key].classes.push('undefined');
								}
							}
							this.prepareComponents(comp[key].components, language, languages);
						}
					}
					return comp;
				};
				this.setComponents = (content, originalContent, language) => {
					let contentData, result = {},
						temp, $placeholder,
						defaultStyles = defaults.styles,
						styles = this.formatter.minify(localStorage.getItem('gjs-css')).styles;
					if (!styles.includes('.variable')) styles = styles + defaultStyles;

					$placeholder = (originalContent) ? this.stringToHTML(originalContent).childNodes[0] : document.createElement('div');
					temp = document.createElement('div');
					temp.innerHTML = this.convertInThSwitch(this.stringToHTML(content));
					$placeholder.innerHTML = temp.querySelector('.wrapper').innerHTML;
					$placeholder.setAttribute(`data-components-${language.replace('_', '-')}`, _.unescape(localStorage.getItem('gjs-components')));
					$placeholder.setAttribute('data-styles', styles);
					return this.selfClosingTag($placeholder.outerHTML);
				};

				/**
				 * extract HTMLElement by class/id and also remove the node
				 * @param  {String} content
				 * @param  {Object} properties
				 * @param  {Boolean} remove
				 * @return {HTMLElement}
				 */
				this.extractContent = (content, properties, remove) => {
					if (!content.newContent || !properties) return;

					let $tempContent = this.stringToHTML(content.newContent),
						$element = $tempContent.querySelector((properties.id) ? `#${properties.id}` : `.${properties.class}`);

					if ($element && (!$element.getAttribute('data-repeatable') || $element.getAttribute('data-repeatable') == 'false')) {
						$element = null;
					} else if ($element && ($element.getAttribute('data-repeatable') && $element.getAttribute('data-repeatable') == 'true') && remove) {
						$element.parentNode.removeChild($element);
						content.newContent = $tempContent.innerHTML;
					}

					return $element;
				};

				this.convertInThSwitch = (content) => {
					let selectedText = content.querySelectorAll("[data-condition]");
					if (selectedText) {
						selectedText.forEach((item) => {
							let attribute = JSON.parse(content.querySelector("[data-condition]").getAttribute("data-condition")),
								variable = item.innerHTML,
								thSpan = document.createElement('span'),
								thRemove;
							thSpan.setAttribute("class", "variable-placeholder");
							thSpan.innerHTML = `<span class="conditional-variable" data-th-switch="${variable}"></span>`;
							attribute.forEach((attr) => {
								let thCase;
								if (attr.type === "equals") {
									thCase = `<th:block class="case" data-th-case="${attr.input}" data-th-text="${attr.textArea}"></th:block>`;
									thSpan.insertAdjacentHTML('beforeend', thCase);
								} else if (attr.type === "default") {
									thCase = `<th:block class="case" data-th-case="*" data-th-text="${attr.textArea}"></th:block>`;
									thSpan.insertAdjacentHTML('beforeend', thCase);
								}
							});
							thRemove = `<th:block class="variable default" data-th-remove="all">${variable}</th:block>`;
							thSpan.insertAdjacentHTML('beforeend', thRemove);
							item.innerHTML = thSpan.outerHTML;
							content.querySelector("[data-condition]").removeAttribute("data-condition");
						});
					}
					return content.outerHTML;
				};

				this.updateCondition = (content, index, value, id) => {
					let attributes = JSON.parse(content.getAttribute('data-condition'));
					if (id.includes("optionSelect"))
						attributes[index].type = value;
					if (id.includes("textInput"))
						attributes[index].input = value;
					if (id.includes("textArea"))
						attributes[index].textArea = value;
					content.setAttribute('data-condition', JSON.stringify(attributes));
				};

				this.updateSingleCondition = (content, variableInput, optionSelect, valueInput) => {
					let attribute;
					if (optionSelect == 'EQUAL') {
						attribute = `(\${${variableInput}}=='${valueInput}')`;
					} else if (optionSelect == 'NOT_EQUAL') {
						attribute = `(\${${variableInput}}!='${valueInput}')`;
					} else if (optionSelect == 'CONTAINS') {
						attribute = `(\${#lists.contains(${variableInput},'${valueInput}')})`;
					} else if (optionSelect == 'NOT_CONTAINS') {
						attribute = `(\${!#lists.contains(${variableInput},'${valueInput}')})`;
					} else if (optionSelect == 'EXISTS') {
						attribute = `(\${${variableInput}}!=NULL)`;
					} else if (optionSelect == 'NOT_EXISTS') {
						attribute = `(\${${variableInput}}==NULL)`;
					}
					content.setAttribute('concat-attribute', attribute);
				};

				this.updateAllConditions = (content, baseNode) => {
					let result = '',
						conditionals;
					conditionals = baseNode.children;
					for (let i = 0; i < conditionals.length; i++) {
						if (conditionals[i].classList.contains('condition')) {
							if (i == 2) {
								result += conditionals[i].getAttribute('concat-attribute');
							} else if (conditionals[i] == conditionals.length - 1) {
								result += conditionals[i].getAttribute('concat-attribute');
							} else {
								if (baseNode.querySelector('.gjs-active').value == "AND") {
									result += (' AND ' + conditionals[i].getAttribute('concat-attribute'));
								} else if (baseNode.querySelector('.gjs-active').value == "OR") {
									result += (' OR ' + conditionals[i].getAttribute('concat-attribute'));
								}
							}
						} else if (conditionals[i].classList.contains('conditions')) {
							this.updateAllConditions(content, conditionals[i]);
							if (i == 2)
								result += ('(' + conditionals[i].getAttribute('concatenation') + ')');
							else {
								if (baseNode.querySelector('.gjs-active').value == "AND") {
									result += (' AND (' + conditionals[i].getAttribute('concatenation') + ')');
								} else if (baseNode.querySelector('.gjs-active').value == "OR") {
									result += (' OR (' + conditionals[i].getAttribute('concatenation') + ')');
								}
							}
						}
					}
					;
					baseNode.setAttribute('concatenation', result);
					if (baseNode.id == 'c')
						content.setAttribute('data-th-if', baseNode.getAttribute('concatenation'));
				};


				this.splitConditions = function (elements, number) {
					let backup = elements;
					let a = backup.split('');
					var count = 0;
					for (var i = 0; i < a.length; i++) {
						if (a[i] == '(') {
							a[i] = count++ + '(';
						} else if (a[i] == '(' && a[i + 1] == '(') {
							a[i] = count++ + '(';

						} else if (a[i] == ')') {
							a[i] = ')' + --count;
						}
					}
					backup = a.join('');
					var regexExpression = number + "\\(|\\)" + number;
					var regex = new RegExp(regexExpression);
					let attributesArray = backup.split(regex);
					return attributesArray;

				};

				this.deleteCondition = (content, index) => {
					let attributes = JSON.parse(content.getAttribute('data-condition'));
					attributes.splice(index, 1);
					content.setAttribute('data-condition', JSON.stringify(attributes));
				};

				this.createInnerElement = (type, properties) => {
					let element = document.createElement(type);
					for (var property in properties) {
						if (property === 'class') {
							for (let i = 0; i < properties[property].length; i++) {
								element.classList.add(properties[property][i]);
							}
						} else if (property === 'id') {
							element.setAttribute('id', properties[property]);
						} else if (property === 'name') {
							element.setAttribute('name', properties[property]);
						} else if (property === 'type') {
							element.setAttribute('type', properties[property]);
						} else if (property === 'innerHTML') {
							element.innerHTML = properties[property];
						} else if (property === 'placeholder') {
							element.setAttribute('placeholder', properties[property]);
						} else if (property === 'value') {
							element.value = properties[property];
						} else if (property === 'text') {
							element.text = properties[property];
						} else if (property === 'display') {
							element.style.display = properties[property];
						} else {
							element.setAttribute(property.toDash(), properties[property]);
						}
					}
					return element;
				}

				this.deleteCondition = (content, index) => {
					let attributes = JSON.parse(content.getAttribute('data-condition'));
					attributes.splice(index, 1);
					content.setAttribute('data-condition', JSON.stringify(attributes));
				};

				this.toggleLanguageMenu = ($event) => {
					let $input = $event.target.parentNode.querySelector('#languageKey');
					$timeout(() => {
						$input.focus();
					}, 10);
				};
				/**
				 * Removes special characters from inner text of variable
				 * @param  {String} content string representation of the variable
				 * @return {String} variable without special characters
				 */
				this.cleanVariable = (innerText) => {
					return innerText.trim().split(/[^A-Za-z0-9.[]]/g).join('');
				};
				/**
				 * Set iteration variable
				 * @param {String} value  string representation of the variable
				 * @return {String} iteration variable without special characters
				 */
				this.setIteration = (value) => {
					return `item, iterator: \${${this.cleanVariable(value)}}`;
				};
				/**
				 * Converts a normal variable to thymeleaf dialect
				 * @param {String} type
				 * @param {String} value
				 * @return {String}
				 */
				this.setFormat = (type, value) => {
					let format;
					if (type === 'numbers' || type.type === 'numbers') {
						format = `\${#numbers.formatDecimal(${value}, 1, 'POINT', 2, 'COMMA')}`;
					} else if (type === 'time' || (type.type === 'temporals' && type.format === 'HH:mm')) {
						format = `\${#temporals.format(T(java.time.OffsetDateTime).parse(${value}), 'HH:mm')}`;
					} else if (type === 'date' || (type.type === 'temporals' && type.format === 'dd.MM.yyyy')) {
						format = `\${#temporals.format(T(java.time.OffsetDateTime).parse(${value}), 'dd.MM.yyyy')}`;
					}
					return format;
				};
				/**
				 * get format type from thymeleaf dialect
				 * @param  {String} value
				 * @param  {String} regex
				 * @return {String}
				 */
				this.getFormat = (value, regex) => {
					let m;
					if (!regex) regex = /\${#(.*?)\./g;
					while ((m = regex.exec(value)) !== null) {
						// This is necessary to avoid infinite loops with zero-width matches
						if (m.index === regex.lastIndex) {
							regex.lastIndex++;
						}
						return {
							type: m[1],
							format: m[3]
						};
					}
				};
				/**
				 * Return the iteration variable
				 * @param  {String} value Iteration value
				 * @return {[type]}       First match of the iteration
				 */
				this.getIteration = (value, regex) => {
					let m;
					if (!regex) regex = /\{(.*?)\}/g;
					while ((m = regex.exec(value)) !== null) {
						// This is necessary to avoid infinite loops with zero-width matches
						if (m.index === regex.lastIndex) {
							regex.lastIndex++;
						}
						return m[1];
					}
				};
				this.selfClosingTag = (content) => {
					content = content.replace(/<br(.*?)>/g, "<br$1 />").replace(/<img(.*?)>/g, "<img$1 />");
					return content;
				};
				/* Sets the attribute that specifies the barcode type */
				this.setBarcodeAttribute = (model, selectedOption, value, context) => {
					let src = context.getAttribute("src");
					//removes existing attributes if the type of barcode is changed
					for (let key in context.attributes) {
						if (context.attributes[key].name && context.attributes[key].name.includes('data-th-'))
							context.removeAttribute(context.attributes[key].name);
					}
					;
					model.set('attributes', JSON.parse(`{"src": "${src}", "alt": "Barcode", "${selectedOption}": "\${${value}}"}`));
				};
				/**
				 * return the selected language from local storage
				 * @return {String}
				 */
				this.getLanguage = () => $localStorage.language;
				/**
				 * Get fileName from content disposition like string
				 * @param string {String}
				 * @returns {String}
				 */
				this.getFileName = (string) => {
					let regex = /"(.*?)"/gm;
					return string.match(regex)[0];
				}
			}
		]);
