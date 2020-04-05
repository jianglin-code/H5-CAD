// JavaScript Document

cad.LayerList=function(){
	
	this.Create=function(){
		var canvasRect = h_5_cad.Canvas.getCurCanvasRect();
		var LayerListDiv = document.createElement("div"); 
		LayerListDiv.setAttribute("id","LayerListDiv"); 
		LayerListDiv.setAttribute("class","box-layer-command");
		LayerListDiv.setAttribute("ondragover", "allowDrop(event)");
		var left = canvasRect.left+canvasRect.width-200;
		var top  = canvasRect.top+20+120+10;
		LayerListDiv.style.left=left+"px";
		LayerListDiv.style.top=top+"px";
		LayerListDiv.style.zIndex=1;
		
		CreatLayerList(LayerListDiv);
		
		CreatLayerColor(LayerListDiv);
		
		document.body.appendChild(LayerListDiv); 
		LayerListDiv ="";
	}
	
	function CreatLayerList(node){
var html_string="<div id='LAYERLISTTEXT' class='obj-text-box' style='left: 6px; top: 4px;'>图层</div><div class='layer_list'>\
		<table><tbody>";
		
		var Layers = h_5_cad.DataBase.Ls;
		for(var i=0;i<Layers.length;i++)
		{
			html_string +="<tr>\
<td onclick='showLayerColor("+i+");' style='"+getLayerColorCss(Layers[i].C)+"' class='layer_color'></td>\
<td onclick='showLayerVisible("+i+");' class='layer_visible'><span class="+getLayerVisibleCss(Layers[i].V)+"></span></td>\
<td onclick='showLayerLock("+i+");' class='layer_lock'><span class="+getLayerLockCss(Layers[i].L)+"></span></td>\
<td class='layer_name'>"+Layers[i].N+"</td>\
			</tr>";
		}
		
		html_string+="</tbody></table></div>";
		
		node.innerHTML = html_string;
	}
	
	function CreatLayerColor(parent){
		var layer_color = document.createElement("div"); 
		layer_color.setAttribute("id","pane_color_layer"); 
		layer_color.setAttribute("class","pane_color_layer");
		layer_color.style.zIndex=1;
		
		var sHTML = "<div id='layer_color' class='layer_color'>";
		for(var i=0;i<h_5_cad.colorList.length;i++)
		{
			sHTML+="<div \
					id='layer_color"+i+"'\
					class='color_element'\
					style='background-color: "+getColor(i)+";'\
					onclick='setLayerColor("+i+")'></div>";
		}
		sHTML +="</div>";
		
		layer_color.innerHTML = sHTML;

		layer_color.style.display = 'none';
		parent.appendChild(layer_color); 
		layer_color = "";
	}
}
