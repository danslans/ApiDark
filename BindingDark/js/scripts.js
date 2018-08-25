window.addEventListener("load", function (event) {
	searchDocumentVariable();
}, true);

window.addEventListener("click", function (event) {
	searchDocumentVariable();
}, false);

let searchDocumentVariable = function () {
	for (let item of document.body.children) {
		let getAtt = item.getAttribute("bind");
		let txtElement = getAtt != null ? getAtt : item.textContent;
		if (txtElement.search(/[\{\}]+/gm) >= 0) {
			let att = document.createAttribute("bind");
			att.value = txtElement;
			item.setAttributeNode(att);
			let searchVarBind = txtElement.match(/\{+[a-zA-Z\,]+\}+/gm);
			let textToElement = txtElement;
			if(searchVarBind != null){
				for (const varBind of searchVarBind) {
					let concatVar = "";
					let getText = searchVarBind != null ? varBind.match(/[a-zA-Z]+/gm) : "";
					for (let nameVar of getText) {
						concatVar += eval("eval(nameVar)");
					}
					textToElement = textToElement.replace(varBind, concatVar);
				}
			}
			item.textContent = textToElement;
		}
	}
};
