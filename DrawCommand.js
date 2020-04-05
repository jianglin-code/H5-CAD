// JavaScript Document

cad.DrawCommand = function()
{
	this.Create=function()
	{
		var canvasRect = h_5_cad.Canvas.getCurCanvasRect();
		var objdiv = document.createElement("div"); 
		objdiv.setAttribute("id","OBJDIV"); 
		objdiv.setAttribute("class","box-command");
		objdiv.setAttribute("ondrop", "drop(event)");
		objdiv.setAttribute("ondragover", "allowDrop(event)");
		var left = canvasRect.left+20;
		var top = canvasRect.top+20;
		objdiv.style.left=left+"px";
		objdiv.style.top=top+"px";
		objdiv.style.zIndex=1;
		objdiv.innerHTML="<div id='command_box' draggable='true' ondragstart='drag(event)' class='commandClass'><div id='objtext' class='obj-text-box' style='left: 4px; top: 3px;'>绘制</div>\
		<div id='Line' class='button-obj-box Line' style='left: 12px; top: 25px;'></div>\
		<div id='Rect' class='button-obj-box Rect' style='left: 58px; top: 25px;'></div>\
		<div id='Arc' class='button-obj-box Arc' style='left: 104px; top: 25px;'></div>\
		<div id='Circle' class='button-obj-box Circle' style='left: 12px; top: 72px;'></div>\
		<div id='Ellipse' class='button-obj-box Ellipse' style='left: 58px; top: 71px;'></div>\
		<div id='Hline' class='button-obj-box Hline' style='left: 104px; top: 71px;'></div></div>";
		document.body.appendChild(objdiv); 
		
		registerCmdUI("Line","","");
		registerCmdUI("Rect","","");
		registerCmdUI("Arc","","");
		registerCmdUI("Circle","","");
		registerCmdUI("Ellipse","","");
		registerCmdUI("Hline","","");
	};
};