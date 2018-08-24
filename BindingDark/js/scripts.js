	var titlePage="my first pagecita";
	window.addEventListener("load",function(event){
		for (let item of document.body.children){
			let txtElement =item.textContent;
			let resultExp = txtElement.search(/[\{\}]+/gm);
			if(resultExp>=0){	
				let getText = txtElement.match(/[a-zA-Z]+/gm);
				let texto= getText[0];
				item.textContent = eval("eval(texto)");
			}
		}
		
	},true);
	
	window.addEventListener("click",function(event){
		document.getElementById("title").innerHTML=this.titlePage;
	},false);
	
	changeTitle = function(){
		titlePage = "Page of Game";
	};
