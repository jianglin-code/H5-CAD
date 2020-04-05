// JavaScript Document

MouseTip=function(){
	var messageTip = "";
	var timer;
	this.setMessageTip=function(s){
		messageTip = s;
	}
	
	this.CreateMessageSpan=function(context){
		var span_messagetip = document.createElement("span");
		span_messagetip.setAttribute("id","span_messagetip"); 
		span_messagetip.setAttribute("class","spanstyle_messagetip");
		span_messagetip.style.zIndex=10;
		span_messagetip.innerHTML = messageTip;
		//hCad("#"+context).append(span_messagetip); 
		document.body.appendChild(span_messagetip); 
	}
	
	this.MoveMessageSpan=function(){
		var getCurMovePoint = h_5_cad.Canvas.getCurMousemovePoint();
		var left = getCurMovePoint.X+7;
		var top  = getCurMovePoint.Y+7+h_5_cad.Canvas.getleaveTop();
		hCad("#span_messagetip").css({"left":left+"px","top":top+"px"});
		hCad("#span_messagetip").html(messageTip);
	}
	
	this.HideMessageSpan=function(){
		hCad("#span_messagetip").hide();
	}
	
	this.ShowMessage=function(){
		var span_messagetip = document.getElementById("span_messagetip");
		if(span_messagetip){
			hCad("#span_messagetip").show();
			span_messagetip = null;
		}
		else{
			h_5_cad.MouseTip.CreateMessageSpan("canvas");
		}
		
		timer = setInterval(h_5_cad.MouseTip.MoveMessageSpan, 10);
	}
	
	this.CloseMessage=function(){
		h_5_cad.MouseTip.HideMessageSpan();
		clearInterval(timer);
	}
	
	this.FixedTextTip=function(pt){
		var span_texttip = document.getElementById("span_texttip");
		if(span_texttip){
			span_texttip=null;
			hCad("#span_texttip").show();
		}else{
			var span_messagetip = document.createElement("span");
			span_messagetip.setAttribute("id","span_texttip"); 
			span_messagetip.setAttribute("class","spanstyle_messagetip");
			span_messagetip.innerHTML = "<input id = 'Text_value' type='text' name='text' value='' />";
			span_messagetip.style.zIndex=10;
			document.body.appendChild(span_messagetip);
			span_messagetip=null;
		}
		
		var left = pt.X;
		var top  = pt.Y+h_5_cad.Canvas.getleaveTop();
		hCad("#span_texttip").css({"left":left+"px","top":top+"px"});
		hCad("#span_texttip").css({"width":"100px"});
		hCad("#Text_value").focus();
	}
	
	this.GetTextTipValue=function(){
		var value = hCad("#Text_value").val();
		return value;
	}
	
	this.CloseTextTip=function(){
		hCad("#Text_value").val("");
		hCad("#span_texttip").hide();
	}
	
	this.ShowErrTip=function(sErr){
		var span_texttip = document.getElementById("span_err_texttip");
		if(span_texttip){
			span_texttip=null;
			hCad("#span_err_texttip").show();
		}else{
			var span_messagetip = document.createElement("span");
			span_messagetip.setAttribute("id","span_err_texttip"); 
			span_messagetip.setAttribute("class","spanstyle_err_messagetip");
			span_messagetip.style.zIndex=10;
			document.body.appendChild(span_messagetip);
			span_messagetip=null;
			
			hCad("#span_err_texttip").css({"width":"1000px"});
		}
		
		hCad("#span_err_texttip").text(sErr);
		hCad("#span_err_texttip").css({"left":document.body.clientWidth/2-500+"px","top":"120px"});
		
		setTimeout("HideOpacity()", 6000);
		
		ShowOpacity();
	}
}

var opacity = 0;
function ShowOpacity(id){
	if(opacity < 1){
		opacity+=0.02;
		hCad("#span_err_texttip").css("opacity",opacity);
		setTimeout("ShowOpacity()",20);
	}else{
		opacity = 1;
	}
}

function HideOpacity(){
	if(opacity > 0){
		opacity-=0.02;
		hCad("#span_err_texttip").css("opacity",opacity);
		setTimeout("HideOpacity()",20);
	}
	else{
		hCad("#span_err_texttip").hide();
		opacity = 0;
	}
}