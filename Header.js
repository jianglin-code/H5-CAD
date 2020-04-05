// JavaScript Document

cad.Header=function()
{
	this.Create=function()
	{
		var header = document.createElement("header"); 
		header.setAttribute("class","header");
		header.innerHTML ="<a id='logo' class='logo' href='./'></a>\
		<a id='allDrawing' class='allDrawing' href='./' target='_blank'>All Drawings</a>\
		<div id='bread' class='bread'></div>\
		<div id='dwgname' class='dwgname'>Drawing1.dwg</div>\
		<a id='dorp' class='dorp'><span id='curdorp' class='curdorp'>| Design</span>\
		<span id='dropdownarrow' class='dropdownarrow'></span>\
		<ul id='dropul' class='dropul'>\
		<li id='dropui1' class='dropui'><span class='liword'>设计</span></li>\
		<li id='dropui2' class='dropui'><span class='liword'>图纸</span></li></ul></a>\
		<div id='headerright' class='headerright'>\
		<profile-widget><span id='userName' class='userName'>江淋 江</span>\
		<a id='userPic' class='userPic'><img id='userPicimage' src='user_X176.png'>\
		<div id='userArrow' class='userArrow'></div></a></profile-widget>\
		<ul id='hulright' class='hulright'>\
		<li id='huiright1' class='huiright-ws'><a>转至 autocadws.com</a></li>\
		<li id='hulright22' class='huiright'><a>帮助</a></li>\
		<li id='hulright33' class='huiright'><a>发送反馈</a>\
		</li></ul></div>";
		document.body.appendChild(header); 
	}
	
	function dropdownarrow_click()
	{
		var dropul = document.getElementById("dropul");
		dropul.style.opacity = 1;
		dropul.style.visibility = "visible";
	}
	
	function dropui_onmousedown()
	{
		var dropul = document.getElementById("dropul");
		dropul.style.opacity = 0;
		dropul.style.visibility = "hidden";
	}
};

cad.EditorTool=function()
{
	var img = new Image();
	this.Create=function()
	{
		var editor_Tool = document.createElement("editor_Tool");
		editor_Tool.innerHTML="<div class='add'></div>\
		 					   <div class='toggle'>\
							   <span class='arrow'></span>\
							   <input id='open' type='file' class='openbook'></input></div>\
							   <div class='toggle_select'>\
							   <span class='startu'></span>\
							   <div class='icon'></div>\
							   <span class='arrow_icon'></span></div>\
							   <div id='undo' class='undo'></div>\
							    <div id='redo' class='redo'></div>\
							   ";
		document.body.appendChild(editor_Tool); 

		hCad("#undo").click(
			function (){
				h_5_cad.Do.undo();
			}
		);
	
		hCad("#redo").click(
			function (){
				h_5_cad.Do.redo();
			}
		);

		hCad("#open").change(
			function (){
				if(!this.files||!this.files[0]){
					return null;
				}

				if(!(window.File && window.FileList && window.FileReader && window.Blob)) {
						return null;
				}

				var reader = new FileReader();
				reader.onload = function(e) {

					var img = new Image();

					img.onload = function(){
						h_5_cad.Do.open(this);
					}

					img.src = e.target.result;

				};

				reader.readAsDataURL(this.files[0]);
			}
		);
	};
};