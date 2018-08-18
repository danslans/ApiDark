window.addEventListener("load", appDark, false);
window.stateMenu = false;
var functs = {
	"d-topbar": [{
		element: {
			name: "div",
			className: "d-topbar"
		}
	}],
	"d-principal-content": [{
		element: {
			name: "div",
			className: "d-principal-content"
		}
	}],
	"d-content": [{
		element: {
			name: "div",
			className: "d-content"
		}
	}],
	"d-content-section": [{
		element: {
			name: "div",
			className: "d-content-section"
		}
	}],
	"d-menu": [{
		element: {
			name: "div",
			className: "d-menu",
			childs: [{
				name: "div",
				className: "d-header-menu"
			}]
		}
	}],
	"d-item-menu": [{
		element: {
			name: "div",
			className: "d-item-menu"
		}
	}],
	"d-input": [{
		element: {
			name: "div",
			childs: [{
				name: "label",
				value: "hola mundo1",
				className: "d-input-title"
			}, {
				name: "input",
				type: "text",
				value: "hola mundo",
				className: "d-input"
			}],
			className: "d-input-content"
		}
	}],
	"d-icon": [{
		element: {
			name: "div",
			className: "d-icon"
		}
	}]
};

function dMenu() {
	var tagMenu = document.querySelector(".d-menu");
	if (!window.stateMenu) {
		tagMenu.style = tagMenu.style.cssText +
			"display: inline;" +
			" animation: animation-menu-show 0.3s";
		window.stateMenu = true;
	} else {
		tagMenu.style = tagMenu.style.cssText + "display:none;";
		window.stateMenu = false;
	}
}

function appDark() {
	for (const item of document.body.children) {
		validateTags(item);
	}
}

function validateTags(tag) {
	if (functs[tag.localName] != null) {
		createElement(tag.localName, tag, functs[tag.localName]);
	} else {
		loopDecideAttributesFromElement(tag, tag);
		loopTagElement(tag);
	}
}

function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h, s, l];
}

function hex2rgb(hex) {
	return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

function createElement(tagName, tagElement, config) {
	config.forEach(itemElement => {
		//alert(JSON.stringify(itemElement.element.name));
		let div = document.createElement(itemElement.element.name);
		div.className = itemElement.element.className;
		div.value = itemElement.element.value;
		//alert(JSON.stringify(itemElement));
		loopDecideAttributesFromElement(tagElement, div);
		createChildsElement(itemElement.element.childs, div);
		if (tagElement.children.length > 0) {
			while (tagElement.firstElementChild) {
				div.appendChild(tagElement.firstElementChild);
			}
			tagElement.appendChild(div);
			loopTagElement(div);
		} else {
			tagElement.appendChild(div);
		}
	});
}

function createChildsElement(listChild, principalElement) {
	if (listChild != null) {
		listChild.forEach(item => {
			let element = document.createElement(item.name);
			element.className = item.className != null ? item.className : null;
			element.type = item.type != null ? item.type : null;
			element.textContent = item.value != null ? item.value : null;
			element.value = item.value != null ? item.value : null;
			principalElement.appendChild(element);
		});
	}
}

function loopDecideAttributesFromElement(tagElement, div) {
	if (tagElement.attributes.length > 0) {
		var style = "";
		var className = "";
		for (let att of tagElement.attributes) {
			/*style += styleStatic();
			style += styleOrientation(att.value);
			style += styleAlign(att.value);
			style += styleSize(att.value);
			styleLoop(tagElement,att.value,div);
			style += styleColor(att.value);
			style += styleScroll();*/
			switch (att.name) {
				case "static":
					style += styleStatic();
					break;
				case "orientation":
					style += styleOrientation(att.value);
					break;
				case "align":
					style += styleAlign(att.value);
					break;
				case "size":
					style += styleSize(att.value);
					break;
				case "loop":
					styleLoop(tagElement, att.value, div);
					break;
				case "color":
					style += styleColor(att.value);
					break;
				case "scroll":
					style += styleScroll();
					break;
				case "type":
					//alert(att.value);
					className += styleType(att.value);
					break;
			}
		}
		div.style = style;
		className!=""?div.className=className:className="";
	}
}

function convertStringToJson(valueToConvert) {
	var regex = /[a-zA-Z0-9_\#\-\(\)\%\s]+/gm;
	var stringJson = '{';
	var texts = valueToConvert.match(regex);
	for (var item in texts) {
		if (item % 2 == 0) {
			stringJson += '"' + texts[item] + '":';
		} else {
			stringJson += '"' + texts[item] + '",';
		}
	}
	stringJson = stringJson.substring(0, stringJson.length - 1);
	stringJson += "}";
	return JSON.parse(stringJson);
}

function createAttribute(name, value, element) {
	var attr = document.createAttribute(name);
	attr.value = value;
	element.setAttributeNode(attr);
}

function loopTagElement(tagElement) {
	for (const tag of tagElement.children) {
		validateTags(tag);
	}
}

function styleStatic() {
	let style = "display:flex !important;position:fixed !important;z-index:1 !important;";
	var pContentDesign = document.getElementsByTagName("d-principal-content");
	pContentDesign[0].style = "margin-top:65px !important;";
	return style;
}

function styleOrientation(value) {
	switch (value) {
		case "vertical":
			return "display:flex !important;flex-direction:column !important;";
		case "horizontal":
			return "display:flex !important;flex-direction:row !important;";
		default:
			return "display:flex !important;flex-direction:row !important; flex-wrap:wrap !important;";
	}

}

function styleAlign(value) {
	var arrayAttry = value.split(" ");
	if (arrayAttry.length > 1) {
		return "display:flex !important;justify-content:" + arrayAttry[0] + " !important; align-items:" + arrayAttry[1] + " !important;";
	} else {
		return "display:flex !important;justify-content:" + arrayAttry[0] + " !important;";
	}
}

function styleSize(value) {
	/*alert(tagElement.parentElement.clientWidth);
					var styleCom=document.defaultView.getComputedStyle(tagElement.parentElement);
					alert(styleCom.getPropertyValue('width'));*/
	if (value.search("{") >= 0) {
		let json = convertStringToJson(value);
		let paddings = json.padding != null ? json.padding.split(" ") : [];
		let margins = json.margin != null ? json.margin.split(" ") : [];

		return "width:" + json.x + " !important;" +
			"height:" + json.y + " !important;" +
			"padding-top:" + (paddings[0] != null ? paddings[0] : "0px") + " !important;" +
			"padding-bottom:" + (paddings[1] != null ? paddings[1] : "0px") + " !important;" +
			"padding-left:" + (paddings[2] != null ? paddings[2] : "0px") + " !important;" +
			"padding-right:" + (paddings[3] != null ? paddings[3] : "0px") + " !important;" +
			"margin-top:" + (margins[0] != null ? margins[0] : "0px") + " !important;" +
			"margin-bottom:" + (margins[1] != null ? margins[1] : "0px") + " !important;" +
			"margin-left:" + (margins[2] != null ? margins[2] : "0px") + " !important;" +
			"margin-right:" + (margins[3] != null ? margins[3] : "0px") + " !important;";
	} else {
		let arrayAtt = value.split(",");
		if (arrayAtt.length > 1 && arrayAtt[0] != "") {
			let x = arrayAtt[0].search("%") > 0 ? arrayAtt[0] : arrayAtt[0] + "px";
			let y = arrayAtt[1].search("%") > 0 ? arrayAtt[1] : arrayAtt[1] + "px";
			return "width:" + x + " !important; height:" + y + " !important;";
		} else if (arrayAtt[0] == "") {
			let y = arrayAtt[1].search("%") > 0 ? arrayAtt[1] : arrayAtt[1] + "px";
			return "height:" + y + " !important;";
		} else {
			let x = arrayAtt[0].search("%") > 0 ? arrayAtt[0] : arrayAtt[0] + "px";
			return "width:" + x + " !important;";
		}
	}
}

function recortExpresion(valueToRecort) {

}

function styleLoop(tagElement, value, div) {
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
	for (let i = 0; i < value; i++) {

		parent.appendChild(divLoop);
	}
	div.a;
}

function styleColor(value) {
	let objectAtt = value.search("{");
	let style = "";
	if (objectAtt >= 0) {
		var valueColor = value;
		var json = convertStringToJson(valueColor);
		style += "background-color:" + json.backgroundColor + ";" +
			"color:" + json.text + ";" +
			"box-shadow:" + json.shadow + " !important;";
		if (json.header != null) {
			document.querySelector(".d-header-menu")
				.style.backgroundColor = "";
		}
	} else {
		style += "background-color:" + value + " !important;";
	}
	return style;
}

function styleScroll() {
	return "overflow:auto;";
}

function styleType(value) {
	switch (value) {
		case "search":
			return "d-icon-search";
		case "subMenu":
			return "d-icon-sub-menu";
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
	} else {
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
