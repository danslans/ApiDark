var persons = [
{name:"kira",cedula:"56789",nameButton:"Actualizar",
design:
"<d-topbar general_attributes>"+
"<d-icon type='subMenu' size='{margin:0 0 3px 10px}' onclick='dMenu()'></d-icon>"+
"<h4>Pagina Principal</h4>"+
"</d-topbar>"+
"<d-content-section orientation='vertical' color='#D8D8D8' size=',300'>"+
"<p>{{item.name}}</p>"+
"<d-input placeholder='mundo'></d-input>"+
"<input type='text' placeholder='{{item.name}}'>"+
"<example>"+
"<d-input></d-input>"+
"<button>guardar</button>"+
"</example>"+	  
"</d-content-section>"}
];
var menu = ["Videos","Fotos" ,"Juegos"];
this.functs.example = [
	{
		element: {
			name: "div",
			style:"height:100px;width:200px;background-color:yellow;overflow: scroll;"
		}
	}
];
var general_att = [
	"orientation = horizontal",
	"align = space-between center",
	"color={backgroundColor:#cccccc,text:white}" 
];
var general_attributes = {
	orientation :"horizontal",
	align : "space-between center",
	color:"{backgroundColor:red,text:white}",
};
var divInject = "<button>{{item.nameButton}}</button>";
var icon=["Mapa","Busqueda"];
