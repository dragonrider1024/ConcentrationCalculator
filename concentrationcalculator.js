/* javascript for calculating molecular concentration from Chemical Ionization
mass spectrometry Data

CopyRight Wen Xu @ Aerodyne Research, Inc */

function cleartable() {
	$("input").val("");
}

function changeReagentIon() {
	var $reagentIon = $("#ri").val();
	if($reagentIon === "1" || $reagentIon === "2") {
		$("#dcl").text("Drift Tube Voltage");
	}
	else {
		$("#dcl").text("Corona Discharge Voltage");
	}
}

function calculate() {
	var dtp = $("#dtp").val();
	var dtv = $("#dtv").val();
	var rii = $("#rii").val();
	var si = $("#si").val();
	var mzt = $("#mzt").val();
	var dter = $("#dter").val();
	var cdv = dtv;
	var kconst = 2.0e-9;
	var mobility;
	var flow;
	var voltage;
	var ElecField;
	var driftVelocity, flowVelocity, totalVelocity;
	var driftTime, conc, enratio;
	if($("#ri").val() === "1" || $("#ri").val() === "2") {
		mobility = 1.88;
		voltage = dtv;
		flow = 2040.0;
	}
	else {
		mobility = 2.8;
		voltage = cdv * 14.0 / (14.0 + 2.0);
		flow = 2320.0;
	}
	mobility = mobility * 765.0 / dtp * 295.0 / 300.0;
    ElecField = voltage / 14.0;
    driftVelocity = ElecField * mobility;
    flowVelocity = flow * 765.0 / dtp * 295.0 / 298.0 / (3.1415926 * 1.40 * 1.40) /60.0;
    totalVelocity = driftVelocity + flowVelocity;
    driftTime = 14.0 / totalVelocity;
    conc = si / rii / 1000000.0 / driftTime / kconst;
    conc = conc * 765.0 / dtp * 295.0 / (mzt + 273.15);
    conc = conc / (2.47E19 * 273.15 / (273.15 + mzt)) * 1E12;
    enratio = ElecField / (2.47E19 * 273.15 / (273.15 + mzt) * dtp / 765.0) * 1E17;
    $("#c").val(conc);
    $("#td").val(enratio);
}
$("#cls").click(cleartable);
$("#cal").click(calculate);
$("#ri").change(changeReagentIon);
