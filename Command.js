// icad-command

Command=function()
{
	this.startCommand=function(){};	
	this.Command = function(){};
	this.isCommandEnd = function(){};
	this.endCommand=function(){};
	this.commandOnclick=function(){};
	this.commandName = "command";
	this.commandClearBegin = true;
	this.commandClearEnd = true;
	
	
	this.Line = new Line();
	this.Arc = new Arc();
	this.Rect= new Rect();
	this.Circle = new Circle();
	this.Ellipse = new Ellipse();
	this.Hline = new Hline();
	//this.PointSelect = new PointSelect();
	this.Zoom = new Zoom();
	this.Pan = new Pan();
	this.Mirror = new Mirror();
	this.Area = new Area();
	this.Erase = new Erase();
	this.Dist = new Dist();
	this.Dim = new Dim();
	this.RDim = new RDim();
	this.Text = new Text();
	this.Img = new Img();
	
	var fristPoint;
	var secondPoint;
	
	this.convertCommand=function(cmdName,startCommand,Command,isCommandEnd,endCommand,commandOnclick)
	{
		this.startCommand= startCommand;
		this.Command= Command;
		this.isCommandEnd= isCommandEnd;
		this.endCommand= endCommand;
		this.commandName = cmdName;
		this.commandOnclick=commandOnclick;
	};
	
	this.convertCommand=function(id)
	{
		switch(id){
			case "Line":
				h_5_cad.Canvas.getCommand().Line.convertLineCommand();
				break;
			case "Arc":
				h_5_cad.Canvas.getCommand().Arc.convertArcCommand();
				break;
			case "Rect":
				h_5_cad.Canvas.getCommand().Rect.convertRectCommand();
				break;
			case "Circle":
				h_5_cad.Canvas.getCommand().Circle.convertCircleCommand();
				break;
			case "Ellipse":
				h_5_cad.Canvas.getCommand().Ellipse.convertEllipseCommand();
				break;
			case "Hline":
				h_5_cad.Canvas.getCommand().Hline.convertHlineCommand();
				break;
			case "Zoom":
				h_5_cad.Canvas.getCommand().Zoom.convertZoomCommand();
				break;
			case "Pan":
				h_5_cad.Canvas.getCommand().Pan.convertPanCommand();
				break;
			case "Mirror":
				h_5_cad.Canvas.getCommand().Mirror.convertMirrorCommand();
				break;
			case "Area":
				h_5_cad.Canvas.getCommand().Area.convertAreaCommand();
				break;
			case "Dist":
				h_5_cad.Canvas.getCommand().Dist.convertDistCommand();
				break;
			case "Dim":
				h_5_cad.Canvas.getCommand().Dim.convertDimCommand();
				break;
			case "RDim":
				h_5_cad.Canvas.getCommand().RDim.convertRDimCommand();
				break;
			case "Erase":
				h_5_cad.Canvas.getCommand().Erase.convertEraseCommand();
				break;
			case "Text":
				h_5_cad.Canvas.getCommand().Text.convertTextCommand();
				break;
			case "Img":
				h_5_cad.Canvas.getCommand().Img.convertImgCommand();
				break;
			default:
				h_5_cad.Canvas.getCommand().convertselectCommand();
				break;
		}
	};
	
	var bEnd = false;
	this.selectCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			fristPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			PointSelect(fristPoint);
			bEnd = h_5_cad.SelectSet.getlength() !== 0;
		}
		else if(getCurPoint.nCount == 2)
		{
			secondPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd = true;
		}
	};
	
	this.convertselectCommand=function()
	{
		this.startCommand= this.selectstartCommand;
		this.Command= this.selectCommand;
		this.isCommandEnd= this.selectisCommandEnd;
		this.endCommand= this.selectendCommand;
		this.commandOnclick=this.selectCommandOnclick;
		this.commandName = "selectcommand";
		this.commandClearBegin = true;
		this.commandClearEnd = true;
	};
	
	this.selectstartCommand=function()
	{

	};
	
	this.selectCommand = function()
	{
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var canvas = h_5_cad.Canvas.getCurCanvasContext();
		var curRect={"X":0,"Y":0,"W":0,"H":0};
		var width = getCurMovePoint.X-fristPoint.X;
		var height = getCurMovePoint.Y-fristPoint.Y;
		curRect.W=Math.abs(width);
		curRect.H=Math.abs(height);
		var bBoxSelect=false;
		if(width<0)
		{
			bBoxSelect=true;
			curRect.X = getCurMovePoint.X;
		}
		else
		{
			curRect.X = fristPoint.X;
		}   
		if(height<0)
		{
			curRect.Y = getCurMovePoint.Y;
		}
		else
		{
			curRect.Y = fristPoint.Y;
		}
			
		if (curRect.W != 0 && curRect.H != 0)
		{		
			canvas.globalCompositeOperation = "source-over";
			canvas.beginPath();
			
			canvas.lineJoin="round";
			canvas.lineCap="round";
			canvas.miterLimit=5;
			
			if(bBoxSelect)
			{
				canvas.strokeStyle="green";
				canvas.lineWidth="1";
				canvas.fillStyle="green";
				for(var i=0;i<curRect.W;i=i+4)
				{
					canvas.moveTo(curRect.X+i,curRect.Y);
					canvas.lineTo(curRect.X+i+2,curRect.Y);
				}
				
				for(var i=0;i<curRect.H;i=i+4)
				{
					canvas.moveTo(curRect.X+curRect.W,curRect.Y+i);
					canvas.lineTo(curRect.X+curRect.W,curRect.Y+i+2);
				}
				
				for(var i=0;i<curRect.W;i=i+4)
				{
					canvas.moveTo(curRect.X+i,curRect.Y+curRect.H);
					canvas.lineTo(curRect.X+i+2,curRect.Y+curRect.H);
				}
				
				for(var i=0;i<curRect.H;i=i+4)
				{
					canvas.moveTo(curRect.X,curRect.Y+i);
					canvas.lineTo(curRect.X,curRect.Y+i+2);
				}
				canvas.stroke();
			}
			else
			{
				canvas.strokeStyle="blue";
				canvas.lineWidth="1";
				canvas.fillStyle="blue";
				canvas.rect(curRect.X,curRect.Y,curRect.W,curRect.H);
				canvas.stroke();
			}
			
			
			canvas.globalAlpha=0.2;
			canvas.fillRect(curRect.X,curRect.Y,curRect.W,curRect.H);
			canvas.globalAlpha=1;
		}
	};
	
	this.selectisCommandEnd=function(){
		return bEnd;
	};
	
	this.selectendCommand=function(){
		h_5_cad.SelectSet.selectDraw();
	};
}

Line = function()
{
	var startPoint = {"X":0,"Y":0};
	var endPoint = {"X":0,"Y":0};
	var bEnd = false;
	this.convertLineCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.linestartCommand;
		cmd.Command= this.lineCommand;
		cmd.isCommandEnd= this.lineisCommandEnd;
		cmd.endCommand= this.lineendCommand;
		cmd.commandName = "linecommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
		cmd.commandOnclick=this.lineCommandOnclick;
	};
	
	this.linestartCommand=function(){
	    var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
	    startPoint.X = getCurPoint.X;
	    startPoint.Y = getCurPoint.Y;
	};
	
	this.lineCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			endPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd = true;
		}
	};
	
	this.lineCommand = function(){
	  var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
	  
	  var pt1 = UCS2WCS(startPoint);
	  var pt2 = UCS2WCS(getCurMovePoint);
	  
	  var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
						"P":[{"X":pt1.X,"Y":pt1.Y}],"WR":5,"LR":3};
	  FeedPointDraw(o);
	  
	  var o ={"N":"L","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y}]};
	  FeedLineDraw(o);
	};
	
	this.lineisCommandEnd = function(){
		return bEnd;
	};
	
	this.lineendCommand=function(){
		if(bEnd){
			var pt1 = UCS2WCS(startPoint);
			var pt2 = UCS2WCS(endPoint);
			var o ={"N":"L","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y}]};
			Push2Db(o);
		}
		
		bEnd = false;
	};
}

Arc = function()
{
	var startPoint={"X":0,"Y":0};
	var midPoint={"X":0,"Y":0};
	var endPoint={"X":0,"Y":0};
	
	var ceater={"X":0,"Y":0};
	var r=0;
	var sAng=0;
	var eAng=0;
	var counterclockwise=0;
	var bEnd = false;
	this.convertArcCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.arcstartCommand;
		cmd.Command= this.arcCommand;
		cmd.isCommandEnd= this.arcisCommandEnd;
		cmd.endCommand= this.arcendCommand;
		cmd.commandOnclick=this.arcCommandOnclick;
		cmd.commandName = "arccommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.arcCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			midPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 3)
		{
			endPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd=true;
		}
	};
	
	this.arcstartCommand=function(){
	};
	
	this.arcCommand = function(){
	  var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
	  if(getCurPoint.nCount == 1)
	  {		
	  	  var cmd = h_5_cad.Canvas.getCommand().Arc;
		  cmd.fristStage();
	  }
	  else if(getCurPoint.nCount == 2)
	  {
		  var cmd = h_5_cad.Canvas.getCommand().Arc;
		  cmd.secondStage();
	  }
	};
	
	this.fristStage = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var pt1 = UCS2WCS(startPoint);
	 	var pt2 = UCS2WCS(getCurMovePoint);
		
		var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				"P":[{"X":pt1.X,"Y":pt1.Y}],"WR":5,"LR":3};
	    FeedPointDraw(o);
	  
		var o ={"N":"L","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y}]};
	 	FeedLineDraw(o);
	};
	
	this.secondStage = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var pt1 = UCS2WCS(startPoint);
	 	var pt2 = UCS2WCS(midPoint);
		var pt3 = UCS2WCS(getCurMovePoint);
		arcCommand({"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y},{"X":pt3.X,"Y":pt3.Y});
		
		var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				"P":[{"X":pt1.X,"Y":pt1.Y}],"WR":5,"LR":3};
	    FeedPointDraw(o);
		
		var o ={"N":"A","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		    "P":[{"X":ceater.X,"Y":ceater.Y}],"R":r,"S":sAng,"E":eAng,"W":counterclockwise};
	 	FeedArcDraw(o);
	};
	
	function arcCommand(sPoint,mPoint,ePoint){
		var tempA1,tempA2,tempB1,tempB2,tempC1,tempC2,temp,x,y;

		tempA1=sPoint.X-mPoint.X; 
		tempB1=sPoint.Y-mPoint.Y;
		tempC1=(Math.pow(sPoint.X,2)-Math.pow(mPoint.X,2)+Math.pow(sPoint.Y,2)-Math.pow(mPoint.Y,2))/2;
		
		tempA2=ePoint.X-mPoint.X;
		tempB2=ePoint.Y-mPoint.Y;
		tempC2=(Math.pow(ePoint.X,2)-Math.pow(mPoint.X,2)+Math.pow(ePoint.Y,2)-Math.pow(mPoint.Y,2))/2;
				 
		temp=tempA1*tempB2-tempA2*tempB1;
		if(temp==0){
			ceater.X=sPoint.X;
			ceater.Y=sPoint.Y;
		}else{
			ceater.X=(tempC1*tempB2-tempC2*tempB1)/temp;
			ceater.Y=(tempA1*tempC2-tempA2*tempC1)/temp;
		}
		r = Math.sqrt(Math.pow(sPoint.X-ceater.X,2)+Math.pow(sPoint.Y-ceater.Y,2));

		sAng = getAng(ceater,sPoint);
		midAng = getAng(ceater,mPoint);
		eAng = getAng(ceater,ePoint);
		
		counterclockwise = true;
		if(midAng>sAng&&eAng>sAng&&eAng>midAng)
		{
			counterclockwise = false;
		}
		else if(midAng>sAng&&sAng>eAng)
		{
			counterclockwise = false;
		}
		else if(sAng>midAng&&sAng>eAng&&eAng>midAng)
		{
			counterclockwise = false;
		}
		
		
	};
	
	this.arcisCommandEnd = function(){
		return bEnd;
	};
	
	this.arcendCommand=function(){
		if(bEnd){
			var pt1 = UCS2WCS(startPoint);
			var pt2 = UCS2WCS(midPoint);
			var pt3 = UCS2WCS(endPoint);
			arcCommand({"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y},{"X":pt3.X,"Y":pt3.Y});
			
			var o ={"N":"A","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		    "P":[{"X":ceater.X,"Y":ceater.Y}],"R":r,"S":sAng,"E":eAng,"W":counterclockwise};
			Push2Db(o);
		}
		bEnd = false;
	};
}

Rect = function()
{
	var startPoint = {"X":0,"Y":0};
	var endPoint = {"X":0,"Y":0};
	var bEnd = false;
	this.convertRectCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.RectstartCommand;
		cmd.Command= this.RectCommand;
		cmd.isCommandEnd= this.RectisCommandEnd;
		cmd.endCommand= this.RectendCommand;
		cmd.commandOnclick=this.rectCommandOnclick;
		cmd.commandName = "rectcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.rectCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			endPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd = true;
		}
	};
	
	this.RectstartCommand=function(){
	};
	
	this.RectCommand = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var curRect={"X":0,"Y":0,"W":0,"H":0};
		var width = getCurMovePoint.X-startPoint.X;
		var height = getCurMovePoint.Y-startPoint.Y;
		curRect.W=Math.abs(width);
		curRect.H=Math.abs(height);
		if(width<0)
		{
			curRect.X = getCurMovePoint.X;
		}
		else
		{
			curRect.X = startPoint.X;
		}   
		if(height<0)
		{
			curRect.Y = getCurMovePoint.Y;
		}
		else
		{
			curRect.Y = startPoint.Y;
		}
			
		if (curRect.W != 0 && curRect.H != 0)
		{	
			var Points=[];
			Points.push({"X":curRect.X,"Y":curRect.Y});
			Points.push({"X":curRect.X+curRect.W,"Y":curRect.Y});
			Points.push({"X":curRect.X+curRect.W,"Y":curRect.Y+curRect.H});
			Points.push({"X":curRect.X,"Y":curRect.Y+curRect.H});
			Points.push({"X":curRect.X,"Y":curRect.Y});
			
			for(i in Points)
				Points[i] = UCS2WCS(Points[i]);
			
			var pt = UCS2WCS(startPoint);
			var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				    "P":[{"X":pt.X,"Y":pt.Y}],"WR":5,"LR":3};
	        FeedPointDraw(o);
				
			var o ={"N":"P","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points};
	 		FeedPLineDraw(o);
		}
	};
	
	this.RectisCommandEnd = function(){
		return bEnd;
	};
	
	this.RectendCommand=function(){
		if(bEnd){
			var Points=[];
			var pt1 = UCS2WCS(startPoint);
			var pt2 = UCS2WCS(endPoint);
			Points.push({"X":pt1.X,"Y":pt1.Y});
			Points.push({"X":pt1.X,"Y":pt2.Y});
			Points.push({"X":pt2.X,"Y":pt2.Y});
			Points.push({"X":pt2.X,"Y":pt1.Y});
			Points.push({"X":pt1.X,"Y":pt1.Y});
			var o ={"N":"P","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points};
			Push2Db(o);
		}
		bEnd = false;
	};
}

Circle = function()
{
	var ceater={"X":0,"Y":0};
	var r=0;
	var bEnd = false;
	this.convertCircleCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.CirclestartCommand;
		cmd.Command= this.CircleCommand;
		cmd.isCommandEnd= this.CircleisCommandEnd;
		cmd.endCommand= this.CircleendCommand;
		cmd.commandOnclick=this.circleCommandOnclick;
		cmd.commandName = "circlecommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.circleCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			ceater={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			r = Math.sqrt(Math.pow(ceater.X-getCurPoint.X,2)+Math.pow(ceater.Y-getCurPoint.Y,2));
			bEnd = true;
		}
	};
	
	this.CirclestartCommand=function(){
	};
	
	this.CircleCommand = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		
		var pt1 = UCS2WCS(ceater);
		var pt2 = UCS2WCS(getCurMovePoint);
		
		var rr = Math.sqrt(Math.pow(pt1.X-pt2.X,2)+Math.pow(pt1.Y-pt2.Y,2));
		
		var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				    "P":[{"X":pt1.X,"Y":pt1.Y}],"WR":5,"LR":3};
	    FeedPointDraw(o);
		
		var o ={"N":"C","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":pt1.X,"Y":pt1.Y}],"R":rr};
	 	FeedCircleDraw(o);
	};
	
	this.CircleisCommandEnd = function(){
		return bEnd;
	};
	
	this.CircleendCommand=function(){
		if(bEnd){
			var pt = UCS2WCS(ceater);
			var mat=h_5_cad.DataBase.MAT[0];
			var o ={"N":"C","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":pt.X,"Y":pt.Y}],"R":r/mat.X};
			Push2Db(o);	
		}
		
		bEnd = false;
	};
}

Ellipse = function()
{
	var startPoint={"X":0,"Y":0};
	var midPoint={"X":0,"Y":0};
	var endPoint={"X":0,"Y":0};
	
	var a=0;
	var b=0;
	var startAng =0;
	var bEnd = false;
	this.convertEllipseCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.EllipsestartCommand;
		cmd.Command= this.EllipseCommand;
		cmd.isCommandEnd= this.EllipseisCommandEnd;
		cmd.endCommand= this.EllipseendCommand;
		cmd.commandOnclick=this.EllipseCommandOnclick;
		cmd.commandName = "ellipsecommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.EllipseCommandOnclick=function(){
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			midPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			a = Math.sqrt(Math.pow(midPoint.X-startPoint.X,2)+Math.pow(midPoint.Y-startPoint.Y,2));
			startAng = getAng(startPoint,midPoint);
		}
		else if(getCurPoint.nCount == 3)
		{
			endPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			b = Math.sqrt(Math.pow(endPoint.X-startPoint.X,2)+Math.pow(endPoint.Y-startPoint.Y,2));
			bEnd = true;
		}
		
	};
	
	this.EllipsestartCommand=function(){
	};
	
	this.EllipseCommand = function(){
	    var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			fristStage();
		}
		else if(getCurPoint.nCount == 2)
		{
			secondStage();
		}
	};
	
	fristStage = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var pt1 = UCS2WCS(startPoint);
		var pt2 = UCS2WCS(getCurMovePoint);
		
		var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				    "P":[{"X":pt1.X,"Y":pt1.Y}],"WR":5,"LR":3};
	    FeedPointDraw(o);
		
	   	var o ={"N":"L","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y}]};
	  	FeedLineDraw(o);
	};
	
	secondStage = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var pt1 = UCS2WCS(startPoint);
		var pt2 = UCS2WCS(getCurMovePoint);
		var bb = Math.sqrt(Math.pow(pt2.X-pt1.X,2)+Math.pow(pt2.Y-pt1.Y,2));
		var aa = a/h_5_cad.DataBase.MAT[0].X;
		var o ={"N":"E","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt1.X,"Y":pt1.Y}],"AR":aa,"BR":bb,"S":startAng};
	  	FeedEllipseDraw(o);
		
		var o ={"N":"L","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt1.X,"Y":pt1.Y},{"X":pt2.X,"Y":pt2.Y}]};
	  	FeedLineDraw(o);
		
		var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				    "P":[{"X":pt1.X,"Y":pt1.Y}],"WR":5,"LR":3};
	    FeedPointDraw(o);
	};

	
	this.EllipseisCommandEnd = function(){
		return bEnd;
	};
	
	this.EllipseendCommand=function(){
		if(bEnd){
			var pt = UCS2WCS(startPoint);
			var mat=h_5_cad.DataBase.MAT[0];
			var aR = a/mat.X;
			var bR = b/mat.Y;
		
			var o ={"N":"E","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
	  		  "P":[{"X":pt.X,"Y":pt.Y}],"AR":aR,"BR":bR,"S":startAng};
	  		Push2Db(o);	
		}
		bEnd = false;
	};
}

Hline = function()
{
	var Points=[];
	var bEnd = false;
	this.convertHlineCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.HlinestartCommand;
		cmd.Command= this.HlineCommand;
		cmd.isCommandEnd= this.HlineisCommandEnd;
		cmd.endCommand= this.HlineendCommand;
		cmd.commandOnclick=this.HlineCommandOnclick;
		cmd.commandName = "hlinecommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.HlineCommandOnclick=function(){
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		var pt =UCS2WCS(getCurPoint);
		Points.push({"X":pt.X,"Y":pt.Y});
		if(getCurPoint.nCount == 2)
			bEnd = true;
	};
	
	this.HlinestartCommand=function(){
	};
	
	this.HlineCommand = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint();
		var pt =UCS2WCS(getCurMovePoint); 
		Points.push({"X":pt.X,"Y":pt.Y});
		
		var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				    "P":[{"X":Points[0].X,"Y":Points[0].Y}],"WR":5,"LR":3};
	    FeedPointDraw(o);
		
		var o ={"N":"H","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points};
	 	FeedHLineDraw(o);
	};
	
	this.HlineisCommandEnd = function(){
		return bEnd;
	};
	
	this.HlineendCommand=function(){
		if(bEnd){
			var o ={"N":"H","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points};
			Push2Db(o);	
		}
		Points=[];
		bEnd = false;
	};
}

PointSelect = function()
{
	this.convertPointSelectCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.PointSelectstartCommand;
		cmd.Command= this.PointSelectCommand;
		cmd.isCommandEnd= this.PointSelectisCommandEnd;
		cmd.endCommand= this.PointSelectendCommand;
		cmd.commandName = "ptselectcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = false;
	};
	
	this.PointSelectstartCommand=function(){
		
	};
	
	this.PointSelectCommand = function(){
	};
	
	this.PointSelectisCommandEnd = function(){
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			h_5_cad.SelectSet.selectDraw();
			return true;
		}
		else 
		{
			return false;
		}
	};
	
	this.PointSelectendCommand=function(){
		h_5_cad.SelectSet.clear();
	};
}

Zoom = function()
{
	var bScale = true;
	var v=1;
	var x = 0;
	var y = 0; 
	this.convertZoomCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.ZoomstartCommand;
		cmd.Command= this.ZoomCommand;
		cmd.isCommandEnd= this.ZoomisCommandEnd;
		cmd.endCommand= this.ZoomendCommand;
		cmd.commandName = "zoomcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = false;
	};
	
	this.ZoomstartCommand=function(){
		
	};
	
	this.ZoomCommand = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint();
		var scale = bScale?1.2:1/1.2;
		var mat=h_5_cad.DataBase.MAT[0];
		var gx= (getCurMovePoint.X-mat.X3);
		var gy= (getCurMovePoint.Y-mat.Y3);
		mat.X3 += gx*(1-scale);
		mat.Y3 += gy*(1-scale);
		mat.X *= scale;
		mat.Y *= scale;
		h_5_cad.DataBase.MAT[0]=mat;
		
		worldDraw();
	};
	
	this.setScaleMode=function(b)
	{
		bScale = b;
	}
	
	this.ZoomisCommandEnd = function(){
	};
	
	this.ZoomendCommand=function(){
	};
}

Mirror = function()
{
	var end = false;
	this.convertMirrorCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.MirrorstartCommand;
		cmd.Command= this.MirrorCommand;
		cmd.commandOnclick=this.MirrorCommandOnclick;
		cmd.isCommandEnd= this.MirrorisCommandEnd;
		cmd.endCommand= this.MirrorendCommand;
		cmd.commandName = "mirrorcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = false;
	};
	
	this.MirrorCommandOnclick=function(){
		hCad("#canvas").css({"cursor":"url(cursor_black.cur) 32 32, crosshair"});
		end=true;
		h_5_cad.MouseTip.CloseMessage();
	};
	
	this.MirrorstartCommand=function(){
		
	};
	
	this.MirrorCommand = function(){
		
	};
	
	this.MirrorisCommandEnd = function(){
		return end;
	};
	
	this.MirrorendCommand=function(){
	};
}

Pan = function()
{
	var lastPoint={"X":0,"Y":0};
	this.convertPanCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.PanstartCommand;
		cmd.Command= this.PanCommand;
		cmd.isCommandEnd= this.PanisCommandEnd;
		cmd.endCommand= this.PanendCommand;
		cmd.commandOnclick=this.PanCommandOnclick;
		cmd.commandName = "pancommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = false;
	};
	
	this.PanCommandOnclick=function(){
		lastPoint = h_5_cad.Canvas.getCurClickPoint();
	};
	
	this.PanstartCommand=function(){
		
	};
	
	this.PanCommand = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint();
		
		var mat=h_5_cad.DataBase.MAT[0];
		mat.X3 += getCurMovePoint.X-lastPoint.X;
		mat.Y3 += getCurMovePoint.Y-lastPoint.Y;
		h_5_cad.DataBase.MAT[0]=mat;
		
		lastPoint.X = getCurMovePoint.X;
		lastPoint.Y = getCurMovePoint.Y;
		
		worldDraw();
	};
	
	this.PanisCommandEnd = function(){
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 2){
			return true;
		}
		else {
			return false;
		}
	};
	
	this.PanendCommand=function(){
	};
}

Area = function()
{
	var Points=[];	
	var bEnd = false;
	this.convertAreaCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.AreastartCommand;
		cmd.Command= this.AreaCommand;
		cmd.isCommandEnd= this.AreaisCommandEnd;
		cmd.endCommand= this.AreaendCommand;
		cmd.commandOnclick=this.AreaCommandOnclick;
		cmd.commandName = "areacommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.AreaCommandOnclick=function(){
		if (!bEnd){
			var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
			var pt = UCS2WCS(getCurPoint);
			Points.push(pt);
		}
	};
	
	this.AreastartCommand=function(){
	};
	
	this.AreaCommand = function(){
		if (bEnd) {
			var toolFunc = new ToolFunc;
			var sValue = fmoney(toolFunc.areapolygen(Points),4);
			h_5_cad.MouseTip.setMessageTip(sValue);
			h_5_cad.MouseTip.ShowMessage();
			
			var o ={"N":"POLYGON","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points};
			FeedPolygonDraw(o);
		}
		else
	    {
			var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
			if(Points.length == 1){
				var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
						"P":[{"X":Points[0].X,"Y":Points[0].Y}],"WR":5,"LR":3};
				FeedPointDraw(o);
				
				var pt2 = UCS2WCS(getCurMovePoint);
				var o ={"N":"L","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
						"P":[{"X":Points[0].X,"Y":Points[0].Y},{"X":pt2.X,"Y":pt2.Y}]};
	  			FeedLineDraw(o);
			}
			else if (Points.length >= 2){
				var pt = UCS2WCS(getCurMovePoint);
				Points.push(pt);
				var o ={"N":"POLYGON","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points};
				FeedPolygonDraw(o);
				Points.splice(Points.length-1,1);
			}
		}
	};
	
	this.AreaisCommandEnd = function(){
		var eKeyWord = h_5_cad.Canvas.getKeyDownWord();
		if(eKeyWord.keyCode == 13 && bEnd)
			return true;
		else if(eKeyWord.keyCode == 13 && !bEnd){
			bEnd = true;
			h_5_cad.Canvas.keyDown(0);
		}
		
		return false;
	};
	
	this.AreaendCommand=function(){
		Points=[];
		bEnd = false;
	};
}

Erase = function()
{
	var bEnd = false;
	this.convertEraseCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.ErasestartCommand;
		cmd.Command= this.EraseCommand;
		cmd.isCommandEnd= this.EraseisCommandEnd;
		cmd.endCommand= this.EraseendCommand;
		cmd.commandOnclick=this.EraseCommandOnclick;
		cmd.commandName = "erasecommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.EraseCommandOnclick=function(){
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		var pt={"X":getCurPoint.X,"Y":getCurPoint.Y};
		PointSelect(pt);
			
		var objects = h_5_cad.SelectSet.getObject(); 
		for(i in objects){
			h_5_cad.Do.saveDo(2,objects[i]);
			objects[i].ERASE = true;
			worldDraw();
			bEnd= true;
			return;
		}
	};
	
	this.ErasestartCommand=function(){
	};
	
	this.EraseCommand = function(){
	};
	
	this.EraseisCommandEnd = function(){
		return bEnd;
	};
	
	this.EraseendCommand=function(){
		bEnd = false;
	};
}

Dist = function()
{
	var startPoint = {"X":0,"Y":0};
	var endPoint = {"X":0,"Y":0};
	this.convertDistCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.DiststartCommand;
		cmd.Command= this.DistCommand;
		cmd.isCommandEnd= this.DistisCommandEnd;
		cmd.endCommand= this.DistendCommand;
		cmd.commandName = "Distcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
		cmd.commandOnclick=this.DistCommandOnclick;
	};
	
	this.DiststartCommand=function(){
	};
	
	this.DistCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint=UCS2WCS({"X":getCurPoint.X,"Y":getCurPoint.Y});
		}
		else if(getCurPoint.nCount == 2)
		{
			endPoint=UCS2WCS({"X":getCurPoint.X,"Y":getCurPoint.Y});
		}
	};
	
	this.DistCommand = function(){
	  var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
	  if(getCurPoint.nCount < 2){
		 var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		 
		 var pt2 = UCS2WCS(getCurMovePoint);
		 
		 var o = {"N":"Dist","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":startPoint.X,"Y":startPoint.Y},
		 		 {"X":pt2.X,"Y":pt2.Y}]};
	 	 FeedDistDraw(o);
	  }else if(getCurPoint.nCount >= 2){
		  var o = {"N":"Dist","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":startPoint.X,"Y":startPoint.Y},
		 		 {"X":endPoint.X,"Y":endPoint.Y}]};
				 
	 	 FeedDistDraw(o);
	  }
	};
	
	this.DistisCommandEnd = function(){
		var eKeyWord = h_5_cad.Canvas.getKeyDownWord();
		if(eKeyWord.keyCode == 13)
			return true;
		
		return false;
	};
	
	this.DistendCommand=function(){
	};
}

Dim = function()
{
	var startPoint = {"X":0,"Y":0};
	var endPoint = {"X":0,"Y":0};
	var thirdPoint = {"X":0,"Y":0};
	var bEnd = false;
	this.convertDimCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.DimstartCommand;
		cmd.Command= this.DimCommand;
		cmd.isCommandEnd= this.DimisCommandEnd;
		cmd.endCommand= this.DimendCommand;
		cmd.commandName = "Dimcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
		cmd.commandOnclick=this.DimCommandOnclick;
	};
	
	this.DimstartCommand=function(){
	  var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
	  startPoint.X = getCurPoint.X;
	  startPoint.Y = getCurPoint.Y;
	};
	
	this.DimCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			endPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 3)
		{
			thirdPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd = true;
		}
	};
	
	this.DimCommand = function(){
	  var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
	  if(getCurPoint.nCount < 2){
		 var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		 var pt1 = UCS2WCS(startPoint);
		 var pt2 = UCS2WCS(getCurMovePoint);
	 	 var o = {"N":"Dist","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":pt1.X,"Y":pt1.Y},
		 		 {"X":pt2.X,"Y":pt2.Y}]};
	 	 FeedDistDraw(o);
	  }else if(getCurPoint.nCount == 2){
		 var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		 var pt1 = UCS2WCS(startPoint);
		 var pt2 = UCS2WCS(endPoint);
		 var pt3 = UCS2WCS(getCurMovePoint);
		 var o = {"N":"D","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":pt1.X,"Y":pt1.Y},
		 		 {"X":pt2.X,"Y":pt2.Y},{"X":pt3.X,"Y":pt3.Y}]};
	 	 FeedDimDraw(o);
	  }
	};
	
	this.DimisCommandEnd = function(){
		var eKeyWord = h_5_cad.Canvas.getKeyDownWord();
		if(eKeyWord.keyCode == 13)
			return true;
		
		return bEnd;
	};
	
	this.DimendCommand=function(){
		if(bEnd){
			var pt1 = UCS2WCS(startPoint);
			var pt2 = UCS2WCS(endPoint);
			var pt3 = UCS2WCS(thirdPoint);
			var o = {"N":"D","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":[{"X":pt1.X,"Y":pt1.Y},
		 		    {"X":pt2.X,"Y":pt2.Y},{"X":pt3.X,"Y":pt3.Y}]};
			Push2Db(o);
		}
		
		bEnd = false;
	};
}

RDim = function()
{
	var startPoint = {"X":0,"Y":0};
	var bSelect = true;
	var circle = 0;
	var bEnd=false;
	this.convertRDimCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.RDimstartCommand;
		cmd.Command= this.RDimCommand;
		cmd.isCommandEnd= this.RDimisCommandEnd;
		cmd.endCommand= this.RDimendCommand;
		cmd.commandName = "RDimcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
		cmd.commandOnclick=this.RDimCommandOnclick;
	};
	
	this.RDimstartCommand=function(){
	};
	
	this.RDimCommandOnclick=function()
	{
		if(bSelect){
			var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
			var pt={"X":getCurPoint.X,"Y":getCurPoint.Y};
			PointSelect(pt);
			
			var objects = h_5_cad.SelectSet.getObject(); 
			for(i in objects){
				var o = objects[i];
				if(o.N === "C" || o.N === "A"){
					bSelect = false;
					h_5_cad.MouseTip.CloseMessage();
					hCad("#canvas").css({"cursor":"url(cursor_black.cur) 32 32, crosshair"});
					circle = o;
					return;
				}
			}
		}
		else {
			var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd = true;
		}
	};
	
	this.RDimCommand = function(){
		if(!bSelect){
			var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint();
			var pt = UCS2WCS(getCurMovePoint);
			var o = {"N":"R","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
					 "P":[{"X":circle.P[0].X,"Y":circle.P[0].Y},{"X":pt.X,"Y":pt.Y}],
					 "R":circle.R};
			FeedRDimDraw(o);
		}
	};
	
	this.RDimisCommandEnd = function(){
		var eKeyWord = h_5_cad.Canvas.getKeyDownWord();
		if(eKeyWord.keyCode == 13)
			return true;
		
		return bEnd;
	};
	
	this.RDimendCommand=function(){
		
		if(bEnd){
			var pt = UCS2WCS(startPoint);
			var o = {"N":"R","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
					 "P":[{"X":circle.P[0].X,"Y":circle.P[0].Y},{"X":pt.X,"Y":pt.Y}],
					 "R":circle.R};
			Push2Db(o);
		}
		
		bSelect = true;
		bEnd = false;
		startPoint = {"X":0,"Y":0};
		circle = 0;
	};
}

Text = function()
{
	var startPoint = {"X":0,"Y":0};
	var bEnd = false;
	this.convertTextCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.TextstartCommand;
		cmd.Command= this.TextCommand;
		cmd.isCommandEnd= this.TextisCommandEnd;
		cmd.endCommand= this.TextendCommand;
		cmd.commandName = "Textcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
		cmd.commandOnclick=this.TextCommandOnclick;
	};
	
	this.TextstartCommand=function(){
		
	};
	
	this.TextCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1){
			startPoint = {"X":getCurPoint.X,"Y":getCurPoint.Y};
			h_5_cad.MouseTip.FixedTextTip(startPoint);
		}
		else {
			bEnd = true;
		}
	};
	
	this.TextCommand = function(){
	};
	
	this.TextisCommandEnd = function(){
		var eKeyWord = h_5_cad.Canvas.getKeyDownWord();
		if(eKeyWord.keyCode == 13)
			return true;
		
		return bEnd;
	};
	
	this.TextendCommand=function(){
		
		if(bEnd){
			var pt = UCS2WCS(startPoint);
			var o = {"N":"T",
			         "C":h_5_cad.DataBase.C,
					 "L":h_5_cad.DataBase.L,
					 "P":[{"X":pt.X,"Y":pt.Y}],
					 "T":h_5_cad.MouseTip.GetTextTipValue()};
			Push2Db(o);
		}
		
		h_5_cad.MouseTip.CloseTextTip();
		bEnd = false;
	};
}

Img = function()
{
	var startPoint = {"X":0,"Y":0};
	var endPoint = {"X":0,"Y":0};
	var bEnd = false;
	this.convertImgCommand=function()
	{
		var cmd=h_5_cad.Canvas.getCommand();
		cmd.startCommand= this.ImgstartCommand;
		cmd.Command= this.ImgCommand;
		cmd.isCommandEnd= this.ImgisCommandEnd;
		cmd.endCommand= this.ImgendCommand;
		cmd.commandOnclick=this.imgCommandOnclick;
		cmd.commandName = "imgcommand";
		cmd.commandClearBegin = true;
		cmd.commandClearEnd = true;
	};
	
	this.imgCommandOnclick=function()
	{
		var getCurPoint = h_5_cad.Canvas.getCurClickPoint();
		if(getCurPoint.nCount == 1)
		{
			startPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
		}
		else if(getCurPoint.nCount == 2)
		{
			endPoint={"X":getCurPoint.X,"Y":getCurPoint.Y};
			bEnd = true;
		}
	};
	
	this.ImgstartCommand=function(){
	};
	
	this.ImgCommand = function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint(); 
		var width = Math.abs(getCurMovePoint.X-startPoint.X);
		var height = Math.abs(getCurMovePoint.Y-startPoint.Y);
			
		if (width != 0 && height != 0)
		{	
			var Points=[];
			Points.push({"X":startPoint.X,"Y":startPoint.Y});
			Points.push({"X":startPoint.X+width,"Y":startPoint.Y+height});
			
			for(i in Points)
				Points[i] = UCS2WCS(Points[i]);
			
			var pt = UCS2WCS(startPoint);
			var o ={"N":"POINT","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,
				    "P":[{"X":pt.X,"Y":pt.Y}],"WR":5,"LR":3};
			FeedPointDraw(o);

			var o ={"N":"IMG","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points,"IMG":h_5_cad.images[h_5_cad.images.length-1]};
			FeedImageDraw(o);
		}
	};
	
	this.ImgisCommandEnd = function(){
		return bEnd;
	};
	
	this.ImgendCommand=function(){
		if(bEnd){
			var Points=[];
			var pt1 = UCS2WCS(startPoint);
			var pt2 = UCS2WCS(endPoint);
			var w = Math.abs(pt2.X-pt1.X);
			var h  = Math.abs(pt2.Y-pt1.Y);

			Points.push({"X":pt1.X,"Y":pt1.Y});
			Points.push({"X":pt1.X+w,"Y":pt1.Y+h});
			var o ={"N":"IMG","C":h_5_cad.DataBase.C,"L":h_5_cad.DataBase.L,"P":Points,"IMG":h_5_cad.images[h_5_cad.images.length-1]};
			Push2Db(o);
		}
		bEnd = false;
	};
}