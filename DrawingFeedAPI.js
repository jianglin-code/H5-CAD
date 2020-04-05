// JavaScript Document

FeedImageDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";

	var img = o.IMG;
	var spt = WCS2UCS(o.P[0]);
	var ept = WCS2UCS(o.P[1]);
	var w = Math.abs(ept.X - spt.X);
    var h  = Math.abs(ept.Y - spt.Y);

	canvas.drawImage(img,spt.X,spt.Y,w,h);
}

FeedLineDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.beginPath();
	canvas.strokeStyle= o.C;
	canvas.lineWidth="1";
	  
	var spt = WCS2UCS(o.P[0]);
	var ept = WCS2UCS(o.P[1]);
	  
	canvas.moveTo(spt.X,spt.Y);
	canvas.lineTo(ept.X,ept.Y);
	canvas.stroke();
}

FeedHLineDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.beginPath();
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	  
	var pt = WCS2UCS(o.P[0]);
	canvas.moveTo(pt.X,pt.Y);
	for(var i=1;i<o.P.length-2;i=i+2)
	{
	   var pt1 = WCS2UCS(o.P[i]);
	   var pt2 = WCS2UCS(o.P[i+1]);
	   var pt3 = WCS2UCS(o.P[i+2]);
	   canvas.bezierCurveTo(pt1.X,pt1.Y,pt2.X,pt2.Y,pt3.X,pt3.Y);
	}
	var pt1 = WCS2UCS(o.P[o.P.length-1]);
	canvas.lineTo(pt1.X,pt1.Y);
	  
	canvas.stroke();
}

FeedPLineDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.beginPath();
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	var pt = WCS2UCS(o.P[0]);
	canvas.moveTo(pt.X,pt.Y);
	for(var i=1;i<o.P.length;i=i+1)
	{
	   var pt = WCS2UCS(o.P[i]);
	   canvas.lineTo(pt.X,pt.Y);
	}
	
	canvas.stroke();
}

FeedCircleDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.beginPath();
	
	var pt = WCS2UCS(o.P[0]);
	var mat=h_5_cad.DataBase.MAT[0];
	
	canvas.arc(pt.X,pt.Y,o.R*mat.X,0,2*Math.PI);
	canvas.stroke();
}

FeedArcDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.beginPath();
	
	var ptt = WCS2UCS(o.P[0]);
	var mat=h_5_cad.DataBase.MAT[0];
	var r = o.R*mat.X;
	canvas.arc(ptt.X,ptt.Y,r,o.S,o.E,o.W);
	canvas.stroke();
}

FeedEllipseDraw=function(o){
   var context = h_5_cad.Canvas.getCurCanvasContext();
   context.globalCompositeOperation = "source-over";
   context.save();
   
   var pt = WCS2UCS(o.P[0]);
   var mat=h_5_cad.DataBase.MAT[0];
   var a = o.AR*mat.X;
   var b = o.BR*mat.X;
   
   var r = (a > b) ? a : b; 
   var ratioX = a/r; 
   var ratioY = b/r; 
   context.translate(pt.X,pt.Y);
   context.rotate(o.S);
   context.scale(ratioX, ratioY);
   context.strokeStyle=o.C;
   context.lineWidth="1";
   context.beginPath();
   context.moveTo(a / ratioX, 0);
   context.arc(0, 0, r, 0, 2 * Math.PI);
   context.closePath();
   context.stroke();
   context.translate(0,0);
   context.restore();
}

FeedTextDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	var pt = WCS2UCS(o.P[0]);
	var mat=h_5_cad.DataBase.MAT[0];
	canvas.globalCompositeOperation = "source-over";		
	canvas.textBaseline="middle";
	canvas.font = 12*mat.X+"px 微软雅黑E\8F6F\96C5\9ED1";
	canvas.fillStyle = o.C;
	canvas.fillText(o.T,pt.X,pt.Y);
}

FeedDimDraw=function(o){
	var sPt = WCS2UCS(o.P[0]);
	var ePt = WCS2UCS(o.P[1]);
	var pt = WCS2UCS(o.P[2]);
	var mat=h_5_cad.DataBase.MAT[0];
	var ang = getAng(sPt,ePt);
	var reang = Math.PI + ang;
	var tri = 10*Math.PI/180;
	var rTri = 20*mat.X;
	var textSize = 6.1;
	
	var tempAng = getAng(sPt,pt);
	tempAng=ang-tempAng;
	var rDist = Math.sqrt(Math.pow(pt.X-sPt.X,2)+Math.pow(pt.Y-sPt.Y,2));
	rDist = Math.cos(tempAng)*rDist;
	var dPt = {"X":sPt.X+Math.cos(ang)*rDist,"Y":sPt.Y+Math.sin(ang)*rDist};
	var dang =  getAng(dPt,pt);
	var dist = Math.sqrt(Math.pow(pt.X-dPt.X,2)+Math.pow(pt.Y-dPt.Y,2));

	var sPoint = {"X":sPt.X+Math.cos(dang)*dist,"Y":sPt.Y+Math.sin(dang)*dist};
	var ePoint = {"X":ePt.X+Math.cos(dang)*dist,"Y":ePt.Y+Math.sin(dang)*dist};
	
	var s1 = {"X":sPoint.X+Math.cos(tri+ang)*rTri,"Y":sPoint.Y+Math.sin(tri+ang)*rTri};
	var s2 = {"X":sPoint.X+Math.cos(ang-tri)*rTri,"Y":sPoint.Y+Math.sin(ang-tri)*rTri};
	
	var e1 = {"X":ePoint.X+Math.cos(tri+reang)*rTri,"Y":ePoint.Y+Math.sin(tri+reang)*rTri};
	var e2 = {"X":ePoint.X+Math.cos(reang-tri)*rTri,"Y":ePoint.Y+Math.sin(reang-tri)*rTri};
	
	var mid = {"X":(sPoint.X+ePoint.X)/2 ,"Y":(sPoint.Y+ePoint.Y)/2};
	var r = Math.sqrt(Math.pow(ePoint.X-sPoint.X,2)+Math.pow(ePoint.Y-sPoint.Y,2));
	
	var pt = UCS2WCS(sPoint);
	var pt1 = UCS2WCS(ePoint);
	var rWcs = Math.sqrt(Math.pow(pt1.X-pt.X,2)+Math.pow(pt1.Y-pt.Y,2));
	var sValue = fmoney(rWcs,4);
	var textLen = textSize*sValue.length/2;
	var mids = {"X":mid.X+Math.cos(ang)*textLen,"Y":mid.Y+Math.sin(ang)*textLen};
	var midx = {"X":mid.X+Math.cos(reang)*textLen,"Y":mid.Y+Math.sin(reang)*textLen};
	
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	
	canvas.beginPath();
	canvas.moveTo(sPoint.X,sPoint.Y);
	canvas.lineTo(s1.X,s1.Y);
	canvas.lineTo(s2.X,s2.Y);
	canvas.fillStyle = o.C;
	canvas.fill();
	
	canvas.beginPath();
	canvas.moveTo(ePoint.X,ePoint.Y);
	canvas.lineTo(e1.X,e1.Y);
	canvas.lineTo(e2.X,e2.Y);
	canvas.fillStyle = o.C;
	canvas.fill();
	
	canvas.beginPath();
	canvas.moveTo(sPoint.X,sPoint.Y);
	canvas.lineTo(midx.X,midx.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();
	
	canvas.beginPath();
	canvas.moveTo(mids.X,mids.Y);
	canvas.lineTo(ePoint.X,ePoint.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();
	
	canvas.save();
	canvas.translate(midx.X,midx.Y);
	canvas.rotate(ang);
	canvas.textBaseline="middle";
	canvas.font = "12px 微软雅黑E\8F6F\96C5\9ED1";
	canvas.fillStyle = o.C;
	canvas.fillText(sValue,0,0);
	canvas.restore();	
	
	canvas.beginPath();
	canvas.moveTo(sPoint.X,sPoint.Y);
	canvas.lineTo(sPt.X,sPt.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();
	
	canvas.beginPath();
	canvas.moveTo(ePt.X,ePt.Y);
	canvas.lineTo(ePoint.X,ePoint.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();
}

FeedRDimDraw=function(o){
	var ceater = WCS2UCS(o.P[0]);
	var pt = WCS2UCS(o.P[1]);
	var mat=h_5_cad.DataBase.MAT[0];
	var radius = o.R*mat.X;
	var ang = getAng(ceater,pt);
	var tri = 10*Math.PI/180;
	var rTri = 20*mat.X;
	var textSize = 6.1;
	
	var pt1 = {"X":ceater.X+Math.cos(ang)*radius,"Y":ceater.Y+Math.sin(ang)*radius};
	
	var s1 = {"X":pt1.X+Math.cos(tri+ang)*rTri,"Y":pt1.Y+Math.sin(tri+ang)*rTri};
	var s2 = {"X":pt1.X+Math.cos(ang-tri)*rTri,"Y":pt1.Y+Math.sin(ang-tri)*rTri};
	
	var dist = (pt.X-ceater.X)<0?-rTri:rTri;
	var pt2 = {"X":pt.X+dist,"Y":pt.Y};
	
	var sValue = fmoney(radius/mat.X,4);
	
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";

	canvas.beginPath();
	canvas.moveTo(pt1.X,pt1.Y);
	canvas.lineTo(s1.X,s1.Y);
	canvas.lineTo(s2.X,s2.Y);
	canvas.fillStyle = o.C;
	canvas.fill();

	canvas.beginPath();
	canvas.moveTo(pt1.X,pt1.Y);
	canvas.lineTo(pt.X,pt.Y);
	canvas.lineTo(pt2.X,pt2.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();

	var textLen = textSize*sValue.length;
	pt2.X = dist<0?pt2.X-textLen:pt2.X;
	canvas.textBaseline="middle";
	canvas.font = "12px 微软雅黑E\8F6F\96C5\9ED1";
	canvas.fillStyle = o.C;
	canvas.fillText(sValue,pt2.X,pt2.Y);
}

FeedDistDraw=function(o){
	var sPoint = WCS2UCS(o.P[0]);
	var ePoint = WCS2UCS(o.P[1]);
	var mat=h_5_cad.DataBase.MAT[0];
	var ang = getAng(sPoint,ePoint);
	var reang = Math.PI + ang;
	var tri = 10*Math.PI/180;
	var rTri = 20*mat.X;
	var textSize = 6.1;
	
	var s1 = {"X":sPoint.X+Math.cos(tri+ang)*rTri,"Y":sPoint.Y+Math.sin(tri+ang)*rTri};
	var s2 = {"X":sPoint.X+Math.cos(ang-tri)*rTri,"Y":sPoint.Y+Math.sin(ang-tri)*rTri};
	
	var e1 = {"X":ePoint.X+Math.cos(tri+reang)*rTri,"Y":ePoint.Y+Math.sin(tri+reang)*rTri};
	var e2 = {"X":ePoint.X+Math.cos(reang-tri)*rTri,"Y":ePoint.Y+Math.sin(reang-tri)*rTri};
	
	var mid = {"X":(sPoint.X+ePoint.X)/2 ,"Y":(sPoint.Y+ePoint.Y)/2};
	var r = Math.sqrt(Math.pow(ePoint.X-sPoint.X,2)+Math.pow(ePoint.Y-sPoint.Y,2));
	
	var sValue = fmoney(r,4);
	var textLen = textSize*sValue.length/2;
	var mids = {"X":mid.X+Math.cos(ang)*textLen,"Y":mid.Y+Math.sin(ang)*textLen};
	var midx = {"X":mid.X+Math.cos(reang)*textLen,"Y":mid.Y+Math.sin(reang)*textLen};
	
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	
	canvas.beginPath();
	canvas.moveTo(sPoint.X,sPoint.Y);
	canvas.lineTo(s1.X,s1.Y);
	canvas.lineTo(s2.X,s2.Y);
	canvas.fillStyle = o.C;
	canvas.fill();
	
	canvas.beginPath();
	canvas.moveTo(ePoint.X,ePoint.Y);
	canvas.lineTo(e1.X,e1.Y);
	canvas.lineTo(e2.X,e2.Y);
	canvas.fillStyle = o.C;
	canvas.fill();
	
	canvas.beginPath();
	canvas.moveTo(sPoint.X,sPoint.Y);
	canvas.lineTo(midx.X,midx.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();
	
	canvas.beginPath();
	canvas.moveTo(mids.X,mids.Y);
	canvas.lineTo(ePoint.X,ePoint.Y);
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.stroke();

	canvas.save();
	canvas.translate(midx.X,midx.Y);
	canvas.rotate(ang);
	canvas.textBaseline="middle";
	canvas.font = "12px 微软雅黑E\8F6F\96C5\9ED1";
	canvas.fillStyle = o.C;
	canvas.fillText(sValue,0,0);
	canvas.restore();	
}

FeedPointDraw=function(o){
	var pt = WCS2UCS(o.P[0]);
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	canvas.beginPath();
	canvas.arc(pt.X,pt.Y,o.WR,0,2*Math.PI);
	canvas.stroke();

	canvas.beginPath();
	canvas.arc(pt.X,pt.Y,o.LR,0,2*Math.PI);
	canvas.fillStyle = o.C;
	canvas.fill();
}

FeedPolygonDraw=function(o){
	var canvas = h_5_cad.Canvas.getCurCanvasContext();
	canvas.globalCompositeOperation = "source-over";
	canvas.globalAlpha=0.2;
	canvas.beginPath();
	var pt = WCS2UCS(o.P[0]);
	canvas.moveTo(pt.X,pt.Y);
	for(var i=1;i<o.P.length;i++)
	{
		pt = WCS2UCS(o.P[i]);
		canvas.lineTo(pt.X,pt.Y);	
	}
	canvas.fillStyle = o.C;
	canvas.fill();
	canvas.globalAlpha=1;
	
	canvas.beginPath();
	canvas.strokeStyle=o.C;
	canvas.lineWidth="1";
	var pt = WCS2UCS(o.P[0]);
	canvas.moveTo(pt.X,pt.Y);
	for(var i=1;i<o.P.length;i=i+1)
	{
	   var pt = WCS2UCS(o.P[i]);
	   canvas.lineTo(pt.X,pt.Y);
	}
	pt = WCS2UCS(o.P[0]);
	canvas.lineTo(pt.X,pt.Y);
	canvas.stroke();
}

FeedODraw=function(o){
	switch(o.N){
		case "L":FeedLineDraw(o);   break;
		case "H":FeedHLineDraw(o);  break;
		case "P":FeedPLineDraw(o);  break;
		case "C":FeedCircleDraw(o); break;
		case "A":FeedArcDraw(o);    break;
		case "E":FeedEllipseDraw(o);break;
		case "T":FeedTextDraw(o);   break;
		case "D":FeedDimDraw(o);    break;
		case "R":FeedRDimDraw(o);   break;
		case "Dist":FeedDistDraw(o);break;
		case "POINT":FeedPointDraw(o);break;
		case "POLYGON":FeedPolygonDraw(o);break;
		case "IMG":FeedImageDraw(o);break;
		default:
			break;	
	}
}


PointSelectLine=function(o,pt){
	var toolFunc =new ToolFunc();
	var dist = toolFunc.Pnt2SegmentDist(o.P[0],o.P[1],pt);
	if(dist<10)
	{
		return true;
	}
	
	return false;
}

PointSelectPLine=function(o,pt){
	var toolFunc =new ToolFunc();
	for(var i=0;i<o.P.length-1;i++)
	{
	  var dist = toolFunc.Pnt2SegmentDist(o.P[i],o.P[i+1],pt);
	  if(dist<10)
	  {
		  return true;
	  }
	}
	
	return false;
}

PointSelectHLine=function(o,pt){
	var toolFunc =new ToolFunc();
	for(var i=0;i<o.P.length-1;i++)
	{
	  var dist = toolFunc.Pnt2SegmentDist(o.P[i],o.P[i+1],pt);
	  if(dist<10)
	  {
		  return true;
	  }
	}
	
	return false;
}

PointSelectCircle=function(o,pt){
	var toolFunc =new ToolFunc();
	var dist = toolFunc.getDist({"X":o.P[0].X,"Y":o.P[0].Y},pt,1);
	var r_Dist =Math.abs(o.R-dist); 
	if(r_Dist<10)
	{
		return true;
	}
	return false;
}

PointSelectArc=function(o,pt){
	var toolFunc =new ToolFunc();
	var dist = toolFunc.getDist({"X":o.P[0].X,"Y":o.P[0].Y},pt,1);
	var r_Dist =Math.abs(o.R-dist); 
	if(r_Dist<10)
	{
		var ang = getAng(o.P[0],pt);

		if(!o.W){
			if(o.S<=ang && o.E>=ang && o.S<o.E)
				return true;
			else if(((o.S<=ang&&ang<=2*Math.PI) || (o.E>=ang&&ang>=0)) && o.S>o.E)
				return true;
		}else{
			if(o.S>=ang && o.E<=ang && o.S>o.E)
				return true;
			else if(((o.E<=ang&&ang<=2*Math.PI) || (o.S>=ang&&ang>=0)) && o.S<o.E)
				return true;
		}
	}
	return false;
}

PointSelectEllipse=function(o,pt){
	var toolFunc =new ToolFunc();
	var radius =toolFunc.getDist(o.P[0],pt,1);
	var ptAng = getAng(o.P[0],pt);
	ptAng-=o.S;
	
	var ellipsePt = {"X":o.P[0].X+o.AR*Math.cos(ptAng),"Y":o.P[0].Y+o.BR*Math.sin(ptAng)};
	var dist =toolFunc.getDist(o.P[0],ellipsePt,1);
	dist -= radius;
	if(dist<10&&dist>-10)
		return true;
	
	return false;
}

SelectO=function(o,pt){
	switch(o.N){
		case "L": return PointSelectLine(o,pt);
		case "H": return PointSelectHLine(o,pt);
		case "P": return PointSelectPLine(o,pt);
		case "C": return PointSelectCircle(o,pt);
		case "A": return PointSelectArc(o,pt);
		case "E": return PointSelectEllipse(o,pt);
		default:
			break;	
	}
}