var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var smallSpinner = '<img src="Assests/images/spinner.gif" style="width:25px;height:25px;"/>';
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

setTimeout(function(){
	onloadCalls();
}, 1000); 
function onloadCalls(){
	
	getPhaseWiseCounts(0);
	if(phaseComponentId !=""){
		phaseWiseBlockDetails("levelWise",phaseComponentId);
	}else{
		phaseWiseBlockDetails("levelWise",1);
	}
}

function getPhaseWiseCounts(phaseId){ //Main Call
	$("#phaseWiseDetails").html(spinner)
	var json={
		phaseId : phaseId
	}
	$.ajax({
		type:'POST',
		url:'getPhaseWiseStatusWiseDetails',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildPhaseWiseCounts(result);
		}else{
			$("#phaseWiseDetails").html("No Data Available")
		}
	})
}

function buildPhaseWiseCounts(result){
	var str='';
	var panelBackgroundColors=[{headText:"#107239",headColor:"#ace5c4",bodyColor:"#edf9f2"},{headText:"#c8630c",headColor:"#f7b98a",bodyColor:"#f9eee3"},{headText:"#0b5a90",headColor:"#79c4f7",bodyColor:"#daebf8"}];
	
	for(var i in result){
		//if(result[i].id == phaseComponentId){
		str+='<div class="col-sm-4">';
		var notAdmSancAmt = parseFloat(result[i].totalCost)- parseFloat(result[i].adminSanctionedAmt);		
		if(result[i].id == phaseComponentId){
			str+='<div class="panel phaseWiseDetailsCls active_panel_rUrban removeCls" attr_phaseId="'+result[i].id+'">';
		}else{
			str+='<div class="panel phaseWiseDetailsCls removeCls" attr_phaseId="'+result[i].id+'">';
		}
			
				str+='<div class="panel-heading" style="background-color:'+panelBackgroundColors[i].bodyColor+';border-top: 1px solid '+panelBackgroundColors[i].headColor+';border-left: 1px solid '+panelBackgroundColors[i].headColor+';border-right: 1px solid '+panelBackgroundColors[i].headColor+'">';
					str+='<div class="row">';
						str+='<div class="col-sm-6">';
							str+='<h3 class="text-capital" style="color:'+panelBackgroundColors[i].headText+';">'+result[i].name+'</h3>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<span class="pull-right">';
								str+='<h6 class="font_weight">Start Date</h6>';
								str+='<h6>'+result[i].startDate+'</h6>';
							str+='</span>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="" style="background-color:white_color !important; border: 1px solid '+panelBackgroundColors[i].headColor+'">';
					str+='<div class="row">';
						str+='<div class="col-sm-4 text-center m_top10">';
							str+='<h5 class=" font_weight">Total Works</h5>';
							if(result[i].totalCount !=null && result[i].totalCount>0){
								str+='<h4 class="font_weight m_top10 f_22" style="color:'+panelBackgroundColors[i].headText+';">'+result[i].totalCount+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10 f_22" style="color:'+panelBackgroundColors[i].headText+';">-</h4>';
							}
						str+='</div>';
						str+='<div class="col-sm-4 text-center m_top10">';
							str+='<div class="br_left" style="border-left-color:'+panelBackgroundColors[i].headColor+'">';
								str+='<h5 class=" font_weight">Total Cost</h5>';
								if(result[i].totalCost !=null && result[i].totalCost>0){
									str+='<h4 class="font_weight m_top10 f_22" style="color:'+panelBackgroundColors[i].headText+';">'+parseFloat(result[i].totalCost/100).toFixed(2)+'</h4>';
								}else{
									str+='<h4 class="font_weight m_top10 f_22" style="color:'+panelBackgroundColors[i].headText+';">-</h4>';
								}
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-4 text-center m_top10">';
							str+='<div class="br_left" style="border-left-color:'+panelBackgroundColors[i].headColor+'">';
								str+='<h5 class=" font_weight">Not Admin Sanc.</h5>';
								if(result[i].notAdminSanctioned !=null && result[i].notAdminSanctioned > 0){
									str+='<h4 class="font_weight m_top10 f_22" style="color:'+panelBackgroundColors[i].headText+';">'+result[i].notAdminSanctioned+'&nbsp;<small class="">('+result[i].notAdminSanctionedPer+'%)</small></h4>';
								}else{
									str+='<h4 class="font_weight m_top10 f_22" style="color:'+panelBackgroundColors[i].headText+';">-</h4>';
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';	
					str+='<hr class="m_top_bottom_5" style="border-top-color:'+panelBackgroundColors[i].headColor+'">';
					str+='<div class="row">';
						str+='<div class="col-sm-4 text-center m_top10">';
							str+='<h5 class=" font_weight">Not Tech.San.</h5>';
							if(result[i].notTechSanctioned !=null && result[i].notTechSanctioned>0){
								str+='<h4 class="font_weight m_top10 margin_bottom f_22" style="color:'+panelBackgroundColors[i].headText+';cursor:pointer;" ><a class="worksDetailsCls" attr_phaseId="'+result[i].id+'" attr_clusterId="" attr_deptId="" attr_statusName="Not Technical"style="color:'+panelBackgroundColors[i].headText+';" >'+result[i].notTechSanctioned+'</a>&nbsp;<small class="">('+result[i].notTechSanctionedPerc+'%)</small></h4>';
							}else{
								str+='<h4 class="font_weight m_top10 margin_bottom f_22" style="color:'+panelBackgroundColors[i].headText+';">-</h4>';
							}
						str+='</div>';
						str+='<div class="col-sm-4 text-center m_top10">';
							str+='<div class="br_left" style="border-left-color:'+panelBackgroundColors[i].headColor+'">';
								str+='<h5 class=" font_weight">Not Entrusted</h5>';
								if(result[i].notEntrusted !=null && result[i].notEntrusted>0){
									str+='<h4 class="font_weight m_top10 margin_bottom f_22" style="color:'+panelBackgroundColors[i].headText+';cursor:pointer;" ><a class="worksDetailsCls" attr_phaseId="'+result[i].id+'" attr_clusterId="" attr_deptId="" attr_statusName="Not Entrusted" style="color:'+panelBackgroundColors[i].headText+';">'+result[i].notEntrusted+'</a>&nbsp;<small class="">('+result[i].notEntrustedPerc+'%)</small></h4>';
								}else{
									str+='<h4 class="font_weight m_top10 margin_bottom f_22" style="color:'+panelBackgroundColors[i].headText+';">-</h4>';
								}
							str+='</div>';
						str+='</div>';
						str+='<div class="col-sm-4 text-center m_top10">';
							str+='<div class="br_left" style="border-left-color:'+panelBackgroundColors[i].headColor+'">';
								str+='<h5 class=" font_weight">Not Grounded</h5>';
								if(result[i].notGrounded !=null && result[i].notGrounded>0){
									str+='<h4 class="font_weight m_top10 margin_bottom f_22" style="color:'+panelBackgroundColors[i].headText+';cursor:pointer;" ><a style="color:'+panelBackgroundColors[i].headText+';" class="worksDetailsCls" attr_phaseId="'+result[i].id+'" attr_clusterId="" attr_deptId="" attr_statusName="Not Grounded">'+result[i].notGrounded+'</a>&nbsp;<small class="">('+result[i].notGroundedPerc+'%)</small></h4>';
								}else{
									str+='<h4 class="font_weight m_top10 margin_bottom f_22" style="color:'+panelBackgroundColors[i].headText+';">-</h4>';
								}
							str+='</div>';
						str+='</div>';
					str+='</div>';	
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	//}
	$('#phaseWiseDetails').html(str);
}


function phaseWiseBlockDetails(divId,phaseLevelType)
{
	if(phaseLevelType == 1){
		var levelNamesArr=[{name:'Phase',id:'1'}];
	}else if(phaseLevelType == 2){
		var levelNamesArr=[{name:'Phase',id:'2'}];
	}else if(phaseLevelType == 3){
		var levelNamesArr=[{name:'Phase',id:'3'}];
	}
	
	var collapse='';
				for(var i in levelNamesArr)
				{
					console.log(divId.replace(/\s+/g, '')+''+levelNamesArr[i].id);
					collapse+='<div class="panel-group" id="accordion'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" role="tablist" aria-multiselectable="true">';
						collapse+='<div class="panel panel-default panel-black">';
							collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+levelNamesArr[i].id+'">';
								if(i == 0)
								{
									collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'">';
								}else{
									collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+' collapsedAdd"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" href="#collapse'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'">';
								}
								collapse+='<h4 class="panel-title text-capital">'+levelNamesArr[i].name+' '+levelNamesArr[i].id+' Details</h4>';
									
								collapse+='</a>';
							collapse+='</div>';
							if(i == 0)
							{
								collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'">';
							}else{
								collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'" class="panel-collapse collapse collapsedInAdd" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+levelNamesArr[i].id+'">';
							}
							
								collapse+='<div class="panel-body">';
									collapse+='<div id="collapseMainOverViewBlockId'+levelNamesArr[i].id+'"></div>';
									
										collapse+='<div class="pad_border m_top10">';
									collapse+='<div class="row">';
										collapse+='<div class="col-sm-12 m_top10">';
											collapse+='<h4 class="text-capital">Status wise details</h4>';
											
												collapse+='<div class="m_top10" id="collapseGraphViewBlockId'+levelNamesArr[i].id+'" style="width:93%; height:300px;"></div>';
											collapse+='</div>';
										collapse+='</div>';
									
									collapse+='</div>';									
										collapse+='<div class="pad_border m_top10">';
											collapse+='<div class="row m_top10">';
												collapse+='<div class="col-sm-6">';
													collapse+='<ul class="list-inline switch-btn workWiseDetailsCls" role="tabCummulative">';
														collapse+='<li class="active" attr_type="cluster" attr_level_id ="'+levelNamesArr[i].id+'" style="font-size:12px !important;">Cluster Wise</li>';
														collapse+='<li attr_type="component" attr_level_id ="'+levelNamesArr[i].id+'" style="font-size:12px !important;">Component Wise</li>';
														collapse+='<li  attr_type="department" attr_level_id ="'+levelNamesArr[i].id+'" style="font-size:12px !important;">Department Wise</li>';	
													collapse+='</ul>';
												collapse+='</div>';			
											collapse+='</div>';											
											collapse+='<div id="collapseTableViewBlockId'+levelNamesArr[i].id+'"></div>';
										collapse+='</div>';	
								collapse+='</div>';
							collapse+='</div>';
						collapse+='</div>';
					collapse+='</div>';
				}
		$("#levelWisePhaseDetailsId").html(collapse);		
		for(var i in levelNamesArr){
			$(".collapsedAdd").removeClass("collapsed");
			$(".collapsedInAdd").addClass("in");
			
			getlevelWisePhaseWiseCounts(levelNamesArr[i].id);
			//getDepartmentWiseDetails(levelNamesArr[i].id,0);
			getStatusWiseDetails(levelNamesArr[i].id);			
			getClusterWiseCounts(levelNamesArr[i].id,'cluster');			
		}
	}

	function getlevelWisePhaseWiseCounts(phaseId){
		$("#collapseMainOverViewBlockId"+phaseId).html(spinner)
		var json={
			phaseId : phaseId
		}
		$.ajax({
			type:'POST',
			url:'getPhaseWiseCounts',
			datatType:'json',
			data: JSON.stringify(json),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result != null && result.length>0){
				buildlevelWisePhaseWiseCounts(result,phaseId);
			}else{
				$("#collapseMainOverViewBlockId"+phaseId).html("No Data Available")
			}
		})
	}
	function buildlevelWisePhaseWiseCounts(result,phaseId){
		var str='';
		for(var i in result){
			//str+='<div class="row" style="box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);border: 1px solid #ccc;">';
				 str+='<div class="status">';
					str+='<ul class="list-inline workStagesCls">';
						str+='<li style="background-color: #e8f6ce;"><h5 style="color:#000">Total Works</h5>';
							if(result[i].totalCount !=null && result[i].totalCount>0){
							str+='<h4 class="font_weight m_top10 " style="color:#418cf0">'+result[i].totalCount+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10 " style="color:#418cf0"> - </h4></li>';
						}
						str+='<li style="background-color: #ecd3f0;"><h5 style="color:#000">Total Cost</h5>';
							if(result[i].totalCost !=null && result[i].totalCost>0){
							str+='<h4 class="font_weight m_top10 " style="color:#c61379">'+parseFloat(result[i].totalCost/100).toFixed(2)+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10 " style="color:#c61379"> - </h4></li>';
						}
						str+='<li style="background-color: #b2f3ee;"><h5 style="color:#000">Conv. Fund</h5>';
							if(result[i].convergenceCost !=null && result[i].convergenceCost>0){
							str+='<h4 class="font_weight m_top10 good_color" >'+parseFloat(result[i].convergenceCost/100).toFixed(2)+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10 good_color"> - </h4></li>';
						}
						str+='<li style="background-color: #bdc5be;"><h5 style="color:#000">Convergence Expenditure</h5>';//pj
							if(result[i].convergenceExpenditure !=null && result[i].convergenceExpenditure>0){
							str+='<h4 class="font_weight m_top10" style="color:#c8630c;">'+parseFloat(result[i].convergenceExpenditure/100).toFixed(2)+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10" style="color:#c8630c;"> - </h4></li>';
						}
						str+='<li style="background-color: #dcfbe9;"><h5 style="color:#000">CGF Fund</h5>';
							if(result[i].cgfCost !=null && result[i].cgfCost>0){
							str+='<h4 class="font_weight m_top10 bad_color" >'+parseFloat(result[i].cgfCost/100).toFixed(2)+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10 bad_color"> - </h4></li>';
						}
						str+='<li style="background-color: #cdd6fc;"><h5 style="color:#000">CGF Expenditure</h5>';
							if(result[i].cgfAmountPaid !=null && result[i].cgfAmountPaid>0){
							str+='<h4 class="font_weight m_top10 " style="color:#ff5e1c" >'+parseFloat(result[i].cgfAmountPaid/100).toFixed(2)+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10 " style="color:#ff5e1c"> - </h4></li>';
						}
						str+='<li style="background-color: #f5ebca;"><h5 style="color:#000">Admin Sanctioned</h5>';
							if(result[i].adminSanctionedAmount !=null && result[i].adminSanctionedAmount>0){
							str+='<h4 class="font_weight m_top10 pending_color"  >'+parseFloat(result[i].adminSanctionedAmount/100).toFixed(2)+'</h4></li>';
						}else{
							str+='<h4 class="font_weight m_top10 pending_color"> - </h4></li>';
						}
						str+='<li style="background-color: #ffc6ce;"><h5 style="color:#000;padding-bottom: 0px;">Not Admin <br>Sanctioned</h5>';
							var notAdmSancAmt = parseFloat(result[i].totalCost)- parseFloat(result[i].adminSanctionedAmount);
							if(notAdmSancAmt!= null && notAdmSancAmt >0){
								str+='<h4 class="font_weight m_top10" style="color:#e22b4c">'+parseFloat(notAdmSancAmt/100).toFixed(2)+'</h4></li>';
							}else{
								str+='<h4 class="font_weight m_top10 "  style="color:#e22b4c"> - </h4></li>';
							}
					str+='</ul>';
				str+='</div>'; 
			//str+='</div>';
			/*str+='<div class="pad_15">';
				str+='<div class="row">';
					str+='<div class="col-sm-7">';
						str+='<div class="row">';
							str+='<div class="col-sm-3 m_top10">';
								str+='<div class="text-center p_top_bottom" style="background-color: #e8f6ce;">';
									str+='<h5 class="">Total Works</h5>';
									if(result[i].totalCount !=null && result[i].totalCount>0){
										str+='<h4 class="font_weight m_top10 " style="color:#12ab23">'+result[i].totalCount+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10 " style="color:#12ab23"> - </h4>';
									}						
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-3 m_top10">';
								str+='<div class=" text-center p_top_bottom" style="background-color: #ecd3f0;">';
									str+='<h5 class="">Total Cost</h5>';
									if(result[i].totalCost !=null && result[i].totalCost>0){
										str+='<h4 class="font_weight m_top10 " style="color:#c61379">'+parseFloat(result[i].totalCost/100).toFixed(2)+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10 " style="color:#c61379"> - </h4>';
									}						 
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-3 m_top10">';
								str+='<div class=" text-center p_top_bottom" style="background-color: #b2f3ee;">';
									str+='<h5 class="">Conv. Fund</h5>';
									if(result[i].convergenceCost !=null && result[i].convergenceCost>0){
										str+='<h4 class="font_weight m_top10" style="color:#008583">'+parseFloat(result[i].convergenceCost/100).toFixed(2)+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10" style="color:#008583"> - </h4>';
									}						
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-3 m_top10">';
								str+='<div class=" text-center p_top_bottom" style="background-color: #b2f3ee;">';
									str+='<h5 class="">Convergence Expenditure</h5>';
									if(result[i].convergenceExpenditure !=null && result[i].convergenceExpenditure >0){
										str+='<h4 class="font_weight m_top10" style="color:#008583">'+parseFloat(result[i].convergenceExpenditure/100).toFixed(2)+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10" style="color:#008583"> - </h4>';
									}						
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-3 m_top10">';
								str+='<div class="text-center p_top_bottom" style="background-color: #dcfbe9;">';
									str+='<h5 class="">CGF Fund</h5>';
									if(result[i].cgfCost !=null && result[i].cgfCost>0){
										str+='<h4 class="font_weight m_top10" style="color:#08A46B">'+parseFloat(result[i].cgfCost/100).toFixed(2)+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10" style="color:#08A46B"> - </h4>';
									}						
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-5">';
						str+='<div class="row">';
							str+='<div class="col-sm-4 m_top10">';
								str+='<div class="text-center p_top_bottom" style="background-color: #cdd6fc;">';
									str+='<h5 class=" ">CGF Expenditure</h5>';
									if(result[i].cgfAmountPaid !=null && result[i].cgfAmountPaid>0){
										str+='<h4 class="font_weight m_top10" style="color:#2926e9">'+parseFloat(result[i].cgfAmountPaid/100).toFixed(2)+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10" style="color:#2926e9"> - </h4>';
									}						
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-4 m_top10">';
								str+='<div class="text-center p_top_bottom"style="background-color: #f5ebca;">';
									str+='<h5 class=" ">Admin Sanc.</h5>';
									if(result[i].adminSanctionedAmount !=null && result[i].adminSanctionedAmount>0){
										str+='<h4 class="font_weight m_top10  pending_color"  >'+parseFloat(result[i].adminSanctionedAmount/100).toFixed(2)+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10  pending_color"  > - </h4>';
									}						
								str+='</div>';
							str+='</div>';
							str+='<div class="col-sm-4 m_top10">';
								str+='<div class="text-center p_top_bottom"style="background-color: #ffc6ce;">';
									str+='<h5 class="">Not Admin Sanc.</h5>';
									var notAdmSancAmt = parseFloat(result[i].totalCost)- parseFloat(result[i].adminSanctionedAmount);
									if(notAdmSancAmt!= null && notAdmSancAmt >0){
										str+='<h4 class="font_weight m_top10" style="color:#e22b4c">'+parseFloat(notAdmSancAmt/100).toFixed(2)+'</h4></li>';
									}else{
										str+='<h4 class="font_weight m_top10 "  style="color:#e22b4c"> - </h4></li>';
									}					
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';*/
		}
	
		$("#collapseMainOverViewBlockId"+phaseId).html(str);
	}
	function getDepartmentWiseDetails(phaseId,clusterId,buildType){//second Block in Collapse
	if(clusterId == 0){
		$("#collapseTableViewBlockId"+phaseId).html(spinner);
	}else{
		$("#clusterWiseDetailsId").html(spinner);
	}
	
		var json = {
			phaseId : phaseId,			
			clusterId:clusterId,
			buildType:buildType
		}
		$.ajax({
			type:'POST',    
			url: 'getRurbanDepartmentWiseDetails',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null && result.length>0){
				buildDepartmentWiseDetails(result,phaseId,clusterId,buildType);
			}else{
				if(clusterId == 0){
					$("#collapseTableViewBlockId"+phaseId).html("");
				}else{
					$("#clusterWiseDetailsId").html("No Data Available");
				}
				
			}
		})
	}
	function buildDepartmentWiseDetails(result,phaseId,clusterId,buildType){
		var str='';	
		str+='<div class="row">';
			/* str+='<div class="col-sm-6 m_top10">';
				str+='<h4 class="text-capital">Department wise details</h4>';
			str+='</div>'; */			
			str+='<div class="col-sm-6 pull-right">';
				str+='<span class="pull-right">';
					str+='<label class="f_15" style="margin-right: 10px;"><input  type="radio" name="deptSelect" value="%" attr_dttb_id="'+buildType+'DataTable" attr_phaseId="'+phaseId+'">&nbsp;&nbsp;Percentage</label>';
					str+='<label class="f_15"><input type="radio" name="deptSelect" value="Amount" attr_dttb_id="'+buildType+'DataTable" attr_phaseId="'+phaseId+'" checked>&nbsp;&nbsp;Amount</label>';
				str+='</span>';
			str+='</div>';			
		str+='</div>';
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top10">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered table_custom_SC" style="width:100%;" id="'+buildType+'DataTable">';
						str+='<thead style="background-color: #f2f2f2 !important;">';
							str+='<tr>';
								str+='<th class="text-capital" rowspan="2">Department</th>';
								str+='<th class="text-capital" rowspan="2">Total</th>';								
								str+='<th class="text-capital" rowspan="2">Total&nbsp;COST</th>';
								str+='<th class="text-capital" colspan="2">Adm. sanc.</th>';
								str+='<th rowspan="2" style="background-color:#f9eee3;">Admin Efficiency &nbsp;%</th>';
								str+='<th class="text-capital" colspan="2">Not Adm. sanc.</th>';
								str+='<th class="text-capital" colspan="2">Not Tech. sanc.</th>';
								str+='<th class="text-capital" colspan="2">Tech. sanc.</th>';
								str+='<th class="text-capital" colspan="2">Not Entrusted</th>';
								str+='<th class="text-capital" colspan="2">Entrusted</th>';
								str+='<th class="text-capital" colspan="2">Not Grounded</th>';
								str+='<th class="text-capital" colspan="2">Grounded</th>';
								str+='<th rowspan="2" style="background-color:#f9eee3;">Grounded Efficiency &nbsp;%</th>';
								str+='<th class="text-capital" colspan="2">Under Progress</th>';
								str+='<th class="text-capital" colspan="2">completed</th>';
							str+='</tr>';
							str+='<tr>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="rSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';		
							for(var i in result){	
							var efficiency = 0,adminEfficiency = 0,groundedEfficiency =0;
							efficiency =((result[i].grounded*100)/result[i].adminSanctioned).toFixed(2);							
							if(result[i].adminSanctionedAmt != null && result[i].adminSanctionedAmt > 0 && 
							 result[i].totalCost != null && result[i].totalCost >0){
								adminEfficiency = ((result[i].adminSanctionedAmt*100)/result[i].totalCost).toFixed(2);
							}
							if(result[i].groundedAmt != null && result[i].groundedAmt > 0 && 
							 result[i].totalCost != null && result[i].totalCost >0){
								groundedEfficiency = ((result[i].groundedAmt*100)/result[i].totalCost).toFixed(2);
							}
							
								str+='<tr>';
									str+='<td class="odf_FixedCol">'+result[i].name+'</td>';
									if(result[i].totalCount !=null && result[i].totalCount>0){
										str+='<td class="odf_FixedCol">'+result[i].totalCount+'</td>';
									}	
									if(result[i].totalCost !=null && result[i].totalCost>0){
										str+='<td class="odf_FixedCol">'+result[i].totalCost+'</td>';
									}										
									if(result[i].adminSanctioned !=null && result[i].adminSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Admin Sanctioned" attr_build_type="'+buildType+'">'+result[i].adminSanctioned+'</a></td>';
									} else{
										str+='<td>'+result[i].adminSanctioned+'</td>';
									}
									str+='<td class="amountView">'+result[i].adminSanctionedAmt+'</td>';
									if(adminEfficiency != null && adminEfficiency>0){
										str+='<td style="background-color:#f9eee3;">'+adminEfficiency+'&nbsp;%</td>';
									}else{
										str+='<td></td>';
									}
									str+='<td class="percentageView" style="display:none">'+result[i].adminSanctionedPerc+'</td>';
									
									if(result[i].notAdminSanctioned !=null && result[i].notAdminSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Not Admin Sanctioned" attr_build_type="'+buildType+'">'+result[i].notAdminSanctioned+'</a></td>';
									} else{
										str+='<td>'+result[i].notAdminSanctioned+'</td>';
									}
									str+='<td class="amountView">'+result[i].notAdminSanctionedAmount+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].notAdminSanctionedPer+'</td>';

									
									if(result[i].notTechSanctioned !=null && result[i].notTechSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Not Technical" attr_build_type="'+buildType+'">'+result[i].notTechSanctioned+'</a></td>';
									} else{
										str+='<td>'+result[i].notTechSanctioned+'</td>';
									}
									str+='<td class="amountView">'+result[i].notTechSanctionedAmt+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].notTechSanctionedPerc+'</td>';
									if(result[i].techSanctioned !=null && result[i].techSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Technical Sanctioned" attr_build_type="'+buildType+'">'+result[i].techSanctioned+'</a></td>';
									} else{
										str+='<td>'+result[i].techSanctioned+'</td>';
									}
									str+='<td class="amountView">'+result[i].techSanctionedAmt+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].techSanctionedPerc+'</td>';
									if(result[i].notEntrusted !=null && result[i].notEntrusted>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Not Entrusted" attr_build_type="'+buildType+'">'+result[i].notEntrusted+'</a></td>';
									} else{
										str+='<td>'+result[i].notEntrusted+'</td>';
									}							
									str+='<td class="amountView">'+result[i].notEntrustedAmt+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].notEntrustedPerc+'</td>';
									if(result[i].entrusted !=null && result[i].entrusted>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Entrusted" attr_build_type="'+buildType+'">'+result[i].entrusted+'</a></td>';
									} else{
										str+='<td>'+result[i].entrusted+'</td>';
									}	
									str+='<td class="amountView">'+result[i].entrustedAmt+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].entrustedPerc+'</td>';
									if(result[i].notGrounded !=null && result[i].notGrounded>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Not Grounded" attr_build_type="'+buildType+'">'+result[i].notGrounded+'</a></td>';
									} else{
										str+='<td>'+result[i].notGrounded+'</td>';
									}
									str+='<td class="amountView">'+result[i].notGroundedAmt+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].notGroundedPerc+'</td>';
									if(result[i].grounded !=null && result[i].grounded>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Grounded" attr_build_type="'+buildType+'">'+result[i].grounded+'</td>';
									} else{
										str+='<td>'+result[i].grounded+'</td>';
									}
									str+='<td class="amountView">'+result[i].groundedAmt+'</a></td>';
									if(groundedEfficiency != null && groundedEfficiency>0){
										str+='<td style="background-color:#f9eee3;">'+groundedEfficiency+'&nbsp;%</td>';
									}else{
										str+='<td></td>';
									}
									str+='<td class="percentageView" style="display:none">'+result[i].groundedPerc+'</td>';
									if(result[i].underProgress !=null && result[i].underProgress>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="In Progress" attr_build_type="'+buildType+'">'+result[i].underProgress+'</a></td>';
									} else{
										str+='<td>'+result[i].underProgress+'</td>';
									}
									str+='<td class="amountView">'+result[i].underProgressAmt+'</td>';
									str+='<td class="percentageView" style="display:none">'+result[i].underProgressPerc+'</td>';
									if(result[i].completed !=null && result[i].completed>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+clusterId+' attr_deptId='+result[i].id+' attr_deptName='+result[i].name+' attr_statusName="Completed" attr_build_type="'+buildType+'">'+result[i].completed+'</td>';
									} else{
										str+='<td>'+result[i].completed+'</td>';
									}
									str+='<td class="amountView">'+result[i].completedAmt+'</a></td>';
									str+='<td class="percentageView" style="display:none">'+result[i].completedPerc+'</td>';
								str+='</tr>';
							}
						str+='</tbody>';
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';		
		if(clusterId == 0){
			$("#collapseTableViewBlockId"+phaseId).html(str);
		}else{
			$("#clusterWiseDetailsId").html(str);
		}
		$("#"+buildType+"DataTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]],
		"scrollX":        true,		
		"scrollCollapse": true,	
		"fixedColumns":   {
			"leftColumns": 3,
		}
		});
		 $(".DTFC_LeftBodyLiner").css({
			"overflow-x":"hidden",
			"overflow-y":"hidden",			
			"top": "2px",
			"width": "auto"
		}); 
		
	}
	function  getStatusWiseDetails(phaseId){ //Graph Call
	 $("#collapseGraphViewBlockId"+phaseId).html(spinner);
		var json = {
			phaseId:phaseId
		}
		$.ajax({
			type:'POST',    
			url: 'getStatusWiseDetailsNew',//getStatusWiseDetails
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null){
				buildStatusWiseDetails(result,phaseId);
			}else{
				$("#collapseGraphViewBlockId"+phaseId).html('')
				$("#collapseGraphViewBlockId"+phaseId).removeAttr('style');
			}
		})
	}
	
	function buildStatusWiseDetails(result,phaseId){
		var dataTopicInDebatesArr=[];
		var categoriesTopicInDebatesArr=[];
		//var globalStatusObj={"Entrusted":"#494949","Technical Sanctioned":"#db1111","Grounded":"#14BAAD","In Progress":"#14BAAD","In Progress":"#FC5049"}
		/*for(var i in result.subList){
			dataTopicInDebatesArr.push({y:result.subList[i].count,"extra":result.subList[i].percentage});
			categoriesTopicInDebatesArr.push(result.subList[i].name);
		}*/
		dataTopicInDebatesArr.push({y:result.totalCount,"extra":'',color:'#2c96e8'},{y:result.notAdminSanctioned,"extra":result.notAdminSanctionedPer,color:'#e33939'},{y:result.adminSanctioned,"extra":result.adminSanctionedPerc,color:'#2c96e8'},{y:result.notTechSanctioned,"extra":result.notTechSanctionedPerc,color:'#e33939'},{y:result.techSanctioned,"extra":result.techSanctionedPerc,color:'#91cfea'},{y:result.notEntrusted,"extra":result.notEntrustedPerc,color:'#e33939'},{y:result.entrusted,"extra":result.entrustedPerc,color:'#ca9785'},{y:result.notGrounded,"extra":result.notGroundedPerc,color:'#e33939'},{y:result.grounded,"extra":result.groundedPerc,color:'#e8791f'},{y:result.underProgress,"extra":result.underProgressPerc,color:'#ffba00'},{y:result.completed,"extra":result.completedPerc,color:'#00b11e'});
		
		categoriesTopicInDebatesArr.push('Total','Not Adm.Sanctioned','Adm. Sanctioned','Not Tech. Sanctioned','Tech. Sanctioned','Not Entrusted','Entrusted','Not Grounded','Grounded','Under Progress','Completed');
	//console.log(dataTopicInDebatesArr)	
	 $("#collapseGraphViewBlockId"+phaseId).highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			categories: categoriesTopicInDebatesArr,
			type: 'category',
			labels: {
				//rotation: -5,
				style: {
					fontSize: '11px',
				}
			}
		},
		yAxis: {
			min: 0,
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
				text: ''
			}
		},
		legend: {
			enabled: false
		},
		plotOptions:{
			column: {
				pointWidth: 30,
				gridLineWidth: 15
			}
		},
		tooltip: {
			useHTML:true,
			formatter: function () {
				if(this.x != 'Admin Sanctioned'){
					return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y+' - '+this.point.extra+'%';
				}else{
					return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y+'';
				}
				
			}
		},
		series: [{
			name: 'Status Count',
			data: dataTopicInDebatesArr,
			dataLabels: {
				enabled: true,
				color: '#000',
				align: 'canter',
				formatter: function() {
					if(this.x != 'Admin Sanctioned')
						return '<span>'+this.y+' - '+this.point.extra+'%</span>';
					else
						return '<span>'+this.y+'</span>';
				} 
			}
		}]
	});
	$(".collapsedAdd").addClass("collapsed");
	$(".collapsedInAdd").removeClass("in");

	}
	
function getClusterWiseCounts(phaseId,buildType){
	$("#collapseTableViewBlockId"+phaseId).html(spinner);
	var json={
		phaseId : phaseId,
		buildType : buildType
	}
	$.ajax({
		type:'POST',
		url:'getClusterWiseCounts',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildClusterWiseCounts(result,phaseId,buildType);
		}else{
			$("#collapseTableViewBlockId"+phaseId).html('NO DATA AVAILABLE');
		}
	})
}
function getComponentWiseCounts(phaseId,buildType){
	$("#collapseTableViewBlockId"+phaseId).html(spinner);
	var json={
		phaseId : phaseId,
		buildType : buildType
	}
	$.ajax({
		type:'POST',
		url:'getClusterWiseCounts',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildClusterWiseCounts(result,phaseId,buildType);
		}else{
			$("#collapseTableViewBlockId"+phaseId).html('NO DATA AVAILABLE');
		}
	})
}
function buildClusterWiseCounts(result,phaseId,buildType){
	var efficiency = 0,totalEfficiency=0,totalWorks=0,totalCost=0,totalConvergence=0,totalCgf=0,totalCgfExpenditure=0,adminTotalWorks=0,adminTotalAmount=0,notAdminTotalWorks=0,notAdminTotalAmount=0,notTechTotalWorks=0,notTechTotalAmount=0,techTotalWorks=0,techTotalAmount=0,notEntrustedTotalWorks=0,notEntrustedtotalAmount=0,entrustedTotalWorks=0,entrustedtotalAmount=0,notGroundedTotalWorks=0,notGroundedtotalAmount=0,groundedTotalWorks=0,groundedtotalAmount=0,underProgressTotalWorks=0,underProgresstotalAmount=0,compeltedTotalWorks=0,compeltedtotalAmount=0,adminSanctionedPerc=0,notTechSanctionedPerc=0,techSanctionedPerc=0,notEntrustedPerc=0,entrustedPerc=0,notGroundedPerc=0,groundedPerc=0,underProgressPerc=0,completedPerc=0,notAdminSanctionedPer=0,totalConvergenceExpenditure=0,adminEfficiency = 0,groundedEfficiency =0,totalAdminEfficiency=0,totalGroundedEfficiency=0;
	var str='';
		if(buildType == 'cluster'){
			str+='<div class="row m_top10">';
			/* str+='<div class="col-sm-6 m_top10">';
				str+='<h4 class="text-capital">Cluster wise details</h4>';
			str+='</div>'; */
			str+='<div class="col-sm-6 pull-right">';
				str+='<span class="pull-right">';
					str+='<label class="f_15" style="margin-right: 10px;"><input type="radio" name="clusterSelect" attr_dt_id="'+buildType+'_'+phaseId+'DataTable" value="%" attr_phaseId="'+phaseId+'">&nbsp;&nbsp;Percentage</label>';
					str+='<label class="f_15"><input type="radio" name="clusterSelect" value="Amount" attr_dt_id="'+buildType+'_'+phaseId+'DataTable" attr_phaseId="'+phaseId+'" checked>&nbsp;&nbsp;Amount</label>';					
				str+='</span>';
			str+='</div>';
		str+='</div>';
		}else{
			str+='<div class="row ">';
			str+='<div class="col-sm-6 pull-right">';
				str+='<span class="pull-right">';
					str+='<label class="f_15" style="margin-right: 10px;"><input type="radio" name="componentSelect" attr_dt_id="'+buildType+'_'+phaseId+'DataTable" value="%" attr_phaseId="'+phaseId+'">&nbsp;&nbsp;Percentage</label>';
					str+='<label class="f_15"><input type="radio" name="componentSelect" value="Amount" attr_dt_id="'+buildType+'_'+phaseId+'DataTable" attr_phaseId="'+phaseId+'" checked>&nbsp;&nbsp;Amount</label>';					
				str+='</span>';
			str+='</div>';
		str+='</div>';
		}		
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top10">';
				str+='<div class="table-responsive">';
					str+='<table class="table table-bordered table_custom_SC" style="width:100%;" id="'+buildType+'_'+phaseId+'DataTable">';
						str+='<thead style="background-color: #f2f2f2 !important;">';
							str+='<tr>';
								if(buildType == 'cluster'){
									str+='<th rowspan="2">Cluster</th>';
								}else{
									str+='<th rowspan="2">component</th>';
								}								
								str+='<th rowspan="2">District</th>';
								str+='<th rowspan="2">Total&nbsp;Works</th>';
								str+='<th rowspan="2">Total&nbsp;COST</th>';
								str+='<th rowspan="2">Convergence&nbsp;Cost</th>';
								str+='<th rowspan="2">Convergence&nbsp;Expenditure</th>';
								str+='<th rowspan="2">CGF</th>';
								str+='<th rowspan="2">CGF&nbsp;Expenditure</th>';
								str+='<th class="text-capital" colspan="2">Adm. sanc.</th>';
								str+='<th rowspan="2" style="background-color:#f9eee3;">Admin Efficiency &nbsp;%</th>';
								str+='<th class="text-capital" colspan="2">Not Adm. sanc.</th>';
								str+='<th class="text-capital" colspan="2">Not Tech. sanc.</th>';
								str+='<th class="text-capital" colspan="2">Tech. sanc.</th>';
								str+='<th class="text-capital" colspan="2">Not Entrusted</th>';
								str+='<th class="text-capital" colspan="2">Entrusted</th>';
								str+='<th class="text-capital" colspan="2">Not Grounded</th>';
								str+='<th class="text-capital" colspan="2">Grounded</th>';
								
								str+='<th rowspan="2" style="background-color:#f9eee3;">Grounded Efficiency &nbsp;%</th>';
								
								str+='<th class="text-capital" colspan="2">Under Progress</th>';
								str+='<th class="text-capital" colspan="2">completed</th>';
							str+='</tr>';
							str+='<tr>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
								str+='<th>Works</th>';
								str+='<th class="cSelect">Amount</th>';
								str+='<th style="display:none;">%</th>';
							str+='</tr>';
						str+='</thead>';
						str+='<tbody>';		
							for(var i in result){
								if(result[i].adminSanctioned != null && result[i].adminSanctioned>0 && result[i].grounded != null && result[i].grounded>0){
									efficiency = ((result[i].grounded *100)/result[i].adminSanctioned).toFixed(2);
								}
								if(result[i].adminSanctionedAmt != null && result[i].adminSanctionedAmt > 0 && 
								    result[i].totalCost != null && result[i].totalCost > 0){
									 adminEfficiency = ((result[i].adminSanctionedAmt * 100)/ result[i].totalCost).toFixed(2);
								 }
								 if(result[i].groundedAmt != null && result[i].groundedAmt > 0 && 
								      result[i].adminSanctioned != null && result[i].adminSanctioned >0){
									 groundedEfficiency = ((result[i].groundedAmt * 100)/ result[i].totalCost).toFixed(2);
								 }
								totalWorks =totalWorks +result[i].totalCount;
								totalCost =totalCost +parseFloat(result[i].totalCost);
								totalConvergence =totalConvergence +parseFloat(result[i].convergenceCost);
								totalConvergenceExpenditure = totalConvergenceExpenditure +parseFloat(result[i].convergenceExpenditure); 
								totalCgf =totalCgf +parseFloat(result[i].cgfCost);
								totalCgfExpenditure =totalCgfExpenditure +parseFloat(result[i].cgfAmountPaid);
								adminTotalWorks =adminTotalWorks +result[i].adminSanctioned;
								adminTotalAmount =adminTotalAmount +parseFloat(result[i].adminSanctionedAmt);
								notAdminTotalWorks =notAdminTotalWorks +result[i].notAdminSanctioned;
								if(result[i].totalCost != null && result[i].totalCost>0){
									notAdminTotalAmount =notAdminTotalAmount +parseFloat((result[i].totalCost-result[i].adminSanctionedAmt));
								}
								notTechTotalWorks = notTechTotalWorks +result[i].notTechSanctioned;
								notTechTotalAmount = notTechTotalAmount +parseFloat(result[i].notTechSanctionedAmt);
								techTotalWorks = techTotalWorks +result[i].techSanctioned;
								techTotalAmount = techTotalAmount +parseFloat(result[i].techSanctionedAmt);
								notEntrustedTotalWorks = notEntrustedTotalWorks +result[i].notEntrusted;
								notEntrustedtotalAmount = notEntrustedtotalAmount +parseFloat(result[i].notEntrustedAmt);
								entrustedTotalWorks = entrustedTotalWorks +result[i].entrusted;
								entrustedtotalAmount = entrustedtotalAmount +parseFloat(result[i].entrustedAmt);
								notGroundedTotalWorks = notGroundedTotalWorks +result[i].notGrounded;
								notGroundedtotalAmount = notGroundedtotalAmount +parseFloat(result[i].notGroundedAmt);
								groundedTotalWorks = groundedTotalWorks +result[i].grounded;
								groundedtotalAmount = groundedtotalAmount +parseFloat(result[i].groundedAmt);
								underProgressTotalWorks = underProgressTotalWorks +result[i].underProgress;
								underProgresstotalAmount = underProgresstotalAmount +parseFloat(result[i].underProgressAmt);
								compeltedTotalWorks = compeltedTotalWorks +result[i].completed;
								compeltedtotalAmount = compeltedtotalAmount +parseFloat(result[i].completedAmt);
								str+='<tr>';
									str+='<td class="odf_FixedCol" style="cursor:pointer;"><a class="clusterWiseCls" attr_phase_id="'+phaseId+'" attr_cluster_id="'+result[i].id+'" attr_cluster_name="'+result[i].name+'" attr_build_type ="'+buildType+'" style="cursor:pointer;">'+result[i].name+'</a></td>';
									str+='<td class= "odf_FixedCol">'+result[i].districtName+'</td>';
									str+='<td class= "odf_FixedCol">'+result[i].totalCount+'</td>';
									str+='<td class= "odf_FixedCol">'+result[i].totalCost+'</td>';
									str+='<td>'+result[i].convergenceCost+'</td>';
									str+='<td>'+result[i].convergenceExpenditure.toFixed(2)+'</td>';
									str+='<td>'+result[i].cgfCost+'</td>';
									str+='<td>'+result[i].cgfAmountPaid+'</td>';									
									
									if(result[i].adminSanctioned !=null && result[i].adminSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Admin Sanctioned"  attr_build_type ="'+buildType+'">'+result[i].adminSanctioned+'</a></td>';
									}else{
										str+='<td>'+result[i].adminSanctioned+'</td>';
									}
									str+='<td class="clusterAmountView">'+result[i].adminSanctionedAmt+'</td>';
									
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].adminSanctionedPerc+'</td>';
									str+='<td style="background-color:#f9eee3;">'+adminEfficiency+'&nbsp;%</td>';
									//not admin sanctioned
									if(result[i].notAdminSanctioned !=null && result[i].notAdminSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Not Admin Sanctioned"  attr_build_type ="'+buildType+'">'+result[i].notAdminSanctioned+'</a></td>';
									}else{
										str+='<td>-</td>';
									}
									if(result[i].totalCost!=null && result[i].totalCost>0){
										str+='<td class="clusterAmountView">'+parseFloat(result[i].totalCost-result[i].adminSanctionedAmt).toFixed(2)+'</td>';
									}else{
										str+='<td>-</td>';
									}
									
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].notAdminSanctionedPer+'</td>';
									//str+='<td>'+result[i].notTechSanctioned+'</td>';
									if(result[i].notTechSanctioned !=null && result[i].notTechSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Not Technical"  attr_build_type ="'+buildType+'">'+result[i].notTechSanctioned+'</a></td>';
									} else{
										str+='<td>'+result[i].notTechSanctioned+'</td>';
									}
									
									str+='<td class="clusterAmountView">'+result[i].notTechSanctionedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].notTechSanctionedPerc+'</td>';
									//str+='<td>'+result[i].techSanctioned+'</td>';	
									if(result[i].techSanctioned !=null && result[i].techSanctioned>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Technical Sanctioned"  attr_build_type ="'+buildType+'">'+result[i].techSanctioned+'</a></td>';
									} else{
										str+='<td>'+result[i].techSanctioned+'</td>';
									}
									
									str+='<td class="clusterAmountView">'+result[i].techSanctionedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].techSanctionedPerc+'</td>';
									//str+='<td>'+result[i].notEntrusted+'</td>';
									if(result[i].notEntrusted !=null && result[i].notEntrusted>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Not Entrusted" attr_build_type ="'+buildType+'">'+result[i].notEntrusted+'</a></td>';
									} else{
										str+='<td>'+result[i].notEntrusted+'</td>';
									}
									str+='<td class="clusterAmountView">'+result[i].notEntrustedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].notEntrustedPerc+'</td>';
									//str+='<td>'+result[i].entrusted+'</td>';
									if(result[i].entrusted !=null && result[i].entrusted>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+'attr_deptId="0" attr_statusName="Entrusted"  attr_build_type ="'+buildType+'">'+result[i].entrusted+'</a></td>';
									} else{
										str+='<td>'+result[i].entrusted+'</td>';
									}
									str+='<td class="clusterAmountView">'+result[i].entrustedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].entrustedPerc+'</td>';
									//str+='<td>'+result[i].notGrounded+'</td>';
									if(result[i].notGrounded !=null && result[i].notGrounded>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Not Grounded"  attr_build_type ="'+buildType+'">'+result[i].notGrounded+'</a></td>';
									} else{
										str+='<td>'+result[i].notGrounded+'</td>';
									}
									
									str+='<td class="clusterAmountView">'+result[i].notGroundedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].notGroundedPerc+'</td>';
									//str+='<td>'+result[i].grounded+'</td>';
									if(result[i].grounded !=null && result[i].grounded>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Grounded"  attr_build_type ="'+buildType+'">'+result[i].grounded+'</a></td>';
									} else{
										str+='<td>'+result[i].grounded+'</td>';
									}
									
									str+='<td class="clusterAmountView">'+result[i].groundedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].groundedPerc+'</td>';
									//str+='<td>'+result[i].underProgress+'</td>';
									str+='<td style="background-color:#f9eee3;">'+groundedEfficiency+'&nbsp;%</td>';
									
									if(result[i].underProgress !=null && result[i].underProgress>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="In Progress" attr_build_type ="'+buildType+'">'+result[i].underProgress+'</a></td>';
									} else{
										str+='<td>'+result[i].underProgress+'</td>';
									}
									
									str+='<td class="clusterAmountView">'+result[i].underProgressAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].underProgressPerc+'</td>';
									//str+='<td>'+result[i].completed+'</td>';
									if(result[i].completed !=null && result[i].completed>0){
										str+='<td style="cursor:pointer;"><a class="worksDetailsCls" attr_phaseId='+phaseId+' attr_clusterId='+result[i].id+' attr_clusterName='+result[i].name+' attr_deptId="0" attr_statusName="Completed" attr_build_type ="'+buildType+'">'+result[i].completed+'</a></td>';
									}else{
										str+='<td>'+result[i].completed+'</td>';
									}
									str+='<td class="clusterAmountView">'+result[i].completedAmt+'</td>';
									str+='<td class="clusterPercentageView" style="display:none">'+result[i].completedPerc+'</td>';
								str+='</tr>';
							}
						if(adminTotalAmount != null && adminTotalAmount>0 && totalCost != null && totalCost>0){
								totalAdminEfficiency = (adminTotalAmount * 100)/totalCost;
							}
							if(groundedtotalAmount != null && groundedtotalAmount>0 && totalCost != null && totalCost>0){
								totalGroundedEfficiency = (groundedtotalAmount * 100)/totalCost;
							}
							
							adminSanctionedPerc = (adminTotalWorks*100/totalWorks).toFixed(2);
							notAdminSanctionedPer = (notAdminTotalWorks*100/totalWorks).toFixed(2);
							notTechSanctionedPerc = (notTechTotalWorks*100/totalWorks).toFixed(2);
							techSanctionedPerc = (techTotalWorks*100/totalWorks).toFixed(2);
							notEntrustedPerc = (notEntrustedTotalWorks*100/totalWorks).toFixed(2);
							entrustedPerc = (entrustedTotalWorks*100/totalWorks).toFixed(2);
							notGroundedPerc = (notGroundedTotalWorks*100/totalWorks).toFixed(2);
							groundedPerc = (groundedTotalWorks*100/totalWorks).toFixed(2);
							underProgressPerc = (underProgressTotalWorks*100/totalWorks).toFixed(2);
							completedPerc = (compeltedTotalWorks*100/totalWorks).toFixed(2);
							str+='<tr>';							
								str+='<td class="odf_FixedCol">Total</td>';
								str+='<td class="odf_FixedCol">-</td>';
								if(totalWorks != null && totalWorks>0){
									str+='<td class="odf_FixedCol">'+totalWorks+'</td>';
								}else{
									str+='<td class="odf_FixedCol">-</td>';
								}
								if(totalCost != null && totalCost>0){
									str+='<td class="odf_FixedCol">'+totalCost.toFixed(2)+'</td>';
								}else{
									str+='<td class="odf_FixedCol">-</td>';
								}
								if(totalConvergence != null && totalConvergence>0){
									str+='<td>'+totalConvergence.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalConvergenceExpenditure != null && totalConvergenceExpenditure>0){
									str+='<td>'+totalConvergenceExpenditure.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCgf != null && totalCgf>0){
									str+='<td>'+totalCgf.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalCgfExpenditure != null && totalCgfExpenditure>0){
									str+='<td>'+totalCgfExpenditure.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}								
								if(adminTotalWorks != null && adminTotalWorks>0){
									str+='<td>'+adminTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(adminTotalAmount != null && adminTotalAmount>0){
									str+='<td class="clusterAmountView">'+adminTotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalAdminEfficiency != null && totalAdminEfficiency>0){
									str+='<td style="background-color:#f9eee3;">'+totalAdminEfficiency.toFixed(2)+'&nbsp;%</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+adminSanctionedPerc+'</td>';
								if(notAdminTotalWorks != null && notAdminTotalWorks>0){
									str+='<td>'+notAdminTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(notAdminTotalAmount != null && notAdminTotalAmount>0){
									str+='<td class="clusterAmountView">'+notAdminTotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+notAdminSanctionedPer+'</td>';
								if(notTechTotalWorks != null && notTechTotalWorks>0){
									str+='<td>'+notTechTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(notTechTotalAmount != null && notTechTotalAmount>0){
									str+='<td class="clusterAmountView">'+notTechTotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+notTechSanctionedPerc+'</td>';
								if(techTotalWorks != null && techTotalWorks>0){
									str+='<td>'+techTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(techTotalAmount != null && techTotalAmount>0){
									str+='<td class="clusterAmountView">'+techTotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+techSanctionedPerc+'</td>';
								if(notEntrustedTotalWorks != null && notEntrustedTotalWorks>0){
									str+='<td>'+notEntrustedTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(notEntrustedtotalAmount != null && notEntrustedtotalAmount>0){
									str+='<td class="clusterAmountView">'+notEntrustedtotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+notEntrustedPerc+'</td>';
								if(entrustedTotalWorks != null && entrustedTotalWorks>0){
									str+='<td class="clusterAmountView">'+entrustedTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(entrustedtotalAmount != null && entrustedtotalAmount>0){
									str+='<td class="clusterAmountView">'+entrustedtotalAmount+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+entrustedPerc+'</td>';
								if(notGroundedTotalWorks != null && notGroundedTotalWorks>0){
									str+='<td>'+notGroundedTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(notGroundedtotalAmount != null && notGroundedtotalAmount>0){
									str+='<td class="clusterAmountView">'+notGroundedtotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+notGroundedPerc+'</td>';
								if(groundedTotalWorks != null && groundedTotalWorks>0){
									str+='<td>'+groundedTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(groundedtotalAmount != null && groundedtotalAmount>0){
									str+='<td class="clusterAmountView">'+groundedtotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(totalGroundedEfficiency != null && totalGroundedEfficiency>0){
									str+='<td style="background-color:#f9eee3;">'+totalGroundedEfficiency.toFixed(2)+'&nbsp;%</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+groundedPerc+'</td>';
								if(underProgressTotalWorks != null && underProgressTotalWorks>0){
									str+='<td>'+underProgressTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(underProgresstotalAmount != null && underProgresstotalAmount>0){
									str+='<td class="clusterAmountView">'+underProgresstotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+underProgressPerc+'</td>';
								if(compeltedTotalWorks != null && compeltedTotalWorks>0){
									str+='<td>'+compeltedTotalWorks+'</td>';
								}else{
									str+='<td>-</td>';
								}
								if(compeltedtotalAmount != null && compeltedtotalAmount>0){
									str+='<td class="clusterAmountView">'+compeltedtotalAmount.toFixed(2)+'</td>';
								}else{
									str+='<td>-</td>';
								}
								str+='<td class="clusterPercentageView" style="display:none">'+completedPerc+'</td>';
							str+='</tr>';
						str+='</tbody>';						
					str+='</table>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	
	$("#collapseTableViewBlockId"+phaseId).html(str);
	$("#"+buildType+'_'+phaseId+"DataTable").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]],
		"scrollX":        true,		
		"scrollCollapse": true,	
		"fixedColumns":   {"leftColumns": 4,}
	});
	$(".DTFC_LeftBodyLiner").css({
			"overflow-x":"hidden",
			"overflow-y":"hidden",			
			"top": "2px",
			"width": "auto"
	});		 
	 
	
}

$(document).on('click', '[name="deptSelect"]', function (){
	var divId = "collapseTableViewBlockId"+$(this).attr("attr_phaseId");
	$('.rSelect').html($(this).val());	
    var dt = $(this).attr("attr_dttb_id");	
	if($('input[name="deptSelect"]:checked').val()=='%'){
		$('.amountView').hide();
		$('.percentageView').show();
	}else if($('input[name="deptSelect"]:checked').val()=='Amount'){						
		$('.amountView').show();
		$('.percentageView').hide();
	}
	$('#'+dt).DataTable().destroy();
	dataTableReinitialise(dt,2);
});
//CLUSTER WISE	
$(document).on('click', '[name="clusterSelect"]', function (){
	var divId = "collapseTableViewBlockId"+$(this).attr("attr_phaseId");
	$('.cSelect').html($(this).val());
	var dt = $(this).attr("attr_dt_id");
	if($('input[name="clusterSelect"]:checked').val()=='%'){
		$('.clusterAmountView').hide();
		$('.clusterPercentageView').show();
	}else if($('input[name="clusterSelect"]:checked').val()=='Amount'){			
		$('.clusterAmountView').show();
		$('.clusterPercentageView').hide();
	}
	$('#'+dt).DataTable().destroy();
	dataTableReinitialise(dt,4);
}); 	
function dataTableReinitialise(dt,fixedCols){
	//var dataTableId = $("#"+divId).find('.dataTables_wrapper').attr('id'),
	//	dataTableId = dataTableId.split("_")[0];
	//$("#"+dataTableId).dataTable().destroy();
	$("#"+dt).dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]],
		"scrollX":        true,		
		"scrollCollapse": true,	
		"fixedColumns":   {
			"leftColumns": fixedCols,
		}
	});
	$(".DTFC_LeftBodyLiner").css({
			"overflow-x":"hidden",
			"overflow-y":"hidden",	
			"top":"2px",
			"width": "auto"
			
	});	
} 
//COMPONENT WISE
$(document).on('click', '[name="componentSelect"]', function (){
	var divId = "collapseTableViewBlockId"+$(this).attr("attr_phaseId");
	$('.cSelect').html($(this).val());
	$("#collapseTableViewBlockId").find('.dataTables_info').parent('.row').css('margin-top','30px');
	var dt = $(this).attr("attr_dt_id");
	if($('input[name="componentSelect"]:checked').val()=='%'){
		$('.clusterAmountView').hide();
		$('.clusterPercentageView').show();
	}else if($('input[name="componentSelect"]:checked').val()=='Amount'){							
		$('.clusterAmountView').show();
		$('.clusterPercentageView').hide();
	}
	$('#'+dt).DataTable().destroy();
	dataTableReinitialise(dt,4);
});
//DEPARTMENT WISE
$(document).on("click",".clusterWiseCls",function(){
	$('#worksModalId').find('button').addClass("closeShowPdfCls");
	var cluster_id = $(this).attr("attr_cluster_id");
	var cluster_name = $(this).attr("attr_cluster_name");
	var phaseId = $(this).attr("attr_phase_id");
	var buildType = $(this).attr("attr_build_type");
	$("#clusterModalId").modal("show");
	$("#headingId").html(cluster_name+" - Details");
	getDepartmentWiseDetails(phaseId,cluster_id,buildType);		
});
$(document).on("click",".worksDetailsCls",function(){	
	var phaseId = $(this).attr("attr_phaseId");
	var clusterId = $(this).attr("attr_clusterId");
	var clusterName = $(this).attr("attr_clusterName");
	var deptId = $(this).attr("attr_deptId");
	var deptName = $(this).attr("attr_deptName");
	var statusName = $(this).attr("attr_statusName");
	var buildType = $(this).attr("attr_build_type")
	$("#worksModalId").modal("show");
	if(typeof(clusterName) == "undefined"){
		$("#headingTitle").html(statusName+" - Works");
	}else{
		$("#headingTitle").html(clusterName+" "+statusName+" - Works");
	}
	getWorksList(phaseId,clusterId,deptId,statusName,buildType);
});

function getWorksList(phaseId,clusterId,deptId,statusName,buildType){ 
	$("#worksDetailsId").html(spinner);
	var json={
		phaseId : phaseId,
		clusterId : clusterId,
		departmentId : deptId,
		statusName : statusName,
		buildType : buildType
	}
	$.ajax({
		type:'POST',
		url:'getStatusWiseRecords',
		datatType:'json',
		data: JSON.stringify(json),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length>0){
			buildWorksList(result);
		}else{
			$("#worksDetailsId").html("No Data Available")
		}
	})
}
function buildWorksList(result){
	var str='';
	str+='<div class="row m_top10">';
	str+='<div class="col-sm-12">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_Rurban" id="dataTableAll" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th>Work Id</th>';
						str+='<th>Work Name</th>';
						str+='<th>Department</th>';
						str+='<th>Total Cost</th>';
						str+='<th>Admin Sanctioned Amount</th>';
						str+='<th>Convergence</th>';
						str+='<th>CGF</th>';
						str+='<th>CGF Expenditure</th>';
						str+='<th>Conv. Expenditure</th>';
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
						str+='<td>'+result[i].id+'</span></td>';
						
						if(result[i].name !=null && result[i].name.length>20){
							str+='<td><span data-toogle="tooltip" data-placement="right" title="'+result[i].name+'" class="tooltipCls">'+result[i].name.substring(0,20)+'...</span></td>';
						}else{
							str+='<td>'+result[i].name+'</td>';
						}
						
						str+='<td>'+result[i].departmentName+'</td>';
						str+='<td>'+result[i].totalCost+'</td>';
						str+='<td>'+result[i].adminSanctionedAmount+'</td>';
						str+='<td>'+result[i].convergenceCost+'</td>';
						str+='<td>'+result[i].cgfCost+'</td>';
						str+='<td>'+result[i].cgfAmountPaid+'</td>';
						str+='<td>'+result[i].convergenceExpenditure+'</td>';
						str+='</tr>';
					}
				str+='</tbody>';
			str+='<table>';
		str+='</div>';
	str+='</div>';
	str+='</div>';
	$("#worksDetailsId").html(str);
	$(".tooltipCls").tooltip();
	$("#dataTableAll").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 20, 30,50, -1], [10, 20, 30,50, "All"]],
		"dom": "<'row'<'col-sm-4'l><'col-sm-6'f><'col-sm-2'B>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Rurban',
				filename:  'Rurban'+''+moment().format("DD/MMMM/YYYY  HH:MM"),
			}
		]
	});
}
$(document).on('click', '.phaseWiseDetailsCls', function (){
	$(".removeCls").removeClass('active_panel_rUrban');
	$(this).addClass('active_panel_rUrban');
	var phaseId = $(this).attr("attr_phaseId");	
	phaseWiseBlockDetails("levelWise",phaseId);
});
$(document).on("click",".closeShowPdfCls",function(){
    setTimeout(function(){
      $('body').addClass("modal-open");
    }, 500);
	$('#worksModalId button').removeClass("closeShowPdfCls");
  });
$(document).on("click",".workWiseDetailsCls li",function(){
	$(this).closest("ul").find("li").removeClass("active");
	$(this).addClass("active");
	var type = $(this).attr("attr_type");
	var levelId = $(this).attr("attr_level_id");
	if(type == "cluster"){
		getClusterWiseCounts(levelId,"cluster");		
	}else if(type =="component"){
		getComponentWiseCounts(levelId,"component");
	}else if(type =="department"){
		getDepartmentWiseDetails(levelId,0);
	}
});
$(document).on("click",".clusterClose",function(){
	$('#worksModalId').find('button').removeClass("closeShowPdfCls");
})
