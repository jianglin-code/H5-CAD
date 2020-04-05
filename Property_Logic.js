// JavaScript Document

function getLayerColorCss(v){
	return "background-color:"+v;
}

function getLayerVisibleCss(v){
	switch(v){
		case 0:
			return "false";
		case 1:
			return "true";
	}
}

function getLayerLockCss(v){
	switch(v){
		case 0:
			return "false";
		case 1:
			return "true";
	}
}

var setLayerColor_v=0;
function setLayerColor(i){
	var Layers = h_5_cad.DataBase.Ls;
	hCad(".color_element").eq(getColorIndex(Layers[setLayerColor_v].C)).html("");
	Layers[setLayerColor_v].C=getColor(i);

	hCad(".layer_color").eq(setLayerColor_v).css("background-color",getColor(i));
	
	var pane_color_layer = document.getElementById("pane_color_layer");
	pane_color_layer.style.display = 'none'; 
}

function showLayerColor(v){
	var pane_color_layer = document.getElementById("pane_color_layer");
	if(pane_color_layer){
		if(pane_color_layer.style.display == ''){
			pane_color_layer.style.display = 'none'; 
			var Layers = h_5_cad.DataBase.Ls;
			hCad(".color_element").eq(getColorIndex(Layers[setLayerColor_v].C)).html("");
		}
		else{
			setLayerColor_v=v;
			pane_color_layer.style.display = ''; 
			var Layers = h_5_cad.DataBase.Ls;
			hCad(".color_element").eq(getColorIndex(Layers[setLayerColor_v].C)).html("<div class='COLOR_SELECT' ></div>");
		}
	}
}

function showLayerVisible(i){

	h_5_cad.DataBase.Ls[i].V=h_5_cad.DataBase.Ls[i].V===0?1:0;
	if(h_5_cad.DataBase.Ls[i].V)
		hCad(".layer_visible").eq(i).html("<span class='true'></span>");
	else
		hCad(".layer_visible").eq(i).html("<span class='false'></span>");
	
	worldDraw();
}

function showLayerLock(i){
	
	if(h_5_cad.DataBase.Ls.length<=i||i<0){
		h_5_cad.MouseTip.ShowErrTip("无效前图层.");
		return ;
	}
	
	if(i === h_5_cad.DataBase.L){
		h_5_cad.MouseTip.ShowErrTip("不能锁定当前图层.");
		return ;
	}
	
	h_5_cad.DataBase.Ls[i].L=h_5_cad.DataBase.Ls[i].L===0?1:0;
	if(h_5_cad.DataBase.Ls[i].L)
		hCad(".layer_lock").eq(i).html("<span class='true'></span>");
	else
		hCad(".layer_lock").eq(i).html("<span class='false'></span>");
}

function fmoney(s, n)   
{   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
} 

function getAng(sPoint,ePoint){
	var h = ePoint.Y-sPoint.Y;
	
	var r = Math.sqrt(Math.pow(ePoint.X-sPoint.X,2)+Math.pow(ePoint.Y-sPoint.Y,2));
	if(r == 0)
		return 0;
	
	var ang = 0;
	if(h == 0)
	{
		if(ePoint.X>sPoint.X)
		{
			ang = 0;
		}
		else
		{
			ang = Math.PI;
		}	
	}
	else
	{
		var w = ePoint.X-sPoint.X;
		if(w>=0&&h>0)
		{
			ang =Math.asin(h/r);	
		}
		else if(w<0&&h>0)
		{
			ang =Math.PI- Math.asin(h/r);
		}
		else if(w<0&&h<0)
		{
			ang =Math.PI+ Math.asin(-h/r);
		}
		else if(w>=0&&h<0)
		{
			ang =2*Math.PI- Math.asin(-h/r);
		}
	}
	
	return ang;
}

WCS2UCS = function(pt){
	var mat=h_5_cad.DataBase.MAT[0];
	var sX = pt.X*mat.X+mat.X3;
	var sY = pt.Y*mat.Y+mat.Y3;
	
	return {"X":sX,"Y":sY};
}

UCS2WCS = function(pt){
	var mat=h_5_cad.DataBase.MAT[0];
	
	var sX = (pt.X-mat.X3)/mat.X;
	var sY = (pt.Y-mat.Y3)/mat.Y;
	
	return {"X":sX,"Y":sY};
}

ToolFunc = function()
{
	this.getDist = function(A,B,sqr)
	{
		var x = A.X - B.X;
		var y = A.Y - B.Y;
		if(sqr)
		   return Math.sqrt(x*x+y*y);
		else
		   return x*x + y*y;
	}
	
	this.Pnt2SegmentDist=function(A, B, C)
	{
		 var AB ={"X":B.X - A.X,"Y":B.Y - A.Y}; //向量AB
		 var AC = {"X":C.X - A.X,"Y":C.Y - A.Y};;
		 var r = AB.X * AC.X + AB.Y * AC.Y;//AB与AC的点乘积
		 r /= this.getDist(A,B,0);///AC在AB上的投影比上AB。调用Dist(),不开方
		 //若C的投影在AB外
		 if(r < 0)
		 {
			 return this.getDist(A, C,1);//调用Dist(),开方
		 }
		 if(r > 1)
		 {
			 return this.getDist(B, C,1);
		 }
		 //若C的投影在AB之间
		 var D = AB;
		 D.X *= r;
		 D.Y *= r;//因为AB是向量，所以可以这样做。得到AC在AB上的投影向量。
		 D.X+=A.X;
		 D.Y+=A.Y;
		 return this.getDist(C, D,1);
	}
	
	this.areapolygen=function(sPoints)
	{
		var area = 0.0;
		var vs,ve;
		for (var i=0;i<sPoints.length;i++)
		{
			vs = sPoints[i];
			ve;
			if(i+1 == sPoints.length)
				ve = sPoints[0];
			else
				ve = sPoints[i+1];
			area += vs.X*ve.Y-ve.X*vs.Y;
		}
		
		return Math.abs(area)/2;
	}	
}

ToolDrawFunc = function()
{
	this.selectDraw=function(startPoint,endPoint,canvas)
	{
	  var w = endPoint.X-startPoint.X;
	  var h = endPoint.Y-startPoint.Y;
	  if(w == 0)
	  {	   
	  	  var max = startPoint.Y>endPoint.Y?startPoint.Y:endPoint.Y;
		  var min = startPoint.Y<endPoint.Y?startPoint.Y:endPoint.Y;
		  for(var i=min;i<max;i+=4)
		  {
			 canvas.moveTo(startPoint.X,i);
	  		 canvas.lineTo(startPoint.X,i+2);
		  }
	  }
	  else if(h == 0)
	  {
		  var max = startPoint.X>endPoint.X?startPoint.X:endPoint.X;
		  var min = startPoint.X<endPoint.X?startPoint.X:endPoint.X;
		  for(var i=min;i<max;i+=4)
		  {
			 canvas.moveTo(i,startPoint.Y);
	  		 canvas.lineTo(i+2,startPoint.Y);
		  }
	  }
	  else
	  {
		  var rot = h/w;
		  var max = startPoint.X>endPoint.X?startPoint.X:endPoint.X;
		  var min = startPoint.X<endPoint.X?startPoint.X:endPoint.X;
		  for(var i=min;i<max;i+=4)
		  {
			 canvas.moveTo(i,rot*(i-startPoint.X)+startPoint.Y);
	  		 canvas.lineTo(i+2,rot*(i+2-startPoint.X)+startPoint.Y);
		  }
	  }
	}
}