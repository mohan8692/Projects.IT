var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';

onloadCalls();

function onloadCalls(){
	departmentBlockWiseDetails("frameWise");
}	
function departmentBlockWiseDetails(divId)
{
	var levelWiseBlockArr='';
	levelWiseBlockArr=[{name:'Promotions',id:'1'},{name:'Lead Creation Analysis',id:'2'}]//,{name:'Electronics',id:'2'},{name:'FinTech',id:'3'}];
	
	var collapse='';
		for(var i in levelWiseBlockArr)
		{
			collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" role="tablist" aria-multiselectable="true">';
				collapse+='<div class="panel panel-default panel-black">';
					collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+levelWiseBlockArr[i].id+'">';
						if(i == 0)
						{
							collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
						}else{
							collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
						}
						collapse+='<h4 class="panel-title">'+levelWiseBlockArr[i].name+' Overview</h4>';
							
						collapse+='</a>';
					collapse+='</div>';
					if(i == 0)
					{
						collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
					}else{
						collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelWiseBlockArr[i].id+'">';
					}
					
						collapse+='<div class="panel-body">';
							if(levelWiseBlockArr[i].name == 'Lead Creation Analysis')
							{
								collapse+='<div class="row">';
									collapse+='<div class="col-sm-12">';
										collapse+='<iframe class="embed-responsive-item" width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNmVmMTMzMjItYmZlMi00ZGM1LWFkM2MtMzdiMWU4MmYxYjMwIiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>';
									collapse+='</div>';
								collapse+='</div>';	
							}
							if(levelWiseBlockArr[i].name == "Promotions")
							{
								collapse+='<div class="row">';
									collapse+='<div class="col-sm-12">';
										collapse+='<iframe class="embed-responsive-item" width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNzgxZTkxMDctNjI2My00YTk3LTg4ZTctMWM1YTZjNzQyNTNiIiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>';
									collapse+='</div>';
								collapse+='</div>';	
								
								collapse+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
								  collapse+='<div class="panel panel-default panel-black">';
									collapse+='<div class="panel-heading" role="tab" id="headingOne">';
									  collapse+='<h4 class="panel-title">';
										collapse+='<a class="panelCollapseIcon collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" attr_type="frame2">';
										 collapse+='<h4>Company Investment & Employeement Details</h4>';
										collapse+='</a>';
									  collapse+='</h4>';
									collapse+='</div>';
									collapse+='<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">';
									  collapse+='<div class="panel-body">';
										collapse+='<div class="row">';
											collapse+='<div id="frame2DivID"></div>';
											
										collapse+='</div>';
									  collapse+='</div>';
									collapse+='</div>';
								 collapse+='</div>';
								  collapse+='<div class="panel panel-default panel-black">';
									collapse+='<div class="panel-heading" role="tab" id="headingTwo">';
									 collapse+='<h4 class="panel-title">';
										collapse+='<a class="collapsed panelCollapseIcon" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" attr_type="frame3">';
										  collapse+='<h4>Company Employee Duration Details</h4>';
										collapse+='</a>';
									  collapse+='</h4>';
									collapse+='</div>';
									collapse+='<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">';
									  collapse+='<div class="panel-body">';
										collapse+='<div class="row">';
											collapse+='<div id="frame3DivID"></div>';
										collapse+='</div>';
									  collapse+='</div>';
									collapse+='</div>';
								  collapse+='</div>';
								 collapse+='<div class="panel panel-default panel-black">';
									collapse+='<div class="panel-heading" role="tab" id="headingThree">';
									  collapse+='<h4 class="panel-title">';
										collapse+='<a class="collapsed panelCollapseIcon" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" attr_type="frame4">';
										   collapse+='<h4 class="panel-tit1e">Information Lead Details</h4>';
										collapse+='</a>';
									  collapse+='</h4>';
									collapse+='</div>';
									collapse+='<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">';
									  collapse+='<div class="panel-body">';
										collapse+='<div class="row">';
											collapse+='<div id="frame4DivID"></div>';
										collapse+='</div>';
									  collapse+='</div>';
									collapse+='</div>';
								  collapse+='</div>';
								collapse+='</div>';
								
							}
							
							
							collapse+='<div id="'+divId.replace(/\s+/g, '')+'Block'+levelWiseBlockArr[i].id+'"></div>';
							
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
			
			
		}
	$("#departmentBlockWiseDetailsId").html(collapse);
	
}

$(document).on("click",".panelCollapseIcon",function(){
	var frameType = $(this).attr("attr_type");
	if(frameType == "frame2"){
		$("#frame2DivID").html('<iframe  width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiOGU3OWJlZTAtZDE1My00YjJkLWE4MzQtZjE0NWFlMmI3YWU0IiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>')
	}else if(frameType == "frame3"){
		$("#frame3DivID").html('<iframe  width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background:#FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNTZlMzJiMDQtN2EwZi00OGNhLTg0YzItZTQ5OGI1ZGJmMDhjIiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>');
	}else if(frameType == "frame4"){
		$("#frame4DivID").html('<iframe  width="100%" height="780px" allowfullscreen="true" allowtransparency="true" style="background: #FFFFFF;" src="https://app.powerbi.com/view?r=eyJrIjoiNjJjM2VjMzQtOGQ5ZC00YjE1LTliOGYtY2IyMjNjNzgwMmM4IiwidCI6ImQzMjExYjNlLWJjMjYtNDlmYS1hMzAzLTYzMjEyMGFiNTQ1OSIsImMiOjEwfQ%3D%3D"></iframe>');
	}
});