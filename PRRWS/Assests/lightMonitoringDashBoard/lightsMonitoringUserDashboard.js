var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
var globalComponentTypeId = 1;
var locationArr = ["district","mandal","panchayat"];
setTimeout(function(){
 onloadCallsUserDashboard();
},1000);
function onloadCallsUserDashboard(){
	getInstallationStockandPaymentsDetailsbyVendor();
	getUserDashboardRunRate();
	//getVendorWiseLocationDetails();
	//getLedandCcmsVendorandComponentWiseDetails();
	buildlevelWiseLEDInstallationDetails("ledUser");
	getLEDInstallationTrendingDetails();
}
function getInstallationStockandPaymentsDetailsbyVendor(){
	$('#installationStockPaymentDetailsDivId').html(spinner);
	var json = {
			lightsVendorId : globalVendorId,
			ledComponentTypeId:globalComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getInstallationStockandPaymentsDetailsbyVendor',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildInstallationStockandPaymentsDetailsbyVendor(result);
		}
	
	});
}

function buildInstallationStockandPaymentsDetailsbyVendor(result){
	var str='';
	str+='<div class="box_shadow_grievance pad_10 m_top10">';
		str+='<h4 class="blueCol font_weight text-capital">User Dashboard</h4>';
		str+='<div class="row m_top10">';
			str+='<div class="col-sm-7">';
				str+='<div class="row">';
					str+='<div class="col-sm-4">';
						str+='<div class="panel panel-default panelGreen">';
							str+='<div class="panel-heading">';
								str+='<h4 class="font_weight">LED Installation</h4>';
							str+='</div>';
							str+='<div class="pad_10">';
								str+='<div class="row">';
									str+='<div class="col-sm-12 text-center">';
										str+='<h5 class="fontawesome">Target</h5>';
										if(result.target != null ){
											str+='<h5 class="m_top5 font_weight">'+result.target+'</h5>';
										}else{
											str+='<h5 class="m_top5 font_weight">-</h5>';
										}
										
									str+='</div>';
								str+='</div>';
								str+='<hr class="m_top_bottom_5">';
								str+='<div class="row m_top10">';
									str+='<div class="col-sm-6 greyborder_right text-center">';
										str+='<h5 class="m_top5">Fitted</h5>';
										if(result.ledFitted != null && result.ledFitted > 0){
											str+='<h5 class="m_top5 font_weight">'+result.ledFitted+'</h5>';
										}else{
											str+='<h5 class="m_top5 font_weight">-</h5>';
										}
										if(result.ledFittedPerc != null && result.ledFittedPerc > 0){
											str+='<h5 class="m_top5 redCol font_weight">'+result.ledFittedPerc+' %</h5>';
										}else{
											str+='<h5 class="m_top5 redCol font_weight">-</h5>';
										}
									str+='</div>';
									str+='<div class="col-sm-6 text-center">';
										str+='<h5 class="m_top5">With CCMS</h5>';
										if(result.ledInstallationwithCcms != null && result.ledInstallationwithCcms > 0){
											str+='<h5 class="m_top5 font_weight">'+result.ledInstallationwithCcms+'</h5>';
										}else{
											str+='<h5 class="m_top5 font_weight">-</h5>';
										}
										if(result.ledInstWithCcmsPerc != null && result.ledInstWithCcmsPerc > 0){
											str+='<h5 class="m_top5 greenCol font_weight">'+result.ledInstWithCcmsPerc+' %</h5>';
										}else{
											str+='<h5 class="m_top5 greenCol font_weight">-</h5>';
										}
									str+='</div>';
								str+='</div>';												
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="panel panel-default panelGreen">';
							str+='<div class="panel-heading">';
								str+='<h4 class="font_weight">CCMS Installation</h4>';
							str+='</div>';
							str+='<div class="pad_10">';
								str+='<div class="row m_top20 text-center">';
									str+='<div class="col-sm-12">';
										str+='<h5 class="m_top5">Fitted CCMS</h5>';
										if(result.ccmsFitted != null && result.ccmsFitted > 0){
											str+='<h4 class="greenCol m_top20_bot30 font_weight">'+result.ccmsFitted+'</h4>';
										}else{
											str+='<h4 class="greenCol m_top20_bot30 font_weight">-</h4>';
										}
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-4">';
						str+='<div class="panel panel-default panelRed">';
							str+='<div class="panel-heading">';
								str+='<h4 class="font_weight">LED Stock</h4>';
							str+='</div>';
							str+='<div class="pad_10">';
								str+='<div class="row m_top20 text-center">';
									str+='<div class="col-sm-12">';
										str+='<h5 class="m_top5">Available Stock</h5>';
										if(result.ledAvailableStock != null && result.ledAvailableStock > 0){
											str+='<h4 class="redCol m_top20_bot30 font_weight">'+result.ledAvailableStock+'</h4>';
										}else{
											str+='<h4 class="redCol m_top20_bot30 font_weight">-</h4>';
										}
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
			str+='<div class="col-sm-5">';
				str+='<div class="row">';
					str+='<div class="col-sm-6">';
						str+='<div class="panel panel-default panelRed">';
							str+='<div class="panel-heading">';
								str+='<h4 class="font_weight">CCMS Stock</h4>';
							str+='</div>';
							str+='<div class="pad_10">';
								str+='<div class="row m_top20 text-center">';
									str+='<div class="col-sm-12">';
										str+='<h5 class="m_top5">Available CCMS</h5>';
										if(result.ccmsAvailableStock != null && result.ccmsAvailableStock > 0){
											str+='<h4 class="redCol m_top20_bot30 font_weight">'+result.ccmsAvailableStock+'</h4>';
										}else{
											str+='<h4 class="redCol m_top20_bot30 font_weight">-</h4>';
										}
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-6">';
						str+='<div class="panel panel-default panelBlue">';
							str+='<div class="panel-heading">';
								str+='<h4 class="font_weight">Payments</h4>';
							str+='</div>';
							str+='<div class="pad_10">';
								str+='<div class="row m_top20 text-center">';
									str+='<div class="col-sm-12">';
										str+='<h5 class="m_top5">Received from PR</h5>';
										if(result.receivedAmount != null && result.receivedAmount > 0){
											str+='<h4 class="blueCol m_top20_bot30 font_weight">'+result.receivedAmount+'</h4>';
										}else{
											str+='<h4 class="blueCol m_top20_bot30 font_weight">-</h4>';
										}
									str+='</div>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$('#installationStockPaymentDetailsDivId').html(str);
}

function getUserDashboardRunRate(){	
	$('#runRateDivId').html(spinner);
	var json = {
			lightsVendorId : globalVendorId,
			ledComponentTypeId: globalComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getUserDashboardRunRate',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result!=null){
			buildUserDashboardRunRate(result);
		}
	
	});
}
function buildUserDashboardRunRate(result){
	var str='';
	str+='<div class=" pad_10 m_top10">';
		str+='<div class="border_yash border_radius_5 bg_f5">';
		str+='<div class="row">';
			str+='<div class="col-sm-2">';
				str+='<h4 class="runRateGreyBlock">Run Rate</h4>';
			str+='</div>';
			str+='<div class="col-sm-10">';
				str+='<div class="pad_10 text-center">';
					str+='<div class="row">';
						str+='<div class="col-sm-4">';
							str+='<h5 class="font_weight">Total Days</h5>';
							if(result.totalDaysCount != null && result.totalDaysCount >0){
								str+='<h4 class="m_top10 pad_10 white_color font_weight border_radius_5" style="background-color:#419C64">'+result.totalDaysCount+'</h4>';
							}else{
								str+='<h4 class="m_top10 pad_10 white_color font_weight border_radius_5" style="background-color:#419C64">-</h4>';
							}								
						str+='</div>';						
						str+='<div class="col-sm-4">';
							str+='<h5 class="font_weight">No.of Days Left</h5>';
							if(result.daysLeftCount != null && result.daysLeftCount >0){
								str+='<h4 class="m_top10 pad_10 white_color font_weight border_radius_5" style="background-color:#FF0000;">'+result.daysLeftCount+'</h4>';
							}else{
								str+='<h4 class="m_top10 pad_10 white_color font_weight border_radius_5" style="background-color:#FF0000;">-</h4>';
							}
						str+='</div>';
						str+='<div class="col-sm-4">';
							str+='<h5 class="font_weight">LED Run Rate</h5>';
							if(result.dayWiseTarget != null && result.dayWiseTarget >0){
								str+='<h4 class="m_top10 pad_10 white_color font_weight border_radius_5" style="background-color:#85CEA1;">'+result.dayWiseTarget+' / Day</h4>';
							}else{
								str+='<h4 class="m_top10 pad_10 white_color font_weight border_radius_5" style="background-color:#85CEA1;">-</h4>';
							}
						str+='</div>';							
						
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='</div>';
	str+='</div>';
	$('#runRateDivId').html(str);
}
//
function getVendorWiseLocationDetails(){
	$('#vendorWiseLocationDetailsDivId').html(spinner);
	var json = {
			lightsVendorId : globalVendorId,
			ledComponentTypeId: globalComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getVendorWiseLocationDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildVendorWiseLocationDetails(result);
		}
	
	});
}
/* function buildVendorWiseLocationDetails(result){
	var str='';
	str+='<div class=" m_top10">';
		str+='<div class="blackBrdr">';
			str+='<div class="table-responsive">';
				str+='<table class="table table_custom_SC">';
					str+='<thead>';
						str+='<tr>';
							str+='<th></th>';
							str+='<th>Total</th>';
							str+='<th>Completed</th>';
							str+='<th>Not Started</th>';
							str+='<th>In Progress</th>';
							str+='<th>1 - 10%</th>';
							str+='<th>10 - 30%</th>';
							str+='<th>30 - 50%</th>';
							str+='<th>50 - 70%</th>';
							str+='<th>70 - 90%</th>';
							str+='<th>90 - 100%</th>';
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
						str+='<tr>';
						if(result[i].locationName != null && typeof(result[i].locationName) !== "undefined"){
							str+='<td>'+result[i].locationName+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].nredcapCount != null && result[i].nredcapCount > 0){
							str+='<td>'+result[i].nredcapCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].completedCount != null && result[i].completedCount > 0){
							str+='<td>'+result[i].completedCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].notStartedCount != null && result[i].notStartedCount > 0){
							str+='<td>'+result[i].notStartedCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].inprogressCount != null && result[i].inprogressCount > 0){
							str+='<td>'+result[i].inprogressCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].onetotenCount != null && result[i].onetotenCount > 0){
							str+='<td>'+result[i].onetotenCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].tentothirtyCount != null && result[i].tentothirtyCount > 0){
							str+='<td>'+result[i].tentothirtyCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].thrtytofiftyCount != null && result[i].thrtytofiftyCount > 0){
							str+='<td>'+result[i].thrtytofiftyCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].fiftytosevntyCount != null && result[i].fiftytosevntyCount > 0){
							str+='<td>'+result[i].fiftytosevntyCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].sevntytonintyCount != null && result[i].sevntytonintyCount > 0){
							str+='<td>'+result[i].sevntytonintyCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].nintytohundredCount != null && result[i].nintytohundredCount > 0){
							str+='<td>'+result[i].nintytohundredCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						//str+='<td>-</td>';
						str+='</tr>';
					}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$('#vendorWiseLocationDetailsDivId').html(str);
} */
//3rd block
function getLedandCcmsVendorandComponentWiseDetails(){	
	$('#LEDVendorDetailsDivId').html(spinner);
	var json = {
			lightsVendorId : globalVendorId,
			ledComponentTypeId: globalComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getLedandCcmsVendorandComponentWiseDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result!=null){
		buildLedandCcmsVendorandComponentWiseDetails(result);
		}
	
	});
}
function buildLedandCcmsVendorandComponentWiseDetails(result){
	var str='';
	str+='<div class=" m_top10">';
		str+='<div class="row m_top10">';						
		str+='<div class="col-sm-12">';						
			str+='<h4 class="font_weight text-capital">LED Vendor Details</h4>';
			str+='<div class="blackBrdr m_top10">';
			str+='<div class="table-responsive">';
				str+='<table class="table table_custom_SC table-bordered">';
					str+='<thead>';
						str+='<tr>';
							str+='<th rowspan="2">Vendor Name</th>';
							str+='<th rowspan="2">Target</th>';
							str+='<th colspan="2">Fitted</th>';
							str+='<th rowspan="2">Allotted Gp \'s</th>';
							str+='<th colspan="2">Completed Gp \'s</th>';
							str+='<th colspan="2">In Progress Gp \'s</th>';
							str+='<th colspan="2">Yet Start Gp \'s</th>';
							str+='<th rowspan="2">LED Stock</th>';
						str+='</tr>';
						str+='<tr>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';
						str+='<th>Count</th>';
						str+='<th>%</th>';										
				str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
					for(var i in result){
						str+='<tr>';
						if(result[i].subVendorName != null && typeof(result[i].subVendorName) != "undefined"){
							str+='<td style="text-align: left !important;">'+result[i].subVendorName+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].totalLights != null && result[i].totalLights > 0){
							str+='<td>'+result[i].totalLights+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].installedLights != null && result[i].installedLights > 0){
							str+='<td>'+result[i].installedLights+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].ledFittedPerc != null && result[i].ledFittedPerc > 0){
							str+='<td class="good_color">'+result[i].ledFittedPerc+'</td>';
						}else{
							str+='<td class="good_color">-</td>';
						}
						if(result[i].nredcapCount != null && result[i].nredcapCount > 0){
							str+='<td>'+result[i].nredcapCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].completedCount != null && result[i].completedCount > 0){
							str+='<td>'+result[i].completedCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].compPerc != null && result[i].compPerc > 0){
							str+='<td class="good_color">'+result[i].compPerc+'</td>';
						}else{
							str+='<td class="good_color">-</td>';
						}
						if(result[i].inprogressCount != null && result[i].inprogressCount > 0){
							str+='<td>'+result[i].inprogressCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].inProgressPerc != null && result[i].inProgressPerc > 0){
							str+='<td class="good_color">'+result[i].inProgressPerc+'</td>';
						}else{
							str+='<td class="good_color">-</td>';
						}
						if(result[i].notStartedCount != null && result[i].notStartedCount > 0){
							str+='<td>'+result[i].notStartedCount+'</td>';
						}else{
							str+='<td>-</td>';
						}
						if(result[i].notStartedPerc != null && result[i].notStartedPerc > 0){
							str+='<td class="good_color">'+result[i].notStartedPerc+'</td>';
						}else{
							str+='<td class="good_color">-</td>';
						}
						if(result[i].ledStock != null && result[i].ledStock > 0){
							str+='<td>'+result[i].ledStock+'</td>';
						}else{
							str+='<td>-</td>';
						}
						str+='</tr>';
					}
					str+='</tbody>';
				str+='</table>';
			str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='</div>';
	str+='</div>';
	$('#LEDVendorDetailsDivId').html(str);
}
function buildlevelWiseLEDInstallationDetails(divId){	
	var collapse='';
	for(var i in locationArr){
		collapse+='<div class="panel-group m_top10" id="accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" role="tablist" aria-multiselectable="true">';
			collapse+='<div class="panel panel-default panel-black">';
				collapse+='<div class="panel-heading" role="tab" id="heading'+divId+''+locationArr[i]+'">';
				if(i == 0){
					collapse+='<a role="button" class="panelCollapseIcon '+divId.replace(/\s+/g, '')+''+locationArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}else{
					collapse+='<a role="button" class="panelCollapseIcon collapsed '+divId.replace(/\s+/g, '')+''+locationArr[i]+'"  data-toggle="collapse" data-parent="#accordion'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" href="#collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}	
					collapse+='<h4 class="panel-title text-capital">'+locationArr[i]+' level overview</h4>';
					collapse+='</a>';
				collapse+='</div>';
				
				if(i == 0){
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}else{
					collapse+='<div id="collapse'+divId.replace(/\s+/g, '')+''+locationArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/\s+/g, '')+''+locationArr[i]+'">';
				}
					collapse+='<div class="panel-body">';
						collapse+='<div id="'+divId.replace(/\s+/g, '')+''+locationArr[i]+'"></div>';
					collapse+='</div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';		
	}
	$("#LevelWiseLEDInstallationDetailsDivId").html(collapse);
	for(var j in locationArr){
		getLocationWiseLedInstallations(locationArr[j]);
	}
}
function getLocationWiseLedInstallations(locationType){	
	$("#ledUser"+locationType).html(spinner);
	var json = {
			lightsVendorId : globalVendorId,
			locationType : locationType,
			ledComponentTypeId: globalComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getLocationWiseLedInstallations',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result!=null){
			buildLocationWiseLedInstallations(result,locationType);
		}
	
	});
}
function buildLocationWiseLedInstallations(result,locationType){
	var tableView='';	
	tableView+='<div class="table-responsive">';
		tableView+='<table class="table table_custom_SC table-bordered" id="dataTable_'+locationType+'_ledUser" style="width: 100%">';
			tableView+='<thead>';
				tableView+='<tr>';
					tableView+='<th rowspan="2">'+locationType+'</th>';					
					tableView+='<th rowspan="2">Total GPs</th>';				
					tableView+='<th colspan="2">Completed GPs</th>';				
					tableView+='<th colspan="2">In Progress GPs</th>';			
					tableView+='<th colspan="2">Yet To Started GPs</th>';	
					tableView+='<th rowspan="2">LED\'s Target</th>';	
					tableView+='<th colspan="2">LED\'s Installed</th>';	
					tableView+='<th colspan="2">LED\'s Pending</th>';
					tableView+='<th rowspan="2">CCMS Installed</th>';					
				tableView+='</tr>';
				tableView+='<tr>';
					tableView+='<th>Count</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Count</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Count</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Count</th>';
					tableView+='<th>%</th>';
					tableView+='<th>Count</th>';
					tableView+='<th>%</th>';					
				tableView+='</tr>';
			tableView+='</thead>';
			tableView+='<tbody>';
			for(var i in result){
				tableView+='<tr>';
				if(result[i].locationName != null && typeof(result[i].locationName) !="undefined"){
					tableView+='<td style="text-align: left !important;">'+result[i].locationName+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].totalGps !=null && result[i].totalGps > 0){
					tableView+='<td>'+result[i].totalGps+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].completedCount !=null && result[i].completedCount > 0){
					tableView+='<td>'+result[i].completedCount+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].compPerc !=null && result[i].compPerc > 0){
					tableView+='<td class="good_color">'+result[i].compPerc+'</td>';
				}else{
					tableView+='<td class="good_color">-</td>';
				}
				if(result[i].inprogressCount !=null && result[i].inprogressCount > 0){
					tableView+='<td>'+result[i].inprogressCount+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].inProgressPerc !=null && result[i].inProgressPerc > 0){
					tableView+='<td class="good_color">'+result[i].inProgressPerc+'</td>';
				}else{
					tableView+='<td class="good_color">-</td>';
				}
				if(result[i].notStartedCount !=null && result[i].notStartedCount > 0){
					tableView+='<td>'+result[i].notStartedCount+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].notStartedPerc !=null && result[i].notStartedPerc > 0){
					tableView+='<td class="bad_color">'+result[i].notStartedPerc+'</td>';
				}else{
					tableView+='<td class="bad_color">-</td>';
				}
				if(result[i].totalLights !=null && result[i].totalLights > 0){
					tableView+='<td>'+result[i].totalLights+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].installedLights !=null && result[i].installedLights > 0){
					tableView+='<td>'+result[i].installedLights+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].installedperc !=null && result[i].installedperc > 0){
					tableView+='<td class="good_color">'+result[i].installedperc+'</td>';
				}else{
					tableView+='<td class="good_color">-</td>';
				}
				if(result[i].ledPending !=null && result[i].ledPending > 0){
					tableView+='<td>'+result[i].ledPending+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				if(result[i].ledPendingPerc !=null && result[i].ledPendingPerc > 0){
					tableView+='<td class="good_color">'+result[i].ledPendingPerc+'</td>';
				}else{
					tableView+='<td class="good_color">-</td>';
				}
				if(result[i].ccmsFitted !=null && result[i].ccmsFitted > 0){
					tableView+='<td>'+result[i].ccmsFitted+'</td>';
				}else{
					tableView+='<td>-</td>';
				}
				tableView+='</tr>';
			}				
			tableView+='</tbody>';
		tableView+='</table>';
	tableView+='</div>';
	
	$("#ledUser"+locationType).html(tableView);
	$("#dataTable_"+locationType+"_ledUser").dataTable({
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20,50, -1], [10, 15, 20,50, "All"]],
		"retrieve":true
	});
}
function getLEDInstallationTrendingDetails(){	
	$("#LinstTrendLineChartId").html(spinner);
	var json = {
			lightsVendorId : globalVendorId,
			ledComponentTypeId: globalComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getLEDInstallationTrendingDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result!=null){
			buildLEDInstallationTrendingDetails(result);
		}
	
	});
}
function buildLEDInstallationTrendingDetails(result){
	var datesArr=[];	
	var totalLightsArr=[];
	var totalPanelsArr=[];
	for(var i in result){
		datesArr.push(result[i].workDate);
		totalLightsArr.push(result[i].totalLights);
		totalPanelsArr.push(result[i].totalPanels);
	}
	$("#LinstTrendLineChartId").highcharts({
		colors:["#272c5b","#7db86f"],
		chart: {
			type: 'line'  
		},
		title: {
			text: ''
		},		
		xAxis: {
			categories: datesArr,
		},
		yAxis: {
			min: 0,
			title: {
				text: '',
			},
		},
		tooltip: {
			 formatter: function() {
				return  this.x+'<br/>'+this.series.name + ': <b>' + this.y+'</b>';
			},				
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				}				
			}
		},
		series: [{
			name: 'Total LED Installation',
			data: totalLightsArr,
		}, {
			name: 'LED Installation With CCMS Boxes',
			data: totalPanelsArr,
		}], 
	});
}