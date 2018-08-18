	this.titlePage="my first page";
	window.addEventListener("load",function(event){
		let evaluateExp = /[a-zA-Z\.]+/gm;
		for (let item of document.body.children){
			let txtElement =item.textContent;
			let resultExp = txtElement.search(/[\{\}]+/gm);
			if(resultExp>=0){	
				let getText = txtElement.match(/[a-zA-Z\.]+/gm);
				item.textContent = getText;
			}
		}
		
	},true);
	
	window.addEventListener("click",function(event){
		document.getElementById("title").innerHTML=this.titlePage;
	},false);
	
	changeTitle = function(){
		this.titlePage = "Page of Game";
	};
