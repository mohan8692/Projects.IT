var smallSpinner = '<img src="Assests/images/spinner.gif" style="width:25px;height:25px;"/>';
var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
$(".chosen-select").chosen();
$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menu-data-cls").toggle();
});

$(document).on("click",function(){
	$(".menu-data-cls").hide();
});

$(document).on("click",".gotoViewClkCls",function(){
		var id=$(this).attr('attr_type');
		$('.showHideCls').hide();
		$('#'+id).show();
		if(id == "stockDetailsEntry"){
			getSubVendorDetails(1,"stock");
		}else{
			getSubVendorDetails(1,"install");
		}
});
$(".levelWiseStockId").html("LED's");
$(document).on("click",".stockRadioCls",function(){
	$(".levelWiseStockId").html("");
	$("#stockEntrySubVendorId").val(0).trigger("chosen:updated");
	$("#stockEntryUpdatedDetailsDivId").html('');
	$("#stockEntryCountId").val('');
	
	var value=$(this).val();
	if(value == 1){
		$(".levelWiseStockId").html("LED's");
	}else{
		$(".levelWiseStockId").html("CCMS");
	}
	getSubVendorDetails(value,"stock");	
});
$(".levelWiseNameChange").html("LED's");
$(document).on("click",".installationRadioCls",function(){
	$(".levelWiseNameChange").html("");
	var value=$(this).val();
	if(value == 1){
		$(".levelWiseNameChange").html("LED's");
		
	}else{
		$(".levelWiseNameChange").html("CCMS");
	}
	
	$("#installSuggestDivId").html('');
	$("#installDistrictId").val(0).trigger("chosen:updated");
	$("#installMandalId").val(0).trigger("chosen:updated");
	$("#installPanchayatId").val(0).trigger("chosen:updated");
	$("#installLedCountId").val('');
	$("#installLedTeamId").val('');
	
	getSubVendorDetails(value,"install");	
});
$('.dateForInstallEntryId').daterangepicker({
	singleDatePicker: true,
	opens:'left',
	maxDate: moment(),
	startDate: moment(),
	endDate: moment(),
	locale: {
		format: 'DD/MM/YYYY'
	},
	ranges: {
	   'Today': [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	   'This Month': [moment().startOf('month'), moment().endOf('month')],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	}
});
$('.dateForPaymentsId').daterangepicker({
	singleDatePicker: true,
	opens:'left',
	startDate: moment(),
		endDate: moment(),
	locale: {
		format: 'DD/MM/YYYY'
	},
	ranges: {
	   'Today': [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	   'This Month': [moment().startOf('month'), moment().endOf('month')],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	}
});
$('.dateForStockEntryId').daterangepicker({
	singleDatePicker: true,
	opens:'left',
	maxDate: moment(),
	startDate: moment(),
	endDate: moment(),
	locale: {
		format: 'DD/MM/YYYY'
	},
	ranges: {
	   'Today': [moment(), moment()],
	   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	   'This Month': [moment().startOf('month'), moment().endOf('month')],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	}
});


setTimeout(function(){
	onloadCalls();
}, 1000);

function onloadCalls(){
	getAllDistricts();
	getSubVendorDetails(1,"install");
	initializeMultipleUploadNewDocument("projectDocUpload");
}	

function getAllDistricts(){
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getAllDistrictsForPris',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0){
			for(var i in result){
				$("#installDistrictId").append("<option value="+result[i].id+">"+result[i].name+" </option>")
			}
		}
		$("#installDistrictId").trigger("chosen:updated");
	});
}
$(document).on("change","#installDistrictId",function(){
	$("#mandalLoading").html(smallSpinner);
	getMandalsByDistrict();
});
function getMandalsByDistrict(){
	$("#installMandalId").empty();
	$("#installPanchayatId").empty();
	$("#installPanchayatId").append("<option value='0'>Select Village</option>");
	$("#installPanchayatId").trigger("chosen:updated");
	var districtId = $("#installDistrictId").val();
	var json = {
		locationId : districtId
	}
	$.ajax({                
		type:'POST',    
		url: 'getMandalsByDistrict',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#mandalLoading").html('');
		if(result != null && result.length > 0){
			$("#installMandalId").append("<option value='0'>Select Mandal</option>");
			for(var i in result){
				if(result[i].id != 545)
				 $("#installMandalId").append("<option value="+result[i].id+">"+result[i].name+" </option>")
			}
		}
		$("#installMandalId").trigger("chosen:updated");
	});
}
$(document).on("change","#installMandalId",function(){
	$("#villageLoading").html(smallSpinner);
	getPanchayatsByTehsil();
});
function getPanchayatsByTehsil(){
		$("#installPanchayatId").empty();
	var mandalId = $("#installMandalId").val();
	var json = {
		locationId : mandalId
	}
	$.ajax({                
		type:'POST',    
		url: 'getPanchayatsByTehsil',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#villageLoading").html('');
		if(result != null && result.length > 0){
			$("#installPanchayatId").append("<option value='0'>Select Village</option>");
			for(var i in result){
				$("#installPanchayatId").append("<option value="+result[i].id+">"+result[i].name+" </option>")
			}
		}
		$("#installPanchayatId").trigger("chosen:updated");
	});
}
$(document).on("change","#installPanchayatId",function(){
	$("#installSuggestDivId").html(spinner);
	getLEDEntrySuggestionsForPanchayat();
});

function getLEDEntrySuggestionsForPanchayat(){
	var panchayatId = $("#installPanchayatId").val();
	var componentTypeId = $("input[name='installEntryRadio']:checked").val();
	var json = {
		panchayatId : panchayatId,
		ledComponentTypeId : componentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getLEDEntrySuggestionsForPanchayat',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildEntrySuggestionsForPanchayat(result,componentTypeId);
		}else
			$("#installSuggestDivId").html("No Data Available.");
	});
}

function buildEntrySuggestionsForPanchayat(result,componentTypeId){
	var str='';
	var panchayatName = $("#installPanchayatId option:selected").text();
	str+='<div class="row">';
		str+='<div class="col-sm-12 m_top10">';
			str+='<h5 class="">Entry Suggestions - <b>'+panchayatName+'</b>(Panchayat)</h5>';
		str+='</div>';
	str+='</div>';
	str+='<div class="row">';
	str+='<div class="col-sm-12">';
		str+='<ul class="list-inline sliderNewCls">';
		str+='<li class="m_top10">';
			str+='<div class="panel panel-default m_bottom_0">';
				str+='<div class="panel-body pad_5">';
					str+='<h5 class="text_grey font_weight">ALL</h5>';
					str+='<div class="row text-center m_top10">';
					if(componentTypeId != null && componentTypeId == 1){
						str+='<div class="col-sm-6">';
							str+='<h5 class="text_grey font_weight">Total LED Target</h5>';
							str+='<h5 class="text_mute font_weight m_top10">'+result.ledTarget+'<h5>';
						str+='</div>';
						str+='<div class="col-sm-6">';
							str+='<h5 class="text_grey font_weight">LEDs Fitted</h5>';
							str+='<h5 class="text_mute font_weight m_top10">'+result.ledFitted+'<h5>';
						str+='</div>';
					}else{
						str+='<div class="col-sm-12">';
							str+='<h5 class="text_grey font_weight">CCMS Fitted</h5>';
							str+='<h5 class="text_mute font_weight m_top10">'+result.ledFitted+'<h5>';
						str+='</div>';
					}
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</li>';
		if(result.subList != null && result.subList.length > 0){
			for(var i in result.subList){
				str+='<li class="m_top10">';
					str+='<div class="panel panel-default m_bottom_0">';
						str+='<div class="panel-body pad_5">';
							str+='<h5 class="text_grey font_weight">'+result.subList[i].entryDate+'</h5>';
							str+='<div class="row text-center m_top10">';
								str+='<div class="col-sm-6">';
								if(componentTypeId != null && componentTypeId == 1)
									str+='<h5 class="text_grey font_weight">Enrty LEDs</h5>';
								else
									str+='<h5 class="text_grey font_weight">Enrty CCMS</h5>';
									str+='<h5 class="text_grey font_weight m_top10">'+result.subList[i].ledFitted+'<h5>';
								str+='</div>';
								str+='<div class="col-sm-6">';
									str+='<h5 class="text_grey font_weight">Team</h5>';
									str+='<h5 class="text_grey font_weight m_top10">'+result.subList[i].teamsWorked+'<h5>';
								str+='</div>';
							str+='</div>';
						str+='</div>';
					str+='</div>';
				str+='</li>';
			}
		}
		str+='</ul>';
	str+='</div>';
	str+='</div>';
	
	$("#installSuggestDivId").html(str);
	$(".sliderNewCls").slick({
		slides:'li',
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: false,
		responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
	 });
}

function getSubVendorDetails(ledComponentTypeId,levelType){
	if(levelType == "install"){
		$("#installSubVendorId").html('');
		$("#installSubVendorId").trigger("chosen:updated");
	}else{
		$("#stockEntrySubVendorId").html('');
		$("#stockEntrySubVendorId").trigger("chosen:updated");
	}
	var json = {
		lightsVendorId : globalVendorId,
		ledComponentTypeId:ledComponentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getSubVendorDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0){
			if(levelType == "install"){
				$("#installSubVendorId").append("<option value='0'>Select Sub Vendor</option>");
			}else{
				$("#stockEntrySubVendorId").append("<option value='0'>Select Sub Vendor</option>");
			}
			
			
			for(var i in result){
				if(levelType == "install"){
					$("#installSubVendorId").append("<option value="+result[i].lightsSubVendorId+">"+result[i].subVendorName+" </option>");
				}else{
					$("#stockEntrySubVendorId").append("<option value="+result[i].lightsSubVendorId+">"+result[i].subVendorName+" </option>");
				}
			}
			if(levelType == "install"){
				$("#installSubVendorId").trigger("chosen:updated");
			}else{
				$("#stockEntrySubVendorId").trigger("chosen:updated");
			}
		}
		
	});
}

$(document).on("click",".installSubmitCls",function(){
	$("#installationLoadingImgId").show();
	
	$("#installEntrySuccessDivId").html("");
	$("#installEntryFailureDivId").html("");
	$("#villageErrMsgId").html("");
	$("#installSubVenErrMsgId").html("");
	$("#installFittedErrMsgId").html("");
	$("#installManPowerErrMsgId").html("");
	
	var componentTypeId = $("input[name='installEntryRadio']:checked").val();
	var panchayatId = $("#installPanchayatId").val();
	var subVendorId = $("#installSubVendorId").val();
	var installlightcount = $("#installLedCountId").val().trim();
	var installTeamcount = $("#installLedTeamId").val().trim();
	var installDate = $(".dateForInstallEntryId").val();
	var errorStatus = false;
	if(panchayatId == null || panchayatId == 0){
		$("#villageErrMsgId").html("Select Panchayat");
		errorStatus = true;
	}
	if(subVendorId == null || subVendorId == 0){
		$("#installSubVenErrMsgId").html("Select Sub Vendor");
		errorStatus = true;
	}
	if(installlightcount == 0 || installlightcount == ""){
		$("#installFittedErrMsgId").html("Enter Light Count");
		errorStatus = true;
	}
	if(installTeamcount == 0 || installTeamcount == ""){
		$("#installManPowerErrMsgId").html("Enter Man Power");
		errorStatus = true;
	}
	
	if(errorStatus)
		return;
	
	var json = {
		ledComponentTypeId : componentTypeId,
		panchayatId : panchayatId,
		installationDate : installDate,
		installedCount : installlightcount,
		manPower : installTeamcount,
		lightsSubVendorId : subVendorId
	}
	$.ajax({                
		type:'POST',    
		url: 'savingLEDInstallationDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#installationLoadingImgId").hide();
		if(result != null && result.message == "Success"){
			$("#installEntrySuccessDivId").html("Saved Successfully...");
			$("#installSuggestDivId").html("");
			$("#installLedCountId").val("");
			$("#installLedTeamId").val("");
			setTimeout(function(){
				$("#installEntrySuccessDivId").html('');
				$("#installDistrictId").val(0).trigger("chosen:updated");
				$("#installMandalId").val(0).trigger("chosen:updated");
				$("#installPanchayatId").val(0).trigger("chosen:updated");
				$("#installSubVendorId").val(0).trigger("chosen:updated");
				$(".defaultCheck").prop("checked",true);
				$(".levelWiseStockId").html("LED's");
			}, 1000);
		}else{
			$("#installEntryFailureDivId").html("Failed,Please Try Again...");
		}
	});
});

$(document).on("change","#stockEntrySubVendorId",function(){
	var subVendorId = $(this).val();
	$("#stockEntryUpdatedDetailsDivId").html(spinner);
	getLastUpdatedStockBySubVendor(subVendorId);
});

function getLastUpdatedStockBySubVendor(subVendorId){
	var componentTypeId = $("input[name='stockEntryRadio']:checked").val();
	var json = {
		lightsSubVendorId : subVendorId,
		ledComponentTypeId : componentTypeId
	}
	$.ajax({                
		type:'POST',    
		url: 'getVendorWiseStockEntryDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null && result.length > 0){
			buildLastUpdatedStockDetails(result);
		}else
			$("#stockEntryUpdatedDetailsDivId").html("No Data Available.");
	});
}

function buildLastUpdatedStockDetails(result){
	var str='';
	var levelWiseStockNameChanged='';
	var vendorName = $("#stockEntrySubVendorId option:selected").text();
	$( ".stockRadioCls" ).each(function( index ) {
		$(".levelWiseStockId").html("");
		var value=$(".stockRadioCls:checked").val();
		if(value == 1){
			levelWiseStockNameChanged = "LED's"
		}else{
			levelWiseStockNameChanged = "CCMS"
		}
	});
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<h5 class="">Last '+levelWiseStockNameChanged+' Stock Updated by '+vendorName+'</h5>';
		str+='</div>';
	str+='</div>';
	
	str+='<div class="row">';
		str+='<div class="col-sm-8 m_top10">';
			str+='<div class="pad_10" style="border:1px solid #ccc;">';
				str+='<div class="row">';
					str+='<div class="col-sm-9">';
						str+='<h5 class="font_weight font_16">Added New '+levelWiseStockNameChanged+' Stock On '+result[0].updatedStockDate+'</h5>';
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h5 class="font_weight font_16">'+result[0].newAddedLightcount+'</h5>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-8">';
			str+='<div class="pad_10" style="border:1px solid #ccc;">';
				str+='<div class="row">';
					str+='<div class="col-sm-9">';
						str+='<h5 class="font_weight font_16">Fitted '+levelWiseStockNameChanged+' ('+result[0].updatedStockDate+' to '+result[0].workDate+')</h5>';
					str+='</div>';
					str+='<div class="col-sm-3">';
					if(result[0].totalLedLIghtInstalledCount != null && result[0].totalLedLIghtInstalledCount > 0)
						str+='<h5 class="font_weight font_16">'+result[0].totalLedLIghtInstalledCount+'</h5>';
					else
						str+='<h5 class="font_weight font_16">0</h5>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
		str+='<div class="col-sm-8">';
			str+='<div class="pad_10" style="border:1px solid #ccc;">';
				str+='<div class="row">';
					str+='<div class="col-sm-9">';
						str+='<h5 class="font_weight font_16">Available '+levelWiseStockNameChanged+' Stock</h5>';
					str+='</div>';
					str+='<div class="col-sm-3">';
						str+='<h5 class="font_weight font_16">'+result[0].remainingTarget+'</h5>';
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#stockEntryUpdatedDetailsDivId").html(str);
}

$(document).on("click",".stockEntrySubmitCls",function(){
	$("#stockLoadingImgId").show();
	$("#stockEntrySuccessDivId").html("");
	$("#stockEntryFailureDivId").html("");
	$("#stockEntrySVErrMsgId").html("");
	$("#stockEntryLightsErrMsgId").html("");
	
	var componentTypeId = $("input[name='stockEntryRadio']:checked").val();
	var subVendorId = $("#stockEntrySubVendorId").val();
	var installlightcount = $("#stockEntryCountId").val().trim();
	var installDate = $(".dateForStockEntryId").val();
	var errorStatus = false;
	
	if(subVendorId == null || subVendorId == 0){
		$("#stockEntrySVErrMsgId").html("Select Sub Vendor");
		errorStatus = true;
	}if(installlightcount == 0 || installlightcount == ""){
		$("#stockEntryLightsErrMsgId").html("Enter Light Count");
		errorStatus = true;
	}
	if(errorStatus)
		return;
	
	var json = {
		ledComponentTypeId : componentTypeId,
		lightsSubVendorId : subVendorId,
		stockCount : installlightcount,
		stockDate : installDate
	}
	$.ajax({                
		type:'POST',    
		url: 'saveLEDandCCMSStockEntryDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		$("#stockLoadingImgId").hide();
		if(result != null && result.message == "Success"){
			$("#stockEntrySuccessDivId").html("Saved Successfully...");
			setTimeout(function(){ 
				$("#stockEntrySuccessDivId").html('');
				$("#stockEntryUpdatedDetailsDivId").html("");
				$("#stockEntryCountId").val("");
				$("#stockEntrySubVendorId").val(0).trigger('chosen:updated');
				$(".levelWiseStockId").html("LED's");
			}, 1000);
		}else{
			$("#stockEntryFailureDivId").html("Failed,Please Try Again...");
		}
	});
});

$(document).on("click",".paymentsSubmitBtnCls",function(){
	$("#paymentsBillErrMsgId").html("");
	$("#paymentsAmountErrMsgId").html("");
	$("#paymentsDocuErrMsgId").html("");
	
	var billNo = $("#paymentsBillNo").val().trim();
	var paymentDate = $(".dateForPaymentsId").val();
	var amountReceived = $("#paymentsRecievedAmountId").val();
	var paymentsFile = $("#projectDocUpload").val();
	var errorStatus = false;
	
	if(billNo == 0 || billNo == ""){
		$("#paymentsBillErrMsgId").html("Enter Bill No");
		errorStatus = true;
	}
	if(amountReceived == 0 || amountReceived == ""){
		$("#paymentsAmountErrMsgId").html("Enter Amount");
		errorStatus = true;
	}
	if(paymentsFile == 0 || paymentsFile == ""){
		$("#paymentsDocuErrMsgId").html("Enter Bill No");
		errorStatus = true;
	}
	if(errorStatus)
		return;
	
	$("#paymentLoadingImgId").show();
	var formData = new FormData();
	$('#adminProfileForm input').each(function(){  
		var input = $(this);
		var attr = input.attr('name');
		var value = input.val();
		var text =input.attr('type');
		var voName = $(this).attr("attr_name");
		var id=$(this).attr("id");
		 if(text == "file"){
			if(id=="projectDocUpload"){//fileList
			//console.log(this.files.length);
				if(this.files !=null && this.files.length>0){
					 for(var i = 0; i < this.files.length; i++){
						formData.append(voName+"["+i+"]", this.files[i]);
						//console.log(voName+"["+i+"]", i);//filesist
					 }
				}
			}
		}else{
			 //console.log(input.attr('name').trim()+"  ---   "+$('#'+id+'').val());
			formData.append(input.attr('name').trim(),$('#'+id+'').val());
		}
	});
	
	$.ajax({       
		url: $("#adminProfileForm").attr("action"),
		data: formData,
		type: "POST",               
		processData: false,
		contentType: false,        
		success: function(ajaxresp) {
			$("#paymentLoadingImgId").hide();
			if(ajaxresp != null && ajaxresp.message == "Success"){
				$("#paymentSuccessDivId").html("Saved Successfully...");
				setTimeout(function(){
					$("#paymentsBillNo").val('');
					$("#paymentsRecievedAmountId").val('');
				}, 1000);
			}else{
				$("#paymentSuccessDivId").html("Failed,Please Try Again...");
			}			
		},
		error:function(error,request){
			$("#paymentLoadingImgId").hide();
			$("#paymentSuccessDivId").html("Failed,Please Try Again...");
			
		}		
	});
});

$(document).on("click",".paymentDetailsCls",function(){
	$("#paymentsViewDetailsDivId").html(spinner);
	var json = {
		
	}
	$.ajax({                
		type:'POST',    
		url: 'getPaymentsViewDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result != null){
			buildPaymentDetails(result);
		}else
			$("#paymentsViewDetailsDivId").html("No Data Available.");
	});
});

function buildPaymentDetails(result){
	var str='';
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table customCls" style="border:1px solid #ccc;">';
			str+='<thead>';
				str+='<tr>';
					str+='<th>Bill No</th>';
					str+='<th>Date</th>';
					str+='<th>Received Amount</th>';
					str+='<th>Documents</th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result != null && result.length > 0){
				for(var i in result){
					str+='<tr>';
						str+='<td>'+result[i].billNo+'</td>';
						str+='<td>'+result[i].paymentDate+'</td>';
						str+='<td>'+result[i].recievedAmount+' Rs</td>';
						var documentsPath='';
						for(var j in result[i].subList){
							if(j==0){
								documentsPath = result[i].subList[j].documentPath
							}else{
								documentsPath = documentsPath+","+result[i].subList[j].documentPath
							}
							
						}
						str+='<td><a class="documentViewCls" attr_document_list="'+documentsPath+'" attr_billNo="'+result[i].billNo+'" attr_billDate="'+result[i].paymentDate+'" attr_billAmount="'+result[i].recievedAmount+'" style="cursor:pointer;">'+result[i].targetCount+'</a></td>';
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	$("#paymentsViewDetailsDivId").html(str);
}
$(document).on("click",".documentViewCls",function(){
	var documentlist = $(this).attr("attr_document_list").split(",")
	var billNo = $(this).attr("attr_billNo");
	var billDate = $(this).attr("attr_billDate");
	var billAmount = $(this).attr("attr_billAmount");
	
	var str='';
	str+='<div class="pad_border m_top10">';
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<h4 class="font_weight text-center">Bill No - '+billNo+'</h4>';
			str+='</div>';
		str+='</div>';
		str+='<div class="row">';
			str+='<div class="col-sm-3 m_top10">';
				str+='<h5 class="font_weight">Made Date</h5>';
				str+='<h5 class="font_weight m_top5">'+billDate+'</h5>';
			str+='</div>';
			str+='<div class="col-sm-3 m_top10">';
				str+='<h5 class="font_weight">Received Ammount</h5>';
				str+='<h5 class="font_weight m_top5">'+billAmount+' Rs/-</h5>';
			str+='</div>';
		str+='</div>';
		
		str+='<div class="row">';
			str+='<div class="col-sm-12 m_top20">';
				str+='<h5 class="font_weight">Attached Document Details - '+documentlist.length+'</h5>';
				str+='<ul class="list-inline documentLiCls m_top10">';
					for(var i in documentlist){
						var scanCopySpl = documentlist[i].split("."); 
						var scanCopyExt = $.trim(scanCopySpl[scanCopySpl.length-1].toLowerCase()); 
						if(scanCopyExt =="pdf"){
							str+='<li>';
								str+='<object data="'+documentlist[i]+'" type="application/pdf"  style="height:600px;width:100%"></object>';
							str+='</li>';
						}else if( scanCopyExt =="jpeg" || scanCopyExt =="jpg"  || scanCopyExt =="gif"  || scanCopyExt =="bmp"  || scanCopyExt =="png"){
							str+='<li>';
								str+='<img src="'+documentlist[i]+'" class="thumbnail" style="height:600px;width:100%"></img>';
							str+='</li>';
						}
						
					}
				str+='</ul>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	$("#documentsDivId").html(str);
	$(".documentLiCls").slick({
		slides:'li',
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: false,
		responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
	 });
});