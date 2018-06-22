window.addEventListener("load",appDark,false);

var attributes = ["d-goto", "d-click"];
var tags = ["d-button", "d-topbar","d-content"];
var functs=[];
function appDark() {
	for (var t in tags) {
		switch (tags[t]) {
			case "d-button":
				createDButton(tags[t]);
				break;
			case "d-topbar":
				createDTopbar(tags[t]);
                break;
            case "d-content":
                createDContent(tags[t]);
                break;
				
		}
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
		debugger;
		/*var arrayStr=config.event_click.funct.split("=");
		var variable=arrayStr[0].replace("$","");
		functs.push({variable:arrayStr[1]});*/
		butt.onclick = function() {
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
	}else{
		createElementButton({
			text: text,
			divB: divB,
			event_click: {
				state: false
			}
		});
	}


}
function createDTopbar(nameTag){
	var tagsDTopBar= document.getElementsByTagName(nameTag);
	for(var tag =0;tag< tagsDTopBar.length;tag++){
		var div=document.createElement("div");
		div.className="d-topbar";
		tagsDTopBar[tag].appendChild(div);
	}
}

function createDContent(nameTag){
    var tagsDContent=document.getElementsByTagName(nameTag);
    for(var tag=0;tag<tagsDContent.length;tag++){
        var div=document.createElement("div");
        div.className="d-content";
        tagsDContent[tag].appendChild(div);
    }
}

function holamundo() {
	return"hola mundo";
}

function showStorage(resul){
	alert(resul);
}

