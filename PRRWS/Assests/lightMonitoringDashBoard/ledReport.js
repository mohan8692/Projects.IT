var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>',
	NODATAMSG = "NO DATA AVAILABLE";
	
var globalComponentTypeId = 1;

$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});
onloadcalls();
function onloadcalls(){
	getLedMonitoringReportNew();
	getThirdWireInstallationGps();
	getPaymentsDetails();
	//getSwitchingPoints();
	getTotalSwitchingPoints();
}
  
function getLedMonitoringReportNew(){		
	$("#lightsTargetId").html(spinner);	
	$("#lightsStockAvailId").html(spinner);	
	$("#ccmsTargetId").html(spinner);	
	$("#ccmsStockAvailId").html(spinner);	
	$("#reqRunRateId").html(spinner);	
	$("#last30daysRunrateId").html(spinner);	
	$("#achievedRunrateId").html(spinner);
	$("#lightsReportDetailsDivId").html(spinner);
	$("#CCMSReportDetailsDivId").html(spinner);
	var json={
		ledComponentTypeId: globalComponentTypeId
	}
	$.ajax({                
	type:'POST',    
	url: 'getLedMonitoringReportNew',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			$("#lightsTargetId").html(getValues(result.target));
			$("#lightsStockAvailId").html(getValues(result.totalLedStock));
			$("#ccmsTargetId").html(getValues(result.ccmsTarget));
			$("#ccmsStockAvailId").html(getValues(result.totalCcmsStock));
			$("#reqRunRateId").html(getValues(result.reqRunRate));	
			$("#last30daysRunrateId").html(getValues(result.last30DaysRunrate));	
			$("#achievedRunrateId").html(getValues(result.cummulativeRunrate));
			buildLightsReportDetails(result);
			buildCCMSReportDetails(result);
		}else{	
			$("#lightsReportDetailsDivId").html(NODATAMSG);
			$("#CCMSReportDetailsDivId").html(NODATAMSG);
		}
	});
}
function buildLightsReportDetails(result){
	var str='';
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table-bordered table_default" style="table-layout:fixed;width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
					str+='<th>Overall</th>';
					str+='<th>Today</th>';
					str+='<th>Last 2 Days</th>';
					str+='<th>Last 3 Days</th>';
					str+='<th>Last 7 Days</th>';
					str+='<th>Last 15 Days</th>';
					str+='<th>Last 30 Days</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				str+='<tr>';
					str+='<td>Manually Installed</td>';
					str+='<td>'+getValues(result.overAllManuallyInstalled)+'</td>';
					str+='<td>'+getValues(result.todayManuallyInstalled)+'</td>';
					str+='<td>'+getValues(result.yesterDayManuallyInstalled)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayManuallyInstalled)+'</td>';
					str+='<td>'+getValues(result.last7DaysManuallyInstalled)+'</td>';
					str+='<td>'+getValues(result.last15DaysManuallyInstalled)+'</td>';
					str+='<td>'+getValues(result.last30DaysManuallyInstalled)+'</td>';					
				str+='</tr>';
				str+='<tr>';
					str+='<td>G.P Covered - Manual</td>';
					str+='<td>'+getValues(result.overAllManuallyGpsCovered)+'</td>';
					str+='<td>'+getValues(result.todayManuallyGpsCovered)+'</td>';
					str+='<td>'+getValues(result.yesterDayManuallyGpsCovered)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayManuallyGpsCovered)+'</td>';
					str+='<td>'+getValues(result.last7DaysManuallyGpsCovered)+'</td>';
					str+='<td>'+getValues(result.last15DaysManuallyGpsCovered)+'</td>';
					str+='<td>'+getValues(result.last30DaysManuallyGpsCovered)+'</td>';					
				str+='</tr>';
				str+='<tr>';
					str+='<td>Connected to Dashboard</td>';
					str+='<td>'+getValues(result.overAllConnectedToDashboard)+'</td>';
					str+='<td>'+getValues(result.todayConnectedToDashboard)+'</td>';
					str+='<td>'+getValues(result.yesterDayConnectedToDashboard)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayConnectedToDashboard)+'</td>';
					str+='<td>'+getValues(result.last7DaysConnectedToDashboard)+'</td>';
					str+='<td>'+getValues(result.last15DaysConnectedToDashboard)+'</td>';
					str+='<td>'+getValues(result.last30DaysConnectedToDashboard)+'</td>';					
				str+='</tr>';				
				str+='<tr>';
					str+='<td>G.P Covered - Dashboard</td>';
					str+='<td>'+getValues(result.overAllGpsCoveredDashboard)+'</td>';
					str+='<td>'+getValues(result.todayGpsCoveredDashboard)+'</td>';
					str+='<td>'+getValues(result.yesterDayGpsCoveredDashboard)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayGpsCoveredDashboard)+'</td>';
					str+='<td>'+getValues(result.last7DaysGpsCoveredDashboard)+'</td>';
					str+='<td>'+getValues(result.last15DaysGpsCoveredDashboard)+'</td>';
					str+='<td>'+getValues(result.last30DaysGpsCoveredDashboard)+'</td>';					
				str+='</tr>';
				str+='<tr>';
					str+='<td>Teams Working</td>';
					str+='<td>'+getValues(result.overAllTeamsWorking)+'</td>';
					str+='<td>'+getValues(result.todayTeamsWorking)+'</td>';
					str+='<td>'+getValues(result.yesterDayTeamsWorking)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayTeamsWorking)+'</td>';
					str+='<td>'+getValues(result.last7DaysTeamsWorking)+'</td>';
					str+='<td>'+getValues(result.last15DaysTeamsWorking)+'</td>';
					str+='<td>'+getValues(result.last30DaysTeamsWorking)+'</td>';					
				str+='</tr>';
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#lightsReportDetailsDivId").html(str);
}
function buildCCMSReportDetails(result){
	var str='';
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table-bordered table_default" style="table-layout:fixed;width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
					str+='<th>Overall</th>';
					str+='<th>Today</th>';
					str+='<th>Last 2 Days</th>';
					str+='<th>Last 3 Days</th>';
					str+='<th>Last 7 Days</th>';
					str+='<th>Last 15 Days</th>';
					str+='<th>Last 30 Days</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				str+='<tr>';
					str+='<td>Connected to Dashboard</td>';
					str+='<td>'+getValues(result.overAllCcmsConected)+'</td>';
					str+='<td>'+getValues(result.todayCcmsConected)+'</td>';
					str+='<td>'+getValues(result.yesterDayCcmsConected)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayCcmsConected)+'</td>';
					str+='<td>'+getValues(result.last7DaysCcmsConected)+'</td>';
					str+='<td>'+getValues(result.last15DaysCcmsConected)+'</td>';
					str+='<td>'+getValues(result.last30DaysCcmsConected)+'</td>';					
				str+='</tr>';
				str+='<tr>';
					str+='<td>Teams</td>';
					str+='<td>'+getValues(result.overAllCcmsTeams)+'</td>';
					str+='<td>'+getValues(result.todayCcmsTeams)+'</td>';
					str+='<td>'+getValues(result.yesterDayCcmsTeams)+'</td>';
					str+='<td>'+getValues(result.dayBeforeYesterDayCcmsTeams)+'</td>';
					str+='<td>'+getValues(result.last7DaysCcmsTeams)+'</td>';
					str+='<td>'+getValues(result.last15DaysCcmsTeams)+'</td>';
					str+='<td>'+getValues(result.last30DaysCcmsTeams)+'</td>';					
				str+='</tr>';				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#CCMSReportDetailsDivId").html(str);
}
function getThirdWireInstallationGps(){
	$("#thirdWireInstallationGpsDivId").html(spinner);	
	var json={
		
	}
	$.ajax({                
	type:'POST',    
	url: 'getThirdWireInstallationGps',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			
			buildThirdWireInstallationGps(result);
		}else{	
			$("#thirdWireInstallationGpsDivId").html(NODATAMSG);
		}
	});
}
function buildThirdWireInstallationGps(result){
	var str='';
	str+='<div class="table-responsive m_top5">';
		str+='<table class="table table-bordered table_default" style="table-layout:fixed;width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
					str+='<th>Existing</th>';
					str+='<th>Identified</th>';
					str+='<th>Completed</th>';
					str+='<th>%</th>';
					str+='<th>Balance</th>';										
					str+='<th>%</th>';										
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
					str+='<td class="font_weight  disrtictWiseCls thirdWireCls" data-id="'+result[i].id+'" data-name="'+result[i].name+'">'+getValues(result[i].name)+'</td>';
					str+='<td>'+getValues(result[i].overallGps)+'</td>';
					str+='<td>'+getValues(result[i].identifiedGps)+'</td>';
					str+='<td>'+getValues(result[i].completedGps)+'</td>';
					str+='<td>'+getValues(result[i].completionPerc)+'</td>';
					str+='<td>'+getValues(result[i].balanceGps)+'</td>';					
					str+='<td>'+getValues(result[i].balancePerc)+'</td>';					
				str+='</tr>';
			}
				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#thirdWireInstallationGpsDivId").html(str);
}
$(document).on("click",".disrtictWiseCls",function(){
	var deptId = $(this).data("id");
	var name = $(this).data("name");
	$('#LEDReportModalHeadingId').html(name+" - "+"3rd Wire Installation GPs"+" - "+" District Wise Details");
	$("#LEDReportModalId").modal('show');
	getDistrictWiseDetailsForClick(deptId);
});
function getDistrictWiseDetailsForClick(deptId){
	$("#LEDReportModalDetailsDivId").html(spinner);	
	var json={
		deptId : deptId
	}
	$.ajax({                
	type:'POST',    
	url: 'getDistrictWiseDetailsForClick',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){			
			buildDistrictWiseDetailsForClick(result);
		}else{	
			$("#LEDReportModalDetailsDivId").html(NODATAMSG);
		}
	});
}
function buildDistrictWiseDetailsForClick(result){
	var str=''
	str='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered table_custom_SC tableStyleCls" id="districtWisedataTable" style="width:100%;">';		
			str+='<thead>';
				str+='<tr>';
					str+='<th style="text-align:left !important;">Name Of The District</th>';
					str+='<th>Existing</th>';
					str+='<th>Identified</th>';
					str+='<th>Completed</th>';
					str+='<th>%</th>';
					str+='<th>Balance</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
				str+='<td>'+getValues(result[i].name)+'</td>'
				str+='<td>'+getValues(result[i].overallGps)+'</td>'
				str+='<td>'+getValues(result[i].identifiedGps)+'</td>'
				str+='<td>'+getValues(result[i].completedGps)+'</td>'
				str+='<td>'+getValues(result[i].completionPerc)+'</td>'
				str+='<td>'+getValues(result[i].balanceGps)+'</td>'
				str+='</tr>';
			}
			str+='</tbody>';	
	$("#LEDReportModalDetailsDivId").html(str);	
}
function getPaymentsDetails(){
	$("#paymentReportDetailsDivId").html(spinner);	
	var json={
		
	}
	$.ajax({                
	type:'POST',    
	url: 'getPaymentsDetails',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			
			buildPaymentReportDetails(result);
		}else{	
			$("#paymentReportDetailsDivId").html(NODATAMSG);
		}
	});
}
function buildPaymentReportDetails(result){
	var str = '';
	str+='<div class="table-responsive m_top5">';
		str+='<table class="table table-bordered table_default" style="table-layout:fixed;width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
					str+='<th>lIGHTS</th>';
					str+='<th>Quarter 1 payment</br>(17-11-2017 to 31-12-2017)</th>';
					str+='<th>Quarter 2 payment</br>(01-01-2018 to 31-03-2018)</th>';
					str+='<th>Quarter 3 payment</br>(01-04-2018 to 30-06-2018)</th>';																	
				str+='</tr>';
				
			str+='</thead>';
			str+='<tbody>';
			/*for(var i in result){
				str+='<tr>';
					str+='<td>'+getValues(result[i].name)+'</td>';
					str+='<td>'+getValues(result[i].totalLedLights)+'</td>';
					str+='<td>'+getValues(result[i].q1Amount)+'</td>';
					str+='<td>'+getValues(result[i].q2Amount)+'</td>';
					str+='<td>'+getValues(result[i].q3Amount)+'</td>';
					
				str+='</tr>';
			}*/
			str+='<tr>';
				str+='<td>Slot I</td>';
				str+='<td>25,543</td>';
				str+='<td>754,183.00</td>';
				str+='<td>2,978,201.00</td>';
				str+='<td>2,978,201.00</td>';
			str+='</tr>';
			str+='<tr>';
				str+='<td>Slot II</td>';
				str+='<td>91,054</td>';
				str+='<td>-</td>';
				str+='<td>4,307,843.00</td>';
				str+='<td>10,799,084.00</td>';
			str+='</tr>';
			str+='<tr>';
				str+='<td>Slot III</td>';
				str+='<td>173,860</td>';
				str+='<td>-</td>';
				str+='<td>-</td>';
				str+='<td>13,600,481.00</td>';
			str+='</tr>';
			str+='<tr>';
				str+='<td class="font_weight">Total Payable Amount</td>';
				str+='<td class="font_weight">290,457</td>';
				str+='<td class="font_weight">754,183.00</td>';
				str+='<td class="font_weight">7,286,044.00</td>';
				str+='<td class="font_weight">27,377,766.00</td>';
			str+='</tr>';
			str+='<tr>';
				str+='<td colspan=1 class="font_weight">Paid</td>';
				str+='<td  class="font_weight">-</td>';
				str+='<td  class="font_weight">639,138.00</td>';
				str+='<td  class="font_weight">6,831,742.00</td>';
				str+='<td  class="font_weight">-</td>';
			str+='</tr>';
			str+='<tr>';
				str+='<td colspan=2 class="font_weight">Balance</td>';
				str+='<td class="font_weight">115,045.00</td>';
				str+='<td class="font_weight">454,302.00</td>';
				str+='<td class="font_weight">27,377,766.00</td>';
			str+='</tr>';
			str+='<tr>';
				str+='<td colspan=4 class="font_weight">Grand OutStanding Balance</td>';
 				str+='<td  class="font_weight">27,947,113.00</td>';				 
			str+='</tr>';				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#paymentReportDetailsDivId").html(str);
}

$(document).on("click",".printViewCls",function(){
	var divName = $(this).attr("attr_divId");	
	printDiv(divName);

});
 function printDiv(divName) {	
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.getElementById("printcontent").innerHTML;
	 document.title = "";
     document.getElementById("printcontent").innerHTML = printContents;
	 window.print();
     document.getElementById("printcontent").innerHTML = originalContents;	
}

function getValues(value){
	var type= typeof value;	
	if(type == "string"){
		if(value == null || value.length == 0 || value == 0){
			value = "-";
		}
	}else if(type == "number"){
		if(value == null || value == 0){
			value = "-";
		}
	}else if(type == "undefined"){		
		value = "-";
	}	
	return value;
}

function getSwitchingPoints(){
	$("#switchingPointsDivId").html(spinner);	
	var json={
		
	}
	$.ajax({                
	type:'POST',    
	url: 'getSwitchingPoints',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			
			buildSwitchingPoints(result);
		}else{	
			$("#switchingPointsDivId").html(NODATAMSG);
		}
	});
}

 function buildSwitchingPoints(result){
	var str = '';
	str+='<div class="table-responsive m_top5">';
		str+='<table class="table table-bordered table_default" style="table-layout:fixed;width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th rowspan="3">Name of The District</th>';
					str+='<th rowspan="3">No Of Gps</th>';
					str+='<th colspan="8">No Of Switching Points Created</th>';				
				str+='</tr>';
				str+='<tr>';
					str+='<th colspan="2">No Of Switching Points Required</th>';
					str+='<th colspan="3">Switching Points Completed Upto 16.08.2018</th>';
					str+='<th colspan="3">Balance Switching Points To be Created</th>';			
				str+='</tr>';
				str+='<tr>';					
					str+='<th>Reported Gps</th>';
					str+='<th>Switching Points Required</th>';
					str+='<th>No of GPS</th>';
					str+='<th>No of Switching Points</th>';
					str+='<th>%</th>';
					str+='<th>Balance Gps</th>';
					str+='<th>No of Switching Points</th>';
					str+='<th>%</th>';
				str+='</tr>';
			str+='</thead>';	
			str+='<tbody>';
			for(var i in result){
				str+='<tr>';
				str+='<td>'+getValues(result[i].name)+'</td>'
				str+='<td>'+getValues(result[i].overallGps)+'</td>'
				str+='<td>'+getValues(result[i].reportedGps)+'</td>'
				str+='<td>'+getValues(result[i].switchingPointsRequired)+'</td>'
				str+='<td>'+getValues(result[i].completedGps)+'</td>'
				str+='<td>'+getValues(result[i].completedSwitchingPoints)+'</td>'
				str+='<td class = "good_color">'+getValues(result[i].completionPerc)+'</td>'
				str+='<td>'+getValues(result[i].balanceGps)+'</td>'
				str+='<td>'+getValues(result[i].balanceSwitchingPoints)+'</td>'
				str+='<td class = "good_color">'+getValues(result[i].balancePerc)+'</td>'
				str+='</tr>';
			}
			str+='</tbody>';
			
		str+='</table>';
	str+='</div>';
	$("#switchingPointsDivId").html(str);
} 
function getTotalSwitchingPoints(){
	$("#totalSwitchingPointsDivId").html(spinner);	
	var json={
		
	}
	$.ajax({                
	type:'POST',    
	url: 'getTotalSwitchingPoints',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	}).done(function(result){
		if(result !=null){
			
			buildTotalSwitchingPoints(result);
		}else{	
			$("#totalSwitchingPointsDivId").html(NODATAMSG);
		}
	});
}
function buildTotalSwitchingPoints(result){	
	var str='';
	str+='<div class="table-responsive m_top20">';
		str+='<table class="table table-bordered table_default" style="table-layout:fixed;width:100%">';
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
					str+='<th>Required</th>';
					str+='<th colspan = "2">Completed Upto 16.08.2018</th>';					
					str+='<th colspan = "2">Balance</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
				str+='<tr>';
					str+='<td>Gps</td>';					
					str+='<td>'+getValues(result[0].reportedGps)+'</td>';					
					str+='<td>'+getValues(result[0].completedGps)+'</td>';
					str+='<td>'+getValues(result[0].completionPerc)+' %</td>';
					str+='<td>'+getValues(result[0].balanceGps)+'</td>';
					str+='<td>'+getValues(result[0].balancePerc)+' %</td>';					
				str+='</tr>';
				str+='<tr>';
					str+='<td>Switching Points</td>';
					str+='<td>'+getValues(result[0].switchingPointsRequired)+'</td>';
					str+='<td>'+getValues(result[0].completedSwitchingPoints)+'</td>';
					str+='<td>'+getValues(result[0].completedSwitchingPointsPerc)+' %</td>';
					str+='<td>'+getValues(result[0].balanceSwitchingPoints)+'</td>';
					str+='<td>'+getValues(result[0].balanceSwitchingPointsPerc)+' %</td>';
				str+='</tr>';				
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#totalSwitchingPointsDivId").html(str);
}