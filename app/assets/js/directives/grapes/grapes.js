angular
	.module('app')
	.directive(
		'grapes', ['DataService',
			'$state',
			'AuthorizationService',
			'$localStorage',
			'$timeout',
			'AlertService',
			'generalServices',
			'defaults',

			function (
				DataService,
				$state,
				AuthorizationService,
				$localStorage,
				$timeout,
				AlertService,
				generalServices,
				defaults
			) {

				return {
					scope: {
						id: '@editor',
						save: '&saveMethod'
					},
					template: '<div id="{{id}}"></div>',
					replace: true,
					link: (scope, element, attributes) => {
						// Set the styles used inside the iframe that contains the editor
						let styles = defaults.styles;
						// Init the editor on the specified directive
						$timeout(() => {
							let editor = grapesjs.init({
									container: `#${scope.id}`,
									style: styles,
									avoidInlineStyle: 0,
									canvas: {
										scripts: ['/assets/vendor/jquery/dist/jquery.min.js'],
										styles: ['/assets/vendor/fontawesome/css/font-awesome.min.css']
									},
									storageManager: {
										stepsBeforeSave: 1,
										storeStyles: false
									},
									assetManager: {
										upload: 0,
										dropzone: 0
									}
								}),
								// Get DomComponents module
								components = editor.DomComponents,
								// Get TrainsManager module
								traitManager = editor.TraitManager,
								// Get BlockManager module
								blockManager = editor.BlockManager,

								// Get the model and the view from the default Component type
								defaultType = components.getType('default'),
								defaultModel = defaultType.model,
								defaultView = defaultType.view,
								rte = editor.RichTextEditor,
								panelManager = editor.Panels,
								originalText = components.getType('text'),
								originalLink = components.getType('link');

							var styleManager = editor.StyleManager;
							styleManager.addProperty('Decorations', {
								name: 'Border width',
								property: 'border-width',
								type: 'composite',
								properties: [{
									name: 'Border top',
									property: 'border-top',
									type: 'integer',
									units: ['px', '%'],
									defaults: 'auto',
									min: 0,
								},
									{
										name: 'Border right',
										property: 'border-right',
										type: 'integer',
										units: ['px', '%'],
										defaults: 'auto',
										min: 0,
									},
									{
										name: 'Border bottom',
										property: 'border-bottom',
										type: 'integer',
										units: ['px', '%'],
										defaults: 'auto',
										min: 0,
									},
									{
										name: 'Border left',
										property: 'border-left',
										type: 'integer',
										units: ['px', '%'],
										defaults: 'auto',
										min: 0,
									}

								],
							});

							styleManager.addSector('Tables', {
								name: 'Table',
								open: false,
								properties: [{
									name: 'Vertical align',
									property: 'vertical-align',
									type: 'select',
									list: [{
										name: 'Top',
										value: 'top'
									}, {
										name: 'Middle',
										value: 'middle'
									},
										{
											name: 'Bottom',
											value: 'bottom'
										}
									]
								}, {
									name: 'Border collapse',
									property: 'border-collapse',
									type: 'select',
									list: [{
										name: 'separate',
										value: 'separate'
									}, {
										name: 'collapse',
										value: 'collapse'
									}, {
										name: 'initial',
										value: 'initial'
									}, {
										name: 'inherit',
										value: 'inherit'
									}]
								}, {
									name: 'Border top',
									property: 'border-top',
									type: 'select',
									units: ['px'],
									list: [{
										value: '1px #dcdcdc solid',
										name: 'default'
									}, {
										value: 'none',
										name: 'none'
									}],
									min: 0,
								},
									{
										name: 'Border bottom',
										property: 'border-bottom',
										type: 'select',
										units: ['px'],
										list: [{
											value: '1px #E9E9E9 solid',
											name: 'default'
										}, {
											value: 'none',
											name: 'none'
										}],
										min: 0,
									},
									{
										name: 'White Space',
										property: 'white-space',
										type: 'select',
										units: ['px'],
										list: [{
											value: 'default',
											name: 'default'
										}, {
											value: 'nowrap',
											name: 'nowrap'
										}, {
											value: 'pre',
											name: 'pre'
										}],
										min: 0,
									}, {
										name: 'Word break',
										property: 'word-break',
										type: 'select',
										list: [{
											value: 'normal',
											name: 'normal'
										}, {
											value: 'break-all',
											name: 'break-all'
										}, {
											value: 'keep-all',
											name: 'keep-all'
										}],
									}
								]
							});

							//Add save button
							panelManager.addButton('options', {
								id: 'save-template',
								className: 'fa fa-save icon-blank',
								attributes: {
									title: 'Save template'
								},
								command: {
									run: (editor, sender) => {
										let content = editor.Canvas.getWrapperEl(),
											styling = generalServices.convertCSS2JS(editor.getCss());
										styling.forEach(
											style => {
												let element = content.querySelector(style.selector);
												if (element) {
													element.style.cssText = style.cssText;
													element.classList.remove('undefined');
													if (element.nodeName === 'IMG') {
														element.setAttribute('width', element.clientWidth);
														element.setAttribute('height', element.clientHeight);
													}
													if (
														element.nodeName === 'P' ||
														element.nodeName === 'TH:BLOCK' ||
														element.nodeName === 'H3' ||
														(
															element.nodeName === 'DIV' &&
															((angular.element(element).closest('table')[0] && !angular.element(element).closest('table')[0].getAttribute('data-dynamic')) || !angular.element(element).closest('table')[0])
														) || element.nodeName === 'TABLE'
													) {
														if (element.getAttribute('data-component')) {
															element.setAttribute(
																'data-th-utext',
																`#{${element.getAttribute('data-component')}}`
															);
														}
													}
												}
											});
										scope.save({
										    content: content.innerHTML
										});

									}
								}
							});
							// Add variable tool in the WYSIWYG
							// It formats the selected text in a th:block
							if (!rte.get('variable'))
								rte.add('variable', {
									icon: '<b>V</b>',
									attributes: {
										title: 'Variable',
									},
									result: (rte, action) => {
										if (rte.selection().baseNode.parentNode.className && rte.selection().baseNode.parentNode.className.includes('variable')) {
											rte.selection().baseNode.parentNode.outerHTML = rte.selection().baseNode.textContent;
										} else {
											rte.insertHTML(`<th-block class="variable">${rte.selection()}</th-block>`);
										}
									}
								});

							/* General text conatainer */
							blockManager.add('blockText', {
								label: 'Block text',
								attributes: {
									class: 'fa fa-font'
								},
								category: 'Predefined content',
								content: `<div style="margin: 0 0 20px; font: 16px Arial, sans-serif;">Insert text here</div>`
							});

							/* General text conatainer */
							blockManager.add('inlineText', {
								label: 'Inline text',
								attributes: {
									class: 'fa fa-font'
								},
								category: 'Predefined content',
								content: `<span style="margin: 0 0 20px; font: 16px Arial, sans-serif;">Insert text here</span>`
							});

							/* Final greeting conatainer */
							blockManager.add('final-greeting', {
								label: 'Final greeting',
								attributes: {
									class: 'fa fa-font'
								},
								category: 'Predefined content',
								content: `<div style="Margin: 0 0 10px; font: 16px Arial, sans-serif;">Mit freundlichen Grüßen<br />Ihr Media Markt Team</div>`
							});

							/* Salutation container */
							blockManager.add('salutation', {
								label: 'Salutation',
								attributes: {
									class: 'fa fa-user'
								},
								category: 'Predefined content',
								content: `<div style="Margin: 0 0 20px; font: 16px Arial, sans-serif;">Sehr <th-block class="variable" data-condition="[{&quot;type&quot;:&quot;equals&quot;,&quot;input&quot;:&quot;Mr&quot;,&quot;textArea&quot;:&quot;geehrter Herr&quot;},{&quot;type&quot;:&quot;equals&quot;,&quot;input&quot;:&quot;Mrs&quot;,&quot;textArea&quot;:&quot;geehrte Frau&quot;},{&quot;type&quot;:&quot;equals&quot;,&quot;input&quot;:&quot;Miss&quot;,&quot;textArea&quot;:&quot;geehrte Frau&quot;},{&quot;type&quot;:&quot;default&quot;,&quot;input&quot;:null,&quot;textArea&quot;:&quot;geehrte(r)&quot;}]">title</th-block> <th-block class="variable">firstName</th-block> <th-block class="variable">lastName</th-block>,</div>`
							});

							blockManager.add('doc-products-table', {
								label: 'Products table',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Documents',
								content: `
                                <table data-th-with="lineNumber=0" data-dynamic="true" style="font-family: Arial, sans-serif; border-spacing: 0; border-collapse: collapse; width: 100%; border: none;">
                                    <thead>
                                        <tr>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:left;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;"><div>Pos.</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:left;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;"><div>Menge</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:left;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;"><div>Art-Nr.</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:left;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;"><div>Bezeichnung</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:right;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;"><div>MwSt</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:right;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;min-width:78px;"><div>Einzelpreis</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:right;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 15px 5px 0;"><div>Preisnachlass</div></th>
                                            <th style="font-family:Arial, sans-serif;font-size:12px;text-align:right;border-bottom-width:1px;border-bottom-color:#000;border-bottom-style:solid;padding:5px 0 5px 0;min-width:78px;"><div>Gesamt</div></th>
                                        </tr>
                                    </thead>
                                    <tbody data-th-each="item : \${products}">
                                        <tr>
                                            <td data-th-with="lineNumber=\${#ids.seq(lineNumber)}" style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(lineNumber, 0, 'COMMA', 0, 'POINT')}">lineNumber</th-block></span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.quantity, 0, 'COMMA', 0, 'POINT')}">item.quantity</th-block></span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span>
                                                    <span data-th-if="(\${item.URAFlag}=='Y')">*</span>
                                                    <span><th-block class="variable">item.articleId</th-block></span>
                                                </span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable">item.articleName</th-block></span>
                                                <div data-th-each="serial : \${item.serials}">
                                                    Serienummer: <th-block class="variable">serial.number</th-block>
                                                </div>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.taxPercentage, 0, 'COMMA', 0, 'COMMA')}">item.taxPercentage</th-block>%</span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.unitPrice, 0, 'COMMA', 2, 'COMMA')}">item.unitPrice</th-block> <th-block class="variable">currency</th-block></span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;"></td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 0 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.linePrice, 0, 'COMMA', 2, 'COMMA')}">item.linePrice</th-block> <th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                        <!-- warranty info -->
                                        <tr data-th-if="(\${item.warrantyNumber}!='') AND (\${item.externalFlag}=='0')">
                                            <td style="padding-bottom: 5px; border-bottom: 1px #000 solid"></td>
                                            <td style="padding-bottom: 5px; border-bottom: 1px #000 solid"></td>
                                            <td style="padding-bottom: 5px; border-bottom: 1px #000 solid"></td>
                                            <td colspan="5" style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding-bottom: 5px; border-bottom: 1px #000 solid">
                                                <div>
                                                    <br />Vertragsnummer: <th-block class="variable">item.warrantyNumber</th-block> <img src="./assets/img/barcode.png" style="padding-left: 40px; width:297px;height:12px;" alt="Barcode" data-th-warrantybarcode="\${item.warrantyNumber}" class="sales-barcode" />
                                                    <br />GARANTIEPLUS für Artikelnummer <th-block class="variable">item.articleId</th-block>
                                                    <br />gemäß den ausgehändigten AGB zur GARANTIEPLUS
                                                    <br />Abgesicherter Wert
                                                    <th-block class="variable" data-format="\${#numbers.formatDecimal(item.unitPrice, 0, 'COMMA', 2, 'COMMA')}">item.unitPrice</th-block> <th-block class="variable">currency</th-block>
                                                    <br />Hotline Nummer GARANTIEPLUS: 0800 202 302
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-th-if="(\${item.warrantyNumber}!='') AND (\${item.externalFlag}=='1')">
                                            <td style="padding-bottom: 5px; border-bottom: 1px #000 solid;"></td>
                                            <td style="padding-bottom: 5px; border-bottom: 1px #000 solid;"></td>
                                            <td style="padding-bottom: 5px; border-bottom: 1px #000 solid;"></td>
                                            <td colspan="5" style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding-bottom: 5px; border-bottom: 1px #000 solid;">
                                                <div>
                                                      <br />Der Preis beinhaltet
                                                      <span data-th-if="(\${item.articleId}=='1260824') OR (\${item.articleId}=='1260837') OR (\${item.articleId}=='1622825') OR (\${item.articleId}=='1622826')">11,0%</span>
                                                      <span data-th-if="(\${item.articleId}=='1150142') OR (\${item.articleId}=='1150149') OR (\${item.articleId}=='1150143') OR (\${item.articleId}=='1150150') OR (\${item.articleId}=='1150151') OR (\${item.articleId}=='1150144') OR (\${item.articleId}=='1150152') OR (\${item.articleId}=='1150153') OR (\${item.articleId}=='1150145') OR (\${item.articleId}=='1150154') OR (\${item.articleId}=='1150146') OR (\${item.articleId}=='1150147') OR (\${item.articleId}=='1150148') OR (\${item.articleId}=='1150128') OR (\${item.articleId}=='1150135') OR (\${item.articleId}=='1150129') OR (\${item.articleId}=='1150136') OR (\${item.articleId}=='1150137') OR (\${item.articleId}=='1150130') OR (\${item.articleId}=='1150138') OR (\${item.articleId}=='1150139') OR (\${item.articleId}=='1150131') OR (\${item.articleId}=='1150140') OR (\${item.articleId}=='1150132') OR (\${item.articleId}=='1150133') OR (\${item.articleId}=='1150134') OR (\${item.articleId}=='1495638') OR (\${item.articleId}=='1495640') OR (\${item.articleId}=='1495641') OR (\${item.articleId}=='1495642') OR (\${item.articleId}=='1481251') OR (\${item.articleId}=='1481252') OR (\${item.articleId}=='1481253')">11,20%</span> Versicherungssteuer
                                                      <br />
                                                      <br />Vertragsnummer: <th-block class="variable">item.warrantyNumber</th-block> <img src="./assets/img/barcode.png" style="padding-left: 40px; width:297px;height:12px;" alt="Barcode" data-th-warrantybarcode="\${item.warrantyNumber}" class="sales-barcode" />
                                                      <br />Assona Versicherung für Artikelnummer <th-block class="variable">item.articleId</th-block>
                                                      <br />gemäß den ausgehändigten AVB zur Assona Versicherung
                                                      <br />Abgesicherter Wert
                                                      <th-block data-th-utext="\${#numbers.formatDecimal(item.unitPrice, 0, 'COMMA', 2, 'COMMA')}">item.unitPrice</th-block> <th-block class="variable">currency</th-block>
                                                      <br />Hotline Nummer: 01 2748656
                                                      <br /><br />Verkauf bzw. Ausgabe im Namen und für Rechnung der
                                                      <br />ASSONA GMBH
                                                      <br />LORENZWEG 5
                                                      <br />DE 12099 BERLIN
                                                      <br />USt-IdNr.: DE227111131
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-th-each="charge : \${item.lineCharges}" data-th-if="(\${charge.category}=='PROMOTION')">
                                            <td data-th-with="lineNumber=\${#ids.seq(lineNumber)}" style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(lineNumber, 0, 'COMMA', 0, 'POINT')}"></th-block></span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span>1</span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:left;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span data-th-if="(\${charge.qualifier}=='')"><th-block class="variable">charge.name</th-block></span>
                                                <span data-th-if="(\${charge.qualifier}=='LOY')"><th-block class="variable">charge.description</th-block> - <th-block class="variable">charge.number</th-block></span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(charge.salesTax, 0, 'COMMA', 0, 'COMMA')}">charge.salesTax</th-block>%</span>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 15px 5px 0;border-bottom:1px #000 solid;">
                                                <span data-th-if="(\${charge.unitPrice}>0)">-</span>
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(charge.unitPrice, 0, 'COMMA', 2, 'COMMA')}">charge.unitPrice</th-block></span><th-block class="variable">currency</th-block>
                                            </td>
                                            <td style="font-family:Arial, sans-serif;font-size:12px;text-align:right;vertical-align:top;padding:5px 0 0;border-bottom:1px #000 solid;">
                                                <span data-th-if="(\${charge.linePrice}>0)">-</span>
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(charge.linePrice, 0, 'COMMA', 2, 'COMMA')}">charge.linePrice</th-block></span><th-block class="variable">currency</th-block>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr data-th-if="(\${#lists.contains(chargeCategory,'EXPRESS_SHIPPING_FEE')})">
                                            <td data-th-with="lineNumber=\${#ids.seq(lineNumber)}" style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: 1px #000 solid;">
                                                <th-block class="variable" data-format="\${#numbers.formatDecimal(lineNumber, 0, 'COMMA', 0, 'POINT')}">lineNumber</th-block>
                                            </td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: 1px #000 solid;"></td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: 1px #000 solid;"></td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: 1px #000 solid;">Express-/Wunschterminlieferung</td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 15px 5px 0; border-bottom: 1px #000 solid;">20%</td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 15px 5px 0; border-bottom: 1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(chargeAmount, 0, 'COMMA', 2, 'COMMA')}">chargeAmount</th-block> <th-block class="variable">currency</th-block></span>
                                            </td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 0 5px 0; border-bottom: 1px #000 solid;"></td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 0 5px; border-bottom: 1px #000 solid;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(chargeAmount, 0, 'COMMA', 2, 'COMMA')}">chargeAmount</th-block> <th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                        <tr style="font-family: Arial, sans-serif;">
                                            <td data-th-with="lineNumber=\${#ids.seq(lineNumber)}" style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: none;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(lineNumber, 0, 'COMMA', 0, 'POINT')}">lineNumber</th-block></span>
                                            </td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: none;"></td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: none;"></td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: left; vertical-align: top; padding: 5px 10px 5px 0; border-bottom: none;">Versandkosten</td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 15px 5px 0; border-bottom: none;">
                                                <span data-th-if="(\${VATPercentage}!=NULL)"><th-block class="variable" data-th-utext="\${#numbers.formatDecimal(VATPercentage, 0, 'COMMA', 0, 'COMMA')}">VATPercentage</th-block></span>
                                                <span data-th-if="(\${VATPercentage}==NULL)">20%</span>
                                            </td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 15px 5px 0; border-bottom: none;">
                                                <span data-th-if="(\${grossTotal}!=NULL)">
                                                    <th-block class="variable" data-format="\${#numbers.formatDecimal(grossTotal, 0, 'COMMA', 2, 'COMMA')}">grossTotal</th-block>
                                                </span> <span data-th-if="(\${grossTotal}==NULL)">0,00</span> <span><th-block class="variable">currency</th-block></span>
                                            </td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 0 5px 0; border-bottom: none;"></td>
                                            <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; vertical-align: top; padding: 5px 0 5px; border-bottom: none;">
                                                <span data-th-if="(\${grossTotal}!=NULL)">
                                                    <th-block class="variable" data-format="\${#numbers.formatDecimal(grossTotal, 0, 'COMMA', 2, 'COMMA')}">grossTotal</th-block>
                                                </span> <span data-th-if="(\${grossTotal}==NULL)">0,00</span> <span><th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table data-dynamic="true" style="font-family: Arial, sans-serif; border-spacing: 0; border-collapse: collapse; width: 100%; background-color: #fff; margin: auto; border: none;">
                                    <tr style="font-family: Arial, sans-serif;">
                                        <td colspan="8" style="font-family: Arial, sans-serif; border-bottom-width: 1px; border-bottom-color: #000; border-bottom-style: solid; padding: 5px 0 40px;"> </td>
                                    </tr>
                                    <tr style="font-family: Arial, sans-serif;">
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><div>MwSt</div></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><div>Netto-Summe</div></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><div>MwSt-Summe</div></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><div>Brutto-Summe</div></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><div><u style="font-family: Arial, sans-serif;">Gesamtsumme</u></div></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><u><th-block class="variable" data-format="\${#numbers.formatDecimal(grandTotal, 0, 'COMMA', 2, 'COMMA')}">grandTotal</th-block> <th-block class="variable">currency</th-block></u></td>
                                    </tr>
                                    <tr style="font-family: Arial, sans-serif;">
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <span><th-block class="variable" data-format="\${#numbers.formatDecimal(totalVATPercentage, 0, 'COMMA', 2, 'COMMA')}">totalVATPercentage</th-block>%</span>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <th-block class="variable" data-format="\${#numbers.formatDecimal(netTotal, 0, 'COMMA', 2, 'COMMA')}">netTotal</th-block> <th-block class="variable">currency</th-block>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <th-block class="variable" data-format="\${#numbers.formatDecimal(VATPerBand, 0, 'COMMA', 2, 'COMMA')}">VATPerBand</th-block> <th-block class="variable">currency</th-block>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <th-block class="variable" data-format="\${#numbers.formatDecimal(productGrossTotal, 0, 'COMMA', 2, 'COMMA')}">productGrossTotal</th-block> <th-block class="variable">currency</th-block>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; padding: 5px 0 5px; border: none;"></td>
                                    </tr>
                                    <tr style="font-family: Arial, sans-serif;">
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"><div>Versandkosten</div></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <span data-th-if="(\${VATPercentage}!=NULL)">
                                                <th-block class="variable" data-format="\${#numbers.formatDecimal(VATPercentage, 1, 'COMMA', 0, 'COMMA')}">VATPercentage</th-block>%
                                            </span>
                                            <span data-th-if="(\${grossTotal}==NULL)">20%</span>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <span data-th-if="(\${shippingNetTotal}!=NULL)">
                                                <th-block class="variable" data-format="\${#numbers.formatDecimal(shippingNetTotal, 0, 'COMMA', 2, 'COMMA')}">shippingNetTotal</th-block>
                                            </span>
                                            <span data-th-if="(\${shippingNetTotal}==NULL)">0,00</span>
                                            <th-block class="variable">currency</th-block>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <span data-th-if="(\${shippingVATPerBand}!=NULL)">
                                                <th-block class="variable" data-format="\${#numbers.formatDecimal(shippingVATPerBand, 1, 'COMMA', 2, 'COMMA')}">shippingVATPerBand</th-block>
                                            </span>
                                            <span data-th-if="(\${shippingVATPerBand}==NULL)">0,00</span>
                                            <span><th-block class="variable">currency</th-block></span>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;">
                                            <span data-th-if="(\${grossTotal}!=NULL)">
                                                <th-block class="variable" data-format="\${#numbers.formatDecimal(grossTotal, 1, 'COMMA', 2, 'COMMA')}">grossTotal</th-block>
                                            </span>
                                            <span data-th-if="(\${grossTotal}==NULL)">0,00</span>
                                            <span><th-block class="variable">currency</th-block></span>
                                        </td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; padding: 5px 0 5px; border: none; text-align: right;"></td>
                                        <td style="font-family: Arial, sans-serif; font-size: 12px; text-align: right; padding: 5px 0 5px; border: none;"></td>
                                    </tr>
                                </table>
                              `
							});

							/* Document header component */
							blockManager.add('documents-header', {
								label: 'Header',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Documents',
								content: `
                                 <table id="header" data-dynamic="true" style="font-family: Arial, sans-serif; border-spacing: 0; border-collapse: collapse; width: 100%; border: none; Margin-bottom: 20px;">
                                     <tbody>
                                         <tr>
                                             <td colspan="2" style="font:16px Arial, sans-serif;font-weight:300;margin:0;padding:0;vertical-align:top;">
                                                 <img src="${defaults.logos.mediamarkt}" width="200" />
                                             </td>
                                         </tr>
                                     </tbody>
                                     <tbody>
                                         <tr>
                                             <td style="font:16px Arial, sans-serif;font-weight:300;margin:0;padding:0px 0px 10px 0px;height:auto;font-size:26px;width:50%;vertical-align:bottom;border:0px solid #000;border-width:0px 0px 1px 0px;">
                                                 <div><b>Online Bezahlt</b></div>
                                             </td>
                                             <td style="border:0px solid #000;border-width:0px 0px 1px 0px;font-family:Arial, Helvetica, sans-serif;font-size:12px;padding:0px 0px 10px 0px;">
                                                 <div>
                                                     <div>
                                                         <b><th-block class="variable">outletName</th-block></b>
                                                     </div>
                                                     <div>
                                                         <th-block class="variable">outletAddress</th-block>
                                                     </div>
                                                     <div>
                                                         <th-block class="variable">outletZipcode</th-block>
                                                         <th-block class="variable">outletCity</th-block>
                                                     </div>
                                                     <div>Tel: 01 / 54 6 99</div>
                                                     <div>E-Mail: contact@media-markt.at</div>
                                                 </div>
                                             </td>
                                         </tr>
                                     </tbody>
                                     <tbody>
                                         <tr>
                                             <td style="font:16px Arial, sans-serif;font-weight:300;margin:0;padding:10px 0px 10px 0px;height:auto;font-size:12px;width:50%;border:0px solid #000;border-width:0px 0px 0px 0px;vertical-align:top;">
                                                 <div style="font-size:12px;">
                                                     <b>Datum</b>:
                                                     <th-block class="variable" data-format="\${#temporals.format(T(java.time.OffsetDateTime).parse(orderDate), 'dd.MM.yyyy')}">orderDate</th-block>
                                                 </div>
                                             </td>
                                             <td style="padding:10px 0px 10px 0px;font-family:Arial, Helvetica, sans-serif;font-size:12px;border:0px solid #000;border-width:0px 0px 0px 0px;">
                                                 <div><b>Bestell-Nr</b>.:
                                                     <th-block class="variable">orderNumber</th-block>
                                                 </div>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td style="font:16px Arial, sans-serif;font-weight:300;margin:0;padding:10px 0px 10px 0px;height:auto;font-size:12px;width:50%;border:0px solid #000;border-width:0px 0px 0px 0px;vertical-align:top;">
                                                 <div style="font-size:12px;"><b>Rechnungs-Nr</b>.:
                                                     <th-block class="variable">shipAdviceNumber</th-block>
                                                 </div>
                                             </td>
                                             <td style="padding:10px 0px 10px 0px;font-family:Arial, Helvetica, sans-serif;font-size:12px;border:0px solid #000;border-width:0px 0px 0px 0px;">
                                                 <div style="font-size:12px;"><b>Lieferart</b>:
                                                     <th-block class="variable">deliveryType</th-block>
                                                 </div>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td style="font:16px Arial, sans-serif;font-weight:300;margin:0;padding:10px 0px 10px 0px;height:auto;font-size:12px;width:50%;border:0px solid #000;border-width:0px 0px 1px 0px;vertical-align:top;">
                                                 <div style="font-size:12px;"><b>Zahlart</b>:
                                                     <th-block class="variable">paymentMethod</th-block>
                                                 </div>
                                             </td>
                                             <td style="padding:10px 0px 10px 0px;font-family:Arial, Helvetica, sans-serif;font-size:12px;border:0px solid #000;border-width:0px 0px 1px 0px;">
                                                 <div style="font-size:12px;"><b>Lieferdatum</b>:
                                                     <th-block data-format="\${#temporals.format(T(java.time.OffsetDateTime).parse(shipDate), 'dd.MM.yyyy')}">shipDate</th-block>
                                                 </div>
                                             </td>
                                         </tr>
                                     </tbody>
                                     <tbody>
                                         <tr>
                                             <td style="font:16px Arial, sans-serif;font-weight:300;margin:0;padding:10px 0px 10px 0px;height:auto;font-size:12px;width:50%;border:0px solid #000;border-width:0px 0px 1px 0px;vertical-align:top;">
                                                 <div>
                                                     <b>Rechnungsadresse</b>:
                                                     <br />
                                                     <th-block data-th-if="(\${billCompanyName}!='')" class="variable">billCompanyName</th-block>
                                                     <br />
                                                     <th-block data-th-if="(\${billFirstName}!='')" class="variable">billFirstName</th-block>
                                                     <th-block data-th-if="(\${billLastName}!='')" class="variable">billLastName</th-block>
                                                     <br />
                                                     <th-block data-th-if="(\${billAddress1}!='')" class="variable">billAddress1</th-block>
                                                     <br />
                                                     <th-block data-th-if="(\${billAddress2}!='')" class="variable">billAddress2</th-block>
                                                     <br />
                                                     <th-block data-th-if="(\${billZipcode}!='')" class="variable">billZipcode</th-block>
                                                     <th-block data-th-if="(\${billCity}!='')" class="variable">billCity</th-block>
                                                     <br />
                                                     <th-block data-th-if="(\${billCountry}!='')" class="variable">billCountry</th-block>
                                                     <br />
                                                     <th-block data-th-if="(\${billVatRegisterNumber}!='')" class="variable">billVatRegisterNumber</th-block>
                                                     <br />Tel.:
                                                     <th-block data-th-if="(\${billPhoneNumber}!='')" class="variable">billPhoneNumber</th-block>
                                                 </div>
                                             </td>
                                             <td style="padding:10px 0px 10px 0px;font-family:Arial, Helvetica, sans-serif;font-size:12px;border:0px solid #000;border-width:0px 0px 1px 0px;vertical-align:top;">
                                                 <div>
                                                     <b>LieferAdresse</b>:
                                                     <br />
                                                     <th-block class="variable">shipFirstName</th-block>
                                                     <th-block class="variable">shipLastName</th-block>
                                                     <br />
                                                     <th-block class="variable">shipAddress1</th-block>
                                                     <br />
                                                     <th-block class="variable">shipAddress2</th-block>
                                                     <br />
                                                     <th-block class="variable">shipZipcode</th-block>
                                                     <th-block class="variable">shipCity</th-block>
                                                     <br />
                                                     <th-block class="variable">shipCountry</th-block>
                                                     <br />Tel.:
                                                     <th-block class="variable">shipPhoneNumber</th-block>
                                                 </div>
                                             </td>
                                         </tr>
                                     </tbody>
                                 </table>
                             `
							});

							// Images component with Asset manager
							blockManager.add('image', {
								label: 'Image',
								attributes: {
									class: 'fa fa-image'
								},
								category: 'Predefined content',
								content: {
									type: 'image',
									activeOnRender: 1,
									style: "margin: 0; padding: 0"
								}
							});

							/* Document footer component */
							blockManager.add('documents-footer', {
								label: 'Footer',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Documents',
								content: `
                              <table data-dynamic="true" id="footer" style="height: auto; margin: 0px auto 10px; width: 100%; padding: 0px; border-collapse: collapse;">
                                  <tbody>
                                      <tr>
                                          <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:50%;">
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">Geschäftsführer:</div>
                                              <th-block data-th-each="person,iteration : \${chairman}" data-noreplace="true">
                                                  <span style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;"><th-block class="variable">person.name</th-block><th-block data-noreplace="true" data-th-if="!\${iteration.last}">, </th-block></span>
                                              </th-block>
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">Ust-ID-Nummer:
                                                  <th-block class="variable">outletVatId</th-block>
                                              </div>
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">Handelsregisternummer:
                                                  <th-block class="variable">outletRegisterNumber</th-block>
                                              </div>
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">Handelsregisterbuch:
                                                  <th-block class="variable">outletTradeRegisterBook</th-block>
                                              </div>
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">Amtsgericht:
                                                  <th-block class="variable">outletRegisterCourt</th-block>
                                              </div>
                                          </td>
                                          <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:50%;" class="gjs-comp-selected">
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, sans-serif; color: rgb(153, 153, 153); margin: 0px;">
                                                  <th-block class="variable">outletLocationName</th-block>
                                              </div>
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">
                                                  <th-block class="variable">outletAddress</th-block>
                                              </div>
                                              <div style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 12px; color: rgb(153, 153, 153); margin: 0px;">
                                                  <th-block class="variable">outletZipcode</th-block> <th-block class="variable">outletCity</th-block>
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              `
                            });

                            blockManager.add('payments', {
                                label: 'Payment methods',
                                attributes: {
                                    class: 'fa fa-credit-card'
                                },
                                category: 'Documents',
                                content: `<div style="margin: 0 0 20px; font: 16px Arial, sans-serif;"> Chosen payment method: 
                                                <span data-th-each="paymentMethod,iteration : \${#sets.toSet(payments)}" data-noreplace="true" style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial, sans-serif; font-size: 16px; color: #000; margin: 0px;">
                                                    <th-block class="variable" data-condition='[{"type":"equals","input":"ONLINE_FINANCING","textArea":"Financing"},{"type":"equals","input":"COP","textArea":"Pay at store"},{"type":"equals","input":"CRECA","textArea":"Credit card"},{"type":"equals","input":"PAYPAL","textArea":"Paypal"},{"type":"equals","input":"GICA","textArea":"Coupon card"},{"type":"equals","input":"OPAY","textArea":"Immediate Transfer"},{"type":"equals","input":"PICKUP_FINANCING","textArea":"Financing"},{"type":"equals","input":"SHOPPINGCARD","textArea":"Shopping Card"},{"type":"equals","input":"TWINT","textArea":"TWINT"}]'>paymentMethod.paymentType</th-block>
                                                    <span data-th-if="(\${paymentMethod.bankName}!='') AND ((\${paymentMethod.paymentType}=='ONLINE_FINANCING') OR (\${paymentMethod.paymentType}=='PICKUP_FINANCING'))"> 
                                                       at the following bank: <th-block class="variable">paymentMethod.bankName</th-block>
                                                    </span>                                                  
                                                    <th-block data-noreplace="true" data-th-if="!\${iteration.last}">, </th-block>
                                                </span>
                                          </div>`
                            });

							blockManager.add('blank-header', {
								label: 'Blank header',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Documents',
								content: `
                                     <table id="header" data-usuck="true" style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; min-height: 30px;">
                                         <tr>
                                             <td>

                                             </td>
                                         </tr>
                                     </table>
                                `
							});

							blockManager.add('blank-footer', {
								label: 'Blank footer',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Documents',
								content: `
                                     <table id="footer" style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; min-height: 30px;">
                                         <tr>
                                             <td>

                                             </td>
                                         </tr>
                                     </table>
                                `
							});

							blockManager.add('pagination', {
								label: 'Pagination',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Documents',
								content: `
                                    <div>
                                         Seite <span id="pagenumber"></span>
                                    </div>
                                `
							});

							/* Products component */
							blockManager.add('products-table', {
								label: 'Products table',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Predefined content',
								content: `
                                <h3 style="font-family:Arial, sans-serif; Margin-bottom: 14px; Padding-bottom: 0;">Bestellübersicht</h3>
                                <table data-dynamic="true" style="font-family:Arial, sans-serif;border-spacing:0;border-collapse:collapse;border-style:none;width:100%; border-top: 1px #dcdcdc solid; border-bottom: 1px #dcdcdc solid; Padding-top: 0; Margin-bottom: 20px;">
                                    <thead>
                                        <tr>
                                            <th class="align-left" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;Padding-right:10px;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Menge</span>
                                            </th>
                                            <th class="align-left" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;Padding-right:10px;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Artikelnummer</span>
                                            </th>
                                            <th class="align-left" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;Padding-right:10px;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Bezeichnung</span>
                                            </th>
                                            <th class="align-left" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;Padding-right:10px;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Lieferzeit</span>
                                            </th>
                                            <th class="align-right" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:right;Padding-right:20px;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Einzel Preis</span>
                                            </th>
                                            <th class="align-right" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:right;Padding-right:20px;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Preisnachlass</span>
                                            </th>
                                            <th class="align-right" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:right;Padding-right:0;padding-left:0 !important;Padding-top:8px;Padding-bottom:8px;Margin-bottom:0; white-space: nowrap;">
                                                <span>Summe</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody data-th-each="item: \${products}">
                                        <tr>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.quantity, 0, 'COMMA', 0, 'POINT')}">item.quantity</th-block></span>
                                            </td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;">
                                                <span><th-block class="variable">item.articleId</th-block></span>
                                            </td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;">
                                                <span><th-block class="variable">item.description</th-block></span>
                                            </td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;">
                                              <span><th-block class="variable">item.deliveryTime</th-block></span>
                                            </td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: right; padding: 8px 20px 8px 0;vertical-align: top;" align="right">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.unitPrice, 0, 'COMMA', 2, 'COMMA')}">item.unitPrice</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: right; padding: 8px 20px 8px 0;vertical-align: top;" align="right"></td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: right; padding: 8px 0 8px 0;vertical-align: top;" align="right">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(item.linePrice, 0, 'COMMA', 2, 'COMMA')}">item.linePrice</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                        <tr data-th-if="(\${item.lineCharges}!=NULL)" data-th-each="charge: \${item.lineCharges}">
                                            <td style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;padding:8px 20px 8px 0;vertical-align:top;">
                                            </td>
                                            <td style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;padding:8px 20px 8px 0;vertical-align:top;">
                                            </td>
                                            <td style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;padding:8px 20px 8px 0;vertical-align:top;">
                                                <span><th-block class="variable">charge.name</th-block></span>
                                            </td>
                                            <td style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:left;padding:8px 20px 8px 0;vertical-align:top;">
                                            </td>
                                            <td align="right" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:right;padding:8px 20px 8px 0;vertical-align:top;">
                                                <span>
                                                    <th-block class="variable" data-format="\${#numbers.formatDecimal(charge.chargePerUnit, 0, 'COMMA', 2, 'COMMA')}">charge.chargePerUnit</th-block><th-block class="variable">currency</th-block>
                                                </span>
                                            </td>
                                            <td align="right" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:right;padding:8px 20px 8px 0;vertical-align:top;"></td>
                                            <td align="right" style="border-bottom:1px #E9E9E9 solid;font-family:Arial, sans-serif;text-align:right;padding:8px 0 8px 0;vertical-align:top;">
                                                <span>
                                                    <th-block class="variable" data-format="\${#numbers.formatDecimal(charge.chargeAmount, 0, 'COMMA', 2, 'COMMA')}">charge.chargeAmount</th-block><th-block class="variable">currency</th-block>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;"></td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;"></td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;"><span>Express-/Wunschterminlieferung</span></td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: left; padding: 8px 20px 8px 0;vertical-align: top;"></td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: right; padding: 8px 20px 8px 0;vertical-align: top;">
                                                <span><th-block class="variable">expressDelivery</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: right; padding: 8px 20px 8px 0;vertical-align: top;" align="right"></td>
                                            <td style="border-bottom: 1px #E9E9E9 solid;font-family: Arial, sans-serif; text-align: right; padding: 8px 0 8px 0;vertical-align: top;" align="right">
                                                <span><th-block class="variable">expressDelivery</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" style="font-family: Arial, sans-serif; text-align: right; padding: 10px 0 0 0;" align="right"><strong>Versandkosten:</strong></td>
                                            <td style="font-family: Arial, sans-serif; text-align: right; padding: 10px 0 0 0;" align="right">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(grossShippingCosts, 0, 'COMMA', 2, 'COMMA')}">grossShippingCosts</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" style="font-family: Arial, sans-serif; text-align: right; padding: 0 0 0 0;" align="right"><strong>Enthaltene MwSt:</strong></td>
                                            <td style="font-family: Arial, sans-serif; text-align: right; padding: 0 0 0 0;" align="right">
                                                <span><th-block class="variable" data-format="\${#numbers.formatDecimal(overallTax, 0, 'COMMA', 2, 'COMMA')}">overallTax</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" style="font-family: Arial, sans-serif; text-align: right; Padding: 0 0 20px 0;" align="right"><strong>Rechnungssumme:</strong></td>
                                            <td style="font-family: Arial, sans-serif; text-align: right; Padding: 0 0 20px 0;" align="right">
                                              <span><th-block class="variable" data-format="\${#numbers.formatDecimal(grandTotal, 0, 'COMMA', 2, 'COMMA')}">grandTotal</th-block><th-block class="variable">currency</th-block></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                              `
							});

							/* Email footer container */
							blockManager.add('email-footer', {
								label: 'Email footer',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Predefined content',
								content: `
                                <table data-dynamic="true" style="padding: 0px; width: 100%; background: rgb(236, 236, 236); font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 16px; line-height: normal; font-family: Arial, sans-serif; border: none; border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 10px 65px;">
                                                <p style="font-family: Arial, sans-serif; Margin-top: 0px; Margin-bottom: 20px; Padding: 0px;">
                                                    <strong>
                                                    <th-block class="variable" >outletName</th-block></strong>
                                                    <br />
                                                    <th-block class="variable">outletAddress</th-block>
                                                    <br /><th-block class="variable">outletZipcode</th-block> <th-block class="variable">outletCity</th-block>
                                                    <br /> Firmenbuchnummer:
                                                    <th-block class="variable">outletStoreRegisterNumber</th-block>
                                                    <br /> Firmenbuchgericht:
                                                    <th-block class="variable">outletRegisterCourt</th-block>
                                                </p>
                                                <table style="width: 100%; border-collapse: collapse; border: none;">
                                                    <tr>
                                                        <td style="border-top: 1px #dcdcdc solid; padding: 10px 0; font-family: Arial, sans-serif; font-size: 16px;">
                                                            <div>Für weitere Fragen besuchen Sie einfach unser
                                                            <a href="http://link.de/" style="color: rgb(0, 153, 187);">Info Center.</a></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-top: 1px #dcdcdc solid; padding: 10px 0; font-family: Arial, sans-serif; font-size: 16px;">
                                                            <div>Immer über die aktuellsten Angebote informiert sein? Melden Sie sich zum  <a href="http://www.mediamarkt.at/newsletter" style="color: rgb(0, 153, 187);">Newsletter</a> an.</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-top: 1px #dcdcdc solid; padding: 10px 0; font-family: Arial, sans-serif; font-size: 16px;">
                                                            <div>Bitte beachten Sie, dass dies eine automatisch generierte Email ist, die nicht beantwortet wird.</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                `,
							});

							// Add container with gray background
							blockManager.add('gray-container', {
								label: 'Gray container',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Structure',
								content: `<table style="width:100%; border-collapse: collapse; background: rgb(236,236,236);">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 40px;">
                                                <table style="width:100%; border-collapse: collapse; background: #fff; border-radius: 4px;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 16px;"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>`,
							});

							//Add block with one column
							blockManager.add('one-column', {
								label: 'One column',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Structure',
								content: `<table style="height:150px; margin:0 auto 10px auto;padding: 5px 5px 5px 5px;width:100%;" >
                                    <tr>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;"></td>
                                     </tr>
                                 </table>`,
							});

							//Add a block with 2 columns
							blockManager.add('two-columns', {
								label: 'Two columns',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Structure',
								content: `<table style="height:150px; margin:0 auto 10px auto;padding: 5px 5px 5px 5px;width:100%;">
                                     <tr>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:50%;"></td>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:50%;"></td>
                                     </tr>
                                 </table>`,
							});

							//Add a block with 3 columns
							blockManager.add('three-columns', {
								label: 'Three columns',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Structure',
								content: `<table style="height:150px; margin:0 auto 10px auto;padding: 5px 5px 5px 5px;width:100%;">
                                     <tr>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:33.3333%;"></td>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:33.3333%;"></td>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:33.3333%;"></td>
                                     </tr>
                                 </table>`,
							});

							//Add a block with 4 columns
							blockManager.add('four-columns', {
								label: 'Four columns',
								attributes: {
									class: 'fa fa-object-ungroup'
								},
								category: 'Structure',
								content: `<table style="height:150px; margin:0 auto 10px auto;padding: 5px 5px 5px 5px;width:100%;">
                                     <tr>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:25%;"></td>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:25%;"></td>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:25%;"></td>
                                        <td style="font:16px Arial, sans-serif;font-weight:300;vertical-align:top;margin:0;padding:0;width:25%;"></td>
                                     </tr>
                                 </table>`,
							});

							blockManager.add('barcode', {
								label: 'Barcode',
								attributes: {
									class: 'fa fa-barcode'
								},
								category: 'Documents',
								content: `<div style="width:350px; margin:0 auto; text-align:center">
                                            <img class="sales-barcode" src="./assets/img/barcode.png" alt="Barcode" style=" padding: 5px; width:300px; height: 32px;"/>
                                            <th-block class="variable">orderNumber</th-block>
                                          </div>`
							});

							blockManager.add('mediamarkt-logo', {
								label: 'MediaMarkt Logo',
								attributes: {
									class: 'fa fa-image'
								},
								category: 'Logos',
								content: `
                                     <img src="${defaults.logos.mediamarkt}" style="width: 200px; height: auto;" />
                                `
							});

							blockManager.add('saturn-logo', {
								label: 'Saturn Logo',
								attributes: {
									class: 'fa fa-image'
								},
								category: 'Logos',
								content: `
                                     <img src="${defaults.logos.saturn}" style="width: 200px; height: auto;" />
                                `
							});

							String.prototype.toDash = function () {
								return this.replace(/([A-Z])/g, function ($1) {
									return "-" + $1.toLowerCase();
								});
							};

							traitManager.createElement = function (attributes, context, model) {
								var index = 0;

								var removeElement = function () {
									let arrayIndex, conditionList, newIndex;
									this.parentNode.parentNode.removeChild(this.parentNode);
									arrayIndex = this.parentNode.getAttribute('id').substr(this.parentNode.getAttribute('id').length - 1);
									generalServices.deleteCondition(context, arrayIndex);
									conditionList = $conditionsDiv.querySelectorAll('.condition');
									newIndex = 0;
									conditionList.forEach((condition) => {
										condition.setAttribute('id', `conditionDiv_${newIndex}`);
										condition.querySelector('.gjs-select-list').setAttribute('id', `changeSelect_${newIndex}`);
										condition.querySelector('.gjs-input-holder').setAttribute('id', `textInput_${newIndex}`);
										condition.querySelector('.gjs-textArea').setAttribute('id', `textArea_${newIndex}`);
										newIndex++;
									});
									index = newIndex;
									model.set('attributes', Object.assign({}, {
										'data-condition': context.getAttribute('data-condition')
									}));
									if ($conditionsDiv.querySelectorAll('.condition').length <= 1) {
										$conditionsDiv.querySelector(".gjs-btn-close").style.display = "none";
									}
									;
								};

								var $traitDiv = generalServices.createInnerElement('div', {
									class: ['trait']
								});

								var $checkboxdiv = generalServices.createInnerElement('div', {
									class: [
										'gjs-field',
										'gjs-field-checkbox'
									]
								});
								$traitDiv.appendChild($checkboxdiv);

								var $label = generalServices.createInnerElement('label', {
									class: ['gjs-input-holder']
								});
								$checkboxdiv.appendChild($label);

								var $input = generalServices.createInnerElement('input', {
									type: 'checkbox'
								});
								$label.appendChild($input);

								var $i = generalServices.createInnerElement('i', {
									class: ['gjs-chk-icon']
								});
								$label.appendChild($i);

								var $conditionsDiv = generalServices.createInnerElement('div', {
									class: ['conditions', 'gjs-field'],
									display: 'none'
								});

								$traitDiv.appendChild($conditionsDiv);

								//creates a condition Div that will be appended in conditions div
								var createCondition = function (index, attribute, model) {
									var $conditionDiv = generalServices.createInnerElement('div', {
										class: ['condition', 'gjs-input-holder'],
										id: `conditionDiv_${index}`
									});
									//Div container for select
									var $selectDiv = generalServices.createInnerElement('div', {
										class: ['gjs-field', 'gjs-field-select']
									});
									$conditionDiv.appendChild($selectDiv);

									//span for select
									var $selectSpan = generalServices.createInnerElement('span', {
										class: []
									});
									$selectDiv.appendChild($selectSpan);

									var $selectList = generalServices.createInnerElement('select', {
										class: ['gjs-select-list'],
										id: `changeSelect_${index}`
									});

									//text input when second option selected
									var $inputDiv = generalServices.createInnerElement('div', {
										class: ['gjs-field', 'gjs-field-text'],
									});
									$conditionDiv.appendChild($inputDiv);

									var $textInput = generalServices.createInnerElement('input', {
										type: 'text',
										placeholder: 'Value',
										name: 'textInput',
										class: ['gjs-input-holder', 'textInput'],
										display: 'none',
										id: `textInput_${index}`
									});
									if (attribute) $textInput.value = attribute.input;

									$textInput.addEventListener('keyup', (event) => {
										generalServices.updateCondition(context, index, event.target.value, $textInput.id);
										model.set('attributes', Object.assign({}, {
											'data-condition': context.getAttribute('data-condition')
										}));
									});
									$inputDiv.appendChild($textInput);

									//select Div with default and equals options
									$selectSpan.appendChild($selectList);

									var array = ["default", "equals"];
									for (var i = 0; i < array.length; i++) {
										var $option = generalServices.createInnerElement('option', {
											value: array[i],
											text: array[i],
											id: `optionSelect_${index}`
										});
										$selectList.appendChild($option);
									}
									if (attribute) {
										if (attribute.type == "default") {
											$selectList.selectedIndex = 0;
										} else if (attribute.type == "equals") {
											$selectList.selectedIndex = 1;
											$textInput.style.display = 'block';
										}
									}

									$selectList.addEventListener('change', function () {
										var style = this.value == "equals" ? 'block' : 'none';
										this.parentNode.parentNode.parentNode.querySelector('.textInput').style.display = style;
										generalServices.updateCondition(context, index, event.target.value, $option.id);
										model.set('attributes', Object.assign({}, {
											'data-condition': context.getAttribute('data-condition')
										}));
									});

									//arrow for select
									var $arrowDiv = generalServices.createInnerElement('div', {
										class: ['gjs-sel-arrow']
									});
									$selectDiv.appendChild($arrowDiv);
									var $arrowDivSecond = generalServices.createInnerElement('div', {
										class: ['gjs-d-s-arrow']
									});
									$arrowDiv.appendChild($arrowDivSecond);

									var $removeConditon = generalServices.createInnerElement('span', {
										class: ['gjs-btn-close'],
										innerHTML: '&Cross;',
										removeCondition: '',
									});
									$removeConditon.addEventListener("click", removeElement);
									$conditionDiv.appendChild($removeConditon);

									//textarea in condition
									var $textArea = generalServices.createInnerElement('textarea', {
										name: 'textarea-name',
										class: ['gjs-textArea'],
										placeholder: 'Multi-line textarea',
										id: `textArea_${index}`
									});
									if (attribute) $textArea.value = attribute.textArea;

									$textArea.addEventListener('keyup', (event) => {
										generalServices.updateCondition(context, index, event.target.value, $textArea.id);
										model.set('attributes', Object.assign({}, {
											'data-condition': context.getAttribute('data-condition')
										}));
									});
									$conditionDiv.appendChild($textArea);

									$conditionsDiv.appendChild($conditionDiv);
								};

								var $addCondition = generalServices.createInnerElement('div', {
									class: ['add-condition'],
									display: 'none',
									addNewCondition: ''
								});

								var $addConditionFa = generalServices.createInnerElement('span', {
									class: ['fa', 'fa-plus']
								});
								$addCondition.appendChild($addConditionFa);

								var $addConditionText = generalServices.createInnerElement('span', {
									innerHTML: ' Add new property',
								});
								$addCondition.appendChild($addConditionText);

								$traitDiv.appendChild($addCondition);
								$addCondition.addEventListener('click', (event) => {
									let attributeArray = context.getAttribute('data-condition'),
										attributes = JSON.parse(attributeArray);
									attributes.push({
										"type": "default",
										"input": null,
										"textArea": null
									});
									context.setAttribute('data-condition', JSON.stringify(attributes));
									createCondition(index, attributes[index], model);
									index++;
									if (index > 0) {
										$conditionsDiv.querySelector(".gjs-btn-close").style.display = "block";
									}
								});

								if (attributes && attributes.length != 0) {
									attributes.forEach((attribute) => {
										createCondition(index++, attribute, model);
									});
								} else {
									createCondition(index, attributes[index], model);
									$conditionsDiv.querySelector(".gjs-btn-close").style.display = "none";
									index++;
								}
								if ($conditionsDiv.querySelectorAll('.condition').length <= 1) {
									$conditionsDiv.querySelector(".gjs-btn-close").style.display = "none";
								}
								;
								return $traitDiv;
							};

							traitManager.addType('conditional', {
								events: {
									'click': 'toggleCondition',
								},

								toggleCondition: function () {
									let element = this.el.querySelector('input[type="checkbox"]'),
										array = this.el.querySelector('.gjs-select-list'),
										option = array.options[array.selectedIndex].value,
										target = this.model.target;
									if (element.checked) {
										this.el.querySelector(".conditions").style.display = "block";
										this.el.querySelector(".add-condition").style.display = "block";
										if (!this.target.view.el.getAttribute('data-condition')) {
											target.set('attributes', Object.assign({}, {
												'data-condition': `[{"type": "${option}", "input":${null},"textArea":${null}}]`
											}));
										}
									} else if (!element.checked) {
										target.set('attributes', Object.assign({}, {}));
										this.target.view.el.removeAttribute('data-condition');
										this.el.querySelector(".conditions").style.display = "none";
										this.el.querySelector(".add-condition").style.display = "none";
									}
								},
								/**
								 * Returns the input element
								 * @return {HTMLElement}
								 */
								getInputEl: function () {
									let element;
									if (this.target.view.el.className.includes('variable')) {
										if (this.target.attributes.attributes["data-condition"]) {
											let attributes = JSON.parse(this.target.attributes.attributes["data-condition"]);
											element = traitManager.createElement(attributes, this.target.view.el, this.target);
											element.querySelector('input[type="checkbox"]').checked = true;
											element.querySelector(".conditions").style.display = "block";
											element.querySelector(".add-condition").style.display = "block";
										} else {
											element = traitManager.createElement([], this.target.view.el, this.target);
											element.querySelector('input[type="checkbox"]').checked = false;
										}
										this.inputEl = element;
									}
									return this.inputEl;
								}
							});

							components.addType('th-block', {
								// Define the Model
								model: defaultModel.extend({
									// Extend default properties
									defaults: Object.assign({}, defaultModel.prototype.defaults, {
										// Can be dropped only inside `form` elements
										draggable: false,
										// Can't drop other elements inside it
										droppable: false,
										copyable: false,
										// Traits (Settings)
										traits: [{
											type: 'format',
											label: 'Format',
											name: 'format'
										},
											{
												type: 'conditional',
												label: 'Conditional variable',
												name: 'conditional'
											}
										],
									})
								}, {
									isComponent: function (el) {
										if (el.tagName == 'TH-BLOCK') {
											return {
												type: 'th-block'
											};
										}
									},
								}),
								// Define the View
								view: defaultType.view
							});

							components.addType('table', {
								// Define the Model
								model: defaultModel.extend({
									// Extend default properties
									defaults: Object.assign({}, defaultModel.prototype.defaults, {
										// Can be dropped only inside `form` elements
										copyable: true,
										resizable: true,
										// Traits (Settings)
										traits: [{
											type: 'conditionalParagraph',
											label: 'Conditional',
											name: 'conditional_paragraph'
										}, {
											type: 'checkbox',
											label: 'Repeatable',
											name: 'data-repeatable',
										}],
									})
								}, {
									isComponent: function (el) {
										if (el.tagName == 'TABLE') {
											return {
												type: 'table'
											};
										}
									},
								}),
								// Define the View
								view: defaultType.view.extend({
									randomNumber: function () {
										return 'c' + Math.floor(Math.random() * 8765).toString();
									},
									render: function () {
										let attributes = this.model.get('attributes');
										if (!attributes['data-component'] && attributes['data-dynamic']) {
											attributes['data-component'] = this.randomNumber();
										}
										this.model.set('attributes', attributes);
										defaultType.view.prototype.render.apply(this, arguments);
										return this;
									},
								})
							});


							components.addType('td', {
								model: defaultModel.extend({
									defaults: Object.assign({}, defaultModel.prototype.defaults, {
										traits: ['colspan'],
									}),
								}, {
									isComponent: function (el) {
										if (el.tagName == 'TD') {
											return {
												type: 'td'
											};
										}
									},
								}),
								view: defaultType.view,
							});


							['tbody', 'tr'].forEach((comp) => {
								components.addType(comp, {
									// Define the Model
									model: defaultModel.extend({
										// Extend default properties
										defaults: Object.assign({}, defaultModel.prototype.defaults, {
											copyable: true,
											resizable: true,
											// Traits (Settings)
											traits: [{
												type: 'collection',
												label: 'Collection',
												name: 'collection'
											}, {
												type: 'conditionalParagraph',
												label: 'Conditional',
												name: 'conditional_paragraph'
											}],
										})
									}, {
										isComponent: function (el) {
											if (el.tagName == comp.toUpperCase()) {
												return {
													type: comp
												};
											}
										},
									}),
									// Define the View
									view: originalText.view.extend({
										randomNumber: function () {
											return 'c' + Math.floor(Math.random() * 8765).toString();
										},
										render: function () {
											let attributes = this.model.get('attributes');
											if (!attributes['data-component']) {
												attributes['data-component'] = this.randomNumber();
											}
											this.model.set('attributes', attributes);
											defaultType.view.prototype.render.apply(this, arguments);
											return this;
										},
									})
								});
							})

							//Create conditional paragraph
							traitManager.createConditionalParagraph = function (attributes, context, model) {
								let tempAttributes = model.attributes.attributes;
								var $traitDiv = generalServices.createInnerElement('div', {
									class: ['trait']
								});

								var $checkboxdiv = generalServices.createInnerElement('div', {
									class: [
										'gjs-field',
										'gjs-field-checkbox'
									]
								});
								$traitDiv.appendChild($checkboxdiv);

								var $label = generalServices.createInnerElement('label', {
									class: ['gjs-input-holder']
								});
								$checkboxdiv.appendChild($label);

								var $input = generalServices.createInnerElement('input', {
									type: 'checkbox'
								});
								$label.appendChild($input);

								var $i = generalServices.createInnerElement('i', {
									class: ['gjs-chk-icon']
								});
								$label.appendChild($i);

								var createConditionsElement = function (attributes, context, model, baseId) {

									var $conditionsDiv = generalServices.createInnerElement('div', {
										class: ['conditions', 'gjs-field'],
									});
									if (baseId) $conditionsDiv.setAttribute('id', baseId);

									var $buttonsDiv = generalServices.createInnerElement('span', {
										class: ['buttonsLabel']
									});
									$conditionsDiv.appendChild($buttonsDiv);

									var $andBtn = generalServices.createInnerElement('input', {
										type: "button",
										class: ['btn', 'btn-xs', 'gjs-button', 'gjs-active', 'and-or-btn'],
										id: 'condition_and',
										name: "x_cond",
										disabled: "",
										value: 'AND'
									});
									$buttonsDiv.appendChild($andBtn);
									var $orBtn = generalServices.createInnerElement('input', {
										type: "button",
										class: ['btn', 'btn-xs', 'gjs-button', 'and-or-btn'],
										id: 'condition_or',
										name: "x_cond",
										disabled: "",
										value: 'OR'
									});
									$buttonsDiv.appendChild($orBtn);

									$andBtn.addEventListener('click', () => {
										// TODO: replace jquery functions
										$($andBtn).addClass('gjs-active');
										$($orBtn).removeClass('gjs-active');
										generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
										model.set('attributes', Object.assign({}, {
											'data-th-if': context.getAttribute('data-th-if')
										}));
									});

									$orBtn.addEventListener('click', () => {
										// TODO: replace jquery functions
										$($orBtn).addClass('gjs-active');
										$($andBtn).removeClass('gjs-active');
										generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
										tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
										model.set(
											'attributes',
											Object.assign({}, tempAttributes)
										);
									});

									var activateAndOrButton = function (conditionsDiv) {
										var childrenList = conditionsDiv.children;
										var count = 0;
										for (var i = 0; i < childrenList.length; i++) {
											if (childrenList[i].classList.contains('condition') || childrenList[i].classList.contains('conditions'))
												count++;
										}
										if (count > 1) {
											conditionsDiv.querySelector('#condition_and').removeAttribute('disabled');
											conditionsDiv.querySelector('#condition_or').removeAttribute('disabled');
											conditionsDiv.querySelector(".gjs-btn-close").style.display = "block";
										} else {
											conditionsDiv.querySelector('#condition_and').setAttribute('disabled', '');
											conditionsDiv.querySelector('#condition_or').setAttribute('disabled', '');
										}
									};

									var $addCondition = generalServices.createInnerElement('div', {
										class: ['add-condition'],
										addNewCondition: ''
									});

									var $addConditionFa = generalServices.createInnerElement('span', {
										class: ['fa', 'fa-plus']
									});
									$addCondition.appendChild($addConditionFa);

									var $addConditionText = generalServices.createInnerElement('span', {
										innerHTML: ' Add rule ',
									});
									$addCondition.appendChild($addConditionText);
									$buttonsDiv.appendChild($addCondition);

									$addCondition.addEventListener('click', (event) => {
										$conditionsDiv.appendChild(createCondition('', model));
										activateAndOrButton($conditionsDiv);
									});

									var $addGroupCondition = generalServices.createInnerElement('div', {
										class: ['add-group-condition'],
										addNewCondition: ''
									});

									var $addGroupConditionFa = generalServices.createInnerElement('span', {
										class: ['fa', 'fa-plus']
									});
									$addGroupCondition.appendChild($addGroupConditionFa);

									var $addGroupConditionText = generalServices.createInnerElement('span', {
										innerHTML: ' Add group',
									});
									$addGroupCondition.appendChild($addGroupConditionText);
									$addGroupCondition.addEventListener('click', (event) => {
										$conditionsDiv.appendChild(createConditionsElement('', context, model));
										activateAndOrButton($conditionsDiv);
									});

									$buttonsDiv.appendChild($addGroupCondition);

									var removeConditionBlock = function () {
										let parentElem = this.parentNode.parentNode;
										this.parentNode.remove();
										generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
										tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
										model.set(
											'attributes',
											Object.assign({}, tempAttributes)
										);
										activateAndOrButton(parentElem);
									};

									var $removeConditionBlock = generalServices.createInnerElement('span', {
										class: ['gjs-btn-close-group'],
										innerHTML: '&Cross;',
										removeConditionBlock: ''
									});
									if (baseId) $removeConditionBlock.style.display = 'none';
									$removeConditionBlock.addEventListener("click", removeConditionBlock);
									$conditionsDiv.appendChild($removeConditionBlock);


									//creates a condition Div that will be appended in conditions div
									var createCondition = function (attribute, model) {
										// var parentId = $conditionsDiv.id;
										var array = ['EQUAL', 'NOT_EQUAL', 'CONTAINS', 'NOT_CONTAINS', 'EXISTS', 'NOT_EXISTS'];
										var $selectedOption = array[0];

										var removeElement = function () {
											this.parentNode.parentNode.removeChild(this.parentNode);
											generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
											tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
											model.set(
												'attributes',
												Object.assign({}, tempAttributes)
											);
											// traitManager.getTraitsViewer().collection.target.attributes.attributes['data-th-if'] = context.getAttribute('data-th-if');
											activateAndOrButton($conditionsDiv);
										};

										var $conditionDiv = generalServices.createInnerElement('div', {
											class: ['condition', 'gjs-input-holder'],
											id: `cond`
										});

										//text input when second option selected
										var $inputDiv = generalServices.createInnerElement('div', {
											class: ['gjs-field', 'gjs-field-variable'],
										});
										$conditionDiv.appendChild($inputDiv);

										var $variableInput = generalServices.createInnerElement('input', {
											type: 'text',
											placeholder: 'Variable',
											class: ['gjs-input-holder', 'variableInput'],
											id: `cond_variableInput`
										});

										$variableInput.addEventListener('keyup', (event) => {
											generalServices.updateSingleCondition($conditionDiv, event.target.value, $selectedOption, $valueInput.value);
											generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
											tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
											model.set(
												'attributes',
												Object.assign({}, tempAttributes)
											);

										});
										$inputDiv.appendChild($variableInput);

										//div for operator dropdown
										var $operatorDiv = generalServices.createInnerElement('div', {
											class: ['gjs-field', 'gjs-field-operator']
										});
										$conditionDiv.appendChild($operatorDiv);

										//span for operator dropdown
										var $operatorSpan = generalServices.createInnerElement('span', {
											class: []
										});
										$operatorDiv.appendChild($operatorSpan);

										var $operatorList = generalServices.createInnerElement('select', {
											class: ['gjs-select-list'],
											id: `cond_operatorList`
										});

										//select with default and equals options
										$operatorSpan.appendChild($operatorList);

										for (var i = 0; i < array.length; i++) {
											var $option = generalServices.createInnerElement('option', {
												value: array[i],
												text: array[i],
												id: `cond_operatorOption`
											});
											$operatorList.appendChild($option);
										}

										$operatorList.addEventListener('change', function () {
											if (event.target.value == 'EXISTS' || event.target.value == 'NOT_EXISTS') $valueInput.style.display = 'none';
											else $valueInput.style.display = 'block';
											generalServices.updateSingleCondition($conditionDiv, $variableInput.value, event.target.value, $valueInput.value);
											$selectedOption = event.target.value;
											generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
											tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
											model.set(
												'attributes',
												Object.assign({}, tempAttributes)
											);
										});

										//arrow for select
										var $arrowDiv = generalServices.createInnerElement('div', {
											class: ['gjs-sel-arrow']
										});
										$operatorDiv.appendChild($arrowDiv);
										var $arrowDivSecond = generalServices.createInnerElement('div', {
											class: ['gjs-d-s-arrow']
										});
										$arrowDiv.appendChild($arrowDivSecond);

										var $removeConditon = generalServices.createInnerElement('span', {
											class: ['gjs-btn-close'],
											innerHTML: '&Cross;',
											removeCondition: ''
										});
										$removeConditon.addEventListener("click", removeElement);
										$conditionDiv.appendChild($removeConditon);

										var $valueDiv = generalServices.createInnerElement('div', {
											class: ['gjs-field', 'gjs-field-variable'],
										});
										$conditionDiv.appendChild($valueDiv);

										var $valueInput = generalServices.createInnerElement('input', {
											type: 'text',
											placeholder: 'Value',
											class: ['gjs-input-holder', 'valueInput'],
											id: `cond_valueInput`
										});

										$valueInput.addEventListener('keyup', (event) => {
											generalServices.updateSingleCondition($conditionDiv, $variableInput.value, $selectedOption, event.target.value);
											generalServices.updateAllConditions(context, $traitDiv.querySelector('#c'));
											tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
											model.set(
												'attributes',
												Object.assign({}, tempAttributes)
											);
										});
										$valueDiv.appendChild($valueInput);
										$conditionsDiv.appendChild($conditionDiv);

										if (attribute) {
											let variableRegex = /\{(.*?)\}/g,
												valueRegex = /'(.*?)'/g;
											if (attribute.includes("=='")) {
												$variableInput.value = generalServices.getIteration(attribute, variableRegex);
												$operatorList.value = 'EQUAL';
												$valueInput.value = generalServices.getIteration(attribute, valueRegex);
											} else if (attribute.includes("!='")) {
												$variableInput.value = generalServices.getIteration(attribute, variableRegex);
												$operatorList.value = 'NOT_EQUAL';
												$valueInput.value = generalServices.getIteration(attribute, valueRegex);
											} else if (attribute.includes('{#lists.contains')) {
												$variableInput.value = attribute.substring(attribute.lastIndexOf('(') + 1, attribute.indexOf(','));
												$operatorList.value = 'CONTAINS';
												$valueInput.value = generalServices.getIteration(attribute, valueRegex);
											} else if (attribute.includes('{!#lists.contains')) {
												$variableInput.value = attribute.substring(attribute.lastIndexOf('(') + 1, attribute.indexOf(','));
												$operatorList.value = 'NOT_CONTAINS';
												$valueInput.value = generalServices.getIteration(attribute, valueRegex);
											} else if (attribute.includes('!=NULL')) {
												$variableInput.value = generalServices.getIteration(attribute, variableRegex);
												$operatorList.value = 'EXISTS';
												$valueInput.style.display = 'none';
											} else if (attribute.includes('==NULL')) {
												$variableInput.value = generalServices.getIteration(attribute, variableRegex);
												$operatorList.value = 'NOT_EXISTS';
												$valueInput.style.display = 'none';
											}
											generalServices.updateSingleCondition($conditionDiv, $variableInput.value, $operatorList.value, $valueInput.value);
											generalServices.updateAllConditions(context, $conditionsDiv);
											tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
											model.set(
												'attributes',
												Object.assign({}, tempAttributes)
											);
										}
										return $conditionDiv;
									};

									if (attributes && attributes.length != 0) {
										var number = 0,
											countSimpleConditions = 0;
										var aArray = generalServices.splitConditions(attributes, number++);
										aArray.forEach((elem) => {
											var count = (elem.match(/\$/g) || []).length;
											if (count == 1) {
												$conditionsDiv.appendChild(createCondition(elem, model));
												countSimpleConditions++;
											} else if (count > 1) {
												$conditionsDiv.appendChild(createConditionsElement(elem, context, model));
												countSimpleConditions++;
											} else if (elem.includes('AND')) {
												$($andBtn).addClass('gjs-active');
												$($orBtn).removeClass('gjs-active');
											} else if (elem.includes('OR')) {
												$($orBtn).addClass('gjs-active');
												$($andBtn).removeClass('gjs-active');
											}
										});
										if (countSimpleConditions > 1) activateAndOrButton($conditionsDiv);
										generalServices.updateAllConditions(context, $conditionsDiv);
										tempAttributes['data-th-if'] = context.getAttribute('data-th-if');
										model.set(
											'attributes',
											Object.assign({}, tempAttributes)
										);
									} else {
										$conditionsDiv.appendChild(createCondition('', model));
										$conditionsDiv.querySelector(".gjs-btn-close").style.display = "block";
									}
									return $conditionsDiv;
								};
								$traitDiv.appendChild(createConditionsElement(attributes, context, model, "c"));
								return $traitDiv;
							};


							components.addType('text', {
								model: originalText.model.extend({
									defaults: Object.assign({}, originalText.model.prototype.defaults, {
										// Traits (Settings)
										traits: [{
											type: 'conditionalParagraph',
											label: 'Conditional Paragraph',
											name: 'conditional_paragraph'
										}],
									})
								}, {
									isComponent: function (el) {
										return {
											type: 'text'
										};
									},
								}),
								// view: originalText.view
								view: originalText.view.extend({
									randomNumber: function () {
										return 'c' + Math.floor(Math.random() * 8765).toString();
									},
									render: function () {
										let attributes = this.model.get('attributes');
										if (!attributes['data-component']) {
											attributes['data-component'] = this.randomNumber();
										}
										this.model.set('attributes', attributes);
										defaultType.view.prototype.render.apply(this, arguments);
										return this;
									},
								}),
							});

							traitManager.addType('collection', {
								events: {
									'click': 'toggleCollection',
								},
								toggleCollection: function () {
									let element = this.el.querySelector('input[type="checkbox"]'),
										value = this.el.querySelector('#collection'),
										target = this.model.target;
									if (element.checked) {
										this.el.querySelector("#collection").style.display = "block";
										if (!this.target.view.el.getAttribute('data-th-each')) {
											target.set('attributes', Object.assign({}, {
												'data-th-each': value.value
											}));
										}
									} else if (!element.checked) {
										target.set('attributes', Object.assign({}, {}));
										this.target.view.el.removeAttribute('data-th-each');
										this.el.querySelector("#collection").style.display = "none";
									}
								},
								/**
								 * Returns the input element
								 * @return {HTMLElement}
								 * */
								getInputEl: function () {
									let element, attributes;
									if (this.target.attributes.attributes["data-th-each"]) {
										attributes = this.target.attributes.attributes["data-th-each"];
										element = traitManager.createCollection(attributes, this.target);
										element.querySelector('input[type="checkbox"]').checked = true;
									} else {
										element = traitManager.createCollection('', this.target);
										element.querySelector('input[type="checkbox"]').checked = false;
										element.querySelector("#collection").style.display = "none";
									}
									this.inputEl = element;
									return this.inputEl;
								},
							});

							traitManager.addType(
								'format', {
									events: {
										'click': 'toggleFormat',
									},
									toggleFormat: function (event) {
										let element = this.el.querySelector('input[type="checkbox"]'),
											value = this.el.querySelector('#format'),
											target = this.model.target;

										if (element.checked) {
											this.el.querySelector("#format").style.display = "block";
											if (!this.target.view.el.getAttribute('data-format')) {
												target.set(
													'attributes',
													Object.assign({}, {
														'data-format': generalServices.setFormat(
															value.value,
															target.attributes.content
														)
													}));
											}
										} else if (!element.checked) {
											target.set(
												'attributes',
												Object.assign({}, {}));
											this.target.view.el.removeAttribute('data-format');
											this.el.querySelector("#format").style.display = "none";
										}
									},
									/**
									 * Returns the input element
									 * @return {HTMLElement}
									 * */
									getInputEl: function () {
										let element,
											attribute = this.target.attributes.attributes["data-format"];
										if (attribute) {
											let attributes = attribute;
											element = traitManager.createFormat(
												attributes,
												this.target
											);
											element.querySelector('input[type="checkbox"]').checked = true;
										} else {
											element = traitManager.createFormat(
												'',
												this.target
											);
											element.querySelector('input[type="checkbox"]').checked = false;
											element.querySelector("#format").style.display = "none";
										}
										this.inputEl = element;
										return this.inputEl;
									},
								});

							traitManager.createFormat = (value, model) => {
								let regex = /\${#(.*?)\.(.*?)'(.*?)'/g,
									$container, $trait, $format, $label,
									format = generalServices.getFormat(value, regex);
								$container = generalServices.createInnerElement(
									'div', {
										class: ['format-trait']
									});

								$trait = generalServices.createInnerElement(
									'input', {
										type: 'checkbox',
										class: ['custom']
									});

								$format = generalServices.createDOMElement(
									'select', ['custom'],
									'format', [{
										key: 'Date',
										value: 'date'
									}, {
										key: 'Number',
										value: 'numbers'
									}, {
										key: 'Time',
										value: 'time'
									}]);

								$format.addEventListener(
									'change',
									(event) => {
										model.set(
											'attributes',
											Object.assign({}, {
												'data-format': generalServices.setFormat(
													event.target.value,
													model.attributes.content
												)
											}));
									});

								$label = generalServices.createInnerElement(
									'label'
								);

								if (value && format) {
									if (format.type === 'temporals' && format.format === 'dd.MM.yyyy') {
										format = 'date'
									}
									if (format.type === 'temporals' && format.format === 'HH:mm') {
										format = 'time'
									}
									if (format.type === 'numbers') {
										format = 'numbers'
									}
									$format.childNodes[0].value = format;
								}

								$container.appendChild($trait);
								$container.appendChild($label);
								$container.appendChild($format);

								return $container;
							};

							traitManager.createCollection = (traitValue, model) => {
								let tempAttributes = model.attributes.attributes;
								let $container = generalServices.createInnerElement('div', {
									class: ['condition-trait']
								});
								let $trait = generalServices.createInnerElement('input', {
									type: 'checkbox',
									class: ['custom']
								});
								let $collection = generalServices.createInnerElement('input', {
									type: 'text',
									id: 'collection'
								});
								$collection.addEventListener('keyup', (event) => {
									tempAttributes['data-th-each'] = generalServices.setIteration(event.target.value);
									model.set(
										'attributes',
										Object.assign({}, tempAttributes)
									);
								});
								let $label = generalServices.createInnerElement('label');
								if (traitValue) {
									$collection.value = generalServices.getIteration(traitValue, /\{(.*?)\}/g) || traitValue;
									tempAttributes['data-th-each'] = generalServices.setIteration($collection.value);
									model.set(
										'attributes',
										Object.assign({}, tempAttributes)
									);
								}
								$container.appendChild($trait);
								$container.appendChild($label);
								$container.appendChild($collection);
								return $container;
							};

							// Each new type extends the default Trait
							traitManager.addType('conditionalParagraph', {
								events: {
									'click': 'getCondition',
								},
								getCondition: function () {
									let element = this.el.querySelector('input[type="checkbox"]'),
										target = this.target;
									if (element.checked) {
										this.el.querySelector("#c").style.display = "block";
										if (!target.attributes.attributes['data-th-if']) {
											target.set('attributes', {
												'data-th-if': ''
											});
										}
									} else if (!element.checked) {
										target.set('attributes', Object.assign({}, {}));
										target.view.el.removeAttribute('data-th-if');
										this.el.querySelector("#c").style.display = "none";
									}
								},
								/**
								 * Returns the input element
								 * @return {HTMLElement}
								 * */
								getInputEl: function () {
									let element;
									if (this.target.attributes.attributes["data-th-if"]) {
										let attributes = this.target.attributes.attributes["data-th-if"];
										element = traitManager.createConditionalParagraph(attributes, this.target.view.el, this.target);
										element.querySelector('input[type="checkbox"]').checked = true;
										element.querySelector("#c").style.display = "block";
									} else {
										element = traitManager.createConditionalParagraph([], this.target.view.el, this.target);
										element.querySelector('input[type="checkbox"]').checked = false;
										element.querySelector("#c").style.display = "none";
									}
									this.inputEl = element;
									return this.inputEl;
								},
							});

							components.addType('barcode', {
								// Define the Model
								model: defaultModel.extend({
									// Extend default properties
									defaults: Object.assign({}, defaultModel.prototype.defaults, {
										// Traits (Settings)
										traits: [{
											type: 'barcode',
											label: 'Variable',
											name: 'barcode',
										}],
									})
								}, {
									isComponent: function (el) {
										if (el.tagName == 'IMG' && el.className == 'sales-barcode') {
											return {
												type: 'barcode'
											};
										}
									},
								}),
								// Define the View
								view: defaultType.view
							});

							traitManager.addType('barcode', {
								/**
								 * Returns the input element
								 * @return {HTMLElement}
								 */
								getInputEl: function () {
									let element, attribute,
										target = this.target.attributes.attributes;
									for (let key in target) {
										if (key && key.includes('data-th-'))
											attribute = [key, target[key]];
									}
									;
									if (attribute && attribute !== undefined) {
										element = traitManager.chooseBarcode(attribute, this.target.view.el, this.target);
									} else {
										element = traitManager.chooseBarcode('', this.target.view.el, this.target);
									}
									this.inputEl = element;
									return this.inputEl;
								}
							});

							traitManager.chooseBarcode = (attribute, context, model) => {
								let $container = generalServices.createInnerElement('div', {
									class: ['barcode-trait']
								});
								let $orderNrDiv = generalServices.createInnerElement('div', {
									class: ['gjs-field']
								});
								let $orderNrInput = generalServices.createInnerElement('input', {
									type: 'text',
									class: ['gjs-barcode-input']
								});
								$orderNrDiv.appendChild($orderNrInput);
								$container.appendChild($orderNrDiv);

								//Div container for select
								let $selectDiv = generalServices.createInnerElement('div', {
									class: ['gjs-field', 'gjs-field-barcodetype']
								});
								let $selectLabel = generalServices.createInnerElement('label', {
									for: 'barcode-type',
									innerHTML: 'Type',
									class: ['gjs-barcode-label']
								});

								var $selectType = generalServices.createInnerElement('select', {
									class: ['gjs-barcode-list'],
									id: 'barcode-type'
								});

								let barcodeTypes = ["data-th-salesbarcode", "data-th-loyaltybarcode", "data-th-warrantybarcode"];
								for (let i = 0; i < barcodeTypes.length; i++) {
									var $option = generalServices.createInnerElement('option', {
										value: barcodeTypes[i],
										text: generalServices.getIteration(barcodeTypes[i], /th-(.*?)barcode/g)
									});
									$selectType.appendChild($option);
								}
								$selectDiv.appendChild($selectLabel);
								$selectDiv.appendChild($selectType);
								$container.appendChild($selectDiv);

								$orderNrInput.addEventListener('keyup', (event) => {
									let selectedOption = $selectType.options[$selectType.selectedIndex].value;
									generalServices.setBarcodeAttribute(model, selectedOption, event.target.value, context);
								});
								$selectType.addEventListener('change', () => {
									generalServices.setBarcodeAttribute(model, event.target.value, $orderNrInput.value, context);
								});

								if (attribute) {
									$orderNrInput.value = generalServices.getIteration(attribute[1]);
									$selectType.value = attribute[0];
								}
								return $container;
							};

							components.addType('link', {
								// Define the Model
								model: originalLink.model.extend({
									// Extend default properties
									defaults: Object.assign({}, originalLink.model.prototype.defaults, {
										// Traits (Settings)
										traits: [{
											type: 'link',
											label: 'Dynamic',
											name: 'link',
										}],
									})
								}, {
									isComponent: function (el) {
										if (el.tagName == 'A') {
											return {
												type: 'link'
											};
										}
									},
								}),
								// Define the View
								view: originalLink.view
							});

							traitManager.addType('link', {
								/**
								 * Returns the input element
								 * @return {HTMLElement}
								 */
								getInputEl: function () {
									let element,
										attribute = this.target.attributes.attributes['data-th-href'];
									element = traitManager.addLink(attribute, this.target.view.el, this.target);

									if (attribute) {
										element.querySelector('input[type="checkbox"]').checked = true;
									} else {
										element.querySelector('input[type="checkbox"]').checked = false;
									}

									this.inputEl = element;
									return this.inputEl;
								}
							});
							traitManager.addLink = (attributes, context, model) => {
								let $container, $checkboxInput, $label;

								$container = generalServices.createInnerElement('div', {
									class: ['variable-link']
								});
								$checkboxInput = generalServices.createInnerElement('input', {
									type: 'checkbox',
									class: ['custom'],
									id: 'dynamic-check'
								});
								$label = generalServices.createInnerElement('label', {
									for: ''
								});

								$container.appendChild($checkboxInput);
								$container.appendChild($label);

								let $hrefDiv = generalServices.createInnerElement('div', {
									class: ['gjs-field', 'gjs-link-trait']
								});
								let $hrefLabel = generalServices.createInnerElement('label', {
									for: 'href',
									innerHTML: 'Href',
									class: ['gjs-link-label']
								});
								let $hrefInput = generalServices.createInnerElement('input', {
									type: 'text',
									class: ['gjs-link-input'],
									placeholder: 'eg. https://google.com'
								});
								$hrefInput.value = context.getAttribute('href');

								$hrefDiv.appendChild($hrefLabel);
								$hrefDiv.appendChild($hrefInput);
								$container.appendChild($hrefDiv);

								$hrefInput.addEventListener('keyup', (event) => {
									if ($checkboxInput.checked) {
										let dynamicHref = {
											'href': event.target.value,
											'data-th-text': `\${${event.target.value}}`,
											'data-th-href': `@{\${${event.target.value}}}`
										};
										model.set('attributes', dynamicHref);
									} else {
										model.set('attributes', Object.assign({}, {
											'href': event.target.value
										}));
									}
								});

								$checkboxInput.addEventListener('change', (event) => {
									let value = context.getAttribute('href');
									if ($checkboxInput.checked) {
										let dynamicHref = {
											'href': value,
											'data-th-text': `\${${value}}`,
											'data-th-href': `@{\${${value}}}`
										};
										model.set('attributes', dynamicHref);
									} else {
										model.set('attributes', Object.assign({}, {
											'href': value
										}));
										context.removeAttribute('data-th-text');
										context.removeAttribute('data-th-href');
									}
								});
								return $container;
							};
						});
					}
				};
			}
		]);
