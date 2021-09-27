// CAD_HTML5 CREATE BY JIANGLIN

var hCad = $.noConflict();//更换关键字
var h_5_cad;//全局app

hCad(document).ready(function(){
   	h_5_cad = new cad();
	
	h_5_cad.Header.Create();
	h_5_cad.EditorTool.Create();
	h_5_cad.Canvas.Create();
	h_5_cad.DrawCommand.Create();
	h_5_cad.EditCommand.Create();
	h_5_cad.AnnCommand.Create();
	h_5_cad.LayerList.Create();
	h_5_cad.Property.Create();
	h_5_cad.ButtomTool.Create();
	
	h_5_cad.Implement.InitImageData(true);
	
	document.onkeydown = h_5_cad.Canvas.keyDown; 
	
	InitUI();
});

cad=function()
{
	this.Application = "HCad";
	this.Header = new cad.Header();
	this.EditorTool =new cad.EditorTool();
	this.Implement = new cad.Implement();
	this.Canvas=new cad.Canvas();
	this.DrawCommand=new cad.DrawCommand();
	this.EditCommand=new cad.EditCommand();
	this.AnnCommand=new cad.AnnCommand();
	this.Property=new cad.Property();
	this.LayerList=new cad.LayerList();
	this.ButtomTool=new cad.ButtomTool();
	this.SelectSet = new cad.SelectSet();
	this.MouseTip = new MouseTip();
	this.Do = new Do();
	
	this.DataBase = {
	   "C":"#2D7BD3",
	   "L":1,
	   "Lw":"",
	   "Lt":"",
	   "Ls":[
	   		 {"N":"0","C":"#EF273A","V":1,"L":1},
	   		 {"N":"图层1","C":"#F8D63A","V":1,"L":0},
	         {"N":"图层2","C":"#444444","V":0,"L":1},
	         {"N":"图层3","C":"#2D7BD3","V":0,"L":0},
	         {"N":"图层4","C":"#3fa93b","V":0,"L":0}
	       ],
	   "O":[
	   		 {"N":"L","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0},{"X":0,"Y":0}]},
	         {"N":"C","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0}],"R":0},
	         {"N":"A","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0}],"R":0,"S":0,"E":0,"W":false},
	         {"N":"E","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0}],"AR":0,"BR":0,"S":0},
	         {"N":"H","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0}]},
	         {"N":"P","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0}]},
	         {"N":"T","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0}],"T":"1"},
	         {"N":"D","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0},{"X":0,"Y":0},{"X":0,"Y":0}]},
	         {"N":"R","C":"#F8D63A","L":7,"P":[{"X":0,"Y":0},{"X":0,"Y":0}],"R":0}
	       ],
	   "MAT":[{"X":1,"X1":0,"X2":0,"X3":0,
	   		   "Y1":0,"Y":1,"Y2":0,"Y3":0,
			   "Z1":0,"Z2":0,"Z":1,"Z3":0,
			   "W1":0,"W2":0,"W3":0,"W":1}]
		}
	
	this.colorList = ["#EF273A","#F8D63A","#3fa93b","#22D5EA","#2D7BD3",
			          "#DD52B2","#ffffff","#000000","#929292","#444444","#666666","#999999"];	
	this.lineWidthList = ["1.00 mm","0.5 mm","0.25 mm","0.2 mm","0.1 mm"];
	this.lineTypeList = ["bylayer","line1","line2","line3","line4"];

	this.images = [];
	
	//htmlobj=hCad.ajax({url:"/1.txt",async:false,type:"POST",data:JSON.stringify(this.DataBase)});
    //alert(htmlobj.responseText);

	//var str = JSON.stringify(this.DataBase);
	//alert(str);
	//this.DataBase = JSON.parse(str);
};

cad.Implement=function()
{
	var imageWData;
	var imageBData;
	var imageCData;
	var bHasGrid = true; 
	this.saveCurImageData = function()
	{
		var ctx = h_5_cad.Canvas.getCurCanvasContext();
		var w = h_5_cad.Canvas.getCurCanvasRect().width;
		var h = h_5_cad.Canvas.getCurCanvasRect().height;
		imageCData = ctx.getImageData(0,0,w,h);
	};
	
	this.switchImageData=function()
	{
		var canvas = h_5_cad.Canvas;
		var ctx = canvas.getCurCanvasContext();
		ctx.putImageData(imageCData,0,0);	
	};
	
	this.RollbackData=function()
	{
		var canvas = h_5_cad.Canvas;
		var ctx = canvas.getCurCanvasContext();
		if(bHasGrid){
			ctx.putImageData(imageBData,0,0);
			imageCData = imageBData;
		}else{
			ctx.putImageData(imageWData,0,0);
			imageCData = imageWData;
		}
	};
	
	
	this.InitImageData=function(bV)
	{
		var ctx = h_5_cad.Canvas.getCurCanvasContext();
		var w = h_5_cad.Canvas.getCurCanvasRect().width;
		var h = h_5_cad.Canvas.getCurCanvasRect().height;

		imageWData = ctx.createImageData(w,h);
		
		onloadCanvas();
		
		imageBData = ctx.getImageData(0,0,w,h);
		
		bHasGrid = bV;
		if(bHasGrid){
			imageCData = imageBData;
		}else{
			imageCData = imageWData;
		}
	};
	
	this.hasGrid=function(){
		return bHasGrid;
	}
	
	this.setGrid = function(bV){
		bHasGrid = bV;
	}
}

cad.SelectSet = function()
{
	var objects=[];
	this.Add=function(object){
		objects.push(object);
	}
	
	this.clear = function(){
		objects.splice(0,objects.length);  
	}
	
	this.getlength = function(){
		return objects.length;
	}
	
	this.selectDraw = function(){
		for(i in objects)
		{
			var o = objects[i];
			var v = o.C;
			o.C = "blue";
			FeedODraw(o);
			o.C = v;
		}
	}
	
	this.getObject=function(){
		var ids = [];
        ids = ids.concat(objects);
        return ids;
	}
}

cad.Canvas = function()
{
	var getCurPoint = {"nCount":0,"X":0.0,"Y":0.0};
	var getCurMovePoint = {"X":0.0,"Y":0.0,"bMove":0};
	var getCurRect ={"left":0,"top":0,"width":0,"height":0};
	
	var timer = 0;
	var bCommandLock= false;
	var leaveTop=110;
	var eKeyWord = 0;
	
	var command = new Command();
	command.convertselectCommand();
	
	this.Create=function(){
		
	   hCad("<canvas id='canvas' class='over'>....</canvas>").appendTo("editor-view");//创建一条画布
	   var h = screen.height-leaveTop;
       var w = screen.width;
	   var l = 0;
	   var t = leaveTop;
       var c = document.getElementById("canvas");//设置属性
	   if(!c){ throw Error("Canvas.Create(): document.getElementById(canvas) == null");}
	   
	   //基本属性
	   c.style.position = "absolute";
	   c.style.left = l+"px";
	   c.style.top = t+"px";
       c.setAttribute('width', w);
       c.setAttribute('height', h); 
	   
	   //基本事件
	   c.onclick = getCurPointFunc;
	   c.onmousemove = getCurMovePointFunc;
	   c.onmousewheel= mousewheel;
	   
	   var top = parseInt(c.style.top);
	   var bottom = top+parseInt(c.height);
	   var left = parseInt(c.style.left);
	   var right = left+parseInt(c.width);
	   getCurRect ={"left":left,"top":top,"width":right-left,"height":bottom-top};
	};
	
	this.getKeyDownWord=function(){
		return eKeyWord;
	}
	
	this.keyDown =function(e){
		eKeyWord= e;
		
		if(eKeyWord.keyCode == 27){
			command.endCommand();
			endOnetimerCommand();
			command.convertselectCommand();
			clearCanvas();
			InitUI();
			clearInterval(timer);
		}
	}
	
	this.clearCmd=function(){
		command.endCommand();
		endOnetimerCommand();
		command.convertselectCommand();
		clearCanvas();
		InitUI();
		clearInterval(timer);
	}
	
	function mousewheel(e){
		var evt=window.event || e //equalize event object 
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.Zoom.setScaleMode(evt.wheelDelta>0?true:false);
		cmd.Zoom.ZoomCommand();
	};
	
	function startCommand(){
		if(command.commandClearBegin == true){
			endOnetimerCommand();	
		}
		command.startCommand();
	};
	
	function endOnetimerCommand(){
		var implement = h_5_cad.Implement;
		implement.switchImageData();
	};
	
	function endCommand(){	
		if(command.commandClearEnd == true){
			endOnetimerCommand();
		}

		command.endCommand();
		command.convertselectCommand();
		clearCanvas();
		InitUI();
		clearInterval(timer);
	};
	
	function clearCanvas(){
		getCurPoint = {"nCount":0,"X":0.0,"Y":0.0};
		getCurMovePoint = {"X":0.0,"Y":0.0,"bMove":0};
		eKeyWord= 0;
	};
	
	this.getleaveTop=function(){
		return leaveTop;
	};
	
	function getCurPointFunc(evt){
		getCurPoint.nCount=getCurPoint.nCount+1;
		var point = getCoordInDocument(evt);
		getCurPoint.X=point.X;
		getCurPoint.Y=point.Y-leaveTop;
		
		command.commandOnclick();
		if(getCurPoint.nCount == 1){	
			startCommand();
			timer = setInterval(hCad_Command, 100);
		}
	};

	function getCurMovePointFunc(evt)
	{
		var point = getCoordInDocument(evt);
		if(point.X == getCurMovePoint.X&&point.Y == getCurMovePoint.Y){
			getCurMovePoint.bMove=0;
		}
		else{
			getCurMovePoint.bMove=1;
			getCurMovePoint.X=point.X;
			getCurMovePoint.Y=point.Y-leaveTop;
		}
	};
	
	function hCad_Command()
	{
		if(!bCommandLock)
		{
			bCommandLock=true;
			if (command.isCommandEnd()== true){
				endCommand();
		    }else{
				var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
				if(getCurMovePoint.bMove == 1){
					endOnetimerCommand();
					command.Command();
				}
			}
		
			bCommandLock=false;
		}
	};
	
	this.getCurCanvasContext = function()
	{
		var c = document.getElementById("canvas");
		if(c){
			return c.getContext("2d");
		}
		else{
			return null;
		}
	};
	
	this.getCurClickPoint = function(){
		return getCurPoint;
	};
	
	this.getCurMousemovePoint = function(){
		return getCurMovePoint;
	};
	
	this.getCurCanvasRect= function(){
		return getCurRect;
	};
	
	this.getCommand=function(){
		return command;
	};
};

function onloadCanvas()
{	
	var space=screen.height/40;
	for(var i=1;i<40;i++)
	{
		var iSpace = space*i;
		var o={"N":"P","C":"#f6f5ec","L":-1,
			"P":[{"X":0.0,"Y":iSpace},{"X":screen.width,"Y":iSpace}]};
		FeedODraw(o);
	}
	
	space=screen.width/80;
	for(var i=1;i<80;i++)
	{
		var iSpace = space*i;
		var o={"N":"P","C":"#f6f5ec","L":-1,
			"P":[{"X":iSpace,"Y":0.0},{"X":iSpace,"Y":screen.height}]};
		FeedODraw(o);
	}
};


function getCoordInDocument(e) {
	e = e || window.event;
	var x = e.pageX || (e.clientX +
	  (document.documentElement.scrollLeft
	  || document.body.scrollLeft));
	var y= e.pageY || (e.clientY +
	  (document.documentElement.scrollTop
	  || document.body.scrollTop));
	return {'X':x,'Y':y};
};

function registerCmdUI(id,cors,sMessage){
	hCad("#"+id+"").mouseover(
		function (){
			if(this.className != "button-obj-box "+this.id+"-onmouseup")
				this.className="button-obj-box "+this.id+"-onmouseover";
		}
	);
	
	hCad("#"+id+"").mouseout(
		function (){
			if(this.className != "button-obj-box "+this.id+"-onmouseup")
				this.className="button-obj-box "+this.id+"";
		}
	);
		
	hCad("#"+id+"").click(
		function (){
			h_5_cad.Canvas.clearCmd();
			var cors = hCad("#"+this.id+"").attr("cors");
			var sMessage = hCad("#"+this.id+"").attr("sMessage");
			
			recover("PointSelect");
			this.className = "button-obj-box "+this.id+"-onmouseup";
			
			if(this.cors != "cursor_black" && cors != "" && cors != undefined)
				hCad("#canvas").css({"cursor":"url("+cors+".cur) 32 32, crosshair"});
				
			if(sMessage != "" && sMessage != undefined){
				h_5_cad.MouseTip.setMessageTip(sMessage);
				h_5_cad.MouseTip.ShowMessage();
			}
			
			h_5_cad.Canvas.getCommand().convertCommand(this.id);
		}
	);
	
	hCad("#"+id+"").attr("cors",cors);
	hCad("#"+id+"").attr("sMessage",sMessage);
	
	cors = "";
	id = "";
	sMessage = "";
}

function registerBottomCmdUI(id,cors,sMessage){
	hCad("#"+id+"").mouseover(
		function (){
			if(this.className != "edit_pane_item "+this.id+"-onmouseup")
				this.className="edit_pane_item "+this.id+"-onmouseover";
		}
	);
	
	hCad("#"+id+"").mouseout(
		function (){
			if(this.className != "edit_pane_item "+this.id+"-onmouseup")
				this.className="edit_pane_item "+this.id+"";
		}
	);
		
	hCad("#"+id+"").click(
		function (){
			h_5_cad.Canvas.clearCmd();
			var cors = hCad("#"+this.id+"").attr("cors");
			var sMessage = hCad("#"+this.id+"").attr("sMessage");
			
			recover("PointSelect");
			this.className = "edit_pane_item "+this.id+"-onmouseup";
			
			if(this.cors != "cursor_black" && cors != "" && cors != undefined)
				hCad("#canvas").css({"cursor":"url("+cors+".cur) 32 32, crosshair"});
				
			if(sMessage != "" && sMessage != undefined){
				h_5_cad.MouseTip.setMessageTip(sMessage);
				h_5_cad.MouseTip.ShowMessage();
			}
			
			h_5_cad.Canvas.getCommand().convertCommand(this.id);
		}
	);
	
	hCad("#"+id+"").attr("cors",cors);
	hCad("#"+id+"").attr("sMessage",sMessage);
	
	cors = "";
	id = "";
	sMessage = "";
}

function InitUI(){
	recover("Line");
	recover("Rect");
	recover("Arc");
	recover("Circle");
	recover("Ellipse");
	recover("Hline");
	rrecover("PointSelect");
	recover("Mirror");
	recover("Erase");
	recover("Text");
	recover("Coloud");
	recover("Dist");
	recover("Area");
	recover("Dim");
	recover("RDim");
	
	recover("Pan");
	
	hidePane();
	
	recoverMouse();
}

function recoverMouse(){
	h_5_cad.MouseTip.CloseMessage();
	hCad("#canvas").css({"cursor":"url(cursor_black.cur) 32 32, crosshair"});
}

function hidePane(){
	hCad("#pane_color").hide();
	hCad("#pane_ltype").hide();
	hCad("#pane_lw").hide();
	hCad("#pane").hide();
	hCad("#layer_menu").hide();
	hCad("#pane_color_layer").hide();
}

function recover(id){
	hCad("#"+id+"").removeClass(id+"-onmouseover");
	hCad("#"+id+"").removeClass(id+"-onmouseup");
	hCad("#"+id+"").addClass(id);
}

function rrecover(id){
	hCad("#"+id+"").removeClass(id+"-onmouseover");
	hCad("#"+id+"").addClass(id+"-onmouseup");
	hCad("#"+id+"").removeClass(id);
}

function worldDraw(){
	h_5_cad.Implement.RollbackData();
	
	AllDraw();
	
	h_5_cad.Implement.saveCurImageData();
}

function AllDraw(){
	var nlen = h_5_cad.DataBase.O.length;
	for(var i=0;i<nlen;i++){
		if(h_5_cad.DataBase.O[i].L>=h_5_cad.DataBase.Ls.length ||
		   h_5_cad.DataBase.O[i].L<0)
		continue;

		if(h_5_cad.DataBase.Ls[h_5_cad.DataBase.O[i].L].V === 1 && h_5_cad.DataBase.O[i].ERASE !== true)
			FeedODraw(h_5_cad.DataBase.O[i]);
	}
}

function Push2Db(o){
	o.ID = h_5_cad.DataBase.O.length;
	h_5_cad.DataBase.O.push(o);
	h_5_cad.Do.saveDo(1,o);
	
	if(o.L>=h_5_cad.DataBase.Ls.length || o.L<0)
		return null;
	
	if(h_5_cad.DataBase.Ls[o.L].V === 1){
		FeedODraw(o);
		h_5_cad.Implement.saveCurImageData();
	}
}


function PointSelect(pt){
	pt = UCS2WCS(pt);
	h_5_cad.SelectSet.clear();
	var nlen = h_5_cad.DataBase.O.length;
	for(var i=0;i<nlen;i++){
		if(h_5_cad.DataBase.O[i].L>=h_5_cad.DataBase.Ls.length ||
		   h_5_cad.DataBase.O[i].L<0)
		continue;
		
		if(h_5_cad.DataBase.Ls[h_5_cad.DataBase.O[i].L].V === 1&&
		   h_5_cad.DataBase.O[i].ERASE !== true && SelectO(h_5_cad.DataBase.O[i],pt)){
			h_5_cad.SelectSet.Add(h_5_cad.DataBase.O[i]);
		}
	}
}

Do = function(){
	var d=0;
	var max =0;
	this.saveDo=function(flag,o){
		if(flag == 1){//add
			var v = "a_"+JSON.stringify(o);
			hCad.cookie("do"+d,v);
		}else if(flag == 2){//modefi
			var v = "m_"+JSON.stringify(o);
			hCad.cookie("do"+d,v);
		}
		
		while(max>d) hCad.cookie("do"+max--,null);
		max = d;
		
		d++;
	}
	
	this.undo=function(){
		var v = hCad.cookie("do"+(d-1));
		if(v === null || v === undefined || ((d-1)>max))
			return null;

		var section =v.substring(0,2);
		v = v.substring(2,v.length);
		var o = JSON.parse(v);
		if("a_" === section){
			h_5_cad.DataBase.O.splice(h_5_cad.DataBase.O.length-1,1);
		}else if ("m_" === section){
			var v = "m_"+JSON.stringify(h_5_cad.DataBase.O[o.ID]);
			hCad.cookie("do"+(d-1),v);
			
			h_5_cad.DataBase.O[o.ID] = o;
		}
		
		worldDraw();
		d--;
	}
	
	this.redo=function(){
		var v = hCad.cookie("do"+d);
		if(v === null || v === undefined || d>max)
			return null;
	
		var section =v.substring(0,2);
		v = v.substring(2,v.length);
		var o = JSON.parse(v);
		if("a_" === section){
			h_5_cad.DataBase.O.push(o);
		}else if ("m_" === section){
			var v = "m_"+JSON.stringify(h_5_cad.DataBase.O[o.ID]);
			hCad.cookie("do"+d,v);
			h_5_cad.DataBase.O[o.ID] = o;
		}
		
		worldDraw();
		d++;
	}

	this.open=function(img){
		h_5_cad.images.push(img);
		h_5_cad.Canvas.getCommand().convertCommand("Img");
	}
}
