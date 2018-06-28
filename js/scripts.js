window.addEventListener("load", appDark, false);
window.addEventListener("scroll", function (event) {
	if (window.scrollY > 0) {
		var elements = document.getElementsByTagName("d-content");
		for (let element of elements) {

		}
	}
}, false);

var attributes = ["goto", "click", "static"];
var tags = ["d-button", "d-topbar", "d-content"];
var functs = [];
function appDark() {
	for (const item of document.body.children) {
		decideTypeElement(item.localName, item);
	}
}

function decideTypeElement(tagName, tagElement) {
	switch (tagName) {
		case "d-button":
			createElement(tagName, tagElement);
			break;
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
		var style = "display:flex;";
		for (let att of tagElement.attributes) {
			switch (att.name) {
				case "static":
					div.style = "position:fixed;z-index:1";
					break;
				case "orientation":
					switch (att.value) {
						case "vertical":
							style += "flex-direction:column;";
							break;
						case "horizontal":
							style += "flex-direction:row; flex-wrap:wrap;";
							break;
						default:
							style += "flex-direction:row; flex-wrap:wrap;";
							break;
					}
					div.style = style;
					break;
				case "align":
					var arrayAtt = att.value.split(" ");
					if (arrayAtt.length > 1) {
						style += "justify-content:" + arrayAtt[0] + "; align-content:" + arrayAtt[1] + ";";
					} else {
						style += "align-items:" + arrayAtt[0] + ";";
					}
					div.style = style;
					break;
				case "size":
					var arrayAtt = att.value.split(",");
					if (arrayAtt.length > 1 && arrayAtt[0] != "") {
						style += "width:" + arrayAtt[0] + "px !important; height:" + arrayAtt[1] + " !important;";
					} else if (arrayAtt[0] == "") {
						style += "height:" + arrayAtt[1] + "px;";
					}
					div.style = style;
					break;
				case "loop":
				debugger;
				var parent = tagElement.parentNode;
				var divLoop = document.createElement(tagElement.localName);
				for(let atri of tagElement.attributes){
					alert(atri.name);
					divLoop.createAttribute(atri.name).value=atri.value;
				}
				div.createAttribute();
				
				alert(divLopp);
					/*for (let i = 0; i < att.value; i++) {
						
						parent.appendChild();
					}*/
					break;
			}
		}
	}
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

