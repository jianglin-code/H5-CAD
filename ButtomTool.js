// JavaScript Document

cad.ButtomTool=function(){
	
	this.Create=function(){
		var ButtomToolDiv = document.createElement("div"); 
		ButtomToolDiv.setAttribute("id","ButtomToolDiv"); 
		ButtomToolDiv.setAttribute("class","tool_bottom");
		ButtomToolDiv.setAttribute("ondragover", "allowDrop(event)");
		ButtomToolDiv.style.zIndex=1;
		ButtomToolDiv.innerHTML="<div id='tool_bottom_1' class='tool_bottom_1' >\
		<div id='edit_pane_1' class='edit_pane'>\
		<div id='edit_pane_units' class='edit_pane_item edit_pane_units'></div>\
		<div id='edit_pane_grid' class='edit_pane_item edit_pane_grid'></div>\
		<div id='edit_pane_align' class='edit_pane_item edit_pane_align'></div>\
		<div id='edit_pane_osnap' class='edit_pane_item edit_pane_osnap'></div>\
		</div>\
		</div>\
		<div id='tool_bottom_2' class='tool_bottom_2' >\
		<div id='edit_pane_2' class='edit_pane'>\
		<div id='edit_pane_viewmodes' class='edit_pane_item edit_pane_viewmodes'></div>\
		<div id='Pan' class='edit_pane_item Pan'></div>\
		<div id='edit_pane_zoom_ex' class='edit_pane_item edit_pane_zoom_ex'></div>\
		<div id='edit_pane_zoom_win' class='edit_pane_item edit_pane_zoom_win'></div>\
		</div>\
		</div>";
		document.body.appendChild(ButtomToolDiv); 
		ButtomToolDiv = null; 
		
		registerBottomCmdUI("edit_pane_units","","");
		registerBottomCmdUI("edit_pane_grid","","");
		registerBottomCmdUI("edit_pane_align","","");
		registerBottomCmdUI("edit_pane_osnap","","");
		registerBottomCmdUI("edit_pane_viewmodes","","");
		registerBottomCmdUI("Pan","pan_black","");
		registerBottomCmdUI("edit_pane_zoom_ex","","");
		registerBottomCmdUI("edit_pane_zoom_win","","");
		
		/*hCad("#edit_pane_units").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_units-onmouseup")
				this.className="edit_pane_item edit_pane_units-onmouseover";
			}
		);
		
		hCad("#edit_pane_units").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_units-onmouseup")
				this.className="edit_pane_item edit_pane_units";
			}
		);
		
		hCad("#edit_pane_grid").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_grid-onmouseup")
				this.className="edit_pane_item edit_pane_grid-onmouseover";
			}
		);
		
		hCad("#edit_pane_grid").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_grid-onmouseup")
				this.className="edit_pane_item edit_pane_grid";
			}
		);
		
		hCad("#edit_pane_align").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_align-onmouseup")
				this.className="edit_pane_item edit_pane_align-onmouseover";
			}
		);
		
		hCad("#edit_pane_align").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_align-onmouseup")
				this.className="edit_pane_item edit_pane_align";
			}
		);
		
		hCad("#edit_pane_osnap").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_osnap-onmouseup")
				this.className="edit_pane_item edit_pane_osnap-onmouseover";
			}
		);
		
		hCad("#edit_pane_osnap").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_osnap-onmouseup")
				this.className="edit_pane_item edit_pane_osnap";
			}
		);
		
		hCad("#edit_pane_viewmodes").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_viewmodes-onmouseup")
				this.className="edit_pane_item edit_pane_viewmodes-onmouseover";
			}
		);
		
		hCad("#edit_pane_viewmodes").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_viewmodes-onmouseup")
				this.className="edit_pane_item edit_pane_viewmodes";
			}
		);
		
		hCad("#Pan").mouseover(
			function (){
				if(this.className != "edit_pane_item Pan-onmouseup")
				this.className="edit_pane_item Pan-onmouseover";
			}
		);
		
		hCad("#Pan").mouseout(
			function (){
				if(this.className != "edit_pane_item Pan-onmouseup")
				this.className="edit_pane_item Pan";
			}
		);
		
		hCad("#edit_pane_zoom_ex").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_zoom_ex-onmouseup")
				this.className="edit_pane_item edit_pane_zoom_ex-onmouseover";
			}
		);
		
		hCad("#edit_pane_zoom_ex").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_zoom_ex-onmouseup")
				this.className="edit_pane_item edit_pane_zoom_ex";
			}
		);
		
		hCad("#edit_pane_zoom_win").mouseover(
			function (){
				if(this.className != "edit_pane_item edit_pane_zoom_win-onmouseup")
				this.className="edit_pane_item edit_pane_zoom_win-onmouseover";
			}
		);
		
		hCad("#edit_pane_zoom_win").mouseout(
			function (){
				if(this.className != "edit_pane_item edit_pane_zoom_win-onmouseup")
				this.className="edit_pane_item edit_pane_zoom_win";
			}
		);
		
		hCad("#Pan").click(
			function (){
				var cmd=h_5_cad.Canvas.getCommand();
				cmd.Move.convertMoveCommand();
				hCad("#canvas").css({"cursor":"url(pan_black.cur) 32 32, crosshair"}); 
				this.className="edit_pane_item Pan-onmouseup";
			}
		);*/
	}
}
