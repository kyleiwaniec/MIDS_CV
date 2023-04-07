var discharge_data = [
	{"from":"DOC","size":94,"to":"AMA"},
	{"from":"DOC","size":1553,"to":"DEAD"},
	{"from":"DOC","size":10835,"to":"HOME"},
	{"from":"DOC","size":193,"to":"HOSPICE"},
	{"from":"DOC","size":3170,"to":"HOSPITAL"},
	{"from":"DOC","size":11368,"to":"LTC"},
	{"from":"ER","size":253,"to":"AMA"},
	{"from":"ER","size":3091,"to":"DEAD"},
	{"from":"ER","size":6130,"to":"HOME"},
	{"from":"ER","size":265,"to":"HOSPICE"},
	{"from":"ER","size":4324,"to":"HOSPITAL"},
	{"from":"ER","size":8691,"to":"LTC"},
	{"from":"HOSPITAL","size":18,"to":"AMA"},
	{"from":"HOSPITAL","size":1156,"to":"DEAD"},
	{"from":"HOSPITAL","size":1829,"to":"HOME"},
	{"from":"HOSPITAL","size":94,"to":"HOSPICE"},
	{"from":"HOSPITAL","size":1635,"to":"HOSPITAL"},
	{"from":"HOSPITAL","size":3800,"to":"LTC"},
	{"from":"LTC","size":51,"to":"DEAD"},
	{"from":"LTC","size":5,"to":"HOME"},
	{"from":"LTC","size":3,"to":"HOSPICE"},
	{"from":"LTC","size":51,"to":"HOSPITAL"},
	{"from":"LTC","size":163,"to":"LTC"},
	{"from":"NA","size":3,"to":"DEAD"},
	{"from":"NA","size":163,"to":"HOME"},
	{"from":"NA","size":19,"to":"HOSPITAL"},
	{"from":"NA","size":19,"to":"LTC"}
];

var icu_data = [
	{"from":"CCU","size":6714,"to":"CCU"},
    {"from":"CSRU","size":270,"to":"CCU"},
    {"from":"MICU","size":281,"to":"CCU"},
    {"from":"SICU","size":74,"to":"CCU"},
    {"from":"TSICU","size":67,"to":"CCU"},
    {"from":"CCU","size":479,"to":"CSRU"},
    {"from":"CSRU","size":8759,"to":"CSRU"},
    {"from":"MICU","size":89,"to":"CSRU"},
    {"from":"SICU","size":40,"to":"CSRU"},
    {"from":"TSICU","size":25,"to":"CSRU"},
    {"from":"CCU","size":399,"to":"MICU"},
    {"from":"CSRU","size":142,"to":"MICU"},
    {"from":"MICU","size":20080,"to":"MICU"},
    {"from":"SICU","size":374,"to":"MICU"},
    {"from":"TSICU","size":315,"to":"MICU"},
    {"from":"NICU","size":8100,"to":"NICU"},
    {"from":"CCU","size":92,"to":"SICU"},
    {"from":"CSRU","size":103,"to":"SICU"},
    {"from":"MICU","size":456,"to":"SICU"},
    {"from":"SICU","size":8300,"to":"SICU"},
    {"from":"TSICU","size":262,"to":"SICU"},
    {"from":"CCU","size":42,"to":"TSICU"},
    {"from":"CSRU","size":38,"to":"TSICU"},
    {"from":"MICU","size":182,"to":"TSICU"},
    {"from":"SICU","size":103,"to":"TSICU"},
    {"from":"TSICU","size":5746,"to":"TSICU"}
]

function gettotals(data){
	var from_table = {};
	var to_table = {};
	var max = 0;

	for(var i = 0; i < data.length;  i++){
		if(from_table[data[i].from] === undefined){
			from_table[data[i].from] = data[i]['size'];
		}else{
			from_table[data[i].from] += data[i]['size'];
			if(from_table[data[i].from] > max){
				max = from_table[data[i].from];
			}
		}

		if(to_table[data[i].to] === undefined){
			to_table[data[i].to] = data[i]['size'];
		}else{
			to_table[data[i].to] += data[i]['size']
			if(to_table[data[i].to] > max){
				max = to_table[data[i].to];
			}
		}
	}
	return [from_table,to_table,max];
}

var graph_height = $(".discharge-graph").height();
var totals = gettotals(discharge_data);
var global_max = totals[2];
var barwidth = 36;

function writeHTML(arr){
	var from = arr[0];
	var to = arr[1];
	var from_fragment = "", to_fragment = "";
	var i=0;
	var offset=0;

	for(key in from){
		offset=i*barwidth;
		console.log('from[key]',from[key],global_max)
		from_fragment += "<li style='height:"+(from[key]/global_max)*100+"%; left:"+offset+"px' id='from_"+key+"'><span>"+key+"</span></li>";
		i++;
	}
	offset = 0;
	i = 0;
	for(key in to){
		offset=i*barwidth;
		to_fragment += "<li style='height:"+(to[key]/global_max)*100+"%; left:"+offset+"px' id='to_"+key+"'><span>"+key+"</span></li>";
		i++;
	}
	return [from_fragment,to_fragment,(offset+barwidth)];
}

var list = writeHTML(totals);

$(".discharge-wrapper").css({"width":list[2]});

$("#admitted_from ul").html(list[0]);
$("#discharged_to ul").html(list[1]);


$("#admitted_from ul li").on({ 
	'mouseenter': function(){
		var id = $(this).attr('id').split("_")[1];
		getDistribution(id,'from');
	},
	'mouseleave':function(){
		$(".dist").detach();
	}
})

$("#discharged_to ul li").on({ 
	'mouseenter': function(){
		var id = $(this).attr('id').split("_")[1];
		getDistribution(id,'to');
	},
	'mouseleave':function(){
		$(".dist").detach();
	}
})

function getDistribution(id,direction){
	var opp_direction = direction=='from'?'to':'from';
	var frag = "";
	var offset = 0;
	var j = 0;

	for(var i=0;i < discharge_data.length;i++){

		if(discharge_data[i][direction] == id){
			var h = (($("#"+opp_direction+"_"+discharge_data[i][opp_direction]).height()) / graph_height );	
			offset=j*barwidth;
			frag = "<li class='dist' style='background-color:#ff5252; bottom:-2px; left:-2px; height:"+((discharge_data[i].size/global_max)/h)*100+"%;'></li>";
			j++;
			$("#"+opp_direction+"_"+discharge_data[i][opp_direction]).append(frag);
		}
	}
	return frag;
}

