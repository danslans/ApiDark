	var titlePage="my first pagecita";
	var i=0;
	window.addEventListener("load",function(event){	
		searchDocumentVariable();
	},true);
	
	window.addEventListener("click",function(event){
		searchDocumentVariable();
	},false);
	
	changeTitle = function(){
		i++;
		titlePage = "Page of Game"+i;
		
	};
	
	searchDocumentVariable=function(){
		for (let item of document.body.children){
			let getAtt=item.getAttribute("bind");
			let txtElement =getAtt!=null?getAtt:item.textContent;
			let resultExp = txtElement.search(/[\{\}]+/gm);
			if(resultExp>=0){	
				let att=document.createAttribute("bind");
				att.value=txtElement;
				item.setAttributeNode(att);
				let getText = txtElement.match(/[a-zA-Z]+/gm);
				let texto= getText[0];
				item.textContent = eval("eval(texto)");
			}
		}
	};
