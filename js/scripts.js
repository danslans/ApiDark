window.addEventListener("load", appDark, false);
window.stateMenu = false;
var attributes = ["goto", "click", "static"];
var tags = ["d-button", "d-topbar", "d-content"];
var functs = [];
function dMenu() {
	var tagMenu = document.querySelector(".d-menu");
	if (!window.stateMenu) {
		tagMenu.style =
			"display: inline;" +
			" animation: animation-menu-show 0.3s";
		window.stateMenu = true;
	} else {
		tagMenu.style = "display:none;";
		window.stateMenu = false;
	}
}

function appDark() {
	var script= document.createElement("script");
	script.src = "/js/sentencias.json";
	document.children[0].childNodes[0].appendChild(script);
	
	for (const item of document.body.children) {
		decideTypeElement(item.localName, item);
	}
}

function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return [h, s, l];
}

function hex2rgb(hex) {
	return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}


function decideTypeElement(tagName, tagElement) {
	switch (tagName) {
		case "d-topbar":
			createElement(tagName, tagElement);
			break;
		case "d-content":
			createElement(tagName, tagElement);
			break;
		case "d-content-section":
			createElement(tagName, tagElement);
			break;
		case "d-principal-content":
			createElement(tagName, tagElement);
			break;
		case "d-menu":
			createElement(tagName, tagElement);
			break;
		case "d-item-menu":
			createElement(tagName, tagElement);
			break;
		default:
			loopDecideAttributesFromElement(tagElement, tagElement);
			loopTagElement(tagElement);
			break;
	}
}

function createElement(tagName, tagElement) {
	let div = document.createElement("div");
	div.className = tagName;

	loopDecideAttributesFromElement(tagElement, div);

	if (tagElement.children.length > 0) {
		while (tagElement.firstElementChild) {
			div.appendChild(tagElement.firstElementChild);
		}
		tagElement.appendChild(div);
		loopTagElement(div);
	} else {
		tagElement.appendChild(div);
	}
}


function loopDecideAttributesFromElement(tagElement, div) {
	if (tagElement.attributes.length > 0) {
		var style = "";
		for (let att of tagElement.attributes) {
			switch (att.name) {
				case "static":
					style += "display:flex !important;position:fixed !important;z-index:1 !important;";
					break;
				case "orientation":
					switch (att.value) {
						case "vertical":
							style += "display:flex !important;flex-direction:column !important;";
							break;
						case "horizontal":
							style += "display:flex !important;flex-direction:row !important;";
							break;
						default:
							style += "display:flex !important;flex-direction:row !important; flex-wrap:wrap !important;";
							break;
					}
					break;
				case "align":
					var arrayAttry = att.value.split(" ");
					if (arrayAttry.length > 1) {
						style += "display:flex !important;justify-content:" + arrayAttry[0] + " !important; align-items:" + arrayAttry[1] + " !important;";
					} else {
						style += "display:flex !important;justify-content:" + arrayAttry[0] + " !important;";
					}
					break;
				case "size":
					var arrayAtt = att.value.split(",");
					if (arrayAtt.length > 1 && arrayAtt[0] != "") {
						style += "width:" + arrayAtt[0] + "px !important; height:" + arrayAtt[1] + "px !important;";
					} else if (arrayAtt[0] == "") {
						style += "height:" + arrayAtt[1] + "px !important;";
					} else {
						style += "width:" + arrayAtt[0] + "px !important;";
					}
					break;
				case "loop":
					var parent = tagElement.parentElement;
					var divLoop = document.createElement(tagElement.localName);

					for (let atri of tagElement.attributes) {
						if (atri.name != "loop") {
							createAttribute(atri.name, atri.value, divLoop);
						}
					}

					for (const tagEl of tagElement.children) {
						divLoop.appendChild(tagEl);
					}
					for (let i = 0; i < att.value; i++) {

						parent.appendChild(divLoop);
					}
					div.a
					break;
				case "color":
					let objectAtt = att.value.search("(\{)");
					if (objectAtt >= 0) {
						var valueColor = JSON.stringify(att.value);
						var json = JSON.parse(valueColor);
						style += "background-color:" + json.backgroundColor;
						//alert(json.text);
					}
					style += "background-color:" + att.value + " !important;";
					break;
				case "":
					break;
			}
		}
		div.style = style;
	}
}

function createAttribute(name, value, element) {
	var attr = document.createAttribute(name);
	attr.value = value;
	element.setAttributeNode(attr);
}

function loopTagElement(tagElement) {
	for (const tag of tagElement.children) {
		decideTypeElement(tag.localName, tag);
	}
}

function createDButton(tag) {
	var listTag = document.getElementsByTagName(tag);

	for (var item = 0; item < listTag.length; item++) {
		var text = listTag[item].innerText;
		listTag[item].innerText = "";
		var divB = document.createElement("div");
		divB.className = "d-button";
		decideTypeButton(divB, text, listTag[item]);
		listTag[item].appendChild(divB);
	}

}

function createElementButton(config) {
	var butt = document.createElement("button");
	butt.innerHTML = config.text;
	if (config.event_click.state) {
		/*var arrayStr=config.event_click.funct.split("=");
		var variable=arrayStr[0].replace("$","");
		functs.push({variable:arrayStr[1]});*/
		butt.onclick = function () {

			eval(config.event_click.funct);
			//alert(config.event_click.funct.replace("$","var "));
		};
	}
	config.divB.appendChild(butt);
}

function decideTypeButton(divB, text, item) {

	var att = item.getAttribute(attributes[0]);
	if (att != null) {
		var a = document.createElement("a");
		a.href = att;
		a.innerText = text;
		divB.appendChild(a);
	}
	else {
		getAttibutes(item, text, divB, att);
	}
}

function getAttibutes(item, text, divB, att) {

	var listAtt = item.attributes;
	if (listAtt.length > 0) {
		for (var li = 0; li < listAtt.length; li++) {
			switch (listAtt[li].name) {
				case attributes[1]:
					createElementButton({
						text: text,
						divB: divB,
						event_click: {
							state: true,
							funct: listAtt[li].nodeValue
						}
					});
					break;
				default:
					createElementButton({
						text: text,
						divB: divB,
						event_click: {
							state: false
						}
					});
					break;
			}
		}
	} else {
		createElementButton({
			text: text,
			divB: divB,
			event_click: {
				state: false
			}
		});
	}


}


function holamundo() {
	return "hola mundo";
}

function showStorage(resul) {
	alert(resul);
}

