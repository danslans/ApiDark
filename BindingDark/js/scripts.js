window.addEventListener("load", function (event) {
	bind({});
}, true);

this.bind=function (data) {
	var initBind = function(item){
		let getAtt = item.getAttribute("bind");
		let txtElement = getAtt != null ? getAtt : item.textContent!=""?item.textContent:item.value ;
		if (txtElement.search(/[\{\}]+/gm) >= 0) {
			let att = document.createAttribute("bind");
			att.value = txtElement;
			item.setAttributeNode(att);
			let searchVarBind = txtElement.match(/\{+[a-zA-Z\,\+\*\-\=\(\)\"\/1-9]+\}+/gm);
			let textToElement = txtElement;
			if(searchVarBind != null){
				for (const varBind of searchVarBind) {
					let concatVar = "";
					let getText = searchVarBind != null ? varBind.match(/[a-zA-Z\+\-\*\=\(\)\"\/1-9]+/gm) : "";
					for (let nameVar of getText) {
						concatVar += eval("eval(nameVar)");
					}
					textToElement = textToElement.replace(varBind, concatVar);
				}
			}
			//item.textContent = textToElement;
			if(item.textContent!=""){
				//item.textContent=textToElement;
				item.innerHTML = textToElement;
			}else{
			 item.value=textToElement; 
			 }
		}
	};
	
	var loopElements = function(element){
		if(element.children.length>0){
			initBind(element);
			for (let item of element.children){
			initBind(item);
			loopElements(item);
			}
		}else{
			initBind(element);
		}
	};
	
	for (let item of document.body.children) {
		loopElements(item);	
	}
	
	
};





