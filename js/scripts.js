window.addEventListener("load", appDark, false);
window.stateMenu = false;
var functs = {
	"d-topbar": [{ element: { name: "div",className:"d-topbar" } }],
	"d-principal-content": [{ element: { name: "div",className:"d-principal-content" } }],
	"d-content": [{ element: { name: "div",className:"d-content" } }],
	"d-content-section": [{ element: { name: "div",className:"d-content-section" } }],
	"d-menu": [{ element: { name: "div" ,className:"d-menu",childs:[{name:"div",className:"d-header-menu"}]} }],
	"d-item-menu": [{ element: { name: "div",className:"d-item-menu" } }],
	"d-input": [{ element: { name: "div", childs: [{ name: "label" , value:"hola mubdo",className:"d-input-title" }, { name: "input", type: "text",className:"d-input" }] ,className:"d-input-content"} }]
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

function createElement(tagName, tagElement, config) {
	config.forEach(itemElement => {
		//alert(JSON.stringify(itemElement.element.name));
		let div = document.createElement(itemElement.element.name);
		div.className = itemElement.element.className;
		div.value=itemElement.element.value;
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
			debugger;
			let element = document.createElement(item.name);
			element.className = item.className!=null?item.className:null;
			element.type = item.type != null? item.type : null;
			element.textContent = item.value != null ? item.value : null;
			principalElement.appendChild(element);
		});
	}
}

function loopDecideAttributesFromElement(tagElement, div) {
	if (tagElement.attributes.length > 0) {
		var style = "";
		for (let att of tagElement.attributes) {
			switch (att.name) {
				case "static":
					style += "display:flex !important;position:fixed !important;z-index:1 !important;";
					var pContentDesign = document.getElementsByTagName("d-principal-content");
					pContentDesign[0].style = "margin-top:65px !important;";
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
					let objectAtt = att.value.search("{");
					if (objectAtt >= 0) {
						var valueColor = att.value;
						var json = convertStringToJson(valueColor);
						style += "background-color:" + json.backgroundColor + ";" +
							"color:" + json.text + ";" +
							"box-shadow:" + json.shadow + " !important;";
							if(json.header!=null){
								document.querySelector(".d-header-menu")
								.style.backgroundColor="";
							}
					} else {
						style += "background-color:" + att.value + " !important;";
					}
					break;
				case "scroll":
					style += "overflow:auto;";
					break;
			}
		}
		div.style = style;
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

