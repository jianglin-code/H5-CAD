// JavaScript Document

cad.AnnCommand = function()
{
	this.curCommand="rectSelect";
	
	this.Create=function()
	{
		var canvasRect = h_5_cad.Canvas.getCurCanvasRect();
		var objdiv = document.createElement("div"); 
		objdiv.setAttribute("id","AnnDIV"); 
		objdiv.setAttribute("class","box-command");
		var left = canvasRect.left+20;
		var top = canvasRect.top+20+140+140;
		objdiv.style.left=left+"px";
		objdiv.style.top=top+"px";
		objdiv.style.zIndex=1;
		objdiv.innerHTML="<div id='command_boxAnn' draggable='true' ondragstart='drag(event)' class='commandClass'>\
		<div id='objtext' class='obj-text-box' style='left: 4px; top: 3px;'>注释</div>\
		<div id='Text' class='button-obj-box Text' style='left: 12px; top: 25px;'></div>\
		<div id='Coloud' class='button-obj-box Coloud' style='left: 58px; top: 25px;'></div>\
		<div id='Dist' class='button-obj-box Dist' style='left: 104px; top: 25px;'></div>\
		<div id='Area' class='button-obj-box Area' style='left: 12px; top: 72px;'></div>\
		<div id='Dim' class='button-obj-box Dim' style='left: 58px; top: 71px;'></div>\
		<div id='RDim' class='button-obj-box RDim' style='left: 104px; top: 71px;'></div></div>";
		document.body.appendChild(objdiv); 
		
		registerCmdUI("Text","","");
		registerCmdUI("Coloud","","");
		registerCmdUI("Dist","","");
		registerCmdUI("Area","","");
		registerCmdUI("Dim","","");
		registerCmdUI("RDim","cursor_select_black","选择圆或者圆弧");
		
	};
};