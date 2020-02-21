<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NREGA EXPENDITURE</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<link href="Assests/css/print.css" rel="stylesheet" type="text/css"/>
<style>
.bg_color{
	background-color : #ddd;
}
.DTFC_LeftBodyWrapper
{
	top:-13px !important;
}
.DTFC_LeftBodyWrapper tr td
{
	background-color:#fff;
}
</style>
</head>
<body>
<script type="text/javascript">
var loggedInUserId = '${sessionScope.User.userId}';
var searchParams = new URLSearchParams(window.location.search);
	searchParams = searchParams.get("component");
</script>
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>NREGA EXPENDITURE - AP</p>
				</div>
			</div>
		</div>
	</nav>
</header>
<main>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-black">
						<div class="panel-heading" role="tab" id="headingOne">
							<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<h4 class="panel-title">NREGA EXPENDITURE</h4>
							</a>
						</div>
						<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
							<div class="panel-body">
								<div id="projectsOverview"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
	<section id="dashboardView">
		<div class="container-fluid">
			<div id="projectData"></div>
		</div>
	</section>
	<!-- PopUp For Month Wise Expenditure-->
	<div class="modal fade" tabindex="-1" id="nregsMnthExpModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="mnthExpHeadingId"></h4>  
				</div>
				<div class="modal-body">
					<div id="mnthExBodyId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default closeShowPdfCls" data-dismiss="modal">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>
</main>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
<script type="text/javascript">
var spinner = '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div></div>';

var overViewArr = ['Expenditure'];
var globalDivName;
buildNREGSProjectsOverview(overViewArr);
onloadCallsBuilding();
function buildNREGSProjectsOverview(result){
	var str='';
	str+='<div class="row">';
		str+='<div class="col-sm-12">';
			str+='<div class="bg_color" style="border: 5px solid #fff;padding:15px;">';
				str+='<div class="row">';
					str+='<div class="col-sm-12">';
						for(var i in result){
							str+='<div class="col-sm-2 m_top10">';
								str+='<div class="panel-block-white text-center" overview-block="'+result[i]+'">';
									str+='<h4 class="panel-block-white-title text-capitalize text-center" title="'+result[i]+'">'+result[i]+'</h4>';
								str+='</div>';
							str+='</div>';
						}
					str+='</div>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	str+='</div>';
	
	$("#projectsOverview").html(str);
}

function onloadCallsBuilding(){
	for(var i in overViewArr){
		getManWorksExpenditureAbstarct(overViewArr[i],'state','','state','-1',overViewArr[i],'',overViewArr[i],'Abstract',2);
	}
	projectData("Expenditure",2,-1);
}

function getManWorksExpenditureAbstarct(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	var month;
	//var lastMonthDate = moment().subtract(30,'days').format('YYYY-MM')
	var lastMonthDate = moment().format('YYYY-MM')
	var toDateArr = lastMonthDate.split("-");
	if(toDateArr[1] == 01){
		month = "April,May,June,July,August,September,October,November,December,January"
	}else if(toDateArr[1] == 02){
		month = "April,May,June,July,August,September,October,November,December,January,February"
	}else if(toDateArr[1] == 03){
		month = "April,May,June,July,August,September,October,November,December,January,February,March"
	}else if(toDateArr[1] == 04){
		month = "April"
	}else if(toDateArr[1] == 05){
		month = "April,May"
	}else if(toDateArr[1] == 06){
		month = "April,May,June"
	}else if(toDateArr[1] == 07){
		month = "April,May,June,July"
	}else if(toDateArr[1] == 08){
		month = "April,May,June,July,August"
	}else if(toDateArr[1] == 09){
		month = "April,May,June,July,August,September"
	}else if(toDateArr[1] == 10){
		month = "April,May,June,July,August,September,October"
	}else if(toDateArr[1] == 11){
		month = "April,May,June,July,August,September,October,November"
	}else if(toDateArr[1] == 12){
		month = "April,May,June,July,August,September,October,November,December"
	}
	var json = {
		locationType: menuLocationType,
		locationId : menuLocationId,
		monthType : month,
		sector : buildType,
		districtId : 0
	}
	
	$.ajax({
		url: 'getManWorksExpenditureAbstarct',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			buildNREGSAbstractDataByTypeNew(divIdd,ajaxresp,'',menuLocationId,menuLocationType,levelId);
		}
	});
}

function buildNREGSAbstractDataByTypeNew(type,result,blockName,locId,locType,levelId){
	$("[overview-block='"+type+"']").removeClass("panel-block-white");
	var str='';
	$("[overview-block='"+type+"']").attr("attr_levelId",levelId);
	$("[overview-block='"+type+"']").attr("attr_locationId",locId);
	for(var i in result){
		if(result[i].parameter == 'Decrement'){
			str+='<div class="panel-black-white panel-block-white-low text-center active" overview-district="'+type+'" style="padding:5px 10px;padding-bottom: 2px;padding-top:3px;">';
		}else if(result[i].parameter == 'Increment'){
			str+='<div class="panel-black-white panel-block-white-high text-center active" overview-district="'+type+'" style="padding:5px 10px;padding-bottom: 2px;padding-top:3px;">';
		}else{
			str+='<div class="panel-black-white panel-block-white-low text-center active" overview-district="'+type+'" style="padding:5px 10px;padding-bottom: 2px;padding-top:3px;">';
		}
		
		str+='<h4 class="panel-block-white-title text-capitalize text-center font_weight" title="Expenditure">Expenditure </h4>';
		
		str+='<small class="text-center font_weight">Inc/Dec&nbsp;(%)</small>';
		
		if(result[i].percentage != null && result[i].percentage.length > 0){
			str+='<h2 class="text-center"><span class="tooltipMans"  data-toggle="tooltip" data-placement="top" title="Expenditure Comparision b/n Last Fin. Year Upto Present Month To This Fin. Year Upto This Month">'+result[i].percentage+'</span><small>%</small>';
		}else{
			str+='<h2 class="text-center">0<small>%</small>';
		}
		
		if(result[i].parameter == 'Decrement'){
			str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
		}else if(result[i].parameter == 'Increment'){
			str+='<small><i class="fa fa-long-arrow-up" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
		}else{
			str+='<small><i class="fa fa-long-arrow-down" style="margin-bottom: 0px;margin-top: -17px;margin-left: 13px;"></i></small></h2>';
		}
			str+='<div class="row">';
				str+='<div class="col-sm-6 text-center">';
					str+='<label style="font-size: 12px;margin-bottom: 2px;" title="Last Fin. Year Upto Present&nbsp;Mnth">Last&nbsp;Fin..</label>';
					str+='<h4>'+result[0].total1718+'</h4>';
				str+='</div>';
				str+='<div class="col-sm-6 text-center">';
					str+='<label style="font-size: 12px;margin-bottom: 2px;" title="This Fin. Year Upto Present&nbsp;Mnth">This&nbsp;Fin..</label>';
					str+='<h4>'+result[0].total1819+'</h4>';
				str+='</div>';
			str+='</div>';
		str+='</div>';
	}
	$("[overview-block='"+type+"']").html(str);
	$(".panel-block-white-title").tooltip();
	$(".tooltipMans").tooltip();
}

/* $(document).on('click','[overview-block]', function(){
	var projectDivId = $(this).attr("overview-block");
	var levelId = $("[overview-block]").attr("attr_levelId");
	var locationId = $("[overview-block]").attr("attr_locationId");
	globalDivName = projectDivId;
	projectData(projectDivId,levelId,locationId);
	$('html,body').animate({
		scrollTop: $("#projectData").offset().top},
	'slow'); 
});
 */
function projectData(divId,levelId,locationId){
	var collapse='';
	var dataArr = ['state','district','constituency','mandal','panchayat'];
	
	collapse+='<section>';
		collapse+='<div class="row">';
			collapse+='<div class="col-sm-12">';
			for(var i in dataArr){
				if(i == 0){
					collapse+='<ul class="list-inline">';
						collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#0000FE;border-radius:50%;"></span> Historical High</li>';
						collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#FD00FC;border-radius:50%;"></span> Historical Low</li>';
						collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#a7f442;border-radius:50%;"></span> YoY High</li>';
						collapse+='<li><span style="height:15px;width:15px;display:inline-block;margin-right:4px;background-color:#FD0000;border-radius:50%;"></span> YoY Low</li>';
					collapse+='</ul>';
				}
				collapse+='<div class="panel-group" id="accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" role="tablist" aria-multiselectable="true">';
					collapse+='<div class="panel panel-default panel-black">';
						collapse+='<div class="panel-heading" role="tab" id="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
							if(dataArr[i] == 'state' || dataArr[i] == 'district' || dataArr[i] == 'constituency'){
								collapse+='<a role="button" class="panelCollapseIcon" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" overview-level-new="dataTable'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
							}else{
								collapse+='<a role="button" class="panelCollapseIcon collapsed" overview-levelId="'+levelId+'" overview-locationId="'+locationId+'" overview-divId="'+divId+'" overview-level="'+dataArr[i]+'" data-toggle="collapse" data-parent="#accordion'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" href="#collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" aria-expanded="true" aria-controls="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
							}
							collapse+='<h4 class="panel-title text-capitalize">'+dataArr[i]+' level overview - Expenditure (Person Days In Lakhs , Expenditure in Crores.)</h4>';
							collapse+='</a>';
						collapse+='</div>';
						if(dataArr[i] == 'state' || dataArr[i] == 'district' || dataArr[i] == 'constituency'){
							collapse+='<div id="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
						}else{
							collapse+='<div id="collapse'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
						}
							collapse+='<div class="panel-body">';
								collapse+='<div class="row">';
									collapse+='<div class="col-sm-12">';
									if(dataArr[i] == 'district' || dataArr[i] == 'constituency' || dataArr[i] == 'mandal' || dataArr[i] == 'panchayat'){
										collapse+='<div class="col-sm-3">';
										collapse+='<label><b>District</b></label>';
										collapse+='<select class= "form-control districtExpCls" attr_locationType='+dataArr[i]+' id="expDistrictId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
										collapse+='<option  value="0">Select District</option>';
										collapse+='</select>';
										collapse+='</div>';
									}
									if(dataArr[i] == 'constituency' || dataArr[i] == 'mandal' || dataArr[i] == 'panchayat'){
										collapse+='<div class="col-sm-3">';
										collapse+='<label><b>Constituency</b></label>';
										collapse+='<select class= "form-control constituencyExpCls" attr_locationType='+dataArr[i]+' id="expConstituencyId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
										collapse+='<option  value="0">Select Constituency</option>';
										collapse+='</select><span id="constLoading'+dataArr[i]+'"></span>';
										collapse+='</div>';
									} 
									if(dataArr[i] == 'mandal' || dataArr[i] == 'panchayat'){
										collapse+='<div class="col-sm-3">';
										collapse+='<label><b>Mandal</b></label>';
										collapse+='<select class= "form-control mandalExpCls" attr_locationType='+dataArr[i]+'  id="expMandalId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
										collapse+='<option  value="0">Select mandal</option>';
										collapse+='</select><span id="mandalLoading'+dataArr[i]+'"></span>';
										collapse+='</div>';
									}
									if(dataArr[i] == 'panchayat'){
										collapse+='<div class="col-sm-3">';
										collapse+='<label><b>Panchayat</b></label>';
										collapse+='<select class= "form-control panchayatExpCls" attr_locationType='+dataArr[i]+' id="expPanchayatId'+dataArr[i]+'" attr_blockName="'+divId+'" attr_divIId="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'">';
										collapse+='<option  value="0">Select panchayat</option>';
										collapse+='</select><span id="panchayatLoading'+dataArr[i]+'"></span>';
										collapse+='</div>';
									}
								collapse+='</div>';
							collapse+='</div>';
							collapse+='<div id="'+divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i]+'"></div>';
						collapse+='</div>';
					collapse+='</div>';
				collapse+='</div>';
			}
			collapse+='</div>';
		collapse+='</div>';
	collapse+='</section>';
	
	$("#projectData").html(collapse);
	for(var i in dataArr){
		if(divId == "Expenditure")
			getAllDistricts(dataArr[i]);
		$("#expConstituencyId"+dataArr[i]).chosen();		
		$("#expMandalId"+dataArr[i]).chosen();		
		$("#expPanchayatId"+dataArr[i]).chosen();		
	}
	
	//From Menu
	var menuLocationId = '';
	var menuLocationType = '';
	if(levelId == 2)
	{
		menuLocationId = "-1";
		menuLocationType = "state";
	}else if(levelId == 3)
	{
		menuLocationId = locationId;
		menuLocationType = "district";
	}else if(levelId == 4)
	{
		menuLocationId = locationId;
		menuLocationType = "constituency";
	}
	dataArr = ['state'];
	for(var i in dataArr){
		var theadArr;
		theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
		var tableId = divId.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ])+/g, '')+''+dataArr[i];
		$("#"+tableId).html(spinner);
		getManWorksExpenditureDetails(tableId,dataArr[i],'',menuLocationType,menuLocationId,divId,0,divId,'',levelId);
	}
}

function getManWorksExpenditureDetails(divIdd,locationTypeNew,theadArr,menuLocationType,menuLocationId,blockName,districtId,mccType,buildType,levelId)
{
	$("#"+divIdd).html(spinner);
	var json = {
		locationType: menuLocationType,
		locationIdStr : menuLocationId,
		type : "MonthWise Expenditure",
		viewType : "Expenditure"
		
	}
	
	$.ajax({
		url: 'getManWorksExpenditureDetails',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp) {
			var str = '';
			var perDays1516 = 0.0;var wageExp1516 = 0.0;var matExp1516 = 0.0;var total1516 = 0.0;
			var perDays1617 = 0.0;var wageExp1617 = 0.0;var matExp1617 = 0.0;var total1617 = 0.0;
			var perDays1718 = 0.0;var wageExp1718 = 0.0;var matExp1718 = 0.0;var total1718 = 0.0;
			var perDays1819 = 0.0;var wageExp1819 = 0.0;var matExp1819 = 0.0;var total1819 = 0.0;
			
			var perDays1617Perc = 0.0;var wageExp1617Perc = 0.0;var matExp1617Perc = 0.0;var total1617Perc = 0.0;
			var perDays1718Perc = 0.0;var wageExp1718Perc = 0.0;var matExp1718Perc = 0.0;var total1718Perc = 0.0;
			var perDays1819Perc = 0.0;var wageExp1819Perc = 0.0;var matExp1819Perc = 0.0;var total1819Perc = 0.0;
			
			str+='<div class="table-responsive m_top10">';
				str+='<table class="table table-bordered dataTable'+divIdd+'" style="width:100%">';
					str+='<thead class="text-capitalize">';
						str+='<tr>';
							str+='<th rowspan="2" style="background-color:#034575;color:#fff">Month</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#565b07;color:#fff">2018-19</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#41c4f4;color:#fff">2017-18</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#ea9009;color:#fff">2016-17</th>';
							str+='<th colspan="4" class="text-center" style="background-color:#26243c;color:#fff">2015-16</th>';
							//str+='<th rowspan="2">Increment/Decrement (%)</th>';
						str+='</tr>';
						str+='<tr>';
							str+='<th style="background-color:#565b07;color:#fff">Person Days</th>';
							//str+='<th style="background-color:#565b07;color:#fff">Actual Person Days</th>';
							str+='<th style="background-color:#565b07;color:#fff">Wage</th>';
							str+='<th style="background-color:#565b07;color:#fff">Material</th>';
							str+='<th style="background-color:#565b07;color:#fff">Total</th>';
							
							str+='<th style="background-color:#41c4f4;color:#fff">Person Days</th>';
							str+='<th style="background-color:#41c4f4;color:#fff">Wage</th>';
							str+='<th style="background-color:#41c4f4;color:#fff">Material</th>';
							str+='<th style="background-color:#41c4f4;color:#fff">Total</th>';
							
							str+='<th style="background-color:#ea9009;color:#fff">Person Days</th>';
							str+='<th style="background-color:#ea9009;color:#fff">Wage</th>';
							str+='<th style="background-color:#ea9009;color:#fff">Material</th>';
							str+='<th style="background-color:#ea9009;color:#fff">Total</th>';
							
							str+='<th style="background-color:#26243c;color:#fff">Person Days</th>';
							str+='<th style="background-color:#26243c;color:#fff">Wage</th>';
							str+='<th style="background-color:#26243c;color:#fff">Material</th>';
							str+='<th style="background-color:#26243c;color:#fff">Total</th>';
							
						str+='</tr>';
					str+='</thead>';
					str+='<tbody>';
						
					if(ajaxresp != null && ajaxresp.length > 0){
						for(var i in ajaxresp){
							str+='<tr>';
							if(menuLocationType != null && menuLocationType == "state")
								str+='<td style="background-color:#034575;color:#fff"><a class="levelWiseExpenditureCls" style="cursor:pointer;" attr_month="'+ajaxresp[i].thisMonth+'" attr_type="district">'+ajaxresp[i].thisMonth+'</a></td>';
							else
								str+='<td style="background-color:#034575;color:#fff">'+ajaxresp[i].thisMonth+'</td>';
								//18-19 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
										}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
										}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1819+'</td>';
										}
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1819+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
									}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1819+'</td>';
									}
								}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1819+'</td>';
								}else if(ajaxresp[i].perDays1819IsHigh != null && ajaxresp[i].perDays1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].perDays1819+'</td>';
								}
								/*if(ajaxresp[i].actualPersonDays1819 != null && ajaxresp[i].actualPersonDays1819 > 0){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].actualPersonDays1819+'</td>';
								}else
									str+='<td>'+ajaxresp[i].actualPersonDays1819+'</td>';*/
								//18-19 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
										}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
										}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
										}
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
									}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
									}
								}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1819+'</td>';
								}else if(ajaxresp[i].wageExp1819IsHigh != null && ajaxresp[i].wageExp1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].wageExp1819+'</td>';
								}
								//18-19 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
										}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
										}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1819+'</td>';
										}
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1819+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
									}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1819+'</td>';
									}
								}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1819+'</td>';
								}else if(ajaxresp[i].matExp1819IsHigh != null && ajaxresp[i].matExp1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].matExp1819+'</td>';
								}
								//18-19 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '18-19'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '18-19'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1819+'</td>';
										}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1819+'</td>';
										}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1819+'</td>';
										}
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1819+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '18-19'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1819+'</td>';
									}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1819+'</td>';
									}
								}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1819+'</td>';
								}else if(ajaxresp[i].total1819IsHigh != null && ajaxresp[i].total1819IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1819+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].total1819+'</td>';
								}
								
							//17-18 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
										}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
										}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1718+'</td>';
										}
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1718+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
									}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1718+'</td>';
									}
								}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1718+'</td>';
								}else if(ajaxresp[i].perDays1718IsHigh != null && ajaxresp[i].perDays1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].perDays1718+'</td>';
								}
								//17-18 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
										}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
										}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
										}
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
									}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
									}
								}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1718+'</td>';
								}else if(ajaxresp[i].wageExp1718IsHigh != null && ajaxresp[i].wageExp1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].wageExp1718+'</td>';
								}
								//17-18 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
										}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
										}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1718+'</td>';
										}
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1718+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
									}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1718+'</td>';
									}
								}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1718+'</td>';
								}else if(ajaxresp[i].matExp1718IsHigh != null && ajaxresp[i].matExp1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].matExp1718+'</td>';
								}
								//17-18 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '17-18'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '17-18'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1718+'</td>';
										}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
										}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1718+'</td>';
										}
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1718+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '17-18'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
									}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1718+'</td>';
									}
								}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1718+'</td>';
								}else if(ajaxresp[i].total1718IsHigh != null && ajaxresp[i].total1718IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1718+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].total1718+'</td>';
								}
								
							//16-17 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
										}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
										}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1617+'</td>';
										}
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1617+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
									}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1617+'</td>';
									}
								}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].perDays1617+'</td>';
								}else if(ajaxresp[i].perDays1617IsHigh != null && ajaxresp[i].perDays1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].perDays1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].perDays1617+'</td>';
								}
								//16-17 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
										}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
										}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
										}
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
									}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
									}
								}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].wageExp1617+'</td>';
								}else if(ajaxresp[i].wageExp1617IsHigh != null && ajaxresp[i].wageExp1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].wageExp1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].wageExp1617+'</td>';
								}
								//16-17 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
										}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
										}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1617+'</td>';
										}
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1617+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
									}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1617+'</td>';
									}
								}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].matExp1617+'</td>';
								}else if(ajaxresp[i].matExp1617IsHigh != null && ajaxresp[i].matExp1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].matExp1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].matExp1617+'</td>';
								}
								//16-17 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '16-17'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '16-17'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1617+'</td>';
										}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
											str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
										}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
											str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1617+'</td>';
										}
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1617+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '16-17'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
										str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
									}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
										str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1617+'</td>';
									}
								}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'TRUE'){
									str+='<td style="background-color:#a7f442;">'+ajaxresp[i].total1617+'</td>';
								}else if(ajaxresp[i].total1617IsHigh != null && ajaxresp[i].total1617IsHigh == 'FALSE'){
									str+='<td style="background-color:#FD0100;color:#fff">'+ajaxresp[i].total1617+'</td>';
								}else{
									str+='<td>'+ajaxresp[i].total1617+'</td>';
								}
								
							//15-16 PersonDays
								if(ajaxresp[i].overAllPersonDaysIsHigh != null && ajaxresp[i].overAllPersonDaysIsHigh == 'TRUE'){
									if(ajaxresp[i].personDaysIsHigh != null && ajaxresp[i].personDaysIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].perDays1516+'</td>';
									}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
										if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].perDays1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].perDays1516+'</td>';
									}
								}else if(ajaxresp[i].overAllPersonDaysIsLow != null && ajaxresp[i].overAllPersonDaysIsLow == 'TRUE'){
									if(ajaxresp[i].personDaysIsLow != null && ajaxresp[i].personDaysIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].perDays1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].perDays1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].perDays1516+'</td>';
								}
								//15-16 Wage
								if(ajaxresp[i].overAllWageIsHigh != null && ajaxresp[i].overAllWageIsHigh == 'TRUE'){
									if(ajaxresp[i].wageIsHigh != null && ajaxresp[i].wageIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].wageExp1516+'</td>';
									}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
										if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
									}
								}else if(ajaxresp[i].overAllWageIsLow != null && ajaxresp[i].overAllWageIsLow == 'TRUE'){
									if(ajaxresp[i].wageIsLow != null && ajaxresp[i].wageIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].wageExp1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].wageExp1516+'</td>';
								}
								//15-16 Material
								if(ajaxresp[i].overAllMaterialIsHigh != null && ajaxresp[i].overAllMaterialIsHigh == 'TRUE'){
									if(ajaxresp[i].materialIsHigh != null && ajaxresp[i].materialIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].matExp1516+'</td>';
									}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
										if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].matExp1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].matExp1516+'</td>';
									}
								}else if(ajaxresp[i].overAllMaterialIsLow != null && ajaxresp[i].overAllMaterialIsLow == 'TRUE'){
									if(ajaxresp[i].materialIsLow != null && ajaxresp[i].materialIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].matExp1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].matExp1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].matExp1516+'</td>';
								}
								//15-16 Total
								if(ajaxresp[i].overAllTotalIsHigh != null && ajaxresp[i].overAllTotalIsHigh == 'TRUE'){
									if(ajaxresp[i].totalIsHigh != null && ajaxresp[i].totalIsHigh == '15-16'){
										str+='<td style="background-color:#0000FE;color:#fff">'+ajaxresp[i].total1516+'</td>';
									}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
										if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '15-16'){
											str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1516+'</td>';
										}else{
											str+='<td>'+ajaxresp[i].total1516+'</td>';
										}
									}else{
										str+='<td>'+ajaxresp[i].total1516+'</td>';
									}
								}else if(ajaxresp[i].overAllTotalIsLow != null && ajaxresp[i].overAllTotalIsLow == 'TRUE'){
									if(ajaxresp[i].totalIsLow != null && ajaxresp[i].totalIsLow == '15-16'){
										str+='<td style="background-color:#FE00FE;color:#fff">'+ajaxresp[i].total1516+'</td>';
									}else{
										str+='<td>'+ajaxresp[i].total1516+'</td>';
									}
								}else{
									str+='<td>'+ajaxresp[i].total1516+'</td>';
								}
								
							perDays1516 = parseFloat(perDays1516)+parseFloat(ajaxresp[i].perDays1516);
							wageExp1516 = parseFloat(wageExp1516)+parseFloat(ajaxresp[i].wageExp1516);
							matExp1516 = parseFloat(matExp1516)+parseFloat(ajaxresp[i].matExp1516);
							total1516 = parseFloat(total1516)+parseFloat(ajaxresp[i].total1516);
							
							perDays1617 = parseFloat(perDays1617)+parseFloat(ajaxresp[i].perDays1617);
							wageExp1617 = parseFloat(wageExp1617)+parseFloat(ajaxresp[i].wageExp1617);
							matExp1617 = parseFloat(matExp1617)+parseFloat(ajaxresp[i].matExp1617);
							total1617 = parseFloat(total1617)+parseFloat(ajaxresp[i].total1617);

							perDays1718 = parseFloat(perDays1718)+parseFloat(ajaxresp[i].perDays1718);
							wageExp1718 = parseFloat(wageExp1718)+parseFloat(ajaxresp[i].wageExp1718);
							matExp1718 = parseFloat(matExp1718)+parseFloat(ajaxresp[i].matExp1718);
							total1718 = parseFloat(total1718)+parseFloat(ajaxresp[i].total1718);
							
							perDays1819 = parseFloat(perDays1819)+parseFloat(ajaxresp[i].perDays1819);
							//actualPersonDays1819 = parseFloat(actualPersonDays1819)+parseFloat(ajaxresp[i].actualPersonDays1819);
							wageExp1819 = parseFloat(wageExp1819)+parseFloat(ajaxresp[i].wageExp1819);
							matExp1819 = parseFloat(matExp1819)+parseFloat(ajaxresp[i].matExp1819);
							total1819 = parseFloat(total1819)+parseFloat(ajaxresp[i].total1819);
							
							str+='</tr>';
						}
					}
					str+='<tr>';
						str+='<td style="background-color:#3F8EC8;color:#FFFFFF;font-size:16px;"><b>Total</b></td>';
						
						str+='<td style="font-size:16px;"><b>'+perDays1819.toFixed(2)+'</b></td>';
						//str+='<td style="font-size:16px;"><b>'+actualPersonDays1819.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1819.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1819.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1819.toFixed(2)+'</b></td>';
						
						if(parseFloat(perDays1718) >= parseFloat(perDays1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+perDays1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+perDays1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(wageExp1718) >= parseFloat(wageExp1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+wageExp1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+wageExp1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(matExp1718) >= parseFloat(matExp1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+matExp1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+matExp1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(total1718) >= parseFloat(total1617))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+total1718.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+total1718.toFixed(2)+'</b></td>';
						
						if(parseFloat(perDays1617) >= parseFloat(perDays1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+perDays1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+perDays1617.toFixed(2)+'</b></td>';
						
						if(parseFloat(wageExp1617) >= parseFloat(wageExp1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+wageExp1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+wageExp1617.toFixed(2)+'</b></td>';
						
						if(parseFloat(matExp1617) >= parseFloat(matExp1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+matExp1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+matExp1617.toFixed(2)+'</b></td>';
						
						if(parseFloat(total1617) >= parseFloat(total1516))
							str+='<td style="background-color:#a7f442;font-size:16px;"><b>'+total1617.toFixed(2)+'</b></td>';
						else
							str+='<td style="background-color:#FD0200;font-size:16px;color:#fff"><b>'+total1617.toFixed(2)+'</b></td>';
						
						str+='<td style="font-size:16px;"><b>'+perDays1516.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1516.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1516.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1516.toFixed(2)+'</b></td>';
						/*if(parseFloat(perDays1718) >= parseFloat(perDays1617))
							str+='<td style="background-color:#FDFF00;">'+perDays1718.toFixed(2)+'</td>';
						else
							str+='<td style="background-color:#FD0200;">'+perDays1718.toFixed(2)+'</td>';
						if(parseFloat(wageExp1718) >= parseFloat(wageExp1617))
							str+='<td style="background-color:#FDFF00;">'+wageExp1718.toFixed(2)+'</td>';
						else
							str+='<td style="background-color:#FD0200;">'+wageExp1718.toFixed(2)+'</td>';
						if(parseFloat(matExp1718) >= parseFloat(matExp1617))
							str+='<td style="background-color:#FDFF00;">'+matExp1718.toFixed(2)+'</td>';
						else
							str+='<td style="background-color:#FD0200;">'+matExp1718.toFixed(2)+'</td>';
						if(parseFloat(total1718) >= parseFloat(total1617))
							str+='<td style="background-color:#FDFF00;">'+total1718.toFixed(2)+'</td>';
						else
							str+='<td style="background-color:#FD0200;">'+total1718.toFixed(2)+'</td>';*/
					str+='</tr>';
					
					perDays1617Perc = ((parseFloat(perDays1617)/parseFloat(perDays1516))*100.00)-100.00;
					wageExp1617Perc = ((parseFloat(wageExp1617)/parseFloat(wageExp1516))*100.00)-100.00;
					matExp1617Perc = ((parseFloat(matExp1617)/parseFloat(matExp1516))*100.00)-100.00;
					total1617Perc = ((parseFloat(total1617)/parseFloat(total1516))*100.00)-100.00;
					perDays1718Perc = ((parseFloat(perDays1718)/parseFloat(perDays1617))*100.00)-100.00;
					wageExp1718Perc = ((parseFloat(wageExp1718)/parseFloat(wageExp1617))*100.00)-100.00;
					matExp1718Perc = ((parseFloat(matExp1718)/parseFloat(matExp1617))*100.00)-100.00;
					total1718Perc = ((parseFloat(total1718)/parseFloat(total1617))*100.00)-100.00;
					
					str+='<tr>';
						str+='<td style="background-color:#3F8EC8;color:#FFFFFF;font-size:16px;"><b>Growth</b></td>';
						str+='<td></td>';
						//str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td style="font-size:16px;"><b>'+perDays1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1718Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+perDays1617Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+wageExp1617Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+matExp1617Perc.toFixed(2)+'</b></td>';
						str+='<td style="font-size:16px;"><b>'+total1617Perc.toFixed(2)+'</b></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
						str+='<td></td>';
					str+='</tr>';
					str+='</tbody>';
					
				str+='</table>';
			str+='</div>';
			$("#"+divIdd).html(str);	
			if(locationTypeNew == 'state'){
				$(".dataTable"+divIdd).dataTable({
					"iDisplayLength": 20,
					"aaSorting": [],
					"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
					"scrollX":        true,
					"scrollCollapse": true,
					"fixedColumns":   {
						"leftColumns": 1,
					},
					"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
					buttons: [
						{
							extend:    'csvHtml5',
							text:      '<i class="fa fa-file-text-o"></i>',
							titleAttr: 'CSV',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						},
						{
							extend:    'pdfHtml5',
							text:      '<i class="fa fa-file-pdf-o"></i>',
							titleAttr: 'PDF',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
							orientation: "landscape",
							pageSize:'A3',
							customize: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
							}
						}
					]
				});
			}
			if(locationTypeNew == 'constituency' || locationTypeNew == 'mandal' || locationTypeNew == 'panchayat')
			{
				$(".dataTable"+divIdd).dataTable({
					"iDisplayLength": 15,
					"aaSorting": [],
					"scrollX":        true,
					"scrollCollapse": true,
					"fixedColumns":   {
						"leftColumns": 1,
					},
					"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
					"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
					buttons: [
						{
							extend:    'csvHtml5',
							text:      '<i class="fa fa-file-text-o"></i>',
							titleAttr: 'CSV',
							title:	   blockName,
							filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						},
						{
							extend:    'pdfHtml5',
							text:      '<i class="fa fa-file-pdf-o"></i>',
							titleAttr: 'PDF',
							title:	   blockName,
							filename:  blockName+''+moment().format("DD/MMMM/YYYY  HH:MM"),
							orientation: "landscape",
							pageSize:'A3',
							customize: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
							}
						}
					]
				});
			}else if(locationTypeNew == 'district')
			{
				$(".dataTable"+divIdd).dataTable({
					"iDisplayLength": 20,
					"aaSorting": [],
					"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
					"scrollX":        true,
					"scrollCollapse": true,
					"fixedColumns":   {
						"leftColumns": 1,
					},
					"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
					buttons: [
						{
							extend:    'csvHtml5',
							text:      '<i class="fa fa-file-text-o"></i>',
							titleAttr: 'CSV',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
						},
						{
							extend:    'pdfHtml5',
							text:      '<i class="fa fa-file-pdf-o"></i>',
							titleAttr: 'PDF',
							title:	   divIdd,
							filename:  divIdd+''+moment().format("DD/MMMM/YYYY  HH:MM"),
							orientation: "landscape",
							pageSize:'A3',
							customize: function (doc) {
								doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
							}
						}
					]
				});
			}
			//	tableView(divIdd,theadArr,str,locationTypeNew,blockName);
			//}
		}
	});
	$(".dataTable"+divIdd).closest("[overview-level-new]").trigger("click");
}

$(document).on('change','.districtExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "district"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'district','','district',value,blockName,'','','','');
	}else if(blockType == "constituency"){
		var value = $(this).val();
		getAllConstituiencesFrDistrict(blockType,value)
	}else if(blockType == "mandal"){
		var value = $(this).val();
		getAllConstituiencesFrDistrict(blockType,value)
	}else if(blockType == "panchayat"){
		var value = $(this).val();
		getAllConstituiencesFrDistrict(blockType,value)
	}
});

$(document).on('change','.constituencyExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "constituency"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'constituency','','constituency',value,blockName,'','','','');
	}else if(blockType == "mandal"){
		var value = $(this).val();
		getTehsilesFrConstituency(blockType,value)
	}else if(blockType == "panchayat"){
		var value = $(this).val();
		getTehsilesFrConstituency(blockType,value)
	}
});
$(document).on('change','.mandalExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "mandal"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'mandal','','mandal',value,blockName,'','','','');
	}else if(blockType == "panchayat"){
		var value = $(this).val();
		getPanchayatsFrTehsil(blockType,value)
	}
});

$(document).on('change','.panchayatExpCls', function(){
	var blockType = $(this).attr("attr_locationType");
	var blockName = $(this).attr("attr_blockName");
	var divIdd = $(this).attr("attr_divIId");
	
	//var theadArr = ['Month','Person Days 2015-16','Wage Exp 2015-16','Material Exp 2015-16','Total 2015-16','Person Days 2016-17','Wage Exp 2016-17','Material Exp 2016-17','Total 2016-17','Person Days 2017-18','Wage Exp 2017-18','Material Exp 2017-18','Total 2017-18','Increment/Decrement (%)'];
	if(blockType == "panchayat"){
		var value = $(this).val();
		getManWorksExpenditureDetails(divIdd,'panchayat','','panchayat',value,blockName,'','','','');
	}
});

function getAllDistricts(locationType){
	$("#expDistrictId"+locationType).html('');
	var json = {
	}
	$.ajax({
		url: 'getAllDistricts',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(result) {
			$("#expDistrictId"+locationType).html("<option value='0'>Select District</option>");
			if(result != null && result.length > 0){
				for(var i in result){
					$("#expDistrictId"+locationType).append('<option value="'+result[i].locationIdStr+'">'+result[i].locationName+' </option>');
				}
			}
		$("#expDistrictId"+locationType).chosen();
		$("#expDistrictId"+locationType).trigger('chosen:updated');
		}
	});
}	

$(document).on("click",".levelWiseExpenditureCls",function(){
	$("#nregsMnthExpModalId").modal("show");
	$("#mnthExBodyId").html(spinner);
	var monthname = $(this).attr("attr_month");
	var viewType = $(this).attr("attr_type");
	$("#mnthExpHeadingId").html(monthname+" Month "+viewType+" Wise Details");
	getLocationWiseDetilsForMonth(monthname,viewType);
});

function getLocationWiseDetilsForMonth(monthname,viewType){
	var json = {
		 viewType: viewType, 
		 month: monthname,
		 type : "Expenditure"
	}
	$.ajax({
		url: 'getLocationWiseNregaExpenditureForMonth',
		data: JSON.stringify(json),
		type: "POST",
		dataType: 'json', 
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success: function(ajaxresp){
			if(ajaxresp !=null && ajaxresp.length>0){
				buildLocationWiseExpenditureDetails(ajaxresp);
			}else{
				$("#mnthExBodyId").html("No Data Available");
			}
		}
	})
}

function buildLocationWiseExpenditureDetails(result){
	var str='';
	
	str+='<div class="table-responsive m_top10">';
		str+='<table class="table table-bordered dataTablepopUpCls expendituremodalCls" style="width:100%">';
			str+='<thead class="text-capitalize">';
				str+='<tr>';
					str+='<th rowspan="2" style="background-color:#034575;color:#fff">District</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#565b07;color:#fff">2018-19</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#41c4f4;color:#fff">2017-18</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#ea9009;color:#fff">2016-17</th>';
					str+='<th colspan="4" class="text-center" style="background-color:#26243c;color:#fff">2015-16</th>';
				str+='</tr>';
				str+='<tr>';
					str+='<th style="background-color:#565b07;color:#fff">Person Days</th>';					
					//str+='<th style="background-color:#565b07;color:#fff">Actual Person Days</th>';					
					str+='<th style="background-color:#565b07;color:#fff">Wage</th>';
					str+='<th style="background-color:#565b07;color:#fff">Material</th>';
					str+='<th style="background-color:#565b07;color:#fff">Total</th>';
					
					str+='<th style="background-color:#41c4f4;color:#fff">Person Days</th>';
					str+='<th style="background-color:#41c4f4;color:#fff">Wage</th>';
					str+='<th style="background-color:#41c4f4;color:#fff">Material</th>';
					str+='<th style="background-color:#41c4f4;color:#fff">Total</th>';
					
					str+='<th style="background-color:#ea9009;color:#fff">Person Days</th>';
					str+='<th style="background-color:#ea9009;color:#fff">Wage</th>';
					str+='<th style="background-color:#ea9009;color:#fff">Material</th>';
					str+='<th style="background-color:#ea9009;color:#fff">Total</th>';
					
					str+='<th style="background-color:#26243c;color:#fff">Person Days</th>';
					str+='<th style="background-color:#26243c;color:#fff">Wage</th>';
					str+='<th style="background-color:#26243c;color:#fff">Material</th>';
					str+='<th style="background-color:#26243c;color:#fff">Total</th>';
					
				str+='</tr>';
			str+='</thead>';
			str+='<tbody>';
			if(result != null && result.length > 0){
				for(var i in result){
					str+='<tr>';
						str+='<td>'+result[i].name+'</td>';
						if(result[i].subList != null && result[i].subList.length > 0){
							for(var j in result[i].subList){
								//Person Days
								if(result[i].subList[j].overAllPersonDaysHigh != null && result[i].subList[j].overAllPersonDaysHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].personDays+'</td>';
								else if(result[i].subList[j].overAllPersonDaysLow != null && result[i].subList[j].overAllPersonDaysLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].personDays+'</td>';
								else if(result[i].subList[j].isPersonDaysHigh != null && result[i].subList[j].isPersonDaysHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].personDays+'</td>';
								else if(result[i].subList[j].isPersonDaysHigh != null && result[i].subList[j].isPersonDaysHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].personDays+'</td>';
								else
									str+='<td>'+result[i].subList[j].personDays+'</td>';
								//Actual Person Days
								//if(result[i].subList[j].id != null && result[i].subList[j].id == 13)
									//str+='<td style="background-color:#a7f442;">'+result[i].subList[j].actualPersonDays+'</td>';
								//WAGE
								if(result[i].subList[j].overAllWageIsHigh != null && result[i].subList[j].overAllWageIsHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].wage+'</td>';
								else if(result[i].subList[j].overAllWageLow != null && result[i].subList[j].overAllWageLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].wage+'</td>';
								else if(result[i].subList[j].isWageHigh != null && result[i].subList[j].isWageHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].wage+'</td>';
								else if(result[i].subList[j].isWageHigh != null && result[i].subList[j].isWageHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].wage+'</td>';
								else 
									str+='<td>'+result[i].subList[j].wage+'</td>';
								//Material
								if(result[i].subList[j].overAllMatIsHigh != null && result[i].subList[j].overAllMatIsHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].material+'</td>';
								else if(result[i].subList[j].overAllMatLow != null && result[i].subList[j].overAllMatLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].material+'</td>';
								else if(result[i].subList[j].isMatHigh != null && result[i].subList[j].isMatHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].material+'</td>';
								else if(result[i].subList[j].isMatHigh != null && result[i].subList[j].isMatHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].material+'</td>';
								else
									str+='<td>'+result[i].subList[j].material+'</td>';
								//Total
								if(result[i].subList[j].overAllTotalIsHigh != null && result[i].subList[j].overAllTotalIsHigh == "TRUE")
									str+='<td style="background-color:#0000FE;color:#fff">'+result[i].subList[j].total+'</td>';
								else if(result[i].subList[j].overAllTotalLow != null && result[i].subList[j].overAllTotalLow == "TRUE")
									str+='<td style="background-color:#FE00FE;color:#fff">'+result[i].subList[j].total+'</td>';
								else if(result[i].subList[j].isTotalHigh != null && result[i].subList[j].isTotalHigh == "TRUE")
									str+='<td style="background-color:#a7f442;">'+result[i].subList[j].total+'</td>';
								else if(result[i].subList[j].isTotalHigh != null && result[i].subList[j].isTotalHigh == "FALSE")
									str+='<td style="background-color:#FD0100;color:#fff">'+result[i].subList[j].total+'</td>';
								else
									str+='<td>'+result[i].subList[j].total+'</td>';
							}
						}
					str+='</tr>';
				}
			}
			str+='</tbody>';
		str+='</table>';
	str+='</div>';
	
	$("#mnthExBodyId").html(str);
	$(".expendituremodalCls").dataTable({
		"iDisplayLength": 20,
		"aaSorting": [],
		"aLengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
		"scrollX":        true,
		"scrollCollapse": true,
		"fixedColumns":   {
			"leftColumns": 1,
		},
		"dom": "<'row'<'col-sm-4'l><'col-sm-7'f><'col-sm-1'B>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-5'i><'col-sm-7'p>>",
		buttons: [
			{
				extend:    'csvHtml5',
				text:      '<i class="fa fa-file-text-o"></i>',
				titleAttr: 'CSV',
				title:	   'Expenditure',
				filename:  'Expenditure',
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fa fa-file-pdf-o"></i>',
				titleAttr: 'PDF',
				title:	   'Expenditure',
				filename:  'Expenditure',
				orientation: "landscape",
				pageSize:'A3',
				customize: function (doc) {
					doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
				}
			}
		]
	});
}
</script>