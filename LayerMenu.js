// JavaScript Document

function getLayer(name){
	var Layers = h_5_cad.DataBase.Ls;
	for(var i=0;i<Layers.length;i++){
		if(Layers[i].N == name)
			return Layers[i];
	}
	
	return null;
}

function setLayer(i)
{
	hCad("#layer_menu").hide();
	
	var Layers = h_5_cad.DataBase.Ls;
	if(Layers.length<=i||i<0){
		h_5_cad.MouseTip.ShowErrTip("无效前图层.");
		return ;
	}
	
	if(Layers[i].L == 1){
		h_5_cad.MouseTip.ShowErrTip("锁定图层不能置为当前图层.");
		return ;
	}
	
	
	var index = h_5_cad.DataBase.L;
	if(index>-1){
		hCad("#layer_menu").find("dd").eq(index).css("background-color","#FFFFFF");	
	}
						
	h_5_cad.DataBase.L= i;
	
	hCad("#cur_layer").html(Layers[i].N);
};

function getColor(i){
	if(i<=h_5_cad.colorList.length&&i>=0){
		return h_5_cad.colorList[i];
	}
	return null;
};

function getColorIndex(v){
	for(var i=0;i<h_5_cad.colorList.length;i++)
	{
		if(v === h_5_cad.colorList[i])
			return i;
	}
	
	return -1;
};

function getLw(i){
	
	if(i<=h_5_cad.lineWidthList.length&&i>=0){
		return h_5_cad.lineWidthList[i];
	}
	return null;
};

function getLwIndex(v){
	for(var i=0;i<h_5_cad.lineWidthList.length;i++)
	{
		if(v === h_5_cad.lineWidthList[i])
			return i;
	}
	
	return -1;
};

function getLt(i){
	if(i<=h_5_cad.lineTypeList.length&&i>=0){
		return h_5_cad.lineTypeList[i];
	}
	return null;
};

function getLtIndex(v){
	for(var i=0;i<h_5_cad.lineTypeList.length;i++)
	{
		if(v === h_5_cad.lineTypeList[i])
			return i;
	}
	
	return -1;
};

function setColor(i)
{
	var pane_lw = document.getElementById("pane_lw");
	pane_lw.style.display = 'none'; 
	var pane_ltype = document.getElementById("pane_ltype");
	pane_ltype.style.display = 'none'; 	
	var lw_btn = document.getElementById("WEIGHT");
	lw_btn.className="weight-box weight";
	var ltype_btn = document.getElementById("LINETYPE");
	ltype_btn.className="weight-box linetype";
					
	var pane = document.getElementById("pane");
	if(pane){
		if(pane.style.display == 'none'){
			pane.style.display = ''; 
			var pane_color = document.getElementById("pane_color");
			if(pane_color){
				pane_color.style.display = ''; 

				var v="color"+getColorIndex(h_5_cad.DataBase.C);
				var color = document.getElementById(v);
				if(color){
					color.innerHTML = "<div class='COLOR_SELECT' ></div>";
				}
				
				var color_btn = document.getElementById("COLOR");
				if(color_btn){
					color_btn.className="weight-box color-onmouseup";
				}
				
			}
		}else
		{
			var pane_color = document.getElementById("pane_color");
			if(pane_color){
				if(pane_color.style.display == ''){
					pane.style.display = 'none'; 
					pane_color.style.display = 'none'; 
				
					if(i != -1){
						var v="color"+getColorIndex(h_5_cad.DataBase.C);
						var color = document.getElementById(v);
						if(color){
							color.innerHTML = "";
						}
				
						h_5_cad.DataBase.C=getColor(i);
						hCad(".LAYERCOLOR_LINE").css("background-color",getColor(i));
					}
				
					var color_btn = document.getElementById("COLOR");
					if(color_btn){
						color_btn.className="weight-box color";
					}
				}
				else
				{		
					var pane_color = document.getElementById("pane_color");
					pane_color.style.display = ''; 
					
					var v="color"+getColorIndex(h_5_cad.DataBase.C);
					var color = document.getElementById(v);
					if(color){
						color.innerHTML = "<div class='COLOR_SELECT' ></div>";
					}
				
					var color_btn = document.getElementById("COLOR");
					if(color_btn){
						color_btn.className="weight-box color-onmouseup";
					}
				}
			}
		}
	}	
};

function setLayerLw(i)
{
	var pane_color = document.getElementById("pane_color");
	pane_color.style.display = 'none'; 
	var pane_ltype = document.getElementById("pane_ltype");
	pane_ltype.style.display = 'none'; 	
	var color_btn = document.getElementById("COLOR");
	color_btn.className="weight-box color";
	var ltype_btn = document.getElementById("LINETYPE");
	ltype_btn.className="weight-box linetype";
					
	var pane = document.getElementById("pane");
	if(pane){
		if(pane.style.display == 'none'){
			pane.style.display = ''; 
			var pane_lw = document.getElementById("pane_lw");
			if(pane_lw){
				pane_lw.style.display = ''; 
				
				var v="lw_"+getLwIndex(h_5_cad.DataBase.Lw);
				var color = document.getElementById(v);
				if(color){
					
				}
				
				var w_btn = document.getElementById("WEIGHT");
				if(w_btn){
					w_btn.className="weight-box weight-onmouseup";
				}
				
			}
		}else
		{
			var pane_lw = document.getElementById("pane_lw");
			if(pane_lw){
				if(pane_lw.style.display == ''){
					pane.style.display = 'none'; 
					pane_lw.style.display = 'none'; 
				
					if(i != -1)
						h_5_cad.DataBase.Lw=getLw(i);
				
					var w_btn = document.getElementById("WEIGHT");
					if(w_btn){
						w_btn.className="weight-box weight";
					}
				}
				else
				{		
					var pane_lw = document.getElementById("pane_lw");
					pane_lw.style.display = ''; 
					
					var v="lw_"+getLwIndex(h_5_cad.DataBase.Lw);
					var color = document.getElementById(v);
					if(color){
					
					}
				
					var w_btn = document.getElementById("WEIGHT");
					if(w_btn){
						w_btn.className="weight-box weight-onmouseup";
					}
				}
			}
		}
	}	
};

function setLayerLt(i)
{
	var pane_color = document.getElementById("pane_color");
	pane_color.style.display = 'none'; 
	var pane_lw = document.getElementById("pane_lw");
	pane_lw.style.display = 'none'; 	
	var color_btn = document.getElementById("COLOR");
	color_btn.className="weight-box color";
	var w_btn = document.getElementById("WEIGHT");
	w_btn.className="weight-box weight";
					
	var pane = document.getElementById("pane");
	if(pane){
		if(pane.style.display == 'none'){
			pane.style.display = ''; 
			var pane_ltype = document.getElementById("pane_ltype");
			if(pane_ltype){
				pane_ltype.style.display = ''; 
				
				var v="lt_"+getLtIndex(h_5_cad.DataBase.Lt);
				var color = document.getElementById(v);
				if(color){
					
				}
				
				var ltype_btn = document.getElementById("LINETYPE");
				if(ltype_btn){
					ltype_btn.className="weight-box linetype-onmouseup";
				}
				
			}
		}else
		{
			var pane_ltype = document.getElementById("pane_ltype");
			if(pane_ltype){
				if(pane_ltype.style.display == ''){
					pane.style.display = 'none'; 
					pane_ltype.style.display = 'none'; 
				
					if(i != -1)
						h_5_cad.DataBase.Lt=getLt(i);
				
					var ltype_btn = document.getElementById("LINETYPE");
					if(ltype_btn){
						ltype_btn.className="weight-box linetype";
					}
				}
				else
				{		
					var pane_ltype = document.getElementById("pane_ltype");
					pane_ltype.style.display = ''; 
					
					var v="lt_"+getLtIndex(h_5_cad.DataBase.Lt);
					var color = document.getElementById(v);
					if(color){
					
					}
				
					var ltype_btn = document.getElementById("LINETYPE");
					if(ltype_btn){
						ltype_btn.className="weight-box linetype-onmouseup";
					}
				}
			}
		}
	}	
};

Layer_Menu=function()
{	
	this.Create = function(ID)
	{
		var layerDiv = document.getElementById(ID); 
		var Layer = h_5_cad.DataBase.Ls[h_5_cad.DataBase.L];
		layerDiv.innerHTML = "<dt><span class='curlayer' id = 'cur_layer'>"+Layer.N+"</span><span class='arraw' id = 'layer_arraw'></span></dt>";
		layerDiv.innerHTML += "<div id ='layer_menu' class = 'layer_menu' ></div>";
		
		var layer_menu = document.getElementById("layer_menu"); 
		var Layers = h_5_cad.DataBase.Ls;
		for(var i=0;i<Layers.length;i++)
		{
			layer_menu.innerHTML += "<dd onclick='setLayer("+i+");'>"+Layers[i].N+"</dd>";
		}
		
		var layer_arraw = document.getElementById("layer_arraw"); 
		if(layer_arraw){
			layer_arraw.onclick = function(){
				var layer_menu = document.getElementById("layer_menu");
				if(layer_menu){
					if(layer_menu.style.display == 'none'){
						layer_menu.style.display = ''; 
						
						var index = h_5_cad.DataBase.L;
						if(index>-1){
							hCad("#layer_menu").find("dd").eq(index).css("background-color","#E2E2E2");	
						}
					}else
					{
						layer_menu.style.display = 'none'; 
						
						var index = h_5_cad.DataBase.L;
						if(index>-1){
							hCad("#layer_menu").find("dd").eq(index).css("background-color","#FFFFFF");	
						}
					}
				}
			};	
		}
		
		var cur_layer = document.getElementById("cur_layer"); 
			if(cur_layer){
			cur_layer.onclick = function(){
				var layer_menu = document.getElementById("layer_menu");
				if(layer_menu){
					if(layer_menu.style.display == 'none'){
						layer_menu.style.display = ''; 
						
						var index = h_5_cad.DataBase.L;
						if(index>-1){
							hCad("#layer_menu").find("dd").eq(index).css("background-color","#E2E2E2");	
						}
					}else
					{
						layer_menu.style.display = 'none'; 
						
						var index = h_5_cad.DataBase.L;
						if(index>-1){
							hCad("#layer_menu").find("dd").eq(index).css("background-color","#FFFFFF");	
						}
					}
				}
			};	
		}
		
		hCad("#layer_menu").hide();
	}
};