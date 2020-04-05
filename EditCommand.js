// JavaScript Document

cad.EditCommand = function()
{
	this.Create=function()
	{
		var canvasRect = h_5_cad.Canvas.getCurCanvasRect();
		var objdiv = document.createElement("div"); 
		objdiv.setAttribute("id","EditDIV"); 
		objdiv.setAttribute("class","box-command");
		var left = canvasRect.left+20;
		var top = canvasRect.top+20+140;
		objdiv.style.left=left+"px";
		objdiv.style.top=top+"px";
		objdiv.style.zIndex=1;
		objdiv.innerHTML="<div id='command_boxEdit' draggable='true' ondragstart='drag(event)' class='commandClass'>\
		<div id='objtext' class='obj-text-box' style='left: 4px; top: 3px;'>编辑</div>\
		<div id='PointSelect' class='button-obj-box PointSelect' style='left: 12px; top: 25px;'></div>\
		<div id='Mirror' class='button-obj-box Mirror' style='left: 58px; top: 25px;'></div>\
		<div id='Erase' class='button-obj-box Erase' style='left: 104px; top: 25px;'></div>\
		<div id='PRODIV' class='button-obj-box proclass' style='left: 12px; top: 72px;'></div>\
		<div id='EXPLODEDIV' class='button-obj-box explodeclass' style='left: 58px; top: 71px;'></div>\
		<div id='OFFSETDIV' class='button-obj-box offsetclass' style='left: 104px; top: 71px;'></div></div>";
		document.body.appendChild(objdiv); 
		
		var circlediv = document.getElementById("PRODIV"); 
		circlediv.onmouseover = function(){this.className="button-obj-box proclass-onmouseover";};
		circlediv.onmouseout = function(){this.className="button-obj-box proclass";};
		circlediv.onmousedown = function(){/*var cmd=h_5_cad.Canvas.getCommand();cmd.CreateCircle.convertCircleCommand();*/};
		circlediv.onmouseup = function(){this.className="button-obj-box proclass-onmouseup";};
		
		var ellipsediv = document.getElementById("EXPLODEDIV"); 
		ellipsediv.onmouseover = function(){this.className="button-obj-box explodeclass-onmouseover";};
		ellipsediv.onmouseout = function(){this.className="button-obj-box explodeclass";};
		ellipsediv.onmousedown =  function(){/*var cmd=h_5_cad.Canvas.getCommand();cmd.CreateEllipse.convertEllipseCommand()*/};
		ellipsediv.onmouseup = function(){this.className="button-obj-box explodeclass-onmouseup";};
		
		var brushdiv = document.getElementById("OFFSETDIV"); 
		brushdiv.onmouseover = function(){this.className="button-obj-box offsetclass-onmouseover";};
		brushdiv.onmouseout = function(){this.className="button-obj-box offsetclass";};
		brushdiv.onmousedown = function(){/*var cmd=h_5_cad.Canvas.getCommand();cmd.CreateHline.convertHlineCommand()*/};
		brushdiv.onmouseup = function(){this.className="button-obj-box offsetclass-onmouseup";};
		
		registerCmdUI("PointSelect","","");
		registerCmdUI("Mirror","cursor_select_black","选择对象");
		registerCmdUI("Erase","cursor_select_black","选择需要删除的对象");
	};
};