window.addEventListener("load",function(){
	var elementContent = document.getElementById("inject");
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		alert("get page");
      elementContent.innerHTML = this.responseText;
    }
  };
	http.open("GET","prueba.html",true);
	http.send();
	elementContent.appendChild("<a>hola</a>");
},false);

function cargingPage(pathPage){
	
}
