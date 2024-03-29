var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';
/*$("header").on("click",".menu-cls",function(e){
	e.stopPropagation();
	$(".menuCls").toggle();
});
*/
$(".tooltipCls").tooltip();

var GlWrkTypeId = 2;
var GlLocationLvelId = 0;
var GlDistrctId = 0;
var GlConsttuencyId = 0;
var GlMndalId = 0;
var GlPnchayatId = 0;

var alreadyCandidateId=[];
var searchCandidateIds=[];
var diffArr=[];
var commonArr=[];
var globalWorkTypeCount=0;
var globalInnerWorksCount=1;// minimum work =1

var alreadyCandidateReferralId=[];
var searchCandidateReferralIds=[];
var diffReferralArr=[];
var commonReferralArr=[];

setTimeout(function(){ 
	$(".chosen-select").chosen();
	//$('#self').trigger('click');
	//buildSelfAndRepresenteeDetails("self");
}, 2000);

$("#dateRangePickerMGNF").daterangepicker({
	singleDatePicker: true,
	maxDate:new Date(),
	locale: {
	  format: 'DD-MM-YYYY'
	},
	
});
$('#dateRangePickerMGNF').on('apply.daterangepicker', function(ev, picker) {
});	
$(document).on("click",".removeWorkCls",function(){
	var divIdStr = $(this).attr('attr_id');
	$('#'+divIdStr+'').remove();
	$(this).remove();
	globalInnerWorksCount = parseInt(globalInnerWorksCount)-1;
});
$(document).on("click",".selfRepresenceCls",function(){
	refCandCount=0;
	$('#noofWorks').val('');
	$('#workCosts').val('');
	if($(this).is(":checked")){
		globalInnerWorksCount=1;// minimum work =1
		var typeVal =  $(this).attr("attr_type")
		if(typeVal == "self"){
			$("#representDetailsDivId").html('');
			alreadyCandidateId=[]
			alreadyCandidateReferralId=[]
			globalWorkTypeCount='';
			globalWorkTypeCount=0;			
			buildSelfAndRepresenteeDetails(typeVal);
		}else if(typeVal == "represent" || typeVal == "representee"){
			$("#selfDetailsDivId").html('');
			alreadyCandidateId=[]
			globalWorkTypeCount='';
			globalWorkTypeCount=0;
			buildSelfAndRepresenteeDetails(typeVal)
			getAllDistrictsListInState("");
			getPetitionDesignationLst(typeVal);
		}
	}
});

//Disignation Build
function getPetitionDesignationList(){
    $("#designationsId").html('');
	 $("#designationsId").html('<option value="0">Select Designation</option>');
	 $("#designationsId").trigger('chosen:updated');
	  var json = {
		   searchType:"refCandidateDesignations"// all/refCandidateDesignations/petitionGivenRefCandidateDesignations
	  };
	$.ajax({              
		type:'POST',    
		url: 'getPetitionDesignationList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#designationsId").html('<option value="0">Select Designation</option>');
			for(var i in result){
				$("#designationsId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#designationsId").trigger('chosen:updated');
	});	
}
//District Build 8888
function getAllDistrictsInState(typeVal,counterId,typeChange){
	
	var searchType="all";
	var searchId =0;
	if(typeChange == "Inner"){
		$("#districtInnerId"+typeVal+counterId).html('');
		$("#districtInnerId"+typeVal+counterId).html('<option value="0">Select District</option>');
		$("#districtInnerId"+typeVal+counterId).trigger('chosen:updated');
	}else{
		if(typeVal=="popup"){
			$("#districtCandId").html('');
			searchType = "refCandidate";
				searchId = $('#designationsId').val();
		}else if(counterId == null || counterId ==""){
			$("#district"+typeVal+counterId).html('<option value="0">Select District</option>');
			$("#district"+typeVal+counterId).trigger('chosen:updated');
		}else if(counterId !="" && parseInt(counterId)>=0){
			 $("#districtId"+typeVal+counterId).html('<option value="0">Select District</option>');
			 $("#districtId"+typeVal+counterId).trigger('chosen:updated');
		}
	}//districtIdself10
	var json = {
		  stateId:"1",
		  searchType:searchType,
		  searchId:searchId
		}
	$.ajax({                
		type:'POST',    
		url: 'getAllDistrictsInState',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){	
			
			if(typeChange == "Inner"){
				$("#districtInnerId"+typeVal+counterId).html('<option value="0">Select District</option>');
			}else{
				if(typeVal== "popup"){
					$("#districtCandId").html('<option value="0">All</option>');
				}else if(counterId == null || counterId == ""){		
					$("#district"+typeVal+counterId).html('<option value="0">Select District</option>');
				}else if(counterId !="" && parseInt(counterId)>=0){
				 $("#districtId"+typeVal+counterId).html('<option value="0">Select District</option>');
				}
			}
			for(var i in result){				
				
				if(typeChange == "Inner"){
						
					$("#districtInnerId"+typeVal+counterId).append('<option value="'+result[i].id+'">'+result[i].name+' </option>');
				}else{
					if(typeVal=="popup"){
						$("#districtCandId").append('<option value="'+result[i].id+'">'+result[i].name+' </option>');
					}else if(counterId == null || counterId ==""){		
						$("#district"+typeVal+counterId).append('<option value="'+result[i].id+'">'+result[i].name+' </option>');
					}else  if(counterId !="" && parseInt(counterId)>=0){
						$("#districtId"+typeVal+counterId).append('<option value="'+result[i].id+'">'+result[i].name+' </option>');
					}
				}
			}
		}
		
		if(typeChange == "Inner"){
			$("#districtInnerId"+typeVal+counterId).trigger('chosen:updated');
			if(GlDistrctId != null && GlDistrctId !='undefined'){
				$("#districtInnerId"+typeVal+counterId).val(GlDistrctId);
				$("#districtInnerId"+typeVal+counterId).trigger('chosen:updated');
			}
		}else{
			if(typeVal=="popup"){
				$("#districtCandId").trigger('chosen:updated');
			}
			else if(counterId == null || counterId == ""){
				$("#district"+typeVal+counterId).trigger('chosen:updated');
				if(GlDistrctId != null && GlDistrctId !='undefined'){
					$("#district"+typeVal+counterId).val(GlDistrctId);
					$("#district"+typeVal+counterId).trigger('chosen:updated');
				}
			}	
			else if(counterId != "" && parseInt(counterId) >= 0){
				$("#districtId"+typeVal+counterId).trigger('chosen:updated');
				if(GlDistrctId != null && GlDistrctId !='undefined'){
					$("#districtId"+typeVal+counterId).val(GlDistrctId);
					$("#districtId"+typeVal+counterId).trigger('chosen:updated');
				}
			}
		}
			
		
		
	});	
}
//Constituency Build
function getConstituencyNamesByDistrictId(levelVal,counterId,typeVal,typeChange){
	  $("#constituencyCanId").html('');
	  $("#constituencyCanId").html('<option value="0">All</option>');
	  $("#constituencyCanId").trigger('chosen:updated');
	  
	   var searchType= "all";
		var searchId=0;
		if(typeChange == "Inner"){
			 $("#constituencyInnerId"+typeVal+counterId).html('');
			 $("#constituencyInnerId"+typeVal+counterId).html('<option value="0">Select Constituency</option>');
			 $("#constituencyInnerId"+typeVal+counterId).trigger('chosen:updated');
		}else{
			if(typeVal== "popup"){
				searchType = "refCandidate";
				searchId = $('#designationsId').val();
			}else if(counterId !="" && parseInt(counterId)>=0){
				 $("#constituencyId"+typeVal+counterId).html('');
				 $("#constituencyId"+typeVal+counterId).html('<option value="0">Select Constituency</option>');
				 $("#constituencyId"+typeVal+counterId).trigger('chosen:updated');
			}
		}
	 
	  var json = {
		  districtId:levelVal,
		  searchType:typeVal,
		  searchId:searchId
		}
	$.ajax({                
		type:'POST',    
		url: 'getConstituencyNamesByDistrictId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 
			 if(typeChange == "Inner"){
				  $("#constituencyInnerId"+typeVal+counterId).html('<option value="0">Select Constituency</option>');
			 }else{
				 $("#constituencyId"+typeVal+counterId).html('<option value="0">Select Constituency</option>');
			 }
			
			 $("#constituencyCanId").html('<option value="0">All</option>');
			for(var i in result){
				if(typeChange == "Inner"){
					$("#constituencyInnerId"+typeVal+counterId).append('<option value="'+result[i].locationId+'">'+result[i].locationName+' </option>');
				}else{
					$("#constituencyId"+typeVal+counterId).append('<option value="'+result[i].locationId+'">'+result[i].locationName+' </option>');
					$("#constituencyCanId").append('<option value="'+result[i].locationId+'">'+result[i].locationName+' </option>');
				}
			}
		}
		
		if(typeChange == "Inner"){
			$("#constituencyInnerId"+typeVal+counterId).trigger('chosen:updated');
			if(GlConsttuencyId != null && GlConsttuencyId !='undefined'){
				$("#constituencyInnerId"+typeVal+counterId).val(GlConsttuencyId);
				$("#constituencyInnerId"+typeVal+counterId).trigger('chosen:updated');
			}
		}else{
			$("#constituencyId"+typeVal+counterId).trigger('chosen:updated');
			if(GlConsttuencyId != null && GlConsttuencyId !='undefined'){
				$("#constituencyId"+typeVal+counterId).val(GlConsttuencyId);
				$("#constituencyId"+typeVal+counterId).trigger('chosen:updated');
			}			
			$("#constituencyCanId").trigger('chosen:updated');
		}
	});	
}

function getTehsilsAndLocalElectionBodyForConstituencyId(levelVal,counterId,typeVal,typeChange){
	    $("#mandalId"+typeVal+counterId).html('');
		if(typeChange == "Inner"){
			$("#mandalInnerId"+typeVal+counterId).html('');
			 $("#mandalInnerId"+typeVal+counterId).html('<option value="0">Select Mandal</option>');
			 $("#mandalInnerId"+typeVal+counterId).trigger('chosen:updated');
		}
	    
		
	  var searchType="all";
	  var searchId=0;
			if(typeVal=="popup"){
				searchType = "refCandidate";
				searchId = $('#designationsId').val();
			}else if(counterId !="" && parseInt(counterId)>=0){
				 $("#mandalId"+typeVal+counterId).html('');
				 $("#mandalId"+typeVal+counterId).html('<option value="0">Select Mandal</option>');
				 $("#mandalId"+typeVal+counterId).trigger('chosen:updated');
			}
		
	  var json = {
		  constituencyId:levelVal,
		  searchType:"all",
		  searchId:searchId
		}        
	$.ajax({                
		type:'POST',    
		url: 'getTehsilsAndLocalElectionBodyForConstituencyId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#mandalId"+typeVal+counterId).html('<option value="0">Select Mandal</option>');
			 if(typeChange == "Inner"){
				 $("#mandalInnerId"+typeVal+counterId).html('<option value="0">Select Mandal</option>');
			 }
			 
			
			for(var i in result){
				var tehsilId = result[i].key;
				var levelId = tehsilId.toString().substr(1, 4);
				$("#mandalId"+typeVal+counterId).append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
				if(typeChange == "Inner"){
					$("#mandalInnerId"+typeVal+counterId).append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
				}
			}
		}
		
		
		if(typeChange == "Inner"){
			$("#mandalInnerId"+typeVal+counterId).trigger('chosen:updated');
			if(GlMndalId != null && GlMndalId !='undefined'){
				$("#mandalInnerId"+typeVal+counterId).val(GlMndalId);
				$("#mandalInnerId"+typeVal+counterId).trigger('chosen:updated');
			}
		}else{
			$("#mandalId"+typeVal+counterId).trigger('chosen:updated');
			if(GlMndalId != null && GlMndalId !='undefined'){
				$("#mandalId"+typeVal+counterId).val(GlMndalId);
				$("#mandalId"+typeVal+counterId).trigger('chosen:updated');
			}
		}
	});	
}
function getPanchayats(levelVal,counterId,typeVal,typeChange){
	$("#panchayatId").html('');
	   var searchType= "all";
		var searchId=0;
		if(typeChange == "Inner"){
			 $("#panchayatInnerId"+typeVal+counterId).html('');
			 $("#panchayatInnerId"+typeVal+counterId).html('<option value="0">Select Panchayat</option>');
			 $("#panchayatInnerId"+typeVal+counterId).trigger('chosen:updated');
		}else{
			if(typeVal== "popup"){
				searchType = "refCandidate";
				searchId = $('#designationsId').val();
			}else if(counterId !="" && parseInt(counterId)>=0){
				 $("#panchayatId"+typeVal+counterId).html('');
				 $("#panchayatId"+typeVal+counterId).html('<option value="0">Select Panchayat</option>');
				 $("#panchayatId"+typeVal+counterId).trigger('chosen:updated');
			}
		}
	  var json = {
		  tehsilId:levelVal,
		  searchType:"all",
		  searchId:0
		}        
	$.ajax({                
		type:'POST',    
		url: 'getPanchayatsByTehsilId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 if(typeChange == "Inner"){
				  $("#panchayatInnerId"+typeVal+counterId).html('<option value="0">Select Panchayat</option>');
			 }else{
				 $("#panchayatId"+typeVal+counterId).html('<option value="0">Select Panchayat</option>');
			 }
			// $("#panchayatId").html('<option value="0">All</option>');
			for(var i in result){	
				if(typeChange == "Inner"){
					$("#panchayatInnerId"+typeVal+counterId).append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
				}else{
					$("#panchayatId"+typeVal+counterId).append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
					$("#panchayatId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
				}
			}
		}
		if(typeChange == "Inner"){
			$("#panchayatInnerId"+typeVal+counterId).trigger('chosen:updated');
			if(GlPnchayatId != null && GlPnchayatId !='undefined'){
				$("#panchayatInnerId"+typeVal+counterId).val(GlPnchayatId);
				$("#panchayatInnerId"+typeVal+counterId).trigger('chosen:updated');
			}
		}else{
			if(counterId !="" && parseInt(counterId)>=0){
				$("#panchayatId"+typeVal+counterId).trigger('chosen:updated');
				if(GlPnchayatId != null && GlPnchayatId !='undefined'){
					$("#panchayatId"+typeVal+counterId).val(GlPnchayatId);
					$("#panchayatId"+typeVal+counterId).trigger('chosen:updated');
				}
			}else{
				$("#panchayatId").trigger('chosen:updated');
			}
		}
	});	
}

$(document).on("click","#basicBtnId",function(){
	var workRelatedTypeId = $('#petitionTypId').val();
	var works = $('#noofWorks').val();
	var cost = $('#workCosts').val();
	var typeVal ="self";
	$('.selfRepresenceCls').each(function(){
		if($(this).is(":checked")){
			typeVal =  $(this).attr("attr_type")
		}
	});

	$("#workCostsErr").html("");
	$("#noofWorksErr").html("");
	$("#petitionTypeIdErrDivd").html("");
	var isError=false;
	if(workRelatedTypeId == undefined || workRelatedTypeId == "undefined" || workRelatedTypeId === undefined || workRelatedTypeId.trim() == '' || workRelatedTypeId == null || parseInt(workRelatedTypeId)==0){
		$("#petitionTypeIdErrDivd").html("<h5 style='color:red;'>Please select representation type.</h5>");
		isError=true;
	}
	if(works == undefined || works == "undefined" || works === undefined || works.trim() == '' || works == null){
		$("#noofWorksErr").html("<h5 style='color:red;'>Enter no of works.</h5>");
		isError=true;
	}
	/*if(cost == undefined || cost == "undefined" || cost === undefined || cost.trim() == '' || cost == null){
		$("#workCostsErr").html("<h5 style='color:red;'>Enter total estimation cost. </h5>");
		isError=true;
	}*/
	if(!isError){
		$("#petitionBasicModal").modal('hide');
		$('#workDetailsDivId'+typeVal+'').show();
		$('#noofWork'+typeVal+'').val(works);
		//$('#workCost'+typeVal+'').val(cost);
	}else{
		return;
	}
});

function buildSelfAndRepresenteeDetails(typeVal){
	$("#petitionBasicModal").modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	$("#"+typeVal+"DetailsDivId").html(spinner);
	
	var str='';
	str+='<input type="hidden" value="" id="saveType" name="saveType" />';
	if(typeVal == "represent" || typeVal == "representee"){
				str+='<div class="row m_top20">';
				str+='<div class="col-sm-12">';
					str+='<h3 class="font_weight text-capital f_22">Representee Details:</h3>';
				str+='</div>';
			str+='</div>';
			
			str+='<div class="row m_top20">';
				/*str+='<div class="col-sm-3">';
					str+='<label>VOTER ID</label>';
					str+='<input type="text"  name="voterCardNo"  value=""  class="form-control m_top10 height45" id="voterId'+typeVal+'" placeholder="Enter Voter ID">';
					
				str+='</div>';
				*/
				
				str+='<div class="col-sm-2">';
					str+='<label>VOTER ID</label>';
					str+='<input type="text"  name="voterCardNo"  value=""  class="form-control m_top10 height45" id="voterId'+typeVal+'" placeholder="Enter Voter ID">';
					
				str+='</div>';
				str+='<div class="col-sm-1">';
					str+='<label></label>';
					str+='<input type="button" class="btn btn-success btn-md m_top20" id="getVoterDetailsId" value="Get Details" ></input>';
				str+='</div>';
				
				str+='<div class="col-sm-3">';
					str+='<label>NAME<span class="starColor">*</span></label>';//$("#name"+typeVal+"Err").html("<h5>Please Enter Name</h5>");
					str+='<input type="text"  name="name"  value="" class="form-control m_top10 height45" id="name'+typeVal+'" placeholder="Enter Name">';
					str+='<span class="ErrCls" id="nameErr'+typeVal+'"></span>';
				str+='</div>';
				str+='<div class="col-sm-3">';
					str+='<label>MOBILE NO<span class="starColor">*</span></label>';
					str+='<input type="text" name="mobileNO" maxlength="10" value=""  class="form-control m_top10 height45 isNumberCls" onkeyUp="checkIsNumber(this.id,this.value)" id="mobileNumber'+typeVal+'" placeholder="Enter Mobile Number">';
					str+='<span class="ErrCls" id="mobileNumberErr'+typeVal+'" ></span>';
				str+='</div>';
				str+='<div class="col-sm-3">';
					str+='<label>EMAIL-ID</label>';
					str+='<input type="text" name="email"   value="" class="form-control m_top10 height45" id="emailId'+typeVal+'" placeholder="Enter E-mail ID">';
						str+='<span class="ErrCls" id="emailIdErr'+typeVal+'"></span>';
				str+='</div>';
			str+='</div>';
			str+='<div class="row m_top20">';
				str+='<div class="col-sm-3">';	
					str+='<label>DISTRICT<span class="starColor">*</span></label>';
					str+='<select   name="addressVO.districtId" class="form-control chosen-select m_top10" id="district'+typeVal+'">';
						str+='<option value="0">Select District</option>';
					str+='</select>';
					str+='<span class="ErrCls" id="districtErr'+typeVal+'"></span>';
				str+='</div>';
				str+='<div class="col-sm-3">';	
					str+='<label>CONSTITUENCY<span class="starColor">*</span></label>';
					str+='<select  name="addressVO.assemblyId"   class="form-control chosen-select m_top10" id="constituency'+typeVal+'">';
						str+='<option value="0">Select Constituency</option>';
					str+='</select>';
					str+='<span class="ErrCls"  id="constituencyErr'+typeVal+'"></span>';
				str+='</div>';
				str+='<div class="col-sm-3">';	
					str+='<label>MANDAL/MUNCI.<span class="starColor">*</span></label>';
					str+='<select   name="addressVO.tehsilId"  class="form-control chosen-select m_top10" id="mandal'+typeVal+'">';
						str+='<option value="0">Select Mandal</option>';
					str+='</select>';
					str+='<span class="ErrCls" id="mandalErr'+typeVal+'"></span>';
				str+='</div>';
				str+='<div class="col-sm-3">';	
					str+='<label>PANCHAYAT</label>';
					str+='<select   name="addressVO.panchayatId"  class="form-control chosen-select m_top10" id="panchayat'+typeVal+'">';
						str+='<option value="0">Select Panchayat</option>';
					str+='</select>';
					str+='<span class="ErrCls" id="panchayatErr'+typeVal+'"></span>';
				str+='</div>';
			str+='</div>';
			str+='<div class="row m_top20">';
				str+='<div class="col-sm-3">';	
				str+='<label>REPRESENTEE DESIGNATION.<span class="starColor">*</span></label>';
				str+='<select   name="representeeDesignationId"  class="form-control chosen-select m_top10" id="designation'+typeVal+'">';
					str+='<option value="0">Select Designation</option>';
				str+='</select>';
				str+='<span class="ErrCls"  id="designationErr'+typeVal+'"></span>';
				str+='<input type="hidden" id="repTdpCadreId'+typeVal+'" value="" name="tdpCadreId"/>';
				str+='<input type="hidden" id="repImagePathId'+typeVal+'" value="" name="repImagePath"/>';
			str+='</div>';
			str+='</div>';
	}
	
		str+='<div class="row">';
			str+='<div class="col-sm-12">';
				str+='<div id="candidateDetails'+typeVal+'DivId"></div>';
			str+='</div>';
		str+='</div>';		
		if(typeVal=='self'){
			str+='<div class="row">';
				str+='<div class="col-sm-12" id="referralCanLength">';
						str+='<h4 class="font_weight panel-title" style="display:none;" id="rederralNameDivId">Referral Candidates</h4>';
					str+='<div id="candidateDetailsrepresenteeDivId" class="m_top10 lengthReferal"></div>';
				str+='</div>';
			str+='</div>';
		}	
			if(typeVal=='self'){
				str+='<div class="row m_top10">';
					str+='<div class="col-sm-12">';
						str+='<div class="pull-right">';
							str+='<button type="button" class="btn btn-lg btn-success searchCandidateCls button_gray" attr_type="'+typeVal+'" attr_add_referral_type="add_referral_type">ADD SELF MEMBER</button>';
							
						str+='</div>';
					str+='</div>';
				str+='</div>';
				
				str+='<div class="row m_top10">';
					str+='<div class="col-sm-12">';
						str+='<div class="pull-right">';
							str+='<button type="button" class="btn btn-lg btn-success searchSelfReferralCandidateCls button_gray" attr_type="representee" attr_add_referral_type="add_referral_type" disabled>ADD REFERRAL</button>';
							
						str+='</div>';
					str+='</div>';
				str+='</div>';
				
			}else{
				str+='<div class="row m_top10">';
					str+='<div class="col-sm-12">';
						str+='<div class="pull-right">';
							str+='<button type="button" class="btn btn-lg btn-success searchCandidateCls button_gray" attr_type="'+typeVal+'" attr_add_referral_type="add_referral_type">ADD REFERRAL</button>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
			}
		
		
		str+='<div class="row m_top10">';
				str+='<div class="col-sm-8">';
					str+='<label>COMPLETE WORK DESCRIPTION <span class="starColor">*</span></label>';
					str+='<input type="text"  name="worksList[0].workName"  value="" class="form-control m_top5 height45" id="workName'+typeVal+'" placeholder="Enter Name">';
					str+='<span id="completeWorkNameId'+typeVal+'"></span>';
				str+='</div>';
				str+='<div class="col-sm-2">';
					str+='<label>NO OF WORKS <span class="starColor">*</span></label>';
						str+='<input   name="worksList[0].noOfWorks"   type="text" class="form-control m_top5 height45 isNumberCls" id="noofWork'+typeVal+'" placeholder="Enter No Of Work"  onkeyUp="enableWorks(this.value,\'workDetailsDivId'+typeVal+'\',\''+typeVal+'\');checkIsNumber(this.id,this.value);">';
						str+='<span id="noOfWorksId'+typeVal+'"></span>';
				str+='</div>';
				str+='<div class="col-sm-2">';
					str+='<label>WORKS IN COST </label>';
					str+='<input type="text"  name="worksList[0].estimateCost" readOnly="true" class="form-control m_top5 height45 isNumberCls" id="workCost'+typeVal+'" placeholder="Cost auto calculates " onkeyUp="checkIsNumber(this.id,this.value)">';
					str+='<span id="workCostId'+typeVal+'"></span>';
				str+='</div>';
		str+='</div>';
		str+='<div class="row m_top10">';
			str+='<div class="col-sm-12">';
					str+='<h4 class="panel-title f_18"> UPLOAD OTHER RELATED DOCUMENTS </h4>';
					str+='<input type="file"  attr_name="worksList[0]" name="" attr_image_tyep="projImage"  id="projectDocUpload'+typeVal+'" multiple="multiple" class="m_top20"/>';
			str+='</div>';
		str+='</div>';	
		
		str+='<div class="row">';
			str+='<div id="workDetailsDivId'+typeVal+'" style="display:none;"></div>';
		str+='</div>';
		
	str+='<div class="row m_top10">';
			str+='<div class="col-sm-12">';
				str+='<div class="col-sm-6">';
					//str+='<button type="button" class="btn btn-lg btn-success searchCandidateCls button_gray" attr_type="'+typeVal+'">ADD REFERRAL</button>';
						str+='<div class="col-sm-12 m_top20">';
							str+='<span class="addLocationCss m_top20 saveRepresentRequestDetails" style="cursor:pointer;background-color:green;" attr_type="'+typeVal+'" id="saveButtonId" >SAVE DETAILS</span><span id="savingDetailsSpinner"></span>';
						str+='</div>';
					str+='</div>';
					str+='<div class="col-sm-6">';
					str+='<span class="col-sm-offset-4" id="statusMsgAppntReqt"></span><span class="ErrCls" id="refCandidatesErr"></span>';
					str+='<div>';
			str+='</div>';
		str+='</div>';
		
	$("#"+typeVal+"DetailsDivId").html(str);
	
	initializeFileProjDoc(typeVal);
	buildTemplateWorkDetails(typeVal);
}

$(document).on("change","#districtCandId",function(){
	var levelVal = $(this).val();
	getConstituencyNamesByDistrictId(levelVal,"","popup"); 
	
});

$(document).on("change","#designationsId",function(){	
	$("#districtCandDivId").hide();
	$("#constituencyCandDivId").hide();
	var value = $(this).val();
	if(parseInt(value)>0){
		if (value== 11 || value== 4){
			$("#constituencyCanId").html("");
			$("#candidateDetailsDivId").html('');
			$("#constituencyCandDivId").show();
			getConstituencyNamesByDistrictId(0,0,'popup',"");
		}else if (value== 16 || value== 2 || value ==7){
			$("#constituencyCandDivId").hide();
			$("#districtCandDivId").show();
			getAllDistrictsInState("popup","");
		}else{
			$("#constituencyCandDivId").show();
			$("#districtCandDivId").show();
			var typeVal = $(this).attr("attr_type");
			$(".selectionSearchDetailsCls").attr("attr_type",typeVal);
			getAllDistrictsInState("popup","");
			if(typeVal == "self"){
				$("#candidateDetailsDivId").html('');				
			}else{
				$("#candidateDetailsDivId").html('');				
			}
		}
	}
});
//Search Modal
$(document).on("click",".searchCandidateCls",function(){

	 $('#districtCandDivId').show();
	 $('#constituencyCandDivId').show();
	 $("#designationsId").html('<option value="0">Select Designation</option>');
	 $("#districtCandId").html('<option value="0">Select District</option>');
	 $("#constituencyCanId").html('<option value="0">Select Constituency</option>');
	 $("#designationsId").trigger("chosen:updated");
	 $("#districtCandId").trigger("chosen:updated");
	 $("#constituencyCanId").trigger("chosen:updated");
	$(".selectionSearchDetailsCls").removeAttr("attr_add_referral_type");
	var typeVal = $(this).attr("attr_type");
	$(".selectionSearchDetailsCls").attr("attr_type",typeVal);
	if(typeVal == "self"){
		$("#candidateDetailsDivId").html('');
		$("#candidateSearchModelDivId").modal("show");
		getPetitionDesignationList();
	}else{
		$("#candidateDetailsDivId").html('');
		$("#candidateSearchModelDivId").modal("show");
		getPetitionDesignationList();
	}
});
$(document).on("click",".searchSelfReferralCandidateCls",function(){
	 $('#districtCandDivId').show();
	 $('#constituencyCandDivId').show();
	 $("#designationsId").html('<option value="0">Select Designation</option>');
	 $("#districtCandId").html('<option value="0">Select District</option>');
	 $("#constituencyCanId").html('<option value="0">Select Constituency</option>');
	 $("#designationsId").trigger("chosen:updated");
	 $("#districtCandId").trigger("chosen:updated");
	 $("#constituencyCanId").trigger("chosen:updated");

	var typeVal = $(this).attr("attr_type");
	var referralType = $(this).attr("attr_add_referral_type");
	$(".selectionSearchDetailsCls").attr("attr_type",typeVal);
	$(".selectionSearchDetailsCls").attr("attr_add_referral_type",referralType);
	$("#candidateDetailsDivId").html('');
	$("#candidateSearchModelDivId").modal("show");
	getPetitionDesignationList();
});
$(document).on("click",".selectionSearchDetailsCls",function(){
	 $("#desiganationIErrDivd").html("");
	var locationValue=0;
	var locationLevelId=0;
	var desiganationId = $("#designationsId").val();
	if(desiganationId == null || desiganationId ==0){
		$("#desiganationIErrDivd").html("<h5>Please select desiganation</h5>");
		return;
	}
	var districtCandId = $("#districtCandId").val();
	locationValue=districtCandId;
	if(districtCandId !=null && districtCandId > 0){
		locationLevelId=3;
	}
	var constituencyCanId = $("#constituencyCanId").val();
	if(constituencyCanId !=null && constituencyCanId > 0){
		locationValue=constituencyCanId;
		locationLevelId=4;
	}
	var typeVal = $(this).attr("attr_type");
	var referralType = $(this).attr("attr_add_referral_type");
	if(referralType == "add_referral_type"){
		searchCandidateReferralIds=[];
		diffReferralArr=[];
		commonReferralArr=[];
	}else{
		searchCandidateIds=[];
		diffArr=[];
		commonArr=[];
	}
	
	//alreadyCandidateId=[]
	
	if (desiganationId== 4 || desiganationId== 11){
		locationLevelId=10;
	}
	if(referralType == "add_referral_type"){
		getPetitionReferredMemberDetailsRefeeral(desiganationId,locationLevelId,locationValue,typeVal);
	}else{
		getPetitionReferredMemberDetails(desiganationId,locationLevelId,locationValue,typeVal);
	}	
	
	
});

function getPetitionReferredMemberDetailsRefeeral(desiganationId,locationLevelId,locationValue,typeVal){
    $("#candidateDetailsDivId").html(spinner);
	  var json = {
		 deptId:desiganationId,
		 locationLevelId:locationLevelId,
		 locationValue:locationValue 
		}           
	$.ajax({              
		type:'POST',    
		url: 'getPetitionReferredMemberDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildPetitionReferredMemberDetailsRefeeral(result,typeVal);
		}else{
			$("#candidateDetailsDivId").html("No Data Available");
		}
	});	
}
function getPetitionReferredMemberDetails(desiganationId,locationLevelId,locationValue,typeVal){
    $("#candidateDetailsDivId").html(spinner);
	  var json = {
		 deptId:desiganationId,
		 locationLevelId:locationLevelId,
		 locationValue:locationValue 
		}           
	$.ajax({              
		type:'POST',    
		url: 'getPetitionReferredMemberDetails',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			buildPetitionReferredMemberDetails(result,typeVal);
		}else{
			$("#candidateDetailsDivId").html("No Data Available");
		}
	});	
}
var refCandCount=0;
$(document).on("click",".candidateAddedView",function(){
	
	var typeVal = $(this).attr("attr_type");
	var candidateId = $(this).attr("attr_candidateId");
	var representeeType='SELF';
	if(typeVal=='represent' || typeVal=='representee'){
		representeeType='REPRESENTEE';
	}else{
		$(".searchSelfReferralCandidateCls").removeAttr("disabled")
		if(refCandCount == 1){
			alert('Only one Member allowed for SELF Representee Petition.');
			return;
		}
	}
		
	alreadyCandidateId.push(parseInt(candidateId));
	
	$("#candidateDetails"+typeVal+"DivId").append($("#candidatesAppendDiv"+candidateId).html());
	
	$("#candidateDetails"+typeVal+"DivId").find(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-3").addClass("col-sm-2");
	$("#candidateDetails"+typeVal+"DivId").find("#fileUpload"+typeVal+candidateId).show();
	
	$("#fileUpload"+typeVal+candidateId).append('<div class="col-sm-4" style="margin-top:-20px;"><label>REFERAL LETTER</label><input type="file"   attr_name="referList['+refCandCount+']" name="" attr_image_tyep="refImage"  id="mainBlockFileUpload'+candidateId+''+typeVal+'" multiple="multiple" class=""/></div>');
	if(representeeType =='SELF'){
		$("#candidateDetails"+typeVal+"DivId").append('<input type="hidden" class="refCandidatesCls" id="petitionRef'+refCandCount+'" name="refCandidateId" value="'+candidateId+'" />');	
		
		$("#candidateDetails"+typeVal+"DivId").append('<input type="hidden"  class="refCandidatesCls" id="petitionRef'+refCandCount+'" name="referList['+refCandCount+'].refCandidateId" value="'+candidateId+'" />');
		
		$('.searchCandidateCls').hide();
	}
	else if(representeeType =='REPRESENTEE'){
		$("#candidateDetails"+typeVal+"DivId").append('<input type="hidden"  class="refCandidatesCls" id="petitionRef'+refCandCount+'" name="referList['+refCandCount+'].refCandidateId" value="'+candidateId+'" />');
		 
	}
	refCandCount=refCandCount+1;
	$(this).parent().find(".representation-selected").addClass("display_block");
	$("#candidatesAppendDiv"+candidateId).find("#candidate"+typeVal+candidateId).removeClass("candidateAddedView");
	
	$("#candidateDetails"+typeVal+"DivId").find(".bgColorCandidatesView").removeClass("candidateAddedView");
	$("#candidateDetails"+typeVal+"DivId").find(".bgColorCandidatesView").css("cursor","auto");
	$(".showRemoveIcon").attr("attr_candidateId",candidateId)
	$("#candidateDetails"+typeVal+"DivId").find(".showRemoveIcon").show();
	initializeFileUploadMainBlock(typeVal,candidateId);
	

});
$(document).on("click",".ccccc",function(){
	
	if(!confirm('Are you sure want to remove this member ?'))
		return;
	
	
	var typeVal = $(this).attr("attr_type");
	var candidateId = $(this).attr("attr_candidateId");
	
	$("#candidateDetails"+typeVal+"DivId").find("#candidate"+typeVal+candidateId).remove();
	$("#candidatesAppendDiv"+candidateId).find(".representation-selected").removeClass("display_block");
	$("#candidatesAppendDiv"+candidateId).find(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-2").addClass("col-sm-3");
	refCandCount=parseInt(refCandCount)-parseInt(1);
	/* alert($("#candidatesAppendDiv"+candidateId).find(".representation-selected").html())
	$("#candidatesAppendDiv"+candidateId).find(".representation-selected").removeClass("display_block");
	
	$("#candidatesAppendDiv"+candidateId).find(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-2").addClass("col-sm-3");
	$("#candidatesAppendDiv"+candidateId).find("#fileUpload"+typeVal+candidateId).hide(); */
	
	if(typeVal=="self"){
		$('.searchCandidateCls').show();
	}
	
	setTimeout(function(){ 
		$("#candidatesAppendDiv"+candidateId).find(".bgColorCandidatesView").addClass("candidateAddedView")
	}, 2000);
	
	var itemtoRemove = parseInt(candidateId);
	alreadyCandidateId.splice($.inArray(itemtoRemove, alreadyCandidateId),1);
	return;
});
$(document).on("click",".showRemoveIcon",function(){
	$(".searchSelfReferralCandidateCls").attr("disabled","disabled");
	if(!confirm('Are you sure want to remove this member ?'))
		return;
	
	var typeVal = $(this).attr("attr_type");
	var candidateId = $("#candidateDetails"+typeVal+"DivId").find(".bgColorCandidatesView").attr("attr_candidateId");
	
	if(typeVal=="self"){
		$('.searchCandidateCls').show();
		$("#candidateDetails"+typeVal+"DivId").html('');	
	}
	refCandCount=parseInt(refCandCount)-1; 
	$('.refCandidatesCls').each(function(){
		var value = $(this).val();
		if(parseInt(value)==parseInt(candidateId)){
			$(this).val(0);
			$(this).attr('id','');
			$(this).remove();
		}
	});
	
	$(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-2").addClass("col-sm-3");
	//$("#candidateDetails"+typeVal+"DivId").find(".showRemoveIcon").hide();
	$("#candidateDetails"+typeVal+"DivId").find("#candidate"+typeVal+candidateId).remove();
	var itemtoRemove = parseInt(candidateId);
	alreadyCandidateId.splice($.inArray(itemtoRemove, alreadyCandidateId),1);
});
function buildPetitionReferredMemberDetails(result,typeVal){
	var str='';
	for(var i in result){
		searchCandidateIds.push(result[i].referrerCandidateId)
	}
	$.grep(searchCandidateIds, function(el) {
		if ($.inArray(el, alreadyCandidateId) == -1){
			diffArr.push(el);
		}else if($.inArray(el, alreadyCandidateId ) !== -1){
			commonArr.push(el);
		} 
			
	});
	//console.log(diffArr)
	//console.log(commonArr)
	//console.log(alreadyCandidateId) 
	str+='<div  class="col-sm-12 table-responsive">';
		str+='<table style="width:100%" class="table table-condensed table_padding" id="candidatesTab">';	
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
		if(alreadyCandidateId !=null && alreadyCandidateId.length>0){
				for(var i in result){
				 
					for(var j in commonArr){
						
						if(commonArr[j] == result[i].referrerCandidateId){
							str+='<tr><td>';
							str+='<div id="candidatesAppendDiv'+result[i].referrerCandidateId+'" style="position:relative;">';
							str+='<div class="bgColorCandidatesView" attr_type='+typeVal+' attr_candidateId='+result[i].referrerCandidateId+' id="candidate'+typeVal+''+result[i].referrerCandidateId+'">';
							
								str+='<div class="row">'; 
										str+='<div class="pull-right showRemoveIcon" attr_type="'+typeVal+'"  attr_candidateId="'+result[i].referrerCandidateId+'" style="display:none;"><i class="glyphicon glyphicon-remove"></i></div>';
										
										str+='<div class="representation-selected display_block" id="candidateRemove'+typeVal+''+result[i].referrerCandidateId+'">Member Selected <span><i attr_candidateId='+result[i].referrerCandidateId+' attr_type='+typeVal+' class="glyphicon glyphicon-remove representation-remove ccccc" style="background-color: green; border-radius: 50%; cursor: pointer; font-size: 14px; padding: 5px;top:-3px;color:#fff" ></i></span></div>';
										if(result[i].petitionMemberVO.imagePath != null && result[i].petitionMemberVO.imagePath.length>0){
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="'+result[i].petitionMemberVO.imagePath+'" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}else{
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}
										
										
										str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight">Name:</h5>';
												str+='<h5 class="m_top5">'+result[i].petitionMemberVO.name+'</h5>';
												str+='<h5 class="m_top10 font_weight">Designation</h5>';
												str+='<h5 class="text_bold m_top10">'+result[i].petitionMemberVO.memberType+',</h5>';
												str+='<h5 class="m_top5" attr_assemblY_id="'+result[i].candidateAddressVO.assemblyId+'">'+result[i].candidateAddressVO.assemblyName+'  Constituency,</h5>';
												str+='<h5 class="m_top5" attr_district_id="'+result[i].candidateAddressVO.districtId+'">'+result[i].candidateAddressVO.districtName+'  District,</h5>';
											str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
										str+='<div class="nameAddressCss">';
											str+='<h5 class="font_weight">Party:</h5>';
											str+='<h5 class="m_top5">Telugu Desam Party</h5>';
											str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
											if(result[i].petitionMemberVO.emailId != null && result[i].petitionMemberVO.emailId.length > 0){
												str+='<h5 class="text_bold m_top10" >Email-id:  '+result[i].petitionMemberVO.emailId+'</h5>';
											}else{
												str+='<h5 class="text_bold m_top10">Email-id: -</h5>';
											}
											if(result[i].petitionMemberVO.mobileNo != null && result[i].petitionMemberVO.mobileNo.length > 0){
												str+='<h5 class="m_top5">Contact No : '+result[i].petitionMemberVO.mobileNo+'</h5>';
											}else{
												str+='<h5 class="m_top5">Contact No : -</h5>';
											}
											str+='<h5 class="m_top5">'+result[i].candidateAddressVO.districtName+' District.</h5>';
										str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight">Address:</h5>';
												if(result[i].candidateNativeAddressVO != null){
													//str+='<h5 class="m_top5">H No :</h5>';
													if(result[i].candidateNativeAddressVO.panchayatName != null && result[i].candidateNativeAddressVO.panchayatName.length>0)
														str+='<h5 class="m_top10">'+result[i].candidateNativeAddressVO.panchayatName+' Panchayat </h5>';
													if(result[i].candidateNativeAddressVO.tehsilName != null && result[i].candidateNativeAddressVO.tehsilName.length>0)
														str+='<h5 class="text_bold m_top10">'+result[i].candidateNativeAddressVO.tehsilName+'  Mandal/Munci.</h5>';
													if(result[i].candidateNativeAddressVO.districtName != null && result[i].candidateNativeAddressVO.districtName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.districtName+' District</h5>';
													if(result[i].candidateNativeAddressVO.stateName != null && result[i].candidateNativeAddressVO.stateName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.stateName+' State</h5>';
												}else{
													str+='<h5 class="m_top5">Not Available</h5>';
												}
												
											str+='</div>';
									str+='</div>';
									str+='<div id="fileUpload'+typeVal+''+result[i].referrerCandidateId+'" style="display:none"></div>';
								str+='</div>';
							str+='</div>';
							str+='</div>';
							str+='</td></tr>';
						}
					}		
				
			}
			
			for(var i in result){
				
					for(var j in diffArr){
						if(diffArr[j] == result[i].referrerCandidateId){
							str+='<tr><td>';
							str+='<div id="candidatesAppendDiv'+result[i].referrerCandidateId+'" style="position:relative;">';
							str+='<div class="bgColorCandidatesView candidateAddedView" attr_type='+typeVal+' attr_candidateId='+result[i].referrerCandidateId+' id="candidate'+typeVal+''+result[i].referrerCandidateId+'">';
							
								str+='<div class="row">';
									str+='<div class="pull-right showRemoveIcon" attr_type="'+typeVal+'"  attr_candidateId="'+result[i].referrerCandidateId+'" style="display:none;"><i class="glyphicon glyphicon-remove"></i></div>';
									
										str+='<div class="representation-selected" id="candidateRemove'+typeVal+''+result[i].referrerCandidateId+'">Member Selected <span><i attr_candidateId='+result[i].referrerCandidateId+' attr_type='+typeVal+' class="glyphicon glyphicon-remove representation-remove ccccc" style="background-color: green; border-radius: 50%; cursor: pointer; font-size: 14px; padding: 5px;top:-3px;color:#fff" ></i></span></div>';
										
										if(result[i].petitionMemberVO.imagePath != null && result[i].petitionMemberVO.imagePath.length>0){
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="'+result[i].petitionMemberVO.imagePath+'" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}else{
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}
										
										/*
										str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										*/
										
										str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight">Name:</h5>';
												str+='<h5 class="m_top5">'+result[i].petitionMemberVO.name+'</h5>';
												str+='<h5 class="m_top10 font_weight">Designation</h5>';
												str+='<h5 class="text_bold m_top10">'+result[i].petitionMemberVO.memberType+',</h5>';
												str+='<h5 class="m_top5" attr_assemblY_id="'+result[i].candidateAddressVO.assemblyId+'">'+result[i].candidateAddressVO.assemblyName+'  Constituency,</h5>';
												str+='<h5 class="m_top5" attr_district_id="'+result[i].candidateAddressVO.districtId+'">'+result[i].candidateAddressVO.districtName+'  District,</h5>';
											str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
										str+='<div class="nameAddressCss">';
											str+='<h5 class="font_weight">Party:</h5>';
											str+='<h5 class="m_top5">Telugu Desam Party</h5>';
											str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
											if(result[i].petitionMemberVO.emailId != null && result[i].petitionMemberVO.emailId.length > 0){
												str+='<h5 class="text_bold m_top10" >Email-id:  '+result[i].petitionMemberVO.emailId+'</h5>';
											}else{
												str+='<h5 class="text_bold m_top10">Email-id: -</h5>';
											}
											if(result[i].petitionMemberVO.mobileNo != null && result[i].petitionMemberVO.mobileNo.length > 0){
												str+='<h5 class="m_top5">Contact No : '+result[i].petitionMemberVO.mobileNo+'</h5>';
											}else{
												str+='<h5 class="m_top5">Contact No : -</h5>';
											}
											str+='<h5 class="m_top5">'+result[i].candidateAddressVO.districtName+' District.</h5>';
										str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight"> Address:</h5>';
												if(result[i].candidateNativeAddressVO != null){
													//str+='<h5 class="m_top5">H No :</h5>';
													if(result[i].candidateNativeAddressVO.panchayatName != null && result[i].candidateNativeAddressVO.panchayatName.length>0)
														str+='<h5 class="m_top10">'+result[i].candidateNativeAddressVO.panchayatName+' Panchayat</h5>';
													if(result[i].candidateNativeAddressVO.tehsilName != null && result[i].candidateNativeAddressVO.tehsilName.length>0)
														str+='<h5 class="text_bold m_top10">'+result[i].candidateNativeAddressVO.tehsilName+' Mandal/Munci. </h5>';
													if(result[i].candidateNativeAddressVO.districtName != null && result[i].candidateNativeAddressVO.districtName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.districtName+' District</h5>';
													if(result[i].candidateNativeAddressVO.stateName != null && result[i].candidateNativeAddressVO.stateName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.stateName+' State</h5>';
												}else{
													str+='<h5 class="m_top5">Not Available</h5>';
												}
												
											str+='</div>';
									str+='</div>';
									str+='<div id="fileUpload'+typeVal+''+result[i].referrerCandidateId+'" style="display:none;"></div>';
								str+='</div>';
							str+='</div>';
							str+='</div>';
							str+='</td></tr>';
						}
					}
				
			} 
		}else{
			for(var i in result){
				str+='<tr><td>';
				 str+='<div id="candidatesAppendDiv'+result[i].referrerCandidateId+'" style="position:relative;">';
					str+='<div class="bgColorCandidatesView candidateAddedView" attr_type='+typeVal+' attr_candidateId='+result[i].referrerCandidateId+' id="candidate'+typeVal+''+result[i].referrerCandidateId+'">';
					
					str+='<div class="row">';
					str+='<div class="pull-right showRemoveIcon removeTooltipCls" title="Remove Self Member" attr_type="'+typeVal+'"  attr_candidateId="'+result[i].referrerCandidateId+'" style="display:none;" data-toggle="tooltip" data-placement="top"><i class="glyphicon glyphicon-remove"></i></div>';
					str+='<div class="representation-selected" id="candidateRemove'+typeVal+''+result[i].referrerCandidateId+'">Member Selected <span class="tooltipCls" data-toggle="tooltip" data-placement="top" title="Unselected Member"><i attr_candidateId='+result[i].referrerCandidateId+' attr_type='+typeVal+' class="glyphicon glyphicon-remove representation-remove ccccc" style="background-color: green; border-radius: 50%; cursor: pointer; font-size: 14px; padding: 5px;top:-3px;color:#fff" ></i></span></div>';
					
					if(result[i].petitionMemberVO.imagePath != null && result[i].petitionMemberVO.imagePath.length>0){
						str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
							str+='<img src="'+result[i].petitionMemberVO.imagePath+'" class="imageCss"></img>';
							str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
					str+='</div>';
					}else{
						str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
							str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
							str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
					str+='</div>';
					}
					/*
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
							str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
							str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
					str+='</div>';
					*/
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
						str+='<div class="nameAddressCss">';
							str+='<h5 class="font_weight">Name:</h5>';
							str+='<h5 class="m_top5">'+result[i].petitionMemberVO.name+'</h5>';
							str+='<h5 class="m_top10 font_weight">Designation</h5>';
							str+='<h5 class="text_bold m_top10">'+result[i].petitionMemberVO.memberType+',</h5>';
							str+='<h5 class="m_top5" attr_assemblY_id="'+result[i].candidateAddressVO.assemblyId+'">'+result[i].candidateAddressVO.assemblyName+'  Constituency,</h5>';
							str+='<h5 class="m_top5" attr_district_id="'+result[i].candidateAddressVO.districtId+'">'+result[i].candidateAddressVO.districtName+'  District,</h5>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
						str+='<div class="nameAddressCss">';
							str+='<h5 class="font_weight">Party:</h5>';
							str+='<h5 class="m_top5">Telugu Desam Party</h5>';
							str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
							if(result[i].petitionMemberVO.emailId != null && result[i].petitionMemberVO.emailId.length > 0){
								str+='<h5 class="text_bold m_top10" >Email-id:  '+result[i].petitionMemberVO.emailId+'</h5>';
							}else{
								str+='<h5 class="text_bold m_top10">Email-id: -</h5>';
							}
							if(result[i].petitionMemberVO.mobileNo != null && result[i].petitionMemberVO.mobileNo.length > 0){
								str+='<h5 class="m_top5">Contact No : '+result[i].petitionMemberVO.mobileNo+'</h5>';
							}else{
								str+='<h5 class="m_top5">Contact No : -</h5>';
							}
							str+='<h5 class="m_top5">'+result[i].candidateAddressVO.districtName+' District.</h5>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
						str+='<div class="nameAddressCss">';
							str+='<h5 class="font_weight">Address:</h5>';	
							if(result[i].candidateNativeAddressVO != null){
								//str+='<h5 class="m_top5">H No :</h5>';
								if(result[i].candidateNativeAddressVO.panchayatName != null && result[i].candidateNativeAddressVO.panchayatName.length>0)
									str+='<h5 class="m_top10">'+result[i].candidateNativeAddressVO.panchayatName+' Panchayat</h5>';
								if(result[i].candidateNativeAddressVO.tehsilName != null && result[i].candidateNativeAddressVO.tehsilName.length>0)
									str+='<h5 class="text_bold m_top10">'+result[i].candidateNativeAddressVO.tehsilName+'  Mandal/Munci.</h5>';
								if(result[i].candidateNativeAddressVO.districtName != null && result[i].candidateNativeAddressVO.districtName.length>0)
									str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.districtName+' District</h5>';
								if(result[i].candidateNativeAddressVO.stateName != null && result[i].candidateNativeAddressVO.stateName.length>0)
									str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.stateName+' State</h5>';
							}else{
								str+='<h5 class="m_top5">Not Available</h5>';
							}
							
						str+='</div>';
					str+='</div>';
						str+='<div id="fileUpload'+typeVal+''+result[i].referrerCandidateId+'" style="display:none;"></div>';
					str+='</div>';
					
					str+='</div>';
				 str+='</div>';
				 str+='</td></tr>';
			}
		}
		str+='</tbody>';
		str+='</table>';
		str+='</div>';
	$("#candidateDetailsDivId").html(str);
	$(".tooltipCls").tooltip();
	//$(".removeTooltipCls").tooltip();
	
	$('#candidatesTab').dataTable({
		"paging":   true,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]		
	});	
}

function buildTemplateWorkDetails(typeVal){
	var str='';
	str+='<div class="col-sm-12" id="mainWorkDivId'+globalWorkTypeCount+'0">';
		str+='<div style="border:3px solid #dddddd;padding:10px;">';
			str+='<div  cloned_block_'+typeVal+'='+globalWorkTypeCount+'>';
				str+='<h3 class="panel-title f_22"></h3>';
				
				str+='<div class="row m_top10" >';
				//str+='<div class="pull-right removeWorkCls" attr_id="mainWorkDivId'+globalWorkTypeCount+'0" attr_type="self" attr_candidateid="1" style="cursor:pointer;margin-top: -30px"><i class="glyphicon glyphicon-remove"></i></div>';				
					str+='<div class="col-sm-3">';
							str+='<label>DEPARTMENT <span class="starColor">*</span><span class="WorkTypeWiseDepartmentId'+typeVal+''+globalWorkTypeCount+'0"></span></label>';
							str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].deptId"  class="form-control chosen-select m_top10 validateCls OnchangeDeptCls"  id="WorkTypeWiseDepartmentId'+typeVal+''+globalWorkTypeCount+'0" onchange="getPetitionSubjectList(this.value,\'subjectId\',\''+typeVal+'\','+globalWorkTypeCount+',0)" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0" attr_select_type="selectbox" >';
							str+='</select>';
						str+='</div>';
					
					str+='<div class="col-sm-3">';
						str+='<label>SUBJECT <span class="starColor">*</span><span class="subjectId'+typeVal+''+globalWorkTypeCount+'0"></span></label>';
						str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].subjectId"  class="form-control chosen-select m_top10 validateCls subjctOnchangeCls"  id="subjectId'+typeVal+''+globalWorkTypeCount+'0" onChange=getPetitionSubSubjectList(this.value,"subSubjectId'+typeVal+''+globalWorkTypeCount+'","0") attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0" attr_select_type="selectbox">';
							str+='<option value="0">Select Subject</option>';
						str+='</select>';
					str+='</div>';
					
					str+='<div class="col-sm-3">';
						str+='<label>SUB-SUBJECT <span class="starColor">*</span><span class="subSubjectId'+typeVal+''+globalWorkTypeCount+'0"></span></label>';
						str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].subSubjectId"  class="form-control chosen-select m_top10 validateCls subSubjectReFreshCls'+globalWorkTypeCount+' subSubjctOnchangeCls"  id="subSubjectId'+typeVal+''+globalWorkTypeCount+'0" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0" attr_select_type="selectbox">';
							str+='<option value="0">Select Sub Subject</option>';
						str+='</select>';
					str+='</div>';
								
				str+='</div>';
				
				str+='<div class="row m_top10" id="workDivId'+globalWorkTypeCount+'0">';
				//str+='<div class="pull-right removeWorkCls" attr_id="workDivId'+globalWorkTypeCount+'0" attr_type="self" attr_candidateid="1" style="margin-right: 15px;cursor:pointer"><i class="glyphicon glyphicon-remove"></i></div>';
					str+='<div class="col-sm-12">';
						str+='<div class="bg_color_view">';
						//	str+='<h3 class="panel-title f_16 font_weight"> WORK </h3>';
							str+='<div class="row m_top10">';
									str+='<div class="col-sm-3">';
										str+='<label> WORK TYPE <span class="starColor">*</span></label>';
										str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].workTypeId"  class="form-control chosen-select m_top10 validateCls workTypeReFreshCls'+globalWorkTypeCount+'" id="workTypeId'+typeVal+''+globalWorkTypeCount+'0" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0">';
											str+='<option value="0">Select Work Type</option>';
										str+='</select><br><span class="workTypeId'+typeVal+''+globalWorkTypeCount+'0"></span>';
										
									str+='</div>';
									str+='<div class="col-sm-3">';
										str+='<label>WORK IN COST    (in Lakhs)<span class="appendWorkCost'+typeVal+''+globalWorkTypeCount+'0"></span></label>';
										str+='<input type="text"  name="worksList['+globalWorkTypeCount+'].subWorksList[0].estimateCost" class="form-control m_top5 height45 validateCls amountCls isNumberCls workCostReFreshCls'+globalWorkTypeCount+'" onkeyUp="validateAmount(this.value,this.id,\''+typeVal+'\');checkIsNumber(this.id,this.value)" id="appendWorkCost'+typeVal+''+globalWorkTypeCount+'0" placeholder="Enter Work Cost" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0"/>';
										str+='<span class="ErrCls" id="ErrappendWorkCost'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
									/*str+='<div class="col-sm-3">';
										str+='<label>WORK DETAILS <span class="starColor">*</span></label>';
										str+='<input type="text"  name="worksList['+globalWorkTypeCount+'].subWorksList[0].grievanceDescription" class="form-control m_top5 height45 validateCls workDetailsReFreshCls'+globalWorkTypeCount+'" id="appendWorkDetailsId'+typeVal+''+globalWorkTypeCount+'0" placeholder="Enter" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0"/> <br><span class="appendWorkDetailsId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';*/
									str+='<div class="col-sm-3"  style="display:none;">';
										str+='<label>eOFFICE-ID <span class="starColor"></span></label>';
										str+='<textarea  name="worksList['+globalWorkTypeCount+'].subWorksList[0].eOfficeId" class="form-control m_top5 height45 validateCls counterappendId officerIdReFreshCls'+globalWorkTypeCount+'" id="appendEofficeId'+typeVal+''+globalWorkTypeCount+'0" placeholder="Enter" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0" /><br><span class="appendEofficeId'+typeVal+''+globalWorkTypeCount+'0"/></span>';
									str+='</div>';
							str+='</div>';
							str+='<div class="row ">';
									str+='<div class="col-sm-12">';
										str+='<label>WORK DETAILS <span class="starColor">*</span></label>';
										str+='<textarea name="worksList['+globalWorkTypeCount+'].subWorksList[0].grievanceDescription" class="form-control m_top5  validateCls workDetailsReFreshCls'+globalWorkTypeCount+'" id="appendWorkDetailsId'+typeVal+''+globalWorkTypeCount+'0" placeholder="Enter work details..." attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0"  style="height:100px;"/> <br><span class="appendWorkDetailsId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
							str+='</div>';
							str+='<div class="row m_top10">';
									str+='<div class="col-sm-3">';
										str+='<label>LOCATION LEVEL <span class="starColor">*</span></label>';
										str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].locationScopeId" class="form-control chosen-select m_top10 locationLevelChange locationLevelValidCls'+typeVal+' validateCls locationLevelReFreshCls'+globalWorkTypeCount+'" id="locationLevelId'+typeVal+''+globalWorkTypeCount+'0" attr_counterval="'+globalWorkTypeCount+'0" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0">';
											str+='<option value="0">Select Level</option>';
											str+='<option value="3">District</option>';
											str+='<option value="4">Constituency</option>';
											str+='<option value="5">Mandal/Muncipality/Corporation</option>';
											str+='<option value="6">Panchayat</option>';
										str+='</select><br><span class="locationLevelId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
									
									str+='<div class="col-sm-2 districtCls'+typeVal+''+globalWorkTypeCount+'0" style="display:none">';
										str+='<label>DISTRICT <span class="starColor">*</span></label>';
										str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].addressVO.districtId"  class="form-control chosen-select m_top10 districtLevelChange validateCls districtRefreshCls" id="districtId'+typeVal+''+globalWorkTypeCount+'0" attr_counterval="'+globalWorkTypeCount+'0" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0">';
											str+='<option value="0">Select District</option>';
										str+='</select><br><span class="districtId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
									
									str+='<div class="col-sm-2 constituencyCls'+typeVal+''+globalWorkTypeCount+'0" style="display:none">';
										str+='<label>CONSTITUENCY <span class="starColor">*</span></label>';
										str+='<select   name="worksList['+globalWorkTypeCount+'].subWorksList[0].addressVO.assemblyId"  class="form-control chosen-select m_top10 constituencyLevelChange validateCls conChangeCls conRefreshCls'+globalWorkTypeCount+'0" id="constituencyId'+typeVal+''+globalWorkTypeCount+'0" attr_counterval="'+globalWorkTypeCount+'0" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0">';
											str+='<option value="0">Select Constituency</option>';
										str+='</select><br><span class="constituencyId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
									
									str+='<div class="col-sm-2 mandalCls'+typeVal+''+globalWorkTypeCount+'0" style="display:none">';
										str+='<label>MANDAL/MUNCI. <span class="starColor">*</span></label>';
										str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].addressVO.tehsilId"  class="form-control chosen-select m_top10 mandalLevelChange validateCls  mandalRefreshCls'+globalWorkTypeCount+'0 madalChangeCls" id="mandalId'+typeVal+''+globalWorkTypeCount+'0" attr_counterval="'+globalWorkTypeCount+'0" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0">';
											str+='<option value="0">Select Mandal</option>';
										str+='</select><br><span class="mandalId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
									str+='<div class="col-sm-2 panchayatCls'+typeVal+''+globalWorkTypeCount+'0" style="display:none">';
										str+='<label>PANCHAYAT <span class="starColor">*</span></label>';
										str+='<select  name="worksList['+globalWorkTypeCount+'].subWorksList[0].addressVO.panchayatId"  class="form-control chosen-select m_top10 panchayatLevelChange validateCls panchayatRefreshCls'+globalWorkTypeCount+'0" id="panchayatId'+typeVal+''+globalWorkTypeCount+'0" attr_counterval="'+globalWorkTypeCount+'0" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+globalWorkTypeCount+'" attr_inner_count="0">';
											str+='<option value="0">Select Panchayat</option>';
										str+='</select><br><span class="panchayatId'+typeVal+''+globalWorkTypeCount+'0"></span>';
									str+='</div>';
									//str+=' <i class="glyphicon glyphicon-ok pull-right applyCls" style="padding:4px;border-radius:50%;background:#ccc;color:#FFFFFF;color:green;right:35px;cursor:pointer" title="Apply this selected locations for all works "></i> ';
							str+='</div>';
						str+='</div>';
					str+='</div>';
					var innerWorkTypeCount=globalWorkTypeCount+1;
					str+='<div class="appendInnerBlocks'+typeVal+''+globalWorkTypeCount+''+innerWorkTypeCount+'"></div>';
					str+='<div class="col-sm-12">';
						str+='<div class="pull-right">';
							str+='<span class="addLocationCss m_top10 pull-right cloned_Inner_Element" style="cursor:pointer;" attr_type="'+typeVal+'" attr_counterval="'+globalWorkTypeCount+'" main_work_count="0" inner_work_count="'+innerWorkTypeCount+'">ADD WORK </span>';
						str+='</div>';
					str+='</div>';
				str+='</div>';
					
		str+='</div>';
	str+='</div>';
	
	str+='<div class="row m_top20">';
		str+='<div class="appendWorkDetailsDiv'+typeVal+'"></div>';
	str+='</div>';
	var addWorkTypeCountMain=globalWorkTypeCount+1;
	str+='<div class="row">';
		str+='<div class="col-sm-12"><span class="addLocationCss m_top10 pull-right cloned_Element" block-clone-counter-'+typeVal+'="'+addWorkTypeCountMain+'" style="cursor:pointer;" block-clone-'+typeVal+'="'+globalWorkTypeCount+'" attr_type="'+typeVal+'">ADD WORK TYPE </span></div>';
	str+='</div>';	
	
	$("#workDetailsDivId"+typeVal).html(str);
	$(".chosen-select").chosen();
	
	getSubjectPetitionsDepartmentList(typeVal,globalWorkTypeCount,0);
	//getPetitionSubjectList('subjectId',typeVal,globalWorkTypeCount,0);
	getWorkTypeList('workTypeId',typeVal,globalWorkTypeCount,0);
	globalWorkTypeCount =globalWorkTypeCount+1;
		
}
$(document).on("change",".locationLevelChange",function(){

	var levelVal = $(this).val();
	var counterId = $(this).attr("attr_counterval");
	var typeVal = $(this).attr("attr_type");
	var changeType = $(this).attr("attr_type_change");	
	if(changeType == "main"){
		$("#districtId"+typeVal+counterId).html('<option value="0"> Select District </option>');
		$("#constituencyId"+typeVal+counterId).html('<option value="0"> Select constituency</option>');
		$("#mandalId"+typeVal+counterId).html('<option value="0"> Select Mandal/Munci/Corp.</option>');
		$("#panchayatId"+typeVal+counterId).html('<option value="0"> Select Panchayat</option>');
	}else{
		$("#districtInnerId"+typeVal+counterId).html('<option value="0"> Select District </option>');
		$("#constituencyInnerId"+typeVal+counterId).html('<option value="0"> Select constituency</option>');
		$("#mandalInnerId"+typeVal+counterId).html('<option value="0"> Select Mandal/Munci/Corp.</option>');
		$("#panchayatInnerId"+typeVal+counterId).html('<option value="0"> Select Panchayat</option>');
	}
	
	if(levelVal == 3){
		if(changeType == "main"){
			$("#districtId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			$(".districtCls"+typeVal+counterId).show();
			$(".constituencyCls"+typeVal+counterId).hide();
			$(".mandalCls"+typeVal+counterId).hide();
			$(".panchayatCls"+typeVal+counterId).hide();
		}else{
			$("#districtInnerId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			$(".districtInnerCls"+typeVal+counterId).show();
			$(".constituencyInnerCls"+typeVal+counterId).hide();
			$(".mandalInnerCls"+typeVal+counterId).hide();
			$(".panchayatInnerCls"+typeVal+counterId).hide();
		}
		
	}else if(levelVal == 4){
		if(changeType == "main"){
			 $("#districtId"+typeVal+counterId).trigger("chosen:updated");
			 getAllDistrictsInState(typeVal,counterId,changeType);
			  $("#constituencyId"+typeVal+counterId).trigger("chosen:updated");
			  $(".districtCls"+typeVal+counterId).show();
			  $(".constituencyCls"+typeVal+counterId).show();
			  $(".mandalCls"+typeVal+counterId).hide();
			  $(".panchayatCls"+typeVal+counterId).hide();
		}else{
			$("#districtInnerId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			 $("#constituencyInnerId"+typeVal+counterId).trigger("chosen:updated");
			 $(".districtInnerCls"+typeVal+counterId).show();
			 $(".constituencyInnerCls"+typeVal+counterId).show();
			 $(".mandalInnerCls"+typeVal+counterId).hide();
			 $(".panchayatInnerCls"+typeVal+counterId).hide();
		}
		
	}else if(levelVal == 5){
		if(changeType == "main"){
			$("#districtId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			$("#constituencyId"+typeVal+counterId).trigger("chosen:updated");
			$("#mandalId"+typeVal+counterId).trigger("chosen:updated");
			$(".districtCls"+typeVal+counterId).show();
			$(".constituencyCls"+typeVal+counterId).show();
			$(".mandalCls"+typeVal+counterId).show();
			$(".panchayatCls"+typeVal+counterId).hide();
		}else{
			$("#districtInnerId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			$("#constituencyInnerId"+typeVal+counterId).trigger("chosen:updated");
			$("#mandalInnerId"+typeVal+counterId).trigger("chosen:updated");
			$(".districtInnerCls"+typeVal+counterId).show();
			$(".constituencyInnerCls"+typeVal+counterId).show();
			$(".mandalInnerCls"+typeVal+counterId).show();
			$(".panchayatInnerCls"+typeVal+counterId).hide();
		}
		
	}else if(levelVal == 6){
			if(changeType == "main"){
			$("#districtId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			$("#constituencyId"+typeVal+counterId).trigger("chosen:updated");
			$("#mandalId"+typeVal+counterId).trigger("chosen:updated");
			$(".districtCls"+typeVal+counterId).show();
			$(".constituencyCls"+typeVal+counterId).show();
			$(".mandalCls"+typeVal+counterId).show();
			$(".panchayatCls"+typeVal+counterId).show();
			}else{
			$("#districtInnerId"+typeVal+counterId).trigger("chosen:updated");
			getAllDistrictsInState(typeVal,counterId,changeType);
			$("#constituencyInnerId"+typeVal+counterId).trigger("chosen:updated");
			$("#mandalInnerId"+typeVal+counterId).trigger("chosen:updated");
			$("#panchayatInnerId"+typeVal+counterId).trigger("chosen:updated");
			$(".districtInnerCls"+typeVal+counterId).show();
			$(".constituencyInnerCls"+typeVal+counterId).show();
			$(".mandalInnerCls"+typeVal+counterId).show();
			$(".panchayatInnerCls"+typeVal+counterId).show();
			}
		
	}else{
		if(changeType == "main"){
				$(".districtCls"+typeVal+counterId).hide();
				$(".constituencyCls"+typeVal+counterId).hide();
				$(".mandalCls"+typeVal+counterId).hide();
				$(".panchayatCls"+typeVal+counterId).hide();
			}else{
				$(".districtInnerCls"+typeVal+counterId).hide();
				$(".constituencyInnerCls"+typeVal+counterId).hide();
				$(".mandalInnerCls"+typeVal+counterId).hide();
				$(".panchayatInnerCls"+typeVal+counterId).hide();
			}
	}
});
$(document).on("change",".districtLevelChange",function(){
	var levelVal = $(this).val();
	var counterId = $(this).attr("attr_counterval");
	var typeVal = $(this).attr("attr_type");
	var typeChange = $(this).attr("attr_type_change");
	var locationLevelId = $('#locationLevelId'+typeVal+''+counterId+'').val();	
	if(typeChange == 'Inner')
		locationLevelId = $('#locationLevelInnerId'+typeVal+''+counterId+'').val();	
	if(parseInt(levelVal)>0 && parseInt(locationLevelId)>3)
		getConstituencyNamesByDistrictId(levelVal,counterId,typeVal,typeChange);
	
});
$(document).on("change",".constituencyLevelChange",function(){
	var levelVal = $(this).val();
	var counterId = $(this).attr("attr_counterval");
	var typeVal = $(this).attr("attr_type");
	var typeChange = $(this).attr("attr_type_change");
	var locationLevelId = $('#locationLevelId'+typeVal+''+counterId+'').val();
	if(typeChange == 'Inner')
		locationLevelId = $('#locationLevelInnerId'+typeVal+''+counterId+'').val();
	if(parseInt(levelVal)>0 && parseInt(locationLevelId)>4)
		getTehsilsAndLocalElectionBodyForConstituencyId(levelVal,counterId,typeVal,typeChange);
	
});
$(document).on("change",".mandalLevelChange",function(){
	var levelVal = $(this).val();
	levelVal=levelVal.toString().substr(1,levelVal.length);
	var counterId = $(this).attr("attr_counterval");
	var typeVal = $(this).attr("attr_type");
	var typeChange = $(this).attr("attr_type_change");	
	var locationLevelId = $('#locationLevelId'+typeVal+''+counterId+'').val();
	if(typeChange == 'Inner')
		locationLevelId = $('#locationLevelInnerId'+typeVal+''+counterId+'').val();
	if(parseInt(levelVal)>0 && parseInt(locationLevelId)==6)
		getPanchayats(levelVal,counterId,typeVal,typeChange);
	
});
function  enableWorks(value,divId,typeVal){
	$(".appendWorkDetailsDiv"+typeVal).html('');	
	$('#'+divId+'').hide()
	if(parseInt(value)>0){
		$('#'+divId+'').show();
	}
}
$(document).on("click",".applyCls",function(){
	
});

$(document).on("click",".cloned_Element",function(){
		
	var typeVal = $(this).attr("attr_type");
	var counterappendId = $(this).attr("block-clone-counter-"+typeVal+"");
	var blockId = $(this).attr("block-clone-"+typeVal+"");
	
	var estimationWorksCount = $('#noofWork'+typeVal+'').val();
		
	var enteredAmount =parseFloat(0.0);
	var estimationAmount= parseFloat($('#workCost'+typeVal+'').val());
	$(".amountCls").each(function(){
		var value = $(this).val();
		if(value!= null && value.length>0){
			if(parseFloat(value) <=0){
				//alert("Invalid estimation cost entered. Please check once.");
				//return;
			}else{
				enteredAmount = parseFloat(enteredAmount)+parseFloat(value);
			}
		}
	});
	
	if(estimationAmount != null && estimationAmount !='' && parseInt(estimationAmount)>0){
		if(enteredAmount>=estimationAmount){
			//alert("Total estimation cost reached. Please check once.");
			//return;
		}
	}
	
	if(parseInt(estimationWorksCount)<=parseInt(globalInnerWorksCount)){ 
		alert("Max no of works data entered. Please check once.");
		return;
	}
	
	/* getting previous work details */
		var mandalIds =0;
		
	   var changeType = "main";
	   var counterId = $(this).attr("block-clone-counter-"+typeVal+"");
	   var mainWorkCount = parseInt(globalWorkTypeCount)-1;
	   var innerWorkCount = globalInnerWorksCount;
		var existingFieldsInnerWorkCount = parseInt(innerWorkCount)-1;
		for(var i=existingFieldsInnerWorkCount;(i>=0 && i<=existingFieldsInnerWorkCount);i--){
			//alert(i);
			if(i == 0){
				//alert(" i = "+i);//workTypeInnerIdself11
				GlWrkTypeId = $('#workTypeId'+typeVal+''+mainWorkCount+''+i).val();
				
				GlLocationLvelId = $('#locationLevelId'+typeVal+''+mainWorkCount+''+i).val();
				GlDistrctId = $('#districtId'+typeVal+''+mainWorkCount+''+i).val();
				GlConsttuencyId = $('#constituencyId'+typeVal+''+mainWorkCount+''+i).val();
				GlMndalId = $('#mandalId'+typeVal+''+mainWorkCount+''+i).val();
				if(GlMndalId != null && GlMndalId !='undefined')
				  mandalIds = GlMndalId.toString().substr(1,GlMndalId.length-1);
				GlPnchayatId = $('#panchayatId'+typeVal+''+mainWorkCount+''+i).val();									
				
			}else{
				//alert(" i > "+i);//workTypeInnerIdself11
				//alert('#workTypeInnerId'+typeVal+''+mainWorkCount+''+i);
				GlWrkTypeId = $('#workTypeInnerId'+typeVal+''+mainWorkCount+''+i).val();
				GlLocationLvelId = $('#locationLevelInnerId'+typeVal+''+mainWorkCount+''+i).val();
				GlDistrctId = $('#districtInnerId'+typeVal+''+mainWorkCount+''+i).val();
				GlConsttuencyId = $('#constituencyInnerId'+typeVal+''+mainWorkCount+''+i).val();
				//alert(GlWrkTypeId);
				//alert(GlLocationLvelId);
				
				GlMndalId= $('#mandalInnerId'+typeVal+''+mainWorkCount+''+i).val();
				if(GlMndalId != null && GlMndalId !='undefined')
					mandalIds = GlMndalId.toString().substr(1,GlMndalId.length-1);
				GlPnchayatId = $('#panchayatInnerId'+typeVal+''+mainWorkCount+''+i).val();
			}
			if(parseInt(GlLocationLvelId)>0){
				break;
			}
		}
		
		/* auto locations populating */
		
	globalInnerWorksCount = parseInt(globalInnerWorksCount)+parseInt(1);
	
	var workCount = $("#noofWork"+typeVal).val();
	counterId = parseInt(counterId) + 1;
		
	//if(counterId <= parseInt(workCount)){
		$(".appendWorkDetailsDiv"+typeVal+"").append(clonedTemplate(blockId,'clone',counterId,typeVal,counterappendId,GlLocationLvelId));
		$(".chosen-select").chosen({width:'100%'});
		$("[block-clone-"+typeVal+"="+blockId+"]").attr("block-clone-counter-"+typeVal+"",counterId);
		globalWorkTypeCount = parseInt(globalWorkTypeCount)+1;
		getSubjectPetitionsDepartmentList(typeVal,counterappendId,blockId);
		//getPetitionSubjectList('subjectId',typeVal,counterappendId,blockId);
		getWorkTypeList('workTypeId',typeVal,counterappendId,blockId);
		//9999  //districtIdself10
		if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 3){
			getAllDistrictsInState(typeVal,counterappendId+"0",changeType);
		}else if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 4){
			getAllDistrictsInState(typeVal,counterappendId+"0",changeType);
			getConstituencyNamesByDistrictId(GlDistrctId,counterappendId+"0",typeVal,changeType);
		}else if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 5){
			getAllDistrictsInState(typeVal,counterappendId+"0",changeType);
			getConstituencyNamesByDistrictId(GlDistrctId,counterappendId+"0",typeVal,changeType);
			getTehsilsAndLocalElectionBodyForConstituencyId(GlConsttuencyId,counterappendId+"0",typeVal,changeType);
		}else if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 6){
			getAllDistrictsInState(typeVal,counterappendId+"0",changeType);
			getConstituencyNamesByDistrictId(GlDistrctId,counterappendId+"0",typeVal,changeType);
			getTehsilsAndLocalElectionBodyForConstituencyId(GlConsttuencyId,counterappendId+"0",typeVal,changeType);
			getPanchayats(mandalIds,counterappendId+"0",typeVal,changeType);
		}
	//}
});

function clonedTemplate(blockId,type,counterId,typeVal,counterappendId,locationLvelId){
	
	var clonedTemplate='';
	// here for evary new work  adding based on diff dept /subject/sub subject wise the subworksList should be start from ZERO ,but globalWorkTypeCount is same
	//var tempcounterId = counterId;
	//counterId = 0;
	var tempcounterId=1;
	clonedTemplate+='<div class="col-sm-12" cloned_block_'+typeVal+'='+counterappendId+' id="mainWorkDivId'+counterappendId+''+blockId+'">';
	clonedTemplate+='<div class="pull-right removeWorkCls" attr_id="mainWorkDivId'+counterappendId+''+blockId+'" attr_type="self" attr_candidateid="1"><span class="tooltipCls" data-toggle="tooltip" aria-hidden="true" data-placement="right" title="Remove Works"><i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span></div>';
		clonedTemplate+='<div style="border:3px solid #dddddd;padding:10px;">';
			clonedTemplate+='<div  cloned_block_'+typeVal+'='+counterappendId+'>';
				//clonedTemplate+='<h3 class="panel-title f_22">WORK TYPE '+counterId+'</h3>';
				
				clonedTemplate+='<div class="row m_top10" >';
				
					clonedTemplate+='<div class="col-sm-3">';
							clonedTemplate+='<label>DEPARTMENT <span class="starColor">*</span></label>';
							clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].deptId"  class="form-control chosen-select m_top10 validateCls OnchangeDeptCls"  id="WorkTypeWiseDepartmentId'+typeVal+''+counterappendId+''+blockId+'" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'" onchange="getPetitionSubjectList(this.value,\'subjectId\',\''+typeVal+'\',\''+counterappendId+'\',\''+blockId+'\')" >';
							clonedTemplate+='</select><br><span class="WorkTypeWiseDepartmentId'+typeVal+''+counterappendId+''+blockId+'"></span>';
						clonedTemplate+='</div>';
					
					clonedTemplate+='<div class="col-sm-3">';
						clonedTemplate+='<label>SUBJECT <span class="starColor">*</span></label>';
						clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].subjectId"  class="form-control chosen-select m_top10 validateCls subjctOnchangeCls"  id="subjectId'+typeVal+''+counterappendId+''+blockId+'" onChange=getPetitionSubSubjectList(this.value,"subSubjectId'+typeVal+''+counterappendId+'","'+blockId+'") attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
							clonedTemplate+='<option value="0">Select Subject</option>';
						clonedTemplate+='</select><br><span class="subjectId'+typeVal+''+counterappendId+''+blockId+'"></span>';
					clonedTemplate+='</div>';
					
					clonedTemplate+='<div class="col-sm-3">';
						clonedTemplate+='<label>SUB-SUBJECT <span class="starColor">*</span></label>';
						clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].subSubjectId"  class="form-control chosen-select m_top10 validateCls subSubjectReFreshCls'+counterappendId+' subSubjctOnchangeCls" id="subSubjectId'+typeVal+''+counterappendId+''+blockId+'" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
							clonedTemplate+='<option value="0">Select Sub Subject</option>';
						clonedTemplate+='</select><br><span class="subSubjectId'+typeVal+''+counterappendId+''+blockId+'"></span>';
					clonedTemplate+='</div>';
								
				clonedTemplate+='</div>';
				
				clonedTemplate+='<div class="row m_top10" id="workDivId'+counterappendId+''+blockId+'" >';
				//clonedTemplate+='<div class="pull-right removeWorkCls" attr_id="workDivId'+globalWorkTypeCount+''+counterId+'" attr_type="self" attr_candidateid="1" style="margin-top: -50px;cursor:pointer"><i class="glyphicon glyphicon-remove"></i></div>';
					clonedTemplate+='<div class="col-sm-12">';
						clonedTemplate+='<div class="bg_color_view">';
							//clonedTemplate+='<h3 class="panel-title f_16 font_weight">WORK TYPE</h3>';
							clonedTemplate+='<div class="row m_top10">';
									clonedTemplate+='<div class="col-sm-3">';
										clonedTemplate+='<label>WORK TYPE <span class="starColor">*</span></label>';
										clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].workTypeId"  class="form-control chosen-select m_top10 validateCls workTypeReFreshCls'+counterappendId+'" id="workTypeId'+typeVal+''+counterappendId+''+blockId+'" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
											clonedTemplate+='<option value="0">Select Work Type</option>';
										clonedTemplate+='</select><br><span class="workTypeId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
									clonedTemplate+='<div class="col-sm-3">';
										clonedTemplate+='<label>WORK IN COST  (in Lakhs)</label>';
										clonedTemplate+='<input type="text"  name="worksList['+counterappendId+'].subWorksList['+blockId+'].estimateCost" class="form-control m_top5 height45 validateCls amountCls isNumberCls workCostReFreshCls'+counterappendId+'" onkeyUp="validateAmount(this.value,this.id,\''+typeVal+'\');checkIsNumber(this.id,this.value)"  id="appendWorkCost'+typeVal+''+counterappendId+''+blockId+'" placeholder="Enter Work Cost" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'"/>';
										clonedTemplate+='<span class="appendWorkCost'+typeVal+''+counterappendId+''+blockId+'"></span> <span  class="ErrCls" id="ErrappendWorkCost'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
									/*clonedTemplate+='<div class="col-sm-3">';
										clonedTemplate+='<label>WORK DETAILS <span class="starColor">*</span></label>';
										clonedTemplate+='<input type="text"  name="worksList['+counterappendId+'].subWorksList['+blockId+'].grievanceDescription" class="form-control m_top5 height45 validateCls workDetailsReFreshCls'+counterappendId+'" id="appendWorkDetailsId'+typeVal+''+counterappendId+''+blockId+'" placeholder="Enter" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'"/><br><span class="appendWorkDetailsId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';*/
									clonedTemplate+='<div class="col-sm-3"  style="display:none;">';
										clonedTemplate+='<label>eOFFICE-ID <span class="starColor"></span></label>';
										clonedTemplate+='<input type="text"  name="worksList['+counterappendId+'].subWorksList['+blockId+'].eOfficeId" class="form-control m_top5 height45 validateCls officerIdReFreshCls'+counterappendId+'" id="appendEofficeId'+typeVal+''+counterappendId+''+blockId+'" placeholder="Enter" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'"/><br><span class="appendEofficeId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
							clonedTemplate+='</div>';
							clonedTemplate+='<div class="row ">';
									clonedTemplate+='<div class="col-sm-12">';
										clonedTemplate+='<label>WORK DETAILS <span class="starColor">*</span></label>';
										clonedTemplate+='<textarea  name="worksList['+counterappendId+'].subWorksList['+blockId+'].grievanceDescription" class="form-control m_top5 validateCls workDetailsReFreshCls'+counterappendId+'" id="appendWorkDetailsId'+typeVal+''+counterappendId+''+blockId+'" placeholder="Enter work details..." attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'" style="height:100px;" /><br><span class="appendWorkDetailsId'+typeVal+''+counterappendId+''+blockId+'" ></span>';
									clonedTemplate+='</div>';
							clonedTemplate+='</div>';
							clonedTemplate+='<div class="row m_top10">';
									clonedTemplate+='<div class="col-sm-3">';
										clonedTemplate+='<label>LOCATION LEVEL <span class="starColor">*</span></label>';
										clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].locationScopeId" class="form-control chosen-select m_top10 locationLevelChange locationLevelValidCls'+typeVal+' validateCls locationLevelReFreshCls'+counterappendId+'" id="locationLevelId'+typeVal+''+counterappendId+''+blockId+'" attr_counterval="'+counterappendId+''+blockId+'" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
											clonedTemplate+='<option value="0">Select Level</option>';
											
											if(locationLvelId == 3 || locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
												clonedTemplate+='<option value="3" selected>District</option>';
											else
												clonedTemplate+='<option value="3">District</option>';
											if(locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
												clonedTemplate+='<option value="4" selected>Constituency</option>';
											else
												clonedTemplate+='<option value="4">Constituency</option>';
											if(locationLvelId == 5 || locationLvelId == 6)
												clonedTemplate+='<option value="5" selected>Mandal/Muncipality/Corporation</option>';
											else
												clonedTemplate+='<option value="5" >Mandal/Muncipality/Corporation</option>';
											if(locationLvelId == 6)
												clonedTemplate+='<option value="6" selected>Panchayat</option>';
											else
												clonedTemplate+='<option value="6">Panchayat</option>';
											
										clonedTemplate+='</select><br><span class="locationLevelId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
									
									if(locationLvelId == 3 || locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
										clonedTemplate+='<div class="col-sm-2 districtCls'+typeVal+''+counterappendId+''+blockId+'" style="">';
									else 
										clonedTemplate+='<div class="col-sm-2 districtCls'+typeVal+''+counterappendId+''+blockId+'" style="display:none">';
										clonedTemplate+='<label>DISTRICT <span class="starColor">*</span></label>';
										clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].addressVO.districtId"  class="form-control chosen-select m_top10 districtLevelChange validateCls districtRefreshCls" id="districtId'+typeVal+''+counterappendId+''+blockId+'" attr_counterval="'+counterappendId+''+blockId+'" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
											clonedTemplate+='<option value="0">Select District</option>';
										clonedTemplate+='</select><br><span class="districtId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
									
									if(locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
										clonedTemplate+='<div class="col-sm-2 constituencyCls'+typeVal+''+counterappendId+''+blockId+'" style="">';
									else
										clonedTemplate+='<div class="col-sm-2 constituencyCls'+typeVal+''+counterappendId+''+blockId+'" style="display:none">';
									
										clonedTemplate+='<label>CONSTITUENCY <span class="starColor">*</span></label>';
										clonedTemplate+='<select   name="worksList['+counterappendId+'].subWorksList['+blockId+'].addressVO.assemblyId"  class="form-control chosen-select m_top10 constituencyLevelChange validateCls conChangeCls conRefreshCls'+counterappendId+''+blockId+'" id="constituencyId'+typeVal+''+counterappendId+''+blockId+'" attr_counterval="'+counterappendId+''+blockId+'" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
											clonedTemplate+='<option value="0">Select Constituency</option>';
										clonedTemplate+='</select><br><span class="constituencyId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
									
									if(locationLvelId == 5 || locationLvelId == 6)
										clonedTemplate+='<div class="col-sm-2 mandalCls'+typeVal+''+counterappendId+''+blockId+'" style="">';
									else
										clonedTemplate+='<div class="col-sm-2 mandalCls'+typeVal+''+counterappendId+''+blockId+'" style="display:none">';
									
										clonedTemplate+='<label>MANDAL/MUNCI. <span class="starColor">*</span></label>';
										clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].addressVO.tehsilId"  class="form-control chosen-select m_top10 mandalLevelChange validateCls mandalRefreshCls'+counterappendId+''+blockId+' madalChangeCls" id="mandalId'+typeVal+''+counterappendId+''+blockId+'" attr_counterval="'+counterappendId+''+blockId+'" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
											clonedTemplate+='<option value="0">Select Mandal</option>';
										clonedTemplate+='</select><br><span class="mandalId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
									if(locationLvelId == 6)
										clonedTemplate+='<div class="col-sm-2 panchayatCls'+typeVal+''+counterappendId+''+blockId+'">';
									else
										clonedTemplate+='<div class="col-sm-2 panchayatCls'+typeVal+''+counterappendId+''+blockId+'" style="display:none">';
										clonedTemplate+='<label>PANCHAYAT <span class="starColor">*</span></label>';
										clonedTemplate+='<select  name="worksList['+counterappendId+'].subWorksList['+blockId+'].addressVO.panchayatId"  class="form-control chosen-select m_top10  validateCls panchayatRefreshCls'+counterappendId+''+blockId+'" id="panchayatId'+typeVal+''+counterappendId+''+blockId+'" attr_counterval="'+counterappendId+''+blockId+'" attr_type="'+typeVal+'" attr_type_change="main" attr_main_count="'+counterappendId+'" attr_inner_count="'+blockId+'">';
											clonedTemplate+='<option value="0">Select Panchayat</option>';
										clonedTemplate+='</select><br><span class="panchayatId'+typeVal+''+counterappendId+''+blockId+'"></span>';
									clonedTemplate+='</div>';
							clonedTemplate+='</div>';
						clonedTemplate+='</div>';
					clonedTemplate+='</div>';
					
					clonedTemplate+='<div class="appendInnerBlocks'+typeVal+''+globalWorkTypeCount+''+tempcounterId+'"></div>';
					clonedTemplate+='<div class="col-sm-12">';
						clonedTemplate+='<div class="pull-right">';
							clonedTemplate+='<span class="addLocationCss m_top10 pull-right cloned_Inner_Element" style="cursor:pointer;" attr_type="'+typeVal+'" attr_counterval="'+counterId+''+counterappendId+'" main_work_count="'+globalWorkTypeCount+'" inner_work_count="1" >ADD WORK  </span>';
						clonedTemplate+='</div>';
					clonedTemplate+='</div>';					
				clonedTemplate+='</div>';					
		clonedTemplate+='</div>';
	clonedTemplate+='</div>';
	//counterId = tempcounterId;
	tempcounterId=tempcounterId+1;
	
	return clonedTemplate;
	
}

$(document).on("click",".cloned_Inner_Element",function(){
	
	var typeVal = $(this).attr("attr_type");
	var counterId = $(this).attr("attr_counterval");	
	var mainWorkCount = $(this).attr("main_work_count");
	var innerWorkCount = $(this).attr("inner_work_count");
	var estimationWorksCount = $('#noofWork'+typeVal+'').val();
	
	var enteredAmount =parseFloat(0.0);
	var estimationAmount= parseFloat($('#workCost'+typeVal+'').val());
	$(".amountCls").each(function(){
		var value = $(this).val();
		if(value!= null && value.length>0){
			if(parseFloat(value) <=0){
				//$('#Err'+fieldId+'').html("Invalid estimation cost entered. Please check once.");
				//return;
			}else{
				enteredAmount = parseFloat(enteredAmount)+parseFloat(value);
			}
		}
	});
	
	if(estimationAmount != null && estimationAmount !='' && parseInt(estimationAmount)>0){
		if(enteredAmount>=estimationAmount){
			//alert("Total estimation cost reached. Please check once.");
			//return;
		}
	}

	if(parseInt(estimationWorksCount)<=parseInt(globalInnerWorksCount)){
		alert("Max no of works data entered. Please check once.");
		return;
	}
	
	/* getting previous work details */
		var mandalIds =0;
		
	   var changeType = "Inner";
	   var counterId = $(this).attr("attr_counterval");	
	   var mainWorkCount = $(this).attr("main_work_count");
	   var innerWorkCount = $(this).attr("inner_work_count");
	   counterId=mainWorkCount+''+innerWorkCount;
		var existingFieldsInnerWorkCount = parseInt(innerWorkCount)-1;
		
		for(var i=existingFieldsInnerWorkCount;(i>=0 && i<=existingFieldsInnerWorkCount);i--){
				if(i == 0){
					GlWrkTypeId = $('#workTypeId'+typeVal+''+mainWorkCount+''+i).val();
					GlLocationLvelId = $('#locationLevelId'+typeVal+''+mainWorkCount+''+i).val();
					GlDistrctId = $('#districtId'+typeVal+''+mainWorkCount+''+i).val();
					GlConsttuencyId = $('#constituencyId'+typeVal+''+mainWorkCount+''+i).val();
					GlMndalId = $('#mandalId'+typeVal+''+mainWorkCount+''+i).val();
					if(GlMndalId != null && GlMndalId !='undefined')
					  mandalIds = GlMndalId.toString().substr(1,GlMndalId.length-1);
					GlPnchayatId = $('#panchayatId'+typeVal+''+mainWorkCount+''+i).val();
										counterId = mainWorkCount+''+innerWorkCount;
				}else{
					GlWrkTypeId = $('#workTypeInnerId'+typeVal+''+mainWorkCount+''+i).val();
					GlLocationLvelId = $('#locationLevelInnerId'+typeVal+''+mainWorkCount+''+i).val();
					GlDistrctId = $('#districtInnerId'+typeVal+''+mainWorkCount+''+i).val();
					GlConsttuencyId = $('#constituencyInnerId'+typeVal+''+mainWorkCount+''+i).val();
					GlMndalId = $('#mandalInnerId'+typeVal+''+mainWorkCount+''+i).val();
					if(GlMndalId != null && GlMndalId !='undefined')
						mandalIds = GlMndalId.toString().substr(1,GlMndalId.length-1);
					GlPnchayatId = $('#panchayatInnerId'+typeVal+''+mainWorkCount+''+i).val();
					counterId=mainWorkCount+''+innerWorkCount;
				}
				if(parseInt(GlLocationLvelId)>0){
					getAllDistrictsInState(typeVal,counterId,changeType);
					getConstituencyNamesByDistrictId(GlDistrctId,counterId,typeVal,changeType);
					getTehsilsAndLocalElectionBodyForConstituencyId(GlConsttuencyId,counterId,typeVal,changeType);
					getPanchayats(mandalIds,counterId,typeVal,changeType);
					break;
				}
			//}
		}
		
		/* auto locations populating */
	globalInnerWorksCount = parseInt(globalInnerWorksCount)+parseInt(1);
	$(this).attr("inner_work_count",parseInt(innerWorkCount)+1);
	var conterInnerVal = parseInt(innerWorkCount)+1
	
	
	$(".appendInnerBlocks"+typeVal+mainWorkCount+innerWorkCount).append(clonedInnerTemplate('clone',counterId,typeVal,mainWorkCount,innerWorkCount,conterInnerVal,GlLocationLvelId));
	$(".chosen-select").chosen({width:'100%'});
	getWorkTypeList('workTypeInnerId',typeVal,mainWorkCount,innerWorkCount);
	
		if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 3){
			getAllDistrictsInState(typeVal,counterId,changeType);
		}else if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 4){
			getAllDistrictsInState(typeVal,counterId,changeType);
			getConstituencyNamesByDistrictId(GlDistrctId,counterId,typeVal,changeType);
		}else if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 5){
			getAllDistrictsInState(typeVal,counterId,changeType);
			getConstituencyNamesByDistrictId(GlDistrctId,counterId,typeVal,changeType);
			getTehsilsAndLocalElectionBodyForConstituencyId(GlConsttuencyId,counterId,typeVal,changeType);
		}else if(GlLocationLvelId != null && GlLocationLvelId !='undefined' && GlLocationLvelId == 6){
			getAllDistrictsInState(typeVal,counterId,changeType);
			getConstituencyNamesByDistrictId(GlDistrctId,counterId,typeVal,changeType);
			getTehsilsAndLocalElectionBodyForConstituencyId(GlConsttuencyId,counterId,typeVal,changeType);
			getPanchayats(mandalIds,counterId,typeVal,changeType);
		}
	
});
function clonedInnerTemplate(type,counterId,typeVal,mainWorkCount,innerWorkCount,conterInnerVal,locationLvelId){
	var clonedInnerTemplate='';
	clonedInnerTemplate+='<div class="m_top10" >';
		clonedInnerTemplate+='<div class="col-sm-12 m_top10" >';
		clonedInnerTemplate+='<div class="pull-right removeWorkCls" attr_id="workDivId'+globalWorkTypeCount+''+innerWorkCount+'" attr_type="self" attr_candidateid="1"><span class="tooltipCls" data-toggle="tooltip" data-placement="top" title="Remove This Work"><i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span></div>';
			clonedInnerTemplate+='<div class="bg_color_view" id="workDivId'+globalWorkTypeCount+''+innerWorkCount+'">';
				//clonedInnerTemplate+='<h3 class="panel-title f_16 font_weight"> WORK </h3>';
				clonedInnerTemplate+='<div class="row m_top10" >';
						clonedInnerTemplate+='<div class="col-sm-3">';
							clonedInnerTemplate+='<label>WORK TYPE  <span class="starColor">*</span></label>';
							clonedInnerTemplate+='<select  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].workTypeId"  class="form-control chosen-select m_top10 validateInnerCls" id="workTypeInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'">';
								clonedInnerTemplate+='<option value="0">Select Work Type</option>';
							clonedInnerTemplate+='</select><br><span class="workTypeInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
						clonedInnerTemplate+='<div class="col-sm-3">';
							clonedInnerTemplate+='<label>WORK IN COST  (in Lakhs)</label>';
							clonedInnerTemplate+='<input type="text"  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].estimateCost" class="form-control m_top5 height45 validateInnerCls amountCls isNumberCls workCostReFreshCls'+mainWorkCount+'" onkeyUp="validateAmount(this.value,this.id,\''+typeVal+'\');checkIsNumber(this.id,this.value)"  id="appendWorkCostInner'+typeVal+''+mainWorkCount+''+innerWorkCount+'" placeholder="Enter Work Cost" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'"/><br><span class="appendWorkCostInner'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
							clonedInnerTemplate+='<span  class="ErrCls"  id="ErrappendWorkCostInner'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
						/* clonedInnerTemplate+='<div class="col-sm-3">';
							clonedInnerTemplate+='<label>WORK DETAILS <span class="starColor">*</span></label>';
							clonedInnerTemplate+='<input type="text"  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].grievanceDescription" class="form-control m_top5 height45 validateInnerCls workDetailsReFreshCls'+mainWorkCount+'" id="appendWorkDetailsInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" placeholder="Enter" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'"/><br><span class="appendWorkDetailsInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>'; 
						clonedInnerTemplate+='</div>';*/
						clonedInnerTemplate+='<div class="col-sm-3"  style="display:none;">';
							clonedInnerTemplate+='<label>eOFFICE-ID <span class="starColor"></span></label>';
							clonedInnerTemplate+='<input type="text"  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].eOfficeId" class="form-control m_top5 height45 validateInnerCls officerIdReFreshCls'+mainWorkCount+'" id="appendEofficeInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" placeholder="Enter" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'"/><br><span class="appendEofficeInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
				clonedInnerTemplate+='</div>';
				clonedInnerTemplate+='<div class="row ">';
							clonedInnerTemplate+='<div class="col-sm-12">';
								clonedInnerTemplate+='<label>WORK DETAILS <span class="starColor">*</span></label>';
								clonedInnerTemplate+='<textarea  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].grievanceDescription" class="form-control m_top5  validateInnerCls workDetailsReFreshCls'+mainWorkCount+'" id="appendWorkDetailsInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" placeholder="Enter work details..." attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'"  style="height:100px;"/><br><span class="appendWorkDetailsInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"  ></span>';
								clonedInnerTemplate+='</div>';
				clonedInnerTemplate+='</div>';
				clonedInnerTemplate+='<div class="row m_top10">';
						clonedInnerTemplate+='<div class="col-sm-3">';
							clonedInnerTemplate+='<label>LOCATION LEVEL <span class="starColor">*</span></label>';
							clonedInnerTemplate+='<select  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].locationScopeId" class="form-control chosen-select m_top10 locationLevelChange locationLevelValidCls'+typeVal+' validateInnerCls locationLevelReFreshCls'+mainWorkCount+'" id="locationLevelInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" attr_counterval="'+mainWorkCount+''+innerWorkCount+'" attr_type="'+typeVal+'" attr_type_change="Inner" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'">';
								clonedInnerTemplate+='<option value="0">Select Level</option>';
								if(locationLvelId == 3 || locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
									clonedInnerTemplate+='<option value="3" selected>District</option>';
								else
									clonedInnerTemplate+='<option value="3">District</option>';
								if(locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
									clonedInnerTemplate+='<option value="4" selected>Constituency</option>';
								else
									clonedInnerTemplate+='<option value="4">Constituency</option>';
								if(locationLvelId == 5 || locationLvelId == 6)
									clonedInnerTemplate+='<option value="5" selected>Mandal/Muncipality/Corporation</option>';
								else
									clonedInnerTemplate+='<option value="5" >Mandal/Muncipality/Corporation</option>';
								if(locationLvelId == 6)
									clonedInnerTemplate+='<option value="6" selected>Panchayat</option>';
								else
									clonedInnerTemplate+='<option value="6">Panchayat</option>';
							clonedInnerTemplate+='</select><br><span class="locationLevelInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
						
							if(locationLvelId == 3 || locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
								clonedInnerTemplate+='<div class="col-sm-2 districtInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'">';
							else 
								clonedInnerTemplate+='<div class="col-sm-2 districtInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'" style="display:none">';
						
							clonedInnerTemplate+='<label>DISTRICT <span class="starColor">*</span><span class="districtInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span></label>';
							clonedInnerTemplate+='<select  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].addressVO.districtId"  class="form-control chosen-select m_top10 districtLevelChange validateInnerCls districtRefreshCls" id="districtInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" attr_counterval="'+mainWorkCount+''+innerWorkCount+'" attr_type="'+typeVal+'" attr_type_change="Inner" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'">';
								clonedInnerTemplate+='<option value="0">Select District</option>';
							clonedInnerTemplate+='</select><br><span class="districtInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
						
							if(locationLvelId == 4 || locationLvelId == 5 || locationLvelId == 6)
								clonedInnerTemplate+='<div class="col-sm-2 constituencyInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'" >';
							else
								clonedInnerTemplate+='<div class="col-sm-2 constituencyInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'" style="display:none">';
						
							clonedInnerTemplate+='<label>CONSTITUENCY <span class="starColor">*</span><span class="constituencyInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span></label>';
							clonedInnerTemplate+='<select   name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].addressVO.assemblyId"  class="form-control chosen-select m_top10 constituencyLevelChange validateInnerCls conChangeCls conRefreshCls'+mainWorkCount+''+innerWorkCount+'" id="constituencyInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" attr_counterval="'+mainWorkCount+''+innerWorkCount+'" attr_type="'+typeVal+'" attr_type_change="Inner" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'">';
								clonedInnerTemplate+='<option value="0">Select Constituency</option>';
							clonedInnerTemplate+='</select><br><span class="constituencyInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
						
							if(locationLvelId == 5 || locationLvelId == 6)
								clonedInnerTemplate+='<div class="col-sm-2 mandalInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'">';
							else
								clonedInnerTemplate+='<div class="col-sm-2 mandalInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'" style="display:none">';
						
							clonedInnerTemplate+='<label>MANDAL/MUNCI. <span class="starColor">*</span><span class="mandalInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span></label>';
							clonedInnerTemplate+='<select  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].addressVO.tehsilId"  class="form-control chosen-select m_top10 mandalLevelChange validateInnerCls  mandalRefreshCls'+mainWorkCount+''+innerWorkCount+' madalChangeCls" id="mandalInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" attr_counterval="'+mainWorkCount+''+innerWorkCount+'" attr_type="'+typeVal+'" attr_type_change="Inner" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'"><br><span class="mandalInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
								clonedInnerTemplate+='<option value="0">Select Mandal</option>';
							clonedInnerTemplate+='</select>';
						clonedInnerTemplate+='</div>';
							if(locationLvelId == 6)
								clonedInnerTemplate+='<div class="col-sm-2 panchayatInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'">';
							else
								clonedInnerTemplate+='<div class="col-sm-2 panchayatInnerCls'+typeVal+''+mainWorkCount+''+innerWorkCount+'" style="display:none">';
						
							clonedInnerTemplate+='<label>PANCHAYAT <span class="starColor">*</span><span class="panchayatInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span></label>';
							
							clonedInnerTemplate+='<select  name="worksList['+mainWorkCount+'].subWorksList['+innerWorkCount+'].addressVO.panchayatId"  class="form-control chosen-select m_top10 panchayatLevelChange validateInnerCls panchayatRefreshCls'+mainWorkCount+''+innerWorkCount+'" id="panchayatInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'" attr_counterval="'+mainWorkCount+''+innerWorkCount+'" attr_type="'+typeVal+'" attr_type_change="Inner" attr_main_count="'+mainWorkCount+'" attr_inner_count="'+innerWorkCount+'">';
								clonedInnerTemplate+='<option value="0">Select Panchayat</option>';
							clonedInnerTemplate+='</select><br><span class="panchayatInnerId'+typeVal+''+mainWorkCount+''+innerWorkCount+'"></span>';
						clonedInnerTemplate+='</div>';
				clonedInnerTemplate+='</div>';
			clonedInnerTemplate+='</div>';
		clonedInnerTemplate+='</div>';
		clonedInnerTemplate+='</div>';
		clonedInnerTemplate+='<div class="appendInnerBlocks'+typeVal+''+mainWorkCount+''+conterInnerVal+'"></div>';
		
		return clonedInnerTemplate;
}

function getAllDistrictsListInState(districtId){	
	$("#districtrepresent").html('');
	 $("#districtrepresent").html('<option value="0">Select District</option>');
	 $("#districtrepresent").trigger('chosen:updated');
	var json = {
		  stateId:"1",
		  searchType:"all",
		  searchId:0
		}
	$.ajax({                
		type:'POST',    
		url: 'getAllDistrictsInState',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#districtrepresent").html('<option value="0">Select District</option>');
				for(var i in result){
					if(districtId == result[i].id){
						$("#districtrepresent").append('<option value="'+result[i].id+'" selected>'+result[i].name+' </option>');
					}else{
						$("#districtrepresent").append('<option value="'+result[i].id+'">'+result[i].name+' </option>');
					}
				}
			}
			$("#districtrepresent").trigger('chosen:updated');
	});	
}

$(document).on("change","#districtrepresent",function(){
 $("#constituencyrepresent").html('<option value="0">Select Constituency</option>');	
 $("#constituencyrepresent").trigger('chosen:updated');
 $("#mandalrepresent").html("<option value ='0'>Select Mandal</option>");
 $("#panchayatrepresent").html("<option value ='0'>Select Panchayat</option>");
 $("#mandalrepresent").trigger("chosen:updated");
 $("#panchayatrepresent").trigger("chosen:updated");
	var levelVal = $(this).val();
	getConstituencyNamesBiDistrictId(levelVal,""); 
	
});
function getConstituencyNamesBiDistrictId(levelVal,constincyId){
	  $("#constituencyrepresent").html('');
	  $("#constituencyrepresent").html('<option value="0">Select Constituency</option>');	
	  $("#constituencyrepresent").trigger('chosen:updated');
	   var searchType= "all";		
	  var json = {
		  districtId:levelVal,
		  searchType:"all",
		  searchId:0
		}
	$.ajax({                
		type:'POST',    
		url: 'getConstituencyNamesByDistrictId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){	
			for(var i in result){
				if(constincyId == result[i].locationId){
					$("#constituencyrepresent").append('<option value="'+result[i].locationId+'" selected>'+result[i].locationName+' </option>');
				}else{
					$("#constituencyrepresent").append('<option value="'+result[i].locationId+'">'+result[i].locationName+' </option>');
				}
			}
		}
		$("#constituencyrepresent").trigger('chosen:updated');		
	});	
}

$(document).on("change","#constituencyrepresent",function(){
 $("#mandalrepresent").html("<option value ='0'>Select Mandal</option>");
 $("#panchayatrepresent").html("<option value ='0'>Select Panchayat</option>");
 $("#mandalrepresent").trigger("chosen:updated");
 $("#panchayatrepresent").trigger("chosen:updated");
	var levelVal = $(this).val();
	getTehsilsAndLocalElectionBodiForConstituencyId(levelVal,""); 
	
});
function getTehsilsAndLocalElectionBodiForConstituencyId(levelVal,mandalId){
	  $("#mandalrepresent").html('');	
	  $("#mandalrepresent").html('<option value="0">Select Mandal</option>');	
	  $("#mandalrepresent").trigger('chosen:updated');	
	  var json = {
		  constituencyId:levelVal,
		  searchType:"all",
		  searchId:0
		}        
	$.ajax({                
		type:'POST',    
		url: 'getTehsilsAndLocalElectionBodyForConstituencyId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){			 		
			for(var i in result){
					var tehsilId = result[i].key;
					var levelId = tehsilId;//tehsilId.toString().substr(1, 4);
					if(result[i].electionType != null){
						if(mandalId == levelId){
							$("#mandalrepresent").append('<option value="'+levelId+'" selected>'+result[i].value+' '+result[i].electionType+'</option>');
						}else{
							$("#mandalrepresent").append('<option value="'+levelId+'">'+result[i].value+' '+result[i].electionType+'</option>');
						}
					}else{
						if(mandalId == levelId){
							$("#mandalrepresent").append('<option value="'+levelId+'" selected>'+result[i].value+'</option>');
						}else{
							$("#mandalrepresent").append('<option value="'+levelId+'">'+result[i].value+'</option>');
						}
					}
			}
		}
		$("#mandalrepresent").trigger('chosen:updated');
	});	
}
$(document).on("change","#mandalrepresent",function(){
$("#panchayatrepresent").html("<option value ='0'>Select Panchayat</option>");
$("#panchayatrepresent").trigger("chosen:updated");
	var levelVal = $(this).val();
	levelVal=levelVal.toString().substring(1,levelVal.length);
	getPanchayatsByTehsilId(levelVal,""); 
	
});

function getPanchayatsByTehsilId(levelVal,panchayatId){
	  $("#panchayatrepresent").html('');	
	  $("#panchayatrepresent").html('<option value="0">Select Panchayat</option>');	
	  $("#panchayatrepresent").trigger('chosen:updated');	
	  var json = {
		  tehsilId:levelVal,
		  searchType:"all",
		  searchId:0
		}        
	$.ajax({                
		type:'POST',    
		url: 'getPanchayatsByTehsilId',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){			 		
			for(var i in result){
				if(panchayatId == result[i].key){
					$("#panchayatrepresent").append('<option value="'+result[i].key+'" selected>'+result[i].value+' </option>');
				}else{
					$("#panchayatrepresent").append('<option value="'+result[i].key+'" >'+result[i].value+' </option>');
				}
			}
		}
		
		$("#panchayatrepresent").trigger('chosen:updated');
	});	
}

function getSubjectPetitionsDepartmentList(typeVal,count,innerCount){
	 $("#WorkTypeWiseDepartmentId"+typeVal+""+count+innerCount+"").html('');
	 $("#WorkTypeWiseDepartmentId"+typeVal+""+count+innerCount+"").append('<option value="0">Select Department</option>');
	 $("#WorkTypeWiseDepartmentId"+typeVal+""+count+innerCount+"").trigger('chosen:updated');
	   var json = { 
		  searchType:"all" // all/petitionGivenDepts
	  };     
	$.ajax({              
		type:'POST',    
		url: 'getPmDepartmentList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 	$("#WorkTypeWiseDepartmentId"+typeVal+""+count+innerCount+"").html('<option value="0">Select Department</option>');
			for(var i in result){
				$("#WorkTypeWiseDepartmentId"+typeVal+""+count+innerCount+"").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#WorkTypeWiseDepartmentId"+typeVal+""+count+innerCount+"").trigger('chosen:updated');
	});	
}



function getPetitionSubjectList(deptId,divId,typeVal,counterId,innerCount){	
	 $("#"+divId+""+typeVal+""+counterId+innerCount+"").html('');
	 $("#"+divId+""+typeVal+""+counterId+innerCount+"").html('<option value="0">Select Subject</option>');
	 $("#"+divId+""+typeVal+""+counterId+innerCount+"").trigger('chosen:updated');
	var json = {
		deptId:deptId
	};
	$.ajax({              
		type:'POST',    
		url: 'getPmSubjectList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#"+divId+""+typeVal+""+counterId+innerCount+"").html('<option value="0">Select Subject</option>');
			for(var i in result){
				$("#"+divId+""+typeVal+""+counterId+innerCount+"").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#"+divId+""+typeVal+""+counterId+innerCount+"").trigger('chosen:updated');
	});	
}


function getPetitionSubSubjectList(subjectId,divId,innerCount){
	
 $("#"+divId+innerCount).html('');
 $("#"+divId+innerCount).html('<option value="0">Select Sub Subject</option>');
 $("#"+divId+innerCount).trigger('chosen:updated');
 
	var json = {
		subjectId : subjectId
	};
	$.ajax({              
		type:'POST',    
		url: 'getPmSubSubjectList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#"+divId+innerCount).html('<option value="0">Select Sub Subject</option>');
			for(var i in result){
				$("#"+divId+innerCount).append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#"+divId+innerCount).trigger('chosen:updated');
	});	
}
//workTypeInnerId, workTypeId
function getWorkTypeList(divId,typeVal,count,innerCount){
	//alert("#"+divId+typeVal+count);
	 $("#"+divId+typeVal+count+innerCount).html('<option value="0">Select Work Type</option>');
	 $("#"+divId+typeVal+count+innerCount).trigger('chosen:updated');
    var json = {
     
   };
 $.ajax({              
  type:'POST',    
  url: 'getWorkTypeList',
  dataType: 'json',
  data : JSON.stringify(json),
  beforeSend :   function(xhr){
   xhr.setRequestHeader("Accept", "application/json");
   xhr.setRequestHeader("Content-Type", "application/json");
  }
 }).done(function(result){
  if(result !=null && result.length>0){
   
   for(var i in result){
     $("#"+divId+typeVal+count+innerCount).append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
   }
  }
   $("#"+divId+typeVal+count+innerCount).trigger('chosen:updated');
   if(GlWrkTypeId != null && GlWrkTypeId !='undefined')
	    $("#"+divId+typeVal+count+innerCount).val(GlWrkTypeId);
	  $("#"+divId+typeVal+count+innerCount).trigger('chosen:updated');
 }); 
}


$(document).on("click",".saveRepresentRequestDetails",function(){
	var typeVal = $(this).attr("attr_type");
	
	var completeWorkName='';
	var noofWorks='';
	var workCost='';
	var WorkTypeWiseDepartmentId='';
	var subjectId='';
	var subSubjectId='';
	
	var workTypeId='';
	var appendWorkCost='';
	var appendWorkDetailsId='';
	var appendEofficeId='';
	var locationLevelId='';
	var districtId='';
	var constituencyId='';
	var mandalId='';
	var panchayatId='';
	
	var workTypeInnerId='';
	var appendWorkCostInner='';
	var appendWorkDetailsInnerId='';
	var appendEofficeInnerId='';
	var locationLevelInnerId='';
	var districtInnerId='';
	var constituencyInnerId='';
	var mandalInnerId='';
	var panchayatInnerId='';
	
	var flag = true;
	$('#saveButtonId').hide();
	$('.ErrCls').html('');
	
	
	if(typeVal =='represent' || typeVal =='representee'){
		var repName=$('#name'+typeVal+'').val();
		var repMobileNo=$('#mobileNumberrepresent').val();
		var repEmail=$('#emailId'+typeVal+'').val();
		var repDistrictId=$('#district'+typeVal+'').val();
		var repCostituencyId=$('#constituency'+typeVal+'').val();
		var repTehsilId=$('#mandal'+typeVal+'').val();
		var repPanchayatId=$('#panchayat'+typeVal+'').val();
		var repdesignation= $('#designation'+typeVal+'').val();
		
		if(repName == undefined || repName == "undefined" || repName.trim() == '' || repName == null){
			$('#nameErr'+typeVal+'').html("<h5 style='color:red;'>Please enter  name</h5>");
			$('#saveButtonId').show();
			flag = false;
		}else{
			$('#nameErr'+typeVal+'').html("");
		}

		if(repMobileNo == undefined || repMobileNo == "undefined" || repMobileNo.trim() == '' || repMobileNo == null){
			$('#mobileNumberErr'+typeVal+'').html("<h5 style='color:red;'>Please enter  mobile no.</h5>");
			$('#saveButtonId').show();
			flag = false;
		}else if(parseInt(repMobileNo.trim().length) <10 || parseInt(repMobileNo.trim().length) >10 || parseInt(repMobileNo.trim().length) !=10){
			//$('#mobileNumberErr'+typeVal+'').html("<h5 style='color:red;'>Please enter valid mobile no.</h5>");
			$('#saveButtonId').show();
			//flag = false;
		}else{
			$('#mobileNumberErr'+typeVal+'').html("");
		}
		if(repEmail != undefined && repEmail != "undefined" && repEmail.trim() != '' && repEmail != null){
			 var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			 if (!filter.test(repEmail.trim())) {
				$('#emailIdErr'+typeVal+'').html("<h5 style='color:red;'>Please enter valid email address.</h5>");
				$('#saveButtonId').show();
				flag = false;
			 }
		}else{
			$('#emailIdErr'+typeVal+'').html("");
		}
		
		if(repDistrictId == 0 || repDistrictId == null || repDistrictId == ''){
			$("#districtErr"+typeVal+'').html("<h5 style='color:red;'>Please select  district.</h5>");
			$('#saveButtonId').show();
			flag = false;
		}else{
			$("#districtErr"+typeVal+'').html("");
		}
		if(repCostituencyId == 0 || repCostituencyId == null || repCostituencyId == ''){
			//$("#constituencyErr"+typeVal+'').html("<h5 style='color:red;'>Please select  constituency.</h5>");
			$('#saveButtonId').show();
			//flag = false;
		}else{
			$("#constituencyErr"+typeVal+'').html("");
		}
		if(repTehsilId == 0 || repTehsilId == null || repTehsilId == ''){
			//$("#mandalErr"+typeVal+'').html("<h5 style='color:red;'>Please select  mandal/munci.</h5>");
			$('#saveButtonId').show();
			//flag = false;
		}else{
			$("#mandalErr"+typeVal+'').html("");
		}
		/*if(repPanchayatId == 0 || repPanchayatId == null || repPanchayatId == ''){
			$("#panchayatErr"+typeVal+'').html("<h5 style='color:red;'>Please select  panchayat.</h5>");
			$('#saveButtonId').show();
			flag = false;
		}else{
			$("#panchayatErr"+typeVal+'').html("");
		}*/
		if(repdesignation == 0 || repdesignation == null || repdesignation == ''){
			$("#designationErr"+typeVal+'').html("<h5 style='color:red;'>Please select  designation.</h5>");
			$('#saveButtonId').show();
			flag = false;
		}else{
			$("#designationErr"+typeVal+'').html("");
		}		
	}
	
	var totalRefCount=0;
	$('#refCandidatesErr').html('');
	$('.refCandidatesCls').each(function(){
		var value = $(this).val();
		
		if(value != undefined && value != "undefined" && value.trim() != '' && value != null && parseInt(value)>0)
			totalRefCount = parseInt(totalRefCount)+1;
	});
	
	if(totalRefCount == undefined || totalRefCount == "undefined" || totalRefCount == null || parseInt(totalRefCount) == 0 ){
		//flag = false;
		if(typeVal =='represent' || typeVal =='representee')
			;//$('#refCandidatesErr').html('Please add atleast one referral details.');
		else 
			;//$('#refCandidatesErr').html('Please add Self member details.');		
	}
	else if(refCandCount == undefined || refCandCount == "undefined" || refCandCount == null || parseInt(refCandCount) == 0 ){
		//flag = false;
		if(typeVal =='represent' || typeVal =='representee')
			;//$('#refCandidatesErr').html('Please add atleast one referral details.');
		else 
			;//$('#refCandidatesErr').html('Please add Self member details.');
		
	}
	
	var enteredAmount =parseFloat(0);
	var estimationAmount= parseFloat($('#workCost'+typeVal+'').val());
	$(".amountCls").each(function(){
		var value = $(this).val();
		if(value!= null && value.length>0){
			if(parseFloat(value) <=0){
				//$('#Err'+fieldId+'').html("Invalid estimation cost entered. Please check once.");
				//flag = false;
				//return;
			}else{
				enteredAmount = parseFloat(enteredAmount)+parseFloat(value);
			}
		}
	});
	
	if(estimationAmount != null && parseFloat(estimationAmount)>0){
		if((enteredAmount<estimationAmount) || (enteredAmount>estimationAmount)){
			//alert("Work wise total estimation cost not matched. Please check once.");
			//flag = false;
		}
	}else{
	//	$('#workCost'+typeVal+'').val(enteredAmount)
	}
	$('#workCost'+typeVal+'').val(enteredAmount);
	completeWorkName = $("#workName"+typeVal).val();
	noofWorks = $("#noofWork"+typeVal).val();
	workCost = $("#workCost"+typeVal).val();
	
	if(completeWorkName == undefined || completeWorkName == "undefined" || completeWorkName.trim() == '' || completeWorkName == null){
		$("#completeWorkNameId"+typeVal).html("<h5 style='color:red;'>Please enter work name</h5>");
		$('#saveButtonId').show();
		flag = false;
		//return;
	}else{
		$("#completeWorkNameId"+typeVal).html("");
	}
	if(noofWorks == undefined || noofWorks == "undefined" || noofWorks === undefined || noofWorks.trim() == '' || noofWorks == null){
		$("#noOfWorksId"+typeVal).html("<h5 style='color:red;'>Please enter no of works</h5>");
		$('#saveButtonId').show();
		//flag = false;
		//return;
	}else{
		$("#noOfWorksId"+typeVal).html("");
	}
	/*if(workCost == undefined || workCost == "undefined" || workCost === undefined || workCost.trim() == '' || workCost == null){
		$("#workCostId"+typeVal).html("<h5 style='color:red;'>Please enter work cost</h5>");
		$('#saveButtonId').show();
		flag = false;
		//return;
	}else{
		$("#workCostId"+typeVal).html("");
	}
	*/
	var estimationWorksCount = $('#noofWork'+typeVal+'').val();
	if((parseInt(estimationWorksCount)>parseInt(globalInnerWorksCount)) || (parseInt(estimationWorksCount)<parseInt(globalInnerWorksCount))){ 
		alert("Max no of works data not matched. Please check once.");
		//flag = false;
	}
	
	$(".validateCls").each(function(){
		
		
		var appendInnerType = $(this).attr("attr_type_change")
		var mainCount = $(this).attr("attr_main_count")
		var innerCount = $(this).attr("attr_inner_count")
		
		WorkTypeWiseDepartmentId = $("#WorkTypeWiseDepartmentId"+typeVal+mainCount+innerCount).val();
		subjectId = $("#subjectId"+typeVal+mainCount+innerCount).val();
		subSubjectId = $("#subSubjectId"+typeVal+mainCount+innerCount).val();
		
		workTypeId = $("#workTypeId"+typeVal+mainCount+innerCount).val();
		appendWorkCost = $("#appendWorkCost"+typeVal+mainCount+innerCount).val();
		appendWorkDetailsId = $("#appendWorkDetailsId"+typeVal+mainCount+innerCount).val();
		appendEofficeId = $("#appendEofficeId"+typeVal+mainCount+innerCount).val();
		
		
		
		if(WorkTypeWiseDepartmentId == 0 || WorkTypeWiseDepartmentId == null || WorkTypeWiseDepartmentId == ''){
			$(".WorkTypeWiseDepartmentId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Department</h5>");
			flag = false;
		}else{
			$(".WorkTypeWiseDepartmentId"+typeVal+mainCount+innerCount).html("");
		}
		
		if(subjectId == 0 || subjectId == null || subjectId == ''){
			$(".subjectId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Subject</h5>");
			flag = false;
		}else{
			$(".subjectId"+typeVal+mainCount+innerCount).html("");
		}
		
		if(subSubjectId == 0 || subSubjectId == null || subSubjectId == ''){
			$(".subSubjectId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Sub Subject</h5>");
			flag = false;
		}else{
			$(".subSubjectId"+typeVal+mainCount+innerCount).html("");
		}
		
		
		
		if(workTypeId == 0 || workTypeId == null || workTypeId == ''){
				$(".workTypeId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Work Type</h5>");
				flag = false;
			}else{
				$(".workTypeId"+typeVal+mainCount+innerCount).html("");
			}
			
			/*if(appendWorkCost == 0 || appendWorkCost == null || appendWorkCost == ''){
				$(".appendWorkCost"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Enter Work Cost</h5>");
				flag = false;
			}else{
				$(".appendWorkCost"+typeVal+mainCount+innerCount).html("");
			}
			*/
			if(appendWorkDetailsId == 0 || appendWorkDetailsId == null || appendWorkDetailsId == ''){
				$(".appendWorkDetailsId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Enter Work Details</h5>");
				flag = false;
			}else{
				$(".appendWorkDetailsId"+typeVal+mainCount+innerCount).html("");
			}
			
			/*if(appendEofficeId == 0 || appendEofficeId == null || appendEofficeId == ''){
				$(".appendEofficeId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Enter eOFFICE-ID</h5>");
				flag = false;
			}else{
				$(".appendEofficeId"+typeVal+mainCount+innerCount).html("");
			}
			*/
			
		if(appendInnerType == "main"){
			var mainCountMain = $(this).attr("attr_main_count")
			var innerCountMain = $(this).attr("attr_inner_count")
		
			locationLevelId = $("#locationLevelId"+typeVal+mainCountMain+innerCountMain).val();
			districtId = $("#districtId"+typeVal+mainCountMain+innerCountMain).val();
			constituencyId = $("#constituencyId"+typeVal+mainCountMain+innerCountMain).val();
			mandalId = $("#mandalId"+typeVal+mainCountMain+innerCountMain).val();
			panchayatId = $("#panchayatId"+typeVal+mainCountMain+innerCountMain).val();
			
			if(locationLevelId == 0 || locationLevelId == null || locationLevelId == ''){
				$(".locationLevelId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Location Type</h5>");
				flag = false;
			}else{
				$(".locationLevelId"+typeVal+mainCount+innerCount).html("");
			}
			
			if(locationLevelId == 3){
				if(districtId == 0 || districtId == null || districtId == ''){
					$(".districtId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
				}else{
					$(".districtId"+typeVal+mainCount+innerCount).html("");
				}
			}else if(locationLevelId == 4){	
				if(districtId == 0 || districtId == null || districtId == ''){
					$(".districtId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
				}else{
					$(".districtId"+typeVal+mainCount+innerCount).html("");
				}				
				if(constituencyId == 0 || constituencyId == null || constituencyId == ''){
					$(".constituencyId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Constituency</h5>");
					flag = false;
				}else{
					$(".constituencyId"+typeVal+mainCount+innerCount).html("");
				}
			}else if(locationLevelId == 5){

				if(districtId == 0 || districtId == null || districtId == ''){
					$(".districtId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
				}else{
					$(".districtId"+typeVal+mainCount+innerCount).html("");
				}				
				if(constituencyId == 0 || constituencyId == null || constituencyId == ''){
					$(".constituencyId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Constituency</h5>");
					flag = false;
				}else{
					$(".constituencyId"+typeVal+mainCount+innerCount).html("");
				}
				if(mandalId == 0 || mandalId == null || mandalId == ''){
					$(".mandalId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Mandal</h5>");
					flag = false;
				}else{
					$(".mandalId"+typeVal+mainCount+innerCount).html("");
				}
			}else if(locationLevelId == 6){

				if(districtId == 0 || districtId == null || districtId == ''){
					$(".districtId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
				}else{
					$(".districtId"+typeVal+mainCount+innerCount).html("");
				}				
				if(constituencyId == 0 || constituencyId == null || constituencyId == ''){
					$(".constituencyId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Constituency</h5>");
					flag = false;
				}else{
					$(".constituencyId"+typeVal+mainCount+innerCount).html("");
				}
				if(mandalId == 0 || mandalId == null || mandalId == ''){
					$(".mandalId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Mandal</h5>");
					flag = false;
				}else{
					$(".mandalId"+typeVal+mainCount+innerCount).html("");
				}
				if(panchayatId == 0 || panchayatId == null || panchayatId == ''){
					$(".panchayatId"+typeVal+mainCount+innerCount).html("<h5 style='color:red;'>Please Select Panchayat</h5>");
					flag = false;
				}else{
					$(".panchayatId"+typeVal+mainCount+innerCount).html("");
				}
			}
		}
	});
	
	$(".validateInnerCls").each(function(){
			var mainCountIn = $(this).attr("attr_main_count")
			var innerCountIn = $(this).attr("attr_inner_count")
			
			
			workTypeInnerId = $("#workTypeInnerId"+typeVal+mainCountIn+innerCountIn).val();
			appendWorkCostInner = $("#appendWorkCostInner"+typeVal+mainCountIn+innerCountIn).val();
			appendWorkDetailsInnerId = $("#appendWorkDetailsInnerId"+typeVal+mainCountIn+innerCountIn).val();
			appendEofficeInnerId = $("#appendEofficeInnerId"+typeVal+mainCountIn+innerCountIn).val();
			
			locationLevelInnerId = $("#locationLevelInnerId"+typeVal+mainCountIn+innerCountIn).val();
			districtInnerId = $("#districtInnerId"+typeVal+mainCountIn+innerCountIn).val();
			constituencyInnerId = $("#constituencyInnerId"+typeVal+mainCountIn+innerCountIn).val();
			mandalInnerId = $("#mandalInnerId"+typeVal+mainCountIn+innerCountIn).val();
			panchayatInnerId = $("#panchayatInnerId"+typeVal+mainCountIn+innerCountIn).val();
			
			
			if(workTypeInnerId == 0 || workTypeInnerId == null || workTypeInnerId == ''){
				$(".workTypeInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Work Type</h5>");
				flag = false;
			}else{
				$(".workTypeId"+typeVal+mainCountIn+innerCountIn).html("");
			}
			/*
			if(appendWorkCostInner == 0 || appendWorkCostInner == null || appendWorkCostInner == ''){
				$(".appendWorkCostInner"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Enter Work Cost</h5>");
				flag = false;
			}else{
				$(".appendWorkCostInner"+typeVal+mainCountIn+innerCountIn).html("");
			}
			*/
			if(appendWorkDetailsInnerId == 0 || appendWorkDetailsInnerId == null || appendWorkDetailsInnerId == ''){
				$(".appendWorkDetailsInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Enter Work Details</h5>");
				flag = false;
			}else{
				$(".appendWorkDetailsInnerId"+typeVal+mainCountIn+innerCountIn).html("");
			}
			
			/*if(appendEofficeInnerId == 0 || appendEofficeInnerId == null || appendEofficeInnerId == ''){
				$(".appendEofficeInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Enter eOFFICE-ID</h5>");
				flag = false;
			}else{
				$(".appendEofficeInnerId"+typeVal+mainCountIn+innerCountIn).html("");
			}
			*/
			if(locationLevelInnerId == 0 || locationLevelInnerId == null || locationLevelInnerId == ''){
				$(".locationLevelInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Location Type</h5>");
				flag = false;
			}else{
				$(".locationLevelInnerId"+typeVal+mainCountIn+innerCountIn).html("");
			}
			
			if(locationLevelInnerId == 3){
				if(districtInnerId == 0 || districtInnerId == null || districtInnerId == ''){
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
					
				}else{
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
			}else if(locationLevelInnerId == 4){
				if(districtInnerId == 0 || districtInnerId == null || districtInnerId == ''){
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
					
				}else{
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}

				if(constituencyInnerId == 0 || constituencyInnerId == null || constituencyInnerId == ''){
					$(".constituencyInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Constituency</h5>");
						
					flag = false;
				}else{
					$(".constituencyInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
			}else if(locationLevelInnerId == 5){

				if(districtInnerId == 0 || districtInnerId == null || districtInnerId == ''){
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
					
				}else{
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}

				if(constituencyInnerId == 0 || constituencyInnerId == null || constituencyInnerId == ''){
					$(".constituencyInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Constituency</h5>");
						
					flag = false;
				}else{
					$(".constituencyInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
				if(mandalInnerId == 0 || mandalInnerId == null || mandalInnerId == ''){
					$(".mandalInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Mandal</h5>");
					flag = false;
						
				}else{
					$(".mandalInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
			}else if(locationLevelInnerId == 6){

				if(districtInnerId == 0 || districtInnerId == null || districtInnerId == ''){
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select District</h5>");
					flag = false;
					
				}else{
					$(".districtInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}

				if(constituencyInnerId == 0 || constituencyInnerId == null || constituencyInnerId == ''){
					$(".constituencyInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Constituency</h5>");
						
					flag = false;
				}else{
					$(".constituencyInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
				if(mandalInnerId == 0 || mandalInnerId == null || mandalInnerId == ''){
					$(".mandalInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Mandal</h5>");
					flag = false;
						
				}else{
					$(".mandalInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
				if(panchayatInnerId == 0 || panchayatInnerId == null || panchayatInnerId == ''){
					$(".panchayatInnerId"+typeVal+mainCountIn+innerCountIn).html("<h5 style='color:red;'>Please Select Panchayat</h5>");
					flag = false;
						
				}else{
					$(".panchayatInnerId"+typeVal+mainCountIn+innerCountIn).html("");
				}
			}
	});	
	if(flag == false){
		$('#saveButtonId').show();
		return;
	}
	
	$("#statusMsgAppntReqt").html("<center><h4 style='color: green;'>Please Wait...</h4></center>")
	$('#saveButtonId').hide();
	//$("#savingDetailsSpinner").html(spinner)
	 var formData = new FormData();
	
	$('#adminProfileForm input').each(
		  function(){			  
			var input = $(this);
			var text =input.attr('type');
			var id = input.attr('id');
			//debugger;
			if (typeof id !== typeof undefined && id !== false) {
				if(text=='text' || text=='hidden'){
					var name = $('#'+id+'').attr('name');
					if(formData.get(name) == null || formData.get(name) == 'undefined')
						formData.append(name, $('#'+id+'').val());
				}else if(text=='radio'){
					if($('#'+id+'').is(':checked')){
						var name = $('#'+id+'').attr('name');
						if(formData.get(name) == null || formData.get(name) == 'undefined')
							formData.append(name, $('#'+id+'').val());
					}
				}else if(text=='file'){
					var name = $('#'+id+'').attr('attr_name');//attr_image_tyep="refImage"  
					//var imageType = $('#'+id+'').attr('attr_image_tyep');
					if(this.files !=null && this.files.length>0){
							for(var i = 0; i < this.files.length; i++){
							//	alert(name+".fileList["+i+"]");
							if(formData.get(name) == null || formData.get(name) == 'undefined')
								formData.append(name+".fileList["+i+"]", this.files[i]);
								
							//alert(i)
							//console.log(this.files[i]);
							/*if(imageType == 'refImage'){
								formData.append(name+".fileList["+i+"]", this.files[i]);
								//formData.append("filesList["+i+"]", this.files[i]);
							}else if(imageType == 'projImage'){
								//formData.append("workFilesList["+i+"]", this.files[i]);
								formData.append(name+".fileList["+i+"]", this.files[i]);
							}
							*/
						}
					}
				}
			}			
		}
	);
	
	$('#adminProfileForm textarea').each(
		  function(){			  
			var input = $(this);
				var id = input.attr('id');
				if (typeof id !== typeof undefined && id !== false) {
				var name = $('#'+id+'').attr('name');
				if(formData.get(name) == null || formData.get(name) == 'undefined')
					formData.append(name, $('#'+id+'').val());
			}
		}
	);
	
	$('#adminProfileForm select').each(
		  function(){			  
				var input = $(this);
				var id = input.attr('id');
				if (typeof id !== typeof undefined && id !== false) {
					var name = $('#'+id+'').attr('name');
					if(formData.get(name) == null || formData.get(name) == 'undefined')
						formData.append(name, $('#'+id+'').val());
			}
		}
	);
	
	//console.log(formData);
	//return;
	  $.ajax({
			url: $("#adminProfileForm").attr("action"),
			data: formData,
			type: "POST",               
			processData: false,
			contentType: false,
			success: function(result) {
				//$("#savingDetailsSpinner").html('')
				if(result!=null){
				  if(result.responseCode == "0"){
					   setTimeout(function () {
						$("#statusMsgAppntReqt").html("<center><h4 style='color: green;'>Application Saved Successfully</h4></center>")
						}, 4000);
						setTimeout(function() {$('html, body').animate({scrollTop:0}, 4000)
						window.location.reload(); 	
					       },6000);
						
						$(".defaultCheckCls").prop("checked",true);
						 
				  }else{
					  $('#saveButtonId').show();
					  setTimeout(function () {
					  $("#statusMsgAppntReqt").html("<center><h4 style='color: red;margin-top:-25px;'>Application Failed..Try Later</h4></center>")
						}, 5000);
						setTimeout(function() {$('html, body').animate({scrollTop:0}, 5000); },5000);
				  }
				}else{
					  $('#saveButtonId').show();
					   setTimeout(function () {
						 $("#statusMsgAppntReqt").html("<center><h4 style='color: red;margin-top:-25px;'>Application Failed..Try Later</h4></center>")
						}, 5000);
						setTimeout(function() {$('html, body').animate({scrollTop:0}, 5000); },5000);
				 }
				 
				
			},
			error: function(request,error) { 
				//$("#savingDetailsSpinner").html('');
				console.log(request);
				console.log(error);
				 setTimeout(function () {
				$("#statusMsgAppntReqt").html("<center><h4 style='color: red;'>Error occured while updating details.Pelase check once any required data missing to fill.Then try again.</h4></center>")
						}, 5000);
				//alert("Error occured while updating details.Pelase check once any required data missing to fill.Then try again.");	
				$('#saveButtonId').show();				
			}
     });	 

});

function getParliamentIdsByConstituencyList(){
	 $("#constituencyCanId").html('<option value="0">All</option>');
	 $("#constituencyCanId").trigger('chosen:updated');
	var json = {};
	$.ajax({              
		type:'POST',    
		url: 'getParliamentIdsByConstituencyList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
			 $("#constituencyCanId").html('<option value="0">All</option>');
			for(var i in result){
				$("#constituencyCanId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#constituencyCanId").trigger('chosen:updated');
	});	
}

function validation(typeVal){
	var completeWorkName='';
	var noofWorks='';
	var workCost='';
	//var phonePattern= /^\d{0-9}$/;
	
	completeWorkName = $("#name"+typeVal).val();
	noofWorks = $("#noofWork"+typeVal).val();
	workCost = $("#workCost"+typeVal).val();
 	//alert(completeWorkName)
	//alert(noofWorks)
	//alert(workCost)
	
	if(completeWorkName == undefined || completeWorkName == "undefined" || completeWorkName === undefined){
		$("#completeWorkNameId"+typeVal).html("<h5>Please enter work name</h5>");
		return;
	}
	if(noofWorks == undefined || noofWorks == "undefined" || noofWorks === undefined){
		$("#noofWork"+typeVal).html("<h5>Please enter work name</h5>");
		return;
	}
	if(workCost == undefined || workCost == "undefined" || workCost === undefined){
		$("#workCost"+typeVal).html("<h5>Please enter work name</h5>");
		return;
	}
	
}

function getPetitionDesignationLst(typeVal){
	$("#designationrepresent").html('');
	$("#designationrepresent").html('<option value="0">Select Designation</option>');
	$("#designationrepresent").trigger('chosen:updated');
	  var json = {
		   searchType:"all"// all/refCandidateDesignations/petitionGivenRefCandidateDesignations
	  };
	$.ajax({              
		type:'POST',    
		url: 'getPetitionDesignationList',
		dataType: 'json',
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(result){
		if(result !=null && result.length>0){
				$("#designationrepresent").html('<option value="0">Select Designation</option>');
			for(var i in result){
				$("#designationrepresent").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#designationrepresent").trigger('chosen:updated');
	});	

}



function validateAmount(value,fieldId,typeVal){
	
	$('.ErrCls').html('');
	var enteredAmount =parseFloat(0.0);
	var estimationAmount= parseFloat($('#workCost'+typeVal+'').val());
	$(".amountCls").each(function(){
		var value = $(this).val();
		if(value!= null && value.length>0){
			if(parseFloat(value) <=0){
				//$('#Err'+fieldId+'').html("Invalid estimation cost entered. Please check once.");
				return;
			}else{
				enteredAmount = parseFloat(enteredAmount)+parseFloat(value);
			}
		}
	});
	
	if(enteredAmount>estimationAmount){
		//$('#Err'+fieldId+'').html("Total estimation cost reached. Please check once.");
		//$('#'+fieldId+'').val('');
	}
	$('#workCost'+typeVal+'').val('');
	if(parseInt(enteredAmount)>0){
		$('#workCost'+typeVal+'').val(enteredAmount);
	}
}


$(document).on("click","#getVoterDetailsId",function(){
	var typeVal='';
	if($("#Representee").is(":checked")){
		typeVal=$("#Representee").attr("attr_type");
	}else if($("#self").is(":checked")){
		typeVal=$("#self").attr("attr_type");
	}
	var voterId=$("#voterId"+typeVal).val();
	getRegistrationPersonDetails(voterId,typeVal);
});


function getRegistrationPersonDetails(voterId,typeVal){
			  
	$("#name"+typeVal).val('');
	$("#mobileNumber"+typeVal).val('');
	$("#emailId"+typeVal).val('');
	$("#repTdpCadreId"+typeVal).val('');
	$('#districtrepresent').val(0);
	$('#constituencyrepresent').val(0);
	$('#mandalrepresent').val(0);
	$('#panchayatrepresent').val(0);
	$("#repImagePathId"+typeVal).val('');
	 $("#districtrepresent").trigger('chosen:updated');
	 $("#constituencyrepresent").trigger('chosen:updated');
	 $("#mandalrepresent").trigger('chosen:updated');
	  $("#panchayatrepresent").trigger('chosen:updated');
	 
  var json = {
			voterId:voterId,
			familyVoterId:"0",
			tdpCadreId:"0",
			status:""
 
			};
  
	$.ajax({              
		type:'POST',    
		url: 'getRegistrationPersonDetails',
		dataType: 'json',  
		data : JSON.stringify(json),
		beforeSend :   function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		error: function (xhr, status, err) {
            //alert("Local error callback.");
        },
	}).done(function(result){
		if(result != null ){
			if(result.lastName != null && result.lastName !='null'){
				$("#name"+typeVal).val(result.lastName);
			}
			if(result.mobileNumber != null && result.mobileNumber !='null'){
				$("#mobileNumber"+typeVal).val(result.mobileNumber);
			}
			if(result.email != null && result.email !='null'){
				$("#emailId"+typeVal).val(result.email);
			}
			if(result.tdpCadreId != null && result.tdpCadreId !='null' && parseInt(result.tdpCadreId)>0){
				$("#repTdpCadreId"+typeVal).val(result.tdpCadreId);
			}
			/*if(result.imageBase64String != null && result.imageBase64String.length > 0 && result.imageBase64String !='null'){
				$("#repImagePathId"+typeVal).val(+result.imagePath);
			  }else  if(result.imagePath != null && result.imagePath.length > 0 && result.imagePath !='null'){
				$("#repImagePathId"+typeVal).val(result.imagePath);
			  }*/
			if(result.imagePath != null && result.imagePath.length > 0 && result.imagePath !='null'){
				$("#repImagePathId"+typeVal).val(result.imagePath);
			}
			  
			if(result.districtId != null){
				getAllDistrictsListInState(result.districtId);
			}
			if(result.constituencyId != null){
				getConstituencyNamesBiDistrictId(result.districtId,result.constituencyId);
			}
			var maandalId2='';
			if(result.mandalId != null){
				maandalId2=result.mandalId.toString().substring(1,result.mandalId.length);
				getTehsilsAndLocalElectionBodiForConstituencyId(result.constituencyId,"2"+maandalId2);
			}else if(result.localElectionBodyId != null){
					maandalId2=result.localElectionBodyId.toString().substring(1,result.localElectionBodyId.length);
				getTehsilsAndLocalElectionBodiForConstituencyId(result.constituencyId,"1"+maandalId2);
			}
			var villageId="2"+result.villageId.toString().substring(1,result.villageId.length);
			if(result.villageId != null	){
				getPanchayatsByTehsilId(maandalId2,villageId); 
			}
		}else{
			alert("No data available with this Voter Card No.Please check once.");
		}
	}).error(function(){
		alert("No data available with this Voter Card No.Please check once.");
	});	
 
}

function checkIsNumber(id,value){
	 if(isNaN(value)){
		$('#'+id+'').val('');
	 }else {
		 ;
	 }
}

$(document).on("change","#petitionTypId",function(){
	$("#workCostsErr").html("");
	$("#noofWorksErr").html("");
	$("#petitionTypeIdErrDivd").html("");
	
	var selectVal = $(this).val();
	$('#petitinsTypeId').val(selectVal);
	
	if(selectVal == 2 || selectVal == 3){
		$("#noofWorks").val(1);
	}else{
		$("#noofWorks").val("");
	}
});

$(document).on("change",".OnchangeDeptCls",function(){
	var outerCount=$(this).attr('attr_main_count');
	$(".subSubjectReFreshCls"+outerCount).html('<option value="0">Select Sub Subject</option>');
	$(".subSubjectReFreshCls"+outerCount).trigger('chosen:updated');
	//reFreshValues(outerCount);
});

$(document).on("change",".subjctOnchangeCls",function(){
	var outerCount=$(this).attr('attr_main_count');
	$(".subSubjectReFreshCls"+outerCount).html('<option value="0">Select Sub Subject</option>');
	$(".subSubjectReFreshCls"+outerCount).trigger('chosen:updated');
	//reFreshValues(outerCount);
});
$(document).on("change",".subSubjctOnchangeCls",function(){
	var outerCount=$(this).attr('attr_main_count');
	//reFreshValues(outerCount);
});
function reFreshValues(outerCount){
	$(".workTypeReFreshCls"+outerCount).val(0);
	$(".workTypeReFreshCls"+outerCount).trigger('chosen:updated');
	$(".workCostReFreshCls"+outerCount).val('');//
	$(".workDetailsReFreshCls"+outerCount).val(''); 
	$(".officerIdReFreshCls"+outerCount).val('');
	$(".locationLevelReFreshCls"+outerCount).val(0);
	$(".locationLevelReFreshCls"+outerCount).trigger('chosen:updated');
	$(".locationLevelReFreshCls"+outerCount).trigger("change");
}
$(document).on("change",".districtRefreshCls",function(){
	var outerCount=$(this).attr('attr_main_count');
	var innerCount=$(this).attr('attr_inner_count');
	$(".conRefreshCls"+outerCount+innerCount).html('<option value="0">Select Constituency</option>');
	$(".conRefreshCls"+outerCount+innerCount).trigger('chosen:updated');
	$(".mandalRefreshCls"+outerCount+innerCount).html('<option value="0">Select Mandal/Munci/Corp..</option>');
	$(".mandalRefreshCls"+outerCount+innerCount).trigger('chosen:updated');
	$(".panchayatRefreshCls"+outerCount+innerCount).html('<option value="0">Select Panchayat </option>');
	$(".panchayatRefreshCls"+outerCount+innerCount).trigger('chosen:updated');
});//
$(document).on("change",".conChangeCls",function(){
	var outerCount=$(this).attr('attr_main_count');
	var innerCount=$(this).attr('attr_inner_count');
	$(".mandalRefreshCls"+outerCount+innerCount).html('<option value="0">Select Mandal/Munci/Corp.. </option>');
	$(".mandalRefreshCls"+outerCount+innerCount).trigger('chosen:updated');
	$(".panchayatRefreshCls"+outerCount+innerCount).html('<option value="0">Select Panchayat </option>');
	$(".panchayatRefreshCls"+outerCount+innerCount).trigger('chosen:updated');
});
$(document).on("change",".madalChangeCls",function(){ 
	var outerCount=$(this).attr('attr_main_count');
	var innerCount=$(this).attr('attr_inner_count');
	$(".panchayatRefreshCls"+outerCount+innerCount).html('<option value="0">Select Panchayat </option>');
	$(".panchayatRefreshCls"+outerCount+innerCount).trigger('chosen:updated');
});
$(document).bind('keypress', function(event) {
	  var keyCode = (event.keyCode ? event.keyCode : event.which); 
	    if(keyCode == 13){
	       $('#basicBtnId').trigger('click');
	     }  
	});
	
function buildPetitionReferredMemberDetailsRefeeral(result,typeVal){
	var str='';
	for(var i in result){
		searchCandidateReferralIds.push(result[i].referrerCandidateId)
	}
	$.grep(searchCandidateReferralIds, function(el) {
		if ($.inArray(el, alreadyCandidateReferralId) == -1){
			diffReferralArr.push(el);
		}else if($.inArray(el, alreadyCandidateReferralId ) !== -1){
			commonReferralArr.push(el);
		} 
			
	});
	console.log(diffReferralArr)
	console.log(commonReferralArr)
	console.log(alreadyCandidateReferralId) 
	str+='<div  class="col-sm-12 table-responsive">';
		str+='<table style="width:100%" class="table table-condensed table_padding" id="candidatesTab">';	
			str+='<thead>';
				str+='<tr>';
					str+='<th></th>';
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
		if(alreadyCandidateReferralId !=null && alreadyCandidateReferralId.length>0){
				for(var i in result){
				 
					for(var j in commonReferralArr){
						
						if(commonReferralArr[j] == result[i].referrerCandidateId){
							str+='<tr><td>';
							str+='<div id="candidatesAppendReferralDiv'+result[i].referrerCandidateId+'" style="position:relative;">';
							str+='<div class="bgColorCandidatesView" attr_type='+typeVal+' attr_candidateId='+result[i].referrerCandidateId+' id="candidateReferral'+typeVal+''+result[i].referrerCandidateId+'">';
							
								str+='<div class="row">'; 
										str+='<div class="pull-right showRemoveReferralIcon" attr_type="'+typeVal+'"  attr_candidateId="'+result[i].referrerCandidateId+'" style="display:none;"><i class="glyphicon glyphicon-remove"></i></div>';
										
										str+='<div class="representation-selected display_block" id="candidateReferralRemove'+typeVal+''+result[i].referrerCandidateId+'">Member Selected <span><i attr_candidateId='+result[i].referrerCandidateId+' attr_type='+typeVal+' class="glyphicon glyphicon-remove representation-remove cccccReferral" style="background-color: green; border-radius: 50%; cursor: pointer; font-size: 14px; padding: 5px;top:-3px;color:#fff" ></i></span></div>';
										if(result[i].petitionMemberVO.imagePath != null && result[i].petitionMemberVO.imagePath.length>0){
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="'+result[i].petitionMemberVO.imagePath+'" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}else{
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}
										
										
										str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight">Name:</h5>';
												str+='<h5 class="m_top5">'+result[i].petitionMemberVO.name+'</h5>';
												str+='<h5 class="m_top10 font_weight">Designation</h5>';
												str+='<h5 class="text_bold m_top10">'+result[i].petitionMemberVO.memberType+',</h5>';
												str+='<h5 class="m_top5" attr_assemblY_id="'+result[i].candidateAddressVO.assemblyId+'">'+result[i].candidateAddressVO.assemblyName+'  Constituency,</h5>';
												str+='<h5 class="m_top5" attr_district_id="'+result[i].candidateAddressVO.districtId+'">'+result[i].candidateAddressVO.districtName+'  District,</h5>';
											str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
										str+='<div class="nameAddressCss">';
											str+='<h5 class="font_weight">Party:</h5>';
											str+='<h5 class="m_top5">Telugu Desam Party</h5>';
											str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
											if(result[i].petitionMemberVO.emailId != null && result[i].petitionMemberVO.emailId.length > 0){
												str+='<h5 class="text_bold m_top10" >Email-id:  '+result[i].petitionMemberVO.emailId+'</h5>';
											}else{
												str+='<h5 class="text_bold m_top10">Email-id: -</h5>';
											}
											if(result[i].petitionMemberVO.mobileNo != null && result[i].petitionMemberVO.mobileNo.length > 0){
												str+='<h5 class="m_top5">Contact No : '+result[i].petitionMemberVO.mobileNo+'</h5>';
											}else{
												str+='<h5 class="m_top5">Contact No : -</h5>';
											}
											str+='<h5 class="m_top5">'+result[i].candidateAddressVO.districtName+' District.</h5>';
										str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight">Address:</h5>';
												if(result[i].candidateNativeAddressVO != null){
													//str+='<h5 class="m_top5">H No :</h5>';
													if(result[i].candidateNativeAddressVO.panchayatName != null && result[i].candidateNativeAddressVO.panchayatName.length>0)
														str+='<h5 class="m_top10">'+result[i].candidateNativeAddressVO.panchayatName+' Panchayat </h5>';
													if(result[i].candidateNativeAddressVO.tehsilName != null && result[i].candidateNativeAddressVO.tehsilName.length>0)
														str+='<h5 class="text_bold m_top10">'+result[i].candidateNativeAddressVO.tehsilName+'  Mandal/Munci.</h5>';
													if(result[i].candidateNativeAddressVO.districtName != null && result[i].candidateNativeAddressVO.districtName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.districtName+' District</h5>';
													if(result[i].candidateNativeAddressVO.stateName != null && result[i].candidateNativeAddressVO.stateName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.stateName+' State</h5>';
												}else{
													str+='<h5 class="m_top5">Not Available</h5>';
												}
												
											str+='</div>';
									str+='</div>';
									str+='<div id="fileUploadReferral'+typeVal+''+result[i].referrerCandidateId+'" style="display:none"></div>';
								str+='</div>';
							str+='</div>';
							str+='</div>';
							str+='</td></tr>';
						}
					}		
				
			}
			
			for(var i in result){
				
					for(var j in diffReferralArr){
						if(diffReferralArr[j] == result[i].referrerCandidateId){
							str+='<tr><td>';
							str+='<div id="candidatesAppendReferralDiv'+result[i].referrerCandidateId+'" style="position:relative;">';
							str+='<div class="bgColorCandidatesView candidateAddedReferralView" attr_type='+typeVal+' attr_candidateId='+result[i].referrerCandidateId+' id="candidateReferral'+typeVal+''+result[i].referrerCandidateId+'">';
							
								str+='<div class="row">';
									str+='<div class="pull-right showRemoveReferralIcon" attr_type="'+typeVal+'"  attr_candidateId="'+result[i].referrerCandidateId+'" style="display:none;"><i class="glyphicon glyphicon-remove"></i></div>';
									
										str+='<div class="representation-selected" id="candidateReferralRemove'+typeVal+''+result[i].referrerCandidateId+'">Member Selected <span><i attr_candidateId='+result[i].referrerCandidateId+' attr_type='+typeVal+' class="glyphicon glyphicon-remove representation-remove cccccReferral" style="background-color: green; border-radius: 50%; cursor: pointer; font-size: 14px; padding: 5px;top:-3px;color:#fff" ></i></span></div>';
										
										if(result[i].petitionMemberVO.imagePath != null && result[i].petitionMemberVO.imagePath.length>0){
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="'+result[i].petitionMemberVO.imagePath+'" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}else{
											str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										}
										
										/*
										str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
												str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
												str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
										str+='</div>';
										*/
										
										str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight">Name:</h5>';
												str+='<h5 class="m_top5">'+result[i].petitionMemberVO.name+'</h5>';
												str+='<h5 class="m_top10 font_weight">Designation</h5>';
												str+='<h5 class="text_bold m_top10">'+result[i].petitionMemberVO.memberType+',</h5>';
												str+='<h5 class="m_top5" attr_assemblY_id="'+result[i].candidateAddressVO.assemblyId+'">'+result[i].candidateAddressVO.assemblyName+'  Constituency,</h5>';
												str+='<h5 class="m_top5" attr_district_id="'+result[i].candidateAddressVO.districtId+'">'+result[i].candidateAddressVO.districtName+'  District,</h5>';
											str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
										str+='<div class="nameAddressCss">';
											str+='<h5 class="font_weight">Party:</h5>';
											str+='<h5 class="m_top5">Telugu Desam Party</h5>';
											str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
											if(result[i].petitionMemberVO.emailId != null && result[i].petitionMemberVO.emailId.length > 0){
												str+='<h5 class="text_bold m_top10" >Email-id:  '+result[i].petitionMemberVO.emailId+'</h5>';
											}else{
												str+='<h5 class="text_bold m_top10">Email-id: -</h5>';
											}
											if(result[i].petitionMemberVO.mobileNo != null && result[i].petitionMemberVO.mobileNo.length > 0){
												str+='<h5 class="m_top5">Contact No : '+result[i].petitionMemberVO.mobileNo+'</h5>';
											}else{
												str+='<h5 class="m_top5">Contact No : -</h5>';
											}
											str+='<h5 class="m_top5">'+result[i].candidateAddressVO.districtName+' District.</h5>';
										str+='</div>';
									str+='</div>';
									
									str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
											str+='<div class="nameAddressCss">';
												str+='<h5 class="font_weight"> Address:</h5>';
												if(result[i].candidateNativeAddressVO != null){
													//str+='<h5 class="m_top5">H No :</h5>';
													if(result[i].candidateNativeAddressVO.panchayatName != null && result[i].candidateNativeAddressVO.panchayatName.length>0)
														str+='<h5 class="m_top10">'+result[i].candidateNativeAddressVO.panchayatName+' Panchayat</h5>';
													if(result[i].candidateNativeAddressVO.tehsilName != null && result[i].candidateNativeAddressVO.tehsilName.length>0)
														str+='<h5 class="text_bold m_top10">'+result[i].candidateNativeAddressVO.tehsilName+' Mandal/Munci. </h5>';
													if(result[i].candidateNativeAddressVO.districtName != null && result[i].candidateNativeAddressVO.districtName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.districtName+' District</h5>';
													if(result[i].candidateNativeAddressVO.stateName != null && result[i].candidateNativeAddressVO.stateName.length>0)
														str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.stateName+' State</h5>';
												}else{
													str+='<h5 class="m_top5">Not Available</h5>';
												}
												
											str+='</div>';
									str+='</div>';
									str+='<div id="fileUploadReferral'+typeVal+''+result[i].referrerCandidateId+'" style="display:none;"></div>';
								str+='</div>';
							str+='</div>';
							str+='</div>';
							str+='</td></tr>';
						}
					}
				
			} 
		}else{
			for(var i in result){
				str+='<tr><td>';
				 str+='<div id="candidatesAppendReferralDiv'+result[i].referrerCandidateId+'" style="position:relative;">';
				 	str+='<div class="bgColorCandidatesView candidateAddedReferralView" attr_type='+typeVal+' attr_candidateId='+result[i].referrerCandidateId+' id="candidateReferral'+typeVal+''+result[i].referrerCandidateId+'">';
					
					str+='<div class="row">';
					str+='<div class="pull-right showRemoveReferralIcon removeTooltipCls" title="Remove Referral Member" attr_type="'+typeVal+'"  attr_candidateId="'+result[i].referrerCandidateId+'" style="display:none;" data-toggle="tooltip" data-placement="top"><i class="glyphicon glyphicon-remove"></i></div>';
					str+='<div class="representation-selected" id="candidateReferralRemove'+typeVal+''+result[i].referrerCandidateId+'">Member Selected <span class="tooltipCls" data-toggle="tooltip" data-placement="top" title="Unselected Member"><i attr_candidateId='+result[i].referrerCandidateId+' attr_type='+typeVal+' class="glyphicon glyphicon-remove representation-remove cccccReferral" style="background-color: green; border-radius: 50%; cursor: pointer; font-size: 14px; padding: 5px;top:-3px;color:#fff" ></i></span></div>';
					
					if(result[i].petitionMemberVO.imagePath != null && result[i].petitionMemberVO.imagePath.length>0){
						str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
							str+='<img src="'+result[i].petitionMemberVO.imagePath+'" class="imageCss"></img>';
							str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
					str+='</div>';
					}else{
						str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
							str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
							str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
					str+='</div>';
					}
					/*
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
							str+='<img src="http://www.mytdp.com/images/User.png" class="imageCss"></img>';
							str+='<span style="position: relative; left: -31px; top: -62px;"><img src="Assests/images/TDP.PNG" class="smallerImg"></img></span>';
					str+='</div>';
					*/
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
						str+='<div class="nameAddressCss">';
							str+='<h5 class="font_weight">Name:</h5>';
							str+='<h5 class="m_top5">'+result[i].petitionMemberVO.name+'</h5>';
							str+='<h5 class="m_top10 font_weight">Designation</h5>';
							str+='<h5 class="text_bold m_top10">'+result[i].petitionMemberVO.memberType+',</h5>';
							str+='<h5 class="m_top5" attr_assemblY_id="'+result[i].candidateAddressVO.assemblyId+'">'+result[i].candidateAddressVO.assemblyName+'  Constituency,</h5>';
							str+='<h5 class="m_top5" attr_district_id="'+result[i].candidateAddressVO.districtId+'">'+result[i].candidateAddressVO.districtName+'  District,</h5>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
						str+='<div class="nameAddressCss">';
							str+='<h5 class="font_weight">Party:</h5>';
							str+='<h5 class="m_top5">Telugu Desam Party</h5>';
							str+='<h5 class="m_top10 font_weight">Contact Details</h5>';
							if(result[i].petitionMemberVO.emailId != null && result[i].petitionMemberVO.emailId.length > 0){
								str+='<h5 class="text_bold m_top10" >Email-id:  '+result[i].petitionMemberVO.emailId+'</h5>';
							}else{
								str+='<h5 class="text_bold m_top10">Email-id: -</h5>';
							}
							if(result[i].petitionMemberVO.mobileNo != null && result[i].petitionMemberVO.mobileNo.length > 0){
								str+='<h5 class="m_top5">Contact No : '+result[i].petitionMemberVO.mobileNo+'</h5>';
							}else{
								str+='<h5 class="m_top5">Contact No : -</h5>';
							}
							str+='<h5 class="m_top5">'+result[i].candidateAddressVO.districtName+' District.</h5>';
						str+='</div>';
					str+='</div>';
					
					str+='<div class="col-sm-3 addRemoveCol'+typeVal+''+result[i].referrerCandidateId+'">';
						str+='<div class="nameAddressCss">';
							str+='<h5 class="font_weight">Address:</h5>';	
							if(result[i].candidateNativeAddressVO != null){
								//str+='<h5 class="m_top5">H No :</h5>';
								if(result[i].candidateNativeAddressVO.panchayatName != null && result[i].candidateNativeAddressVO.panchayatName.length>0)
									str+='<h5 class="m_top10">'+result[i].candidateNativeAddressVO.panchayatName+' Panchayat</h5>';
								if(result[i].candidateNativeAddressVO.tehsilName != null && result[i].candidateNativeAddressVO.tehsilName.length>0)
									str+='<h5 class="text_bold m_top10">'+result[i].candidateNativeAddressVO.tehsilName+'  Mandal/Munci.</h5>';
								if(result[i].candidateNativeAddressVO.districtName != null && result[i].candidateNativeAddressVO.districtName.length>0)
									str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.districtName+' District</h5>';
								if(result[i].candidateNativeAddressVO.stateName != null && result[i].candidateNativeAddressVO.stateName.length>0)
									str+='<h5 class="m_top5">'+result[i].candidateNativeAddressVO.stateName+' State</h5>';
							}else{
								str+='<h5 class="m_top5">Not Available</h5>';
							}
							
						str+='</div>';
					str+='</div>';
						str+='<div id="fileUploadReferral'+typeVal+''+result[i].referrerCandidateId+'" style="display:none;"></div>';
					str+='</div>';
					
					str+='</div>';
				 str+='</div>';
				 str+='</td></tr>';
			}
		}
		str+='</tbody>';
		str+='</table>';
		str+='</div>';
	$("#candidateDetailsDivId").html(str);
	$(".tooltipCls").tooltip();
	//$(".removeTooltipCls").tooltip();
	
	$('#candidatesTabReferral').dataTable({
		"paging":   true,
		"info":     false,
		"searching": true,
		"autoWidth": true,
		"iDisplayLength": 10,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]		
	});	
}
var refCandReferralCount=0;
$(document).on("click",".candidateAddedReferralView",function(){
	
	var typeVal = $(this).attr("attr_type");
	var candidateId = $(this).attr("attr_candidateId");
	$("#rederralNameDivId").show();
	var representeeType='SELF';
	if(typeVal=='represent' || typeVal=='representee'){
		representeeType='REPRESENTEE';
	}
		
	alreadyCandidateReferralId.push(parseInt(candidateId));
	
	$("#candidateDetails"+typeVal+"DivId").append($("#candidatesAppendReferralDiv"+candidateId).html());
	
	$("#candidateDetails"+typeVal+"DivId").find(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-3").addClass("col-sm-2");
	$("#candidateDetails"+typeVal+"DivId").find("#fileUploadReferral"+typeVal+candidateId).show();
	
	$("#fileUploadReferral"+typeVal+candidateId).append('<div class="col-sm-4" style="margin-top:-20px;"><label>REFERAL LETTER</label><input type="file"   attr_name="selfReferList['+refCandReferralCount+']" name="" attr_image_tyep="refImage"  id="mainBlockFileUpload'+candidateId+''+typeVal+'" multiple="multiple" class=""/></div>');
	$("#candidateDetails"+typeVal+"DivId").append('<input type="hidden"  class="refCandidatesCls" id="petitionRefSelf'+refCandReferralCount+'" name="selfReferList['+refCandReferralCount+'].refCandidateId" value="'+candidateId+'" />');
		 
	refCandReferralCount=refCandReferralCount+1;
	$(this).parent().find(".representation-selected").addClass("display_block");
	$("#candidatesAppendDiv"+candidateId).find("#candidateReferral"+typeVal+candidateId).removeClass("candidateAddedReferralView");
	
	$("#candidateDetails"+typeVal+"DivId").find(".bgColorCandidatesView").removeClass("candidateAddedReferralView");
	$("#candidateDetails"+typeVal+"DivId").find(".bgColorCandidatesView").css("cursor","auto");
	$(".showRemoveReferralIcon").attr("attr_candidateId",candidateId)
	$("#candidateDetails"+typeVal+"DivId").find(".showRemoveReferralIcon").show();
	initializeFileUploadMainBlock(typeVal,candidateId);
	

});
$(document).on("click",".cccccReferral",function(){
	
	if(!confirm('Are you sure want to remove this member ?'))
		return;
	
	
	var typeVal = $(this).attr("attr_type");
	var candidateId = $(this).attr("attr_candidateId");
	
	$("#candidateDetails"+typeVal+"DivId").find("#candidateReferral"+typeVal+candidateId).remove();
	$("#candidatesAppendReferralDiv"+candidateId).find(".representation-selected").removeClass("display_block");
	$("#candidatesAppendReferralDiv"+candidateId).find(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-2").addClass("col-sm-3");
	refCandReferralCount=parseInt(refCandReferralCount)-parseInt(1);
	/* alert($("#candidatesAppendDiv"+candidateId).find(".representation-selected").html())
	$("#candidatesAppendDiv"+candidateId).find(".representation-selected").removeClass("display_block");
	
	$("#candidatesAppendDiv"+candidateId).find(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-2").addClass("col-sm-3");
	$("#candidatesAppendDiv"+candidateId).find("#fileUpload"+typeVal+candidateId).hide(); */
	
	
	setTimeout(function(){ 
		$("#candidatesAppendReferralDiv"+candidateId).find(".bgColorCandidatesView").addClass("candidateAddedReferralView")
	}, 2000);
	
	var itemtoRemove = parseInt(candidateId);
	alreadyCandidateReferralId.splice($.inArray(itemtoRemove, alreadyCandidateReferralId),1);
	return;
});
$(document).on("click",".showRemoveReferralIcon",function(){
	
	if(!confirm('Are you sure want to remove this member ?'))
		return;
	
	var typeVal = $(this).attr("attr_type");
	
	var candidateId = $("#candidateDetails"+typeVal+"DivId").find(".bgColorCandidatesView").attr("attr_candidateId");
	
	if(typeVal=="self"){
		$('.searchCandidateCls').show();
		$("#candidateDetails"+typeVal+"DivId").html('');	
	}
	refCandReferralCount=parseInt(refCandReferralCount)-1; 
	if(refCandReferralCount == undefined || refCandReferralCount == "undefined" || refCandReferralCount == null || parseInt(refCandReferralCount) == 0 ){
		$("#rederralNameDivId").hide();
	}
	$('.refCandidatesCls').each(function(){
		var value = $(this).val();
		if(parseInt(value)==parseInt(candidateId)){
			$(this).val(0);
			$(this).attr('id','');
			$(this).remove();
		}
	});
	
	$(".addRemoveCol"+typeVal+candidateId).removeClass("col-sm-2").addClass("col-sm-3");
	//$("#candidateDetails"+typeVal+"DivId").find(".showRemoveIcon").hide();
	$("#candidateDetails"+typeVal+"DivId").find("#candidateReferral"+typeVal+candidateId).remove();
	var itemtoRemove = parseInt(candidateId);
	alreadyCandidateReferralId.splice($.inArray(itemtoRemove, alreadyCandidateReferralId),1);
});
getPmPetitionList();
function getPmPetitionList(){
	
 var json = {
	
	}           
$.ajax({              
	type:'POST',    
	url: 'getPmPetitionList',
	dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}
}).done(function(result){
	if(result !=null && result.length>0){
			$("#petitionTypId").html('<option value="0">Select Representation Type</option>');
			for(var i in result){
				$("#petitionTypId").append('<option value="'+result[i].key+'">'+result[i].value+' </option>');
			}
		}
		$("#petitionTypId").trigger('chosen:updated');
});	
}
