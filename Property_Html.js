// JavaScript Document

cad.Property=function()
{
	var LMenu=0;
	this.Create=function()
	{
		var canvasRect = h_5_cad.Canvas.getCurCanvasRect();
		var objPropertydiv = document.createElement("div"); 
		objPropertydiv.setAttribute("id","OBJPROPERTYDIV"); 
		objPropertydiv.setAttribute("class","box-property-command");
		objPropertydiv.setAttribute("ondrop", "drop(event)");
		objPropertydiv.setAttribute("ondragover", "allowDrop(event)");
		var left = canvasRect.left+canvasRect.width-200;
		var top  = canvasRect.top+20;
		objPropertydiv.style.left=left+"px";
		objPropertydiv.style.top=top+"px";
		objPropertydiv.style.zIndex=1;
		var sHtml="<div id='properties_box' draggable='true' ondragstart='drag(event)' class='propertiesClass'>			        <div id='PROPERTYTEXT' class='obj-text-box' style='left: 6px; top: 4px;'>特性</div>\
        <div id='LAYERCOLOR' class='layer-color' style='left: 9px; top: 28px; background-color: rgb(255, 255, 255);'>\
		<div class = 'LAYERCOLOR_LINE' style='height: 1px;margin-top: 9px;' ></div></div>\
		<div id='WEIGHT' class='weight-box weight' style='left: 9px; top: 53px;' onclick='setLayerLw(-1)'></div>\
		<div id='LINETYPE' class='weight-box linetype' style='left: 75px; top: 53px;' onclick='setLayerLt(-1)'></div>\
		<div id='COLOR' class='weight-box color' style='left: 140px; top: 53px;' onclick='setColor(-1)' ></div>\
		<div id='LAYER' class='layer-menu' style='left: 9px; top: 80px;'></div>\
		<div id='pane' class='pane_class'>"+CreateColor()+CreateLType()+CreateLWeight()+"</div></div>"
		objPropertydiv.innerHTML=sHtml;
		document.body.appendChild(objPropertydiv); 	
		objPropertydiv=null;
		
		hCad("#COLOR").mouseover = function(){
			if(this.className != "weight-box color-onmouseup")
				this.className="weight-box color-onmouseover";
		};
		hCad("#COLOR").mouseout = function(){
			if(this.className != "weight-box color-onmouseup")
				this.className="weight-box color";
		};
		hCad("#WEIGHT").mouseover = function(){
			if(this.className != "weight-box weight-onmouseup")
				this.className="weight-box weight-onmouseover";
		};
		hCad("#WEIGHT").mouseout = function(){
			if(this.className != "weight-box weight-onmouseup")
				this.className="weight-box weight";
		};
		hCad("#LINETYPE").mouseover = function(){
			if(this.className != "weight-box linetype-onmouseup")
				this.className="weight-box linetype-onmouseover";
		};
		hCad("#LINETYPE").mouseout = function(){
			if(this.className != "weight-box linetype-onmouseup")
				this.className="weight-box linetype";
		};
		
		hCad("#pane_color").hide();
		hCad("#pane_ltype").hide();
		hCad("#pane_lw").hide();
		hCad("#pane").hide();
		hCad(".LAYERCOLOR_LINE").css("background-color",h_5_cad.DataBase.C);
		
		InitLayer();
	};
	
	this.getLMenu=function(){
		return LMenu;
	}
	
	function InitLayer(){
		LMenu = new Layer_Menu();
		LMenu.Create("LAYER");
	}
	
	function CreateColor(){
		var sHTML = "<div id='pane_color' class='pane_color'>";
		for(var i=0;i<h_5_cad.colorList.length;i++)
		{
			sHTML+="<div \
					id='color"+i+"'\
					class='color_element'\
					style='background-color: "+getColor(i)+";'\
					onclick='setColor("+i+")'></div>";
		}
		sHTML +="<div id='color12' class='color_element_layercolor' onclick='setColor(12)'></div></div>";
		return sHTML;
	}
	
	function CreateLType(){
		var sHTML = "<div id='pane_ltype' class='pane_ltype'><ul class ='lw_options'>";
		for(var i=0;i<h_5_cad.lineTypeList.length;i++)
		{
			sHTML+="<li id='lt_"+i+"' class ='lw_options_li' onclick='setLayerLt("+i+")'>\
					<div class = 'lw_options_li_1' style='height: 1px;margin-top: 9px;' ></div>\
					<div class = 'lw_options_li_2' >"+h_5_cad.lineTypeList[i]+"</div></li>";
		}
		sHTML +="</ul></div>";
		return sHTML;
	}
	
	function CreateLWeight(){
		var sHTML = "<div id='pane_lw' class='pane_lw'><ul class ='lw_options'>";
		for(var i=0;i<h_5_cad.lineWidthList.length;i++)
		{
			sHTML+="<li id='lw_"+i+"' class ='lw_options_li' onclick='setLayerLw("+i+")'>\
					<div class = 'lw_options_li_1' style='height: 1px;margin-top: 9px;' ></div>\
					<div class = 'lw_options_li_2' >"+h_5_cad.lineWidthList[i]+"</div></li>";
		}
		sHTML +="</ul></div>";
		return sHTML;
	}
};