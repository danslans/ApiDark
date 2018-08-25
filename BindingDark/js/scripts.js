	window.addEventListener("load",function(event){	
		searchDocumentVariable();
	},true);
	
	window.addEventListener("click",function(event){
		searchDocumentVariable();
	},false);
	
	let searchDocumentVariable=function(){
		for (let item of document.body.children){
			let getAtt=item.getAttribute("bind");
			let txtElement =getAtt!=null?getAtt:item.textContent;
			if(txtElement.search(/[\{\}]+/gm)>=0){	
				let att=document.createAttribute("bind");
				att.value=txtElement;
				item.setAttributeNode(att);
				let searchVarBind = txtElement.match(/\{+[a-zA-Z\,]+\}+/gm);
				let getText = searchVarBind!=null?searchVarBind[0].match(/[a-zA-Z]+/gm):"";
				let concatVar ="";
				let textToElement = "";
				for (let nameVar of getText){
					concatVar+= eval("eval(nameVar)");
				}

				for (let elementToReplace of searchVarBind){
					textToElement += txtElement.replace(elementToReplace,concatVar);
				}
				item.textContent= textToElement;
			}
		}
	};
