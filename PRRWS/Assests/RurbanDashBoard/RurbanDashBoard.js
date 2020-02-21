var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var smallSpinner = '<img src="Assests/images/spinner.gif" style="width:25px;height:25px;"/>';
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
var levelNamesArr=[{name:'Phase',id:'1'},{name:'Phase',id:'2'},{name:'Phase',id:'3'}];
onloadCalls();
function onloadCalls(){
	getPhaseWiseCounts(0);
	phaseWiseBlockDetails("levelWise");
}

function getPhaseWiseCounts(phaseId){ //Main Call
	$("#phaseWiseDetails").html(spinner)
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
			buildPhaseWiseCounts(result);
		}else{
			$("#phaseWiseDetails").html("No Data Available")
		}
	})
}

function buildPhaseWiseCounts(result){
	var str='';
	var panelBackgroundColors=[{headText:"#107239",headColor:"#67d78f",bodyColor:"#b6e9cb"},{headText:"#c8630c",headColor:"#ec9957",bodyColor:"#f6d8bd"},{headText:"#0b5a90",headColor:"#62aee2",bodyColor:"#abd1ec"},];
	for(var i in result){
		str+='<div class="col-sm-4">';
			str+='<div class="panel" style="box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);">';
				str+='<div class="panel-heading" style="background-color:'+panelBackgroundColors[i].bodyColor+'">';
					str+='<div class="row">';
						str+='<div class="col-sm-6">';
							str+='<h3 class="text-capital">phase&nbsp;&nbsp;-&nbsp;&nbsp;<span style="color:'+panelBackgroundColors[i].headText+';">'+result[i].phaseId+'</span></h3>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<span class="pull-right">';
								str+='<h6 class="font_weight">Start Date</h6>';
								str+='<h6>'+result[i].startDate+'</h6>';
							str+='</span>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
				str+='<div class="panel-body" style="background-color:white_color !important; border: 1px solid '+panelBackgroundColors[i].bodyColor+'">';
					str+='<div class="row">';
							str+='<div class="col-sm-4">';
								str+='<div class="row m_top10 text-center">';
									str+='<h5 class="text-capital ">total works</h5>';
									if(result[i].totalCount !=null && result[i].totalCount>0){
										str+='<h4 class="font_weight m_top10" style="color:#418cf0">'+result[i].totalCount+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10" style="color:#418cf0">-</h4>';
									}
								str+='</div>';
								str+='<hr class="hidden-sm hidden-xs m_top_bottom_5">';
								str+='<div class="row m_top10 text-center">';
									str+='<h5 class="text-capital ">total cost</h5>';
									if(result[i].totalCost !=null && result[i].totalCost>0){
										str+='<h4 class="font_weight m_top10" style="color:#c61379">'+result[i].totalCost+'</h4>';
									}else{
										str+='<h4 class="font_weight m_top10" style="color:#c61379"> - </h4>';
									}									
								str+='</div>';
							str+='</div>';					
							str+='<div class="col-sm-8">';
								str+='<div class="br_left">';
									str+='<div class="row">';
										str+='<div class="col-sm-12">';
											str+='<div class="col-sm-6">';
												str+='<h6 class="text-capital m_top10">Conv. Fund</h6>';
												if(result[i].convergenceCost !=null && result[i].convergenceCost>0){
													str+='<h4 class="good_color font_weight m_top10">'+result[i].convergenceCost+'</h4>';
												}else{
													str+='<h4 class="good_color font_weight m_top10"> - </h4>';
												}
												
											str+='</div>';
											str+='<div class="col-sm-6">';
												str+='<h6 class="text-capital m_top10">CGF Fund</h6>';
												if(result[i].cgfCost !=null && result[i].cgfCost>0){
													str+='<h4 class="bad_color font_weight m_top10">'+result[i].cgfCost+'</h4>';
												}else{
													str+='<h4 class="bad_color font_weight m_top10"> - </h4>';
												}												
											str+='</div>';								
										str+='</div>';
									str+='</div>';
									str+='<hr class="hidden-sm hidden-xs m_top_bottom_5">';
									str+='<div class="row">';
										str+='<div class="col-sm-12">';
											str+='<div class="col-sm-6">';
												str+='<h6 class="text-capital m_top10">CGF Released</h6>';
												if(result[i].cgfAmountPaid !=null && result[i].cgfAmountPaid>0){
													str+='<h4 class="good_color_light font_weight m_top20">'+result[i].cgfAmountPaid+'</h4>';
												}else{
													str+='<h4 class="good_color_light font_weight m_top20"> - </h4>';
												}													
											str+='</div>';
											str+='<div class="col-sm-6">';
												str+='<h6 class="text-capital m_top10">Admin Sanctioned</h6>';
												if(result[i].adminSanctionedAmount !=null && result[i].adminSanctionedAmount>0){
													str+='<h4 class="pending_color font_weight m_top10">'+result[i].adminSanctionedAmount+'</h4>';
												}else{
													str+='<h4 class="pending_color font_weight m_top10"> - </h4>';
												}													
											str+='</div>';
										str+='</div>';	
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					/* str+='<div class="row">';
						str+='<div class="col-sm-6 col-xs-6 m_top10">';
							str+='<h5 class=" text-capital font_weight ">Total Works</h5>';
							if(result[i].totalCount !=null && result[i].totalCount>0){
								str+='<h4 class="font_weight m_top10 white_color">'+result[i].totalCount+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10 white_color"> - </h4>';
							}
							
						str+='</div>';
						str+='<div class="col-sm-6 col-xs-6 m_top10">';
							str+='<h5 class=" text-capital font_weight">Total Cost</h5>';
							str+='<h4 class="font_weight m_top10">'+result[i].totalCount+'</h4>';
							
						str+='</div>';
						str+='<div class="col-sm-6 col-xs-6 m_top10">';
							str+='<h5 class=" text-capital font_weight">Conv. Fund</h5>';
							if(result[i].convergenceCost !=null && result[i].convergenceCost>0){
								str+='<h4 class="font_weight m_top10 white_color">'+result[i].convergenceCost+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10 white_color"> - </h4>';
							}
							
						str+='</div>';
						str+='<div class="col-sm-6 col-xs-6 m_top10">';
							str+='<h5 class=" text-capital font_weight">CGF Fund</h5>';
							if(result[i].cgfCost !=null && result[i].cgfCost>0){
								str+='<h4 class="font_weight m_top10 white_color" >'+result[i].cgfCost+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10 white_color"> - </h4>';
							}
							
						str+='</div>';
						str+='<div class="col-sm-6 col-xs-6 m_top10">';
							str+='<h5 class=" text-capital font_weight">CGF Released</h5>';
							if(result[i].cgfAmountPaid !=null && result[i].cgfAmountPaid>0){
								str+='<h4 class="font_weight m_top10 white_color" >'+result[i].cgfAmountPaid+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10 white_color"> - </h4>';
							}
							
						str+='</div>';
						str+='<div class="col-sm-6 col-xs-6 m_top10">';
							str+='<h5 class=" text-capital font_weight">Admin Sanctioned</h5>';
							if(result[i].adminSanctionedAmount !=null && result[i].adminSanctionedAmount>0){
								str+='<h4 class="font_weight m_top10 white_color" >'+result[i].adminSanctionedAmount+'</h4>';
							}else{
								str+='<h4 class="font_weight m_top10 white_color"  > - </h4>';
							}
							
						str+='</div>';
					str+='</div>';								 */
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	$('#phaseWiseDetails').html(str);
}


function phaseWiseBlockDetails(divId)
{
	var collapse='';
				for(var i in levelNamesArr)
				{
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
									collapse+='<div class="row">';
										collapse+='<div class="col-sm-12 m_top10">';
											collapse+='<h4 class="text-capital m_top10">Status wise details</h4>';
											collapse+='<div style="box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);" class="m_top10">';
												collapse+='<div id="collapseGraphViewBlockId'+levelNamesArr[i].id+'" style="height:300px;"></div>';
											collapse+='</div>';
										collapse+='</div>';
									collapse+='</div>';
									collapse+='<div class="row">';
										collapse+='<div id="collapseTableViewBlockId'+levelNamesArr[i].id+'"></div>';
									collapse+='</div>';
									collapse+='<div class="row">';
										collapse+='<div id="collapseLastTableViewBlockId'+levelNamesArr[i].id+'"></div>';
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
			getDepartmentWiseDetails(levelNamesArr[i].id,0);
			getStatusWiseDetails(levelNamesArr[i].id);
			getClusterWiseCounts(levelNamesArr[i].id);
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
			str+='<div class="pad_15">';
				str+='<div class="row" style="box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);border: 1px solid #ccc;">';
					str+='<div class="col-sm-2 " style="background-color: #dbe5f3;padding: 20px;">';
						str+='<h5 class=" text-capital">Total Works</h5>';
						if(result[i].totalCount !=null && result[i].totalCount>0){
							str+='<h4 class="font_weight m_top10 " style="color:#418cf0">'+result[i].totalCount+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10 " style="color:#418cf0"> - </h4>';
						}
						
					str+='</div>';
					str+='<div class="col-sm-2 " style="background-color: #ecd3f0;padding: 20px">';
						str+='<h5 class=" text-capital">Total Cost</h5>';
						if(result[i].totalCost !=null && result[i].totalCost>0){
							str+='<h4 class="font_weight m_top10 " style="color:#c61379">'+result[i].totalCost+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10 " style="color:#c61379"> - </h4>';
						}
						
					str+='</div>';
					str+='<div class="col-sm-2 " style="background-color: #d3e9d4;padding: 20px;">';
						str+='<h5 class=" text-capital">Conv. Fund</h5>';
						if(result[i].convergenceCost !=null && result[i].convergenceCost>0){
							str+='<h4 class="font_weight m_top10 good_color">'+result[i].convergenceCost+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10 good_color"> - </h4>';
						}
						
					str+='</div>';
					str+='<div class="col-sm-2 " style="background-color: #eabebe;padding: 20px;">';
						str+='<h5 class=" text-capital">CGF Fund</h5>';
						if(result[i].cgfCost !=null && result[i].cgfCost>0){
							str+='<h4 class="font_weight m_top10 bad_color" >'+result[i].cgfCost+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10 bad_color" > - </h4>';
						}
						
					str+='</div>';
					str+='<div class="col-sm-2 " style="background-color: #f9c6b1;padding: 20px;">';
						str+='<h5 class=" text-capital">CGF Released</h5>';
						if(result[i].cgfAmountPaid !=null && result[i].cgfAmountPaid>0){
							str+='<h4 class="font_weight m_top10" style="color:#ff5e1c">'+result[i].cgfAmountPaid+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10" style="color:#ff5e1c"> - </h4>';
						}
						
					str+='</div>';
					str+='<div class="col-sm-2 "style="background-color: #efd5a8;padding: 20px">';
						str+='<h5 class=" text-capital">Admin Sanctioned</h5>';
						if(result[i].adminSanctionedAmount !=null && result[i].adminSanctionedAmount>0){
							str+='<h4 class="font_weight m_top10  pending_color"  >'+result[i].adminSanctionedAmount+'</h4>';
						}else{
							str+='<h4 class="font_weight m_top10  pending_color"  > - </h4>';
						}
						
					str+='</div>';
				str+='</div>';
			str+='</div>';
		}
	
		$("#collapseMainOverViewBlockId"+phaseId).html(str);
	}
	function  getDepartmentWiseDetails(phaseId,clusterId){//second Block in Collapse
	if(clusterId == 0){
		$("#collapseTableViewBlockId"+phaseId).html(spinner);
	}else{
		$("#clusterWiseDetailsId").html(spinner);
	}
	
		var json = {
			phaseId : phaseId,
			clusterId:clusterId
		}
		$.ajax({
			type:'POST',    
			url: 'getDepartmentWiseDetails',
			dataType: 'json',
			data : JSON.stringify(json),
			beforeSend :   function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(result){
			if(result !=null && result.length>0){
				buildDepartmentWiseDetails(result,phaseId,clusterId);
			}else{
				if(clusterId == 0){
					$("#collapseTableViewBlockId"+phaseId).html("");
				}else{
					$("#clusterWiseDetailsId").html("No Data Available");
				}
				
			}
		})
	}
	function buildDepartmentWiseDetails(result,phaseId,clusterId){
		var str='';
		str+='<div class="col-sm-12 m_top10">';
		str+='<h4 class="text-capital m_top10">Department wise details</h4>';
		str+='<div class="m_top10" style="box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_Rurban" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2"></th>';
						for(var i in result[0].subList){
							str+='<th  colspan="2">'+result[0].subList[i].name+'</th>';
						}
					str+='</tr>';
					str+='<tr>';
						for(var i in result[0].subList){
							str+='<th>Works</th>';
							str+='<th>Amount</th>';
						}
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td>'+result[i].departmentName+'</td>';
							for(var j in result[i].subList){
								if(typeof result[i].subList[j].count == "undefined" || typeof result[i].subList[j].count == undefined || typeof result[i].subList[j].count == null){
									str+='<td> - </td>';
								}else{
									str+='<td>'+result[i].subList[j].count+'</td>';
								}
								
								if(typeof result[i].subList[j].totalCost == "undefined" || typeof result[i].subList[j].totalCost == undefined || typeof result[i].subList[j].totalCost == null){
									str+='<td> - </td>';
								}else{
									str+='<td>'+result[i].subList[j].totalCost+'</td>';
								}
							}
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
		dataTopicInDebatesArr.push({y:result.adminSanctioned,"extra":''},{y:result.notTechSanctioned,"extra":result.notTechSanctionedPerc},{y:result.techSanctioned,"extra":result.techSanctionedPerc},{y:result.notEntrusted,"extra":result.notEntrustedPerc},{y:result.entrusted,"extra":result.entrustedPerc},{y:result.notGrounded,"extra":result.notGroundedPerc},{y:result.grounded,"extra":result.groundedPerc},{y:result.underProgress,"extra":result.underProgressPerc},{y:result.completed,"extra":result.completedPerc});
		categoriesTopicInDebatesArr.push('Admin Sanctioned','Not Tech. Sanctioned','Tech. Sanctioned','Not Entrusted','Entrusted','Not Grounded','Grounded','Under Progress','Completed');
	console.log(dataTopicInDebatesArr)	
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
				gridLineWidth: 15,
				colorByPoint: true
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
	
function getClusterWiseCounts(phaseId){
	var json={
		phaseId : phaseId
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
			buildClusterWiseCounts(result,phaseId);
		}else{
			$("#collapseLastTableViewBlockId"+phaseId).html('');
		}
	})
}

function buildClusterWiseCounts(result,phaseId){
	var str='';
		str+='<div class="col-sm-12 m_top10">';
		str+='<h4 class="m_top10 text-capital">cluster wise details</h4>';
		str+='<div class="m_top10" style="box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);">';
		str+='<div class="table-responsive">';
			str+='<table class="table table-bordered table_custom_Rurban" style="width:100%;">';
				str+='<thead>';
					str+='<tr>';
						str+='<th rowspan="2">Cluster</th>';
						str+='<th rowspan="2">District</th>';
						str+='<th rowspan="2">Total&nbsp;Works</th>';
						str+='<th rowspan="2">Total&nbsp;COST</th>';
						str+='<th rowspan="2">Convergence&nbsp;Cost</th>';
						str+='<th rowspan="2">CGF</th>';
						str+='<th rowspan="2">CGF&nbsp;Released</th>';
						for(var i in result[0].subList1){
							str+='<th  colspan="2">'+result[0].subList1[i].name+'</th>';
						}
					str+='</tr>';
					str+='<tr>';
						for(var i in result[0].subList1){
							str+='<th>Works</th>';
							str+='<th>Amount</th>';
						}
					str+='</tr>';
				str+='</thead>';
				str+='<tbody>';
					for(var i in result){
						str+='<tr>';
							str+='<td><a class="clusterWiseCls" attr_phase_id="'+phaseId+'" attr_cluster_id="'+result[i].clusterId+'" attr_cluster_name="'+result[i].clusterName+'" style="cursor:pointer;">'+result[i].clusterName+'</a></td>';
							str+='<td>'+result[i].districtName+'</td>';
							str+='<td>'+result[i].totalCount+'</td>';
							str+='<td>'+result[i].totalCost+'</td>';
							str+='<td>'+result[i].convergenceCost+'</td>';
							str+='<td>'+result[i].cgfCost+'</td>';
							str+='<td>'+result[i].cgfAmountPaid+'</td>';
							
							for(var j in result[i].subList1){
								if(typeof result[i].subList1[j].totalCount == "undefined" || typeof result[i].subList1[j].totalCount == undefined || typeof result[i].subList1[j].totalCount == null){
									str+='<td> - </td>';
								}else{
									str+='<td>'+result[i].subList1[j].totalCount+'</td>';
								}
								
								if(typeof result[i].subList1[j].totalCost == "undefined" || typeof result[i].subList1[j].totalCost == undefined || typeof result[i].subList1[j].totalCost == null){
									str+='<td> - </td>';
								}else{
									str+='<td>'+result[i].subList1[j].totalCost+'</td>';
								}
							}
						str+='</tr>';
					}
				str+='</tbody>';
			str+='</table>';
		str+='</div>';
		str+='</div>';
		str+='</div>';
	
	$("#collapseLastTableViewBlockId"+phaseId).html(str);
	
}
$(document).on("click",".clusterWiseCls",function(){
	
	var cluster_id = $(this).attr("attr_cluster_id")
	var cluster_name = $(this).attr("attr_cluster_name")
	var phaseId = $(this).attr("attr_phase_id")
	$("#clusterModalId").modal("show");
	$("#headingId").html(cluster_name+" Wise Details");
	getDepartmentWiseDetails(phaseId,cluster_id);
		
});