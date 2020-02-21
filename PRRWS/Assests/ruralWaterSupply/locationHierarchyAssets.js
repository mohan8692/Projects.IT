var stateArr = [{'name':'Andhra Pradesh','id':1}];
collapseMenu(1,stateArr,'multi-level-selection-menu');
function getAllDistrictsInfo(divId,levelId,locationScopeId){
	$("."+divId).html(spinner);
	//var type = 'constituency' //district to constituency (only consider type like this)
	var json = {
			  
	}
	$.ajax({
		url : "getAllDistrictsInfo",     
		data : JSON.stringify(json),
		type : "GET",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			collapseMenu(levelId,result,divId,locationScopeId,"","","")
		}
	});
}
function getAllDivisionsInfo(divId,levelId,locationScopeId){
	$("."+divId).html(spinner);
	var json = {
			  
	}
	$.ajax({
		url : "getAllDivisionsInfo/"+locationScopeId,   
		data : JSON.stringify(json),
		type : "GET",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			collapseMenu(levelId,result,divId,"",locationScopeId,"","")
		}
	});
}
function getAllSubDivisionInfo(divId,levelId,locationScopeId,districtVal){
	$("."+divId).html(spinner);
	//var type = 'constituency' //district to constituency (only consider type like this)
	var json = {
		
	}
	$.ajax({
		url : "getAllSubDivisionInfo/"+locationScopeId,   
		data : JSON.stringify(json),
		type : "GET",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			collapseMenu(levelId,result,divId,districtVal,locationScopeId,"","")
		}
	});
}
function getAllMandalInfo(divId,levelId,locationScopeId,districtVal,divisionVal){
	$("."+divId).html(spinner);
	//var type = 'constituency' //district to constituency (only consider type like this)
	var json = {
		
	}
	$.ajax({
		url : "getAllMandalInfo/"+locationScopeId,   
		data : JSON.stringify(json),
		type : "GET",  
		dataTypa : 'json',   
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(result){   
			collapseMenu(levelId,result,divId,districtVal,divisionVal,locationScopeId,"")
		}
	});
}
function collapseMenu(id,resultArr,buildId,districtVal,divisionVal,subDivisionVal,mandalVal)
{
	if(id == 2)
	{
	   levelIdValue = 3;
	}else if(id == 3)
	{
		levelIdValue = 15;
	}else if(id == 15){
		levelIdValue = 16;
	}else if(id == 16){
		levelIdValue = 5;
	}else{
		levelIdValue = 2;
	}
	var collapse = '';
	collapse+='<div class="panel-group dashedBorder" id="accordion'+id+'" role="tablist" aria-multiselectable="true">';
	for(var i in resultArr)
	{
		collapse+='<div class="panel panel-default panelExpand">';
			collapse+='<div class="panel-heading" role="tab" id="heading'+resultArr[i].name.replace(/\s+/g, '')+'">';
				collapse+='<h4 class="panel-title">';
					if(levelIdValue == 2 || levelIdValue == 15 || levelIdValue == 16 || levelIdValue == 3)
					{
						if(levelIdValue == 3){
							collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+divisionVal+'" class="panelCollapseIconClick menuAttrAddNames panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion'+[id]+'" href="#collapse'+resultArr[i].name.replace(/\s+/g, '')+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].name.replace(/\s+/g, '')+'">&nbsp;</a>';
						}else if(levelIdValue == 15){
							collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+divisionVal+'"  class="panelCollapseIconClick menuAttrAddNames panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion'+[id]+'" href="#collapse'+resultArr[i].name.replace(/\s+/g, '')+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].name.replace(/\s+/g, '')+'">&nbsp;</a>';
						}else if(levelIdValue == 16){
							collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+districtVal+'" attr_previousLocDivisionId="'+divisionVal+'"  class="panelCollapseIconClick menuAttrAddNames panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion'+[id]+'" href="#collapse'+resultArr[i].name.replace(/\s+/g, '')+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].name.replace(/\s+/g, '')+'">&nbsp;</a>';
						}else if(levelIdValue == 5){
							collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+districtVal+'" attr_previousLocDivisionId="'+divisionVal+'" attr_previousLocSubDivisionId="'+subDivisionVal+'"  class="panelCollapseIconClick menuAttrAddNames panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion'+[id]+'" href="#collapse'+resultArr[i].name.replace(/\s+/g, '')+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].name.replace(/\s+/g, '')+'">&nbsp;</a>';
						}else{
							collapse+='<a role="button" style="height:10px;width:10px;display:inline-block;" attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id"   class="panelCollapseIconClick menuAttrAddNames panelCollapseIcon collapsed" data-toggle="collapse" data-parent="#accordion'+[id]+'" href="#collapse'+resultArr[i].name.replace(/\s+/g, '')+'" aria-expanded="true" aria-controls="collapse'+resultArr[i].name.replace(/\s+/g, '')+'">&nbsp;</a>';
						}
						
					}
					if(levelIdValue == 3){
						collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+divisionVal+'" >'+resultArr[i].name+'</span>';
					}else if(levelIdValue == 15){
						collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+divisionVal+'" >'+resultArr[i].name+'</span>';
					}else if(levelIdValue == 16){
						collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+districtVal+'" attr_previousLocDivisionId="'+divisionVal+'" >'+resultArr[i].name+'</span>';
					}else if(levelIdValue == 5){
						collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id" attr_previousLocDistrictId="'+districtVal+'" attr_previousLocDivisionId="'+divisionVal+'" attr_previousLocSubDivisionId="'+subDivisionVal+'" >'+resultArr[i].name+'</span>';
					}else{
						collapse+='<span style="padding-left:10px;cursor:pointer;" class="menuDataCollapse"  attr_levelIdValue="'+levelIdValue+'" attr_levelId="'+id+'" attr_id="'+resultArr[i].id+'" attr_name="'+resultArr[i].name+'" attr_targetId="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id"  >'+resultArr[i].name+'</span>';
					}
					
					
				collapse+='</h4>';
			collapse+='</div>';
			collapse+='<div id="collapse'+resultArr[i].name.replace(/\s+/g, '')+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+resultArr[i].name.replace(/\s+/g, '')+'">';
				collapse+='<div class="panel-body">';
					collapse+='<div class="collapseMenu'+resultArr[i].name.replace(/\s+/g, '')+'Id"></div>';
				collapse+='</div>';
			collapse+='</div>';
		collapse+='</div>';
	}
	collapse+='</div>';
	$("."+buildId).html(collapse);
}

$(document).on("click",".panelCollapseIcon",function(e){
	e.stopPropagation();
	var buildId = $(this).attr("attr_targetId");
	var locationScopeId = $(this).attr("attr_id");
	var levelId = $(this).attr("attr_levelIdValue");
	var districtId = $(this).attr("attr_previouslocdistrictid");
	var divisionId = $(this).attr("attr_previousLocDivisionId");
	
	
	if(levelId == "16" || levelId == 16)
	{
		getAllMandalInfo(buildId,levelId,locationScopeId,districtId,divisionId);
	}
	if(levelId == "15" || levelId == 15)
	{
		getAllSubDivisionInfo(buildId,levelId,locationScopeId,districtId);
	}
	if(levelId == "3" || levelId == 3)
	{
		getAllDivisionsInfo(buildId,levelId,locationScopeId);
	}
	if(levelId == "2" || levelId == 2)
	{
		getAllDistrictsInfo(buildId,levelId,locationScopeId);
	}
	
	
});
$(".multi-level-selection-menu").hide();
$(document).on("click",function(){
	$(".multi-level-selection-menu").hide();
});
$(document).on("click","#selectedName",function(e){
	e.stopPropagation();
	$(".multi-level-selection-menu").toggle();
});