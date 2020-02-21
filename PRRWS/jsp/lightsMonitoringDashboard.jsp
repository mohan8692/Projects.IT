<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LED Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
	.block_padding_15{
		padding: 10px;
	}
	@media(min-width: 992px) and (max-width: 1200px){
		.img_height{
			height:35px !important;
		}
	}
</style>
</head>
<body>
   <header style = "box-shadow:none;background-color:#fff;">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>LED- DashBoard</p>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div  id="menu"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
	
	<section class="navbar-section">
		<div class="container-fluid padding_10">
				<div class="row">
                    <div class="col-sm-2">
						<h4 class="arrowIconChanged">
							<i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;
							<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span>
							<span class="tooltipWattCls" style="font-weight: 600; cursor: pointer; font-size: 18px;margin-left: 10px" id="statePopupClick" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-container="body" title="LED PROGRESS" attr_click="stateclick">&#9432;</span>&nbsp;								
							<img src=" Assests/images/Report 1.ico" class="tooltipWattCls" style=" cursor: pointer;margin-left: 10px;width:25px;"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-container="body" title="Click here to get LED Report" id="ledLightsFilteredId"/>
						</h4>
						<div class="multi-level-selection-menu arrow_box_top"></div>
						
					</div>
					<div class="col-sm-5">
						<div id="dayWiseTargetsBlockId"></div>
					</div>
					<div class="col-sm-3">
						<ul class="list-inline led-list pull-right">
							<li><h6><span class="ledColorView"></span>LED WATTAGE</h6></li>
							<li><h6><span class="nonLedColorView"></span>NON-LED WATTAGE</h6></li>
						</ul>
						<ul class="list-inline led-list pull-right">
							<li style="margin-right: 10px !important;"><h6><span>LAST UPDATED</span> : <span style="color:green;font-weight:bold;" id="lastUpdateTimeId"></span></h6></li>
						</ul>
					</div>
					
					<div class="col-sm-2">
					<!--<span style="color:green;display:none;font-size:16px;" id="webServiceMessageStatusId">Please wait data is being process from live server,Then page will refresh...</span>-->
                        <ul class="list-inline pull-right sub-menu">
					        <li class="daterangeViewLiveCls liveDataCls commonViewCls active" style="cursor:pointer;">LIVE</li>
                            <!--<li class=" daterangeViewLiveCls todayDataCls commonViewCls" style="cursor:pointer;">TODAY</li>-->
                            <li id="singleDateRangePicker" class="daterangeViewCls commonViewCls" style="cursor:pointer;">HISTORICAL</li>
                        </ul>
						
                    </div>
				</div>
				<div class="row" style="display:none;">
					 <h5 class="pull-right" ><img id="ledPDFReportSpinnerId" src="Assests/images/spinner.gif" style="width:40px;height:40px;display:none;"/></h5>
					 <button class="btn btn-primary pull-right btn-sm" onclick="generate()" style="border-radius:0px;display:none;" id="ledPDFReportId">LED PDF REPORT</button>
					 <button class="btn btn-primary pull-right btn-sm"  style="border-radius:0px;display:none;cursor:no-drop" id="notLedPDFReportId">PDF REPORT NOT AVAILABLE</button>
				</div>
				
		</div>
	</section>
</header>
<main class="m_top5">
<div class="container">
	<div class="row">
		<div id="html-2-pdfwrapper" >
			
		</div>
	</div>
</div>

<div class="container-fluid">
	<section>
		<div class="white-block poles_block">
			<div class="row m_top10">
				<div id="overviewBlockId"></div>
				<div id="ledOverViewDiv"></div>
			</div>
		</div>
		<div class="row m_top10">
			<div id="esslAndNredcapDivId" class="tabViewCls"></div>
			
		</div>
		<div id="esslAndNredcapDivId1" class="mobileViewCls" style="display:none;"></div>
		
		<div class="row m_top10">
			<div id="projectData"></div>
		</div>
		
	</section>
</div>
</main>
<div class="modal fade" id="modalMessageDivId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index:9999">
  <div class="modal-dialog" role="document" style="width:60%;">
    <div class="modal-content modal-custom">
      <div class="modal-body">
       <h4 id="statusHeadingId" style="text-align: center; color: green; font-weight: bold;">Building Live Panels & Lights Information Please Wait...</h4>
	   <div id="processingImage"></div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" id="surveryStartedLocationDtlsModelDivId" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="width:90%;margin:auto">
    <div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close modalCloseCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title text-capital text-center" id="surveryStartedLocHeadingId" style="text-align:center;font-weight: bold"></h4> 
		</div>
      <div class="modal-body">
        <div class="row">
			<div class="col-md-12 col-xs-12 col-sm-12">
			<div id="surveyStartedLocationDtlsDivId"></div>
			<div id="newAddedLightsSummary"></div> 	
			<div id="statewiseVendorDetails"></div> 
			</div>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default modalCloseCls" data-dismiss="modal">Close</button>
      </div>
   
  </div>
</div>
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/js/locationHierarchy.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.4/jspdf.plugin.autotable.js"></script>

<script src="Assests/lightMonitoringDashBoard/lightMonitoringDashBoard1.js" type="text/javascript"></script>

<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script>
var globalResultsLEDReport;
var base64Img = null;
imgToBase64('Assests/images/chandrakanthi-jpg.jpg', function(base64) {
    base64Img = base64; 
});
margins = {
  top: 70,
  bottom: 30,
  left: 55,
  width: 550
};


function generate(){
	var columns = [
		{title: "S:No", dataKey: "column1"},
		{title: "Item Description", dataKey: "column2"}, 
		{title: "NREDCAP", dataKey: "column3"},
		{title: "ESSL", dataKey: "column4"},
		{title: "GPs", dataKey: "column5"},
		{title: "Total", dataKey: "column6"}
	];
	var rows = [{
		"column1":"1",
		"column2":"Lights",
		"column3":"",
		"column4":"",
		"column5":"",
		"column6":""
	}, {
		"column1":"",
		"column2":"Target",
		"column3":globalResultsLEDReport.nredcapTarget,
		"column4":globalResultsLEDReport.eeslTarget,
		"column5":"",
		"column6":globalResultsLEDReport.totalTarget
	}, {
		"column1":"",
		"column2":"Today Installation",
		"column3":globalResultsLEDReport.nredcapTodayInstallations,
		"column4":globalResultsLEDReport.eeslTodayInstallations,
		"column5":"",
		"column6":globalResultsLEDReport.totalInstallations
	}, {
		"column1":"",
		"column2":"Cummulative(During 5/2018)",
		"column3":globalResultsLEDReport.nredcapCummulative,
		"column4":globalResultsLEDReport.eeslCummmulative,
		"column5":"",
		"column6":globalResultsLEDReport.cummulative
	}, {
		"column1":"",
		"column2":"Total Cummulative",
		"column3":globalResultsLEDReport.nredcapTotalCummulative,
		"column4":globalResultsLEDReport.eeslTotalCummulative,
		"column5":"",
		"column6":globalResultsLEDReport.totalCummulative	
	}, {
		"column1":"",
		"column2":"Balance Target",
		"column3":globalResultsLEDReport.nredcapBalanceTarget,
		"column4":globalResultsLEDReport.eeslBalanceTarget,
		"column5":"",
		"column6":globalResultsLEDReport.totalBalanceTarget
	}, {
		"column1":"",
		"column2":"Stock Position",
		"column3":globalResultsLEDReport.nredcapStockPosition,
		"column4":globalResultsLEDReport.eeslStockPosition,
		"column5":"",
		"column6":globalResultsLEDReport.totalStockPosition
	},{//Run Rate
		"column1":"2",
		"column2":"Run Rate",
		"column3":"",
		"column4":"",
		"column5":"",
		"column6":""
	}, {
		"column1":"",
		"column2":"Required Run Rate(137 Days Left)",
		"column3":globalResultsLEDReport.nredcapRunRate,
		"column4":globalResultsLEDReport.eeslRunRate,
		"column5":"",
		"column6":globalResultsLEDReport.totalRunRate
	}, {
		"column1":"",
		"column2":"Achived Run Rate",
		"column3":globalResultsLEDReport.nredcapAchievedRunRate,
		"column4":globalResultsLEDReport.eeslAchievedRunRate,
		"column5":"",
		"column6":globalResultsLEDReport.totalAchievedRunRate
	}, {
		"column1":"",
		"column2":"Teams Deployed",
		"column3":"",
		"column4":"",
		"column5":"",
		"column6":""
	}, {
		"column1":"",
		"column2":"No of Teams Required",
		"column3":globalResultsLEDReport.nredcapTeamsRequired,
		"column4":globalResultsLEDReport.eeslTeamsRequired,
		"column5":"",
		"column6":globalResultsLEDReport.totalTeamsRequired
	}, {
		"column1":"",
		"column2":"No of Teams Working",
		"column3":globalResultsLEDReport.nredcapTeamsWorking,
		"column4":globalResultsLEDReport.eeslTeamsWorking,
		"column5":"",
		"column6":globalResultsLEDReport.totalTeamsWorking
	}, {
		"column1":"",
		"column2":"GPs Completed",
		"column3":"",
		"column4":"",
		"column5":"",
		"column6":""
	}, {
		"column1":"",
		"column2":"No.of GPs",
		"column3":globalResultsLEDReport.nredcapTotalGps,
		"column4":globalResultsLEDReport.eeslTotalGps,
		"column5":"",
		"column6":globalResultsLEDReport.totalGps
	}, {
		"column1":"",
		"column2":"Completed",
		"column3":globalResultsLEDReport.nredcapCompletedGps,
		"column4":globalResultsLEDReport.eeslCompletedGps,
		"column5":"",
		"column6":globalResultsLEDReport.totalCompletedGps
	},{//CCMS
		"column1":"3",
		"column2":"CCMS",
		"column3":"",
		"column4":"",
		"column5":"",
		"column6":""
	}, {
		"column1":"",
		"column2":"Lights Connected To Dashboard",
		"column3":globalResultsLEDReport.nredcapLightsConnToDashboard,
		"column4":globalResultsLEDReport.eeslLightsConnToDashboard,
		"column5":"",
		"column6":globalResultsLEDReport.totalLightsConnToDashboard
	}, {
		"column1":"",
		"column2":"Balanced Lights to be Connected",
		"column3":globalResultsLEDReport.nredcapBalLightsToDashboard,
		"column4":globalResultsLEDReport.eeslBalLightsToDashboard,
		"column5":"",
		"column6":globalResultsLEDReport.totalBalLightsToDashboard
	}, {
		"column1":"",
		"column2":"Lights Connected Today",
		"column3":globalResultsLEDReport.nredcapLightsConnToday,
		"column4":globalResultsLEDReport.eeslLightsConnToday,
		"column5":"",
		"column6":globalResultsLEDReport.totalLightsConnToday
	}, {
		"column1":"",
		"column2":"Today Installation (Boxes)",
		"column3":globalResultsLEDReport.nredcapTodayInstallationBoxes,
		"column4":globalResultsLEDReport.eeslTodayInstallationBoxes,
		"column5":"",
		"column6":globalResultsLEDReport.totalTodayInstallationBoxes	
	}, {
		"column1":"",
		"column2":"Commulative (Boxes)",
		"column3":globalResultsLEDReport.nredcapCummulativeBoxes,
		"column4":globalResultsLEDReport.eeslCummulativeBoxes,
		"column5":"",
		"column6":globalResultsLEDReport.totalCummulativeBoxes	
	}, {
		"column1":"",
		"column2":"CCMS Boxes Stocks",
		"column3":globalResultsLEDReport.nredcapCCMSBoxesStock,
		"column4":globalResultsLEDReport.eeslCCMSBoxesStock,
		"column5":"",
		"column6":globalResultsLEDReport.totalCCMSBoxesStock		
	}];

    var pdf = new jsPDF('p','pt','a4');
	pdf.autoTable(columns,rows,{
		styles: {},
		headerStyles: {valign: 'middle',halign: 'center',fillColor: [169,169,169],lineWidth:0.8,lineColor: [128, 128, 128],textColor:10},
		bodyStyles: {lineWidth:0.8,lineColor: [128, 128, 128],textColor:10,halign: 'center'},
		columnStyles: {column2: {halign: 'left'},column1: {fillColor: [211,211,211]}},
		margin: {top: 80},
		//createdCell: function(cell, data) { if (data.column.dataKey === "columnDataKey") { { cell.styles.fillColor = [r,g,b] } } }
		//autoSize: false,
		//printHeaders: true,
		//rowMargin: 15,
		//fontSize: 8
	});
    
	pdf.fromHTML(document.getElementById('html-2-pdfwrapper'), 
		margins.left, // x coord
		margins.top,
		{
			// y coord
			width: margins.width// max width of content on PDF
		},function(dispose) {
			headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
		}, 
		margins);
    pdf.save('sample Report.pdf');  
}
function headerFooterFormatting(doc, totalPages)
{
    for(var i = totalPages; i >= 1; i--)
    {
        doc.setPage(i);                            
        //header
        header(doc);
        
        doc.page++;
    }
};

function header(doc)
{
    doc.setFontSize(10);
    doc.setFontStyle('normal');
	
    if (base64Img) {
       doc.addImage(base64Img, 'JPEG', margins.left+30, 5, 380,30);        
    }
	doc.text("Status Report On Retrofitting of LED Street Lights in Gram Panchayats", margins.left + 60, 45 );
	doc.text("(up to "+moment().format('DD-MM-YYYY')+")", margins.left + 170, 60 );
	doc.setLineCap(1);
	doc.line(2, 70, margins.width + 45,70); // horizontal line
};

// You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function imgToBase64(url, callback, imgVariable) {
 
    if (!window.FileReader) {
        callback(null);
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
			imgVariable = reader.result.replace('text/xml', 'image/jpeg');
            callback(imgVariable);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
};
 </script>
</body>
</html>