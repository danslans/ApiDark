	window.addEventListener("load",function(event){	
		searchDocumentVariable();
	},true);
	
	window.addEventListener("click",function(event){
		searchDocumentVariable();
	},false);
	
	searchDocumentVariable=function(){
		for (let item of document.body.children){
			let getAtt=item.getAttribute("bind");
			let txtElement =getAtt!=null?getAtt:item.textContent;
			if(txtElement.search(/[\{\}]+/gm)>=0){	
				let att=document.createAttribute("bind");
				att.value=txtElement;
				item.setAttributeNode(att);
				let searchVarBind = txtElement.match(/\{+[a-zA-Z\,]+\}+/gm);
				let getText = searchVarBind[0].match(/[a-zA-Z]+/gm);
				let concatVar ="";
				for (let nameVar of getText){
					concatVar+= eval("eval(nameVar)");
				}
				item.textContent= txtElement.replace(searchVarBind[0],concatVar);
			}
		}
	};
