alert("holll");
document.addEventListener("click",function(event){
	alert("ha");
	var req= new XMLHttpRequest();
	
	req.open("GET","http://192.168.0.103:5000/",true);
	req.onreadystatechange=function(e){
		alert(req.readyState);
		if(req.readyState==4){
			
			if(req.status==200){
				alert("dio");
				alert(req.responseText);
			}else{
				alert(req.getAllResponseHeaders);
			}
		}
	};
	req.send(null);
	alert("fin code");
},false);
