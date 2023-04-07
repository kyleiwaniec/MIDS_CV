function makeplot(feature,patient,chart) {

  // if (feature.constructor !== Array){}

  if(feature.format === 'csv'){
    getCSV(feature.files);
  }else{
    getJSON(feature.files);
  }


  var plotDiv = document.getElementById("plot");
  var layout = {
    // title: feature,
    titlefont: {
      family: 'Oxygen',
      size: 18,
      color: '#244954'
    },
    font:{
      size:10,
      family:"Oxygen"
    },
    margin: {
        l: 40,
        r: 0,
        b: 70,
        t: 10,
        pad: 0
    },
    legend:{
      font:{
        size:14
      },
      orientation:'h',
      xanchor:"center",
      yanchor:"top",
      y:-0.15, 
      x:0.5  
    },
    shapes: [
      {
        type: 'rect',
        // // x-reference is assigned to the x-values
        // xref: 'x',
        // // y-reference is assigned to the plot paper [0,1]
        // yref: 'paper',
        x0: patients[patient].duration[0],
        y0: chart.normalRange[0],
        x1: patients[patient].duration[1],
        y1: chart.normalRange[1],
        fillcolor: '#d4ebeb',
        opacity: 0.3,
        line: {
            width: 0
        }
      }
    ],
    xaxis: {
      title:'Hour',
      showgrid: false,
      // zeroline: false,
      //zerolinecolor:'#444',
      type:'date',
      range:patients[patient].duration,
      dtick:3600000*2,
      ticks:'outside',
      tickformat:'%H',
      hoverformat:'%m/%d %H:%M'
    },
    yaxis:{
      title:chart.title,
      rangemode:'tozero',
      range:chart._yrange
    },
    barmode: 'relative'
   // barmode: 'group'
  };

  

  var traces = [];
  var colors = ['#66cccc','#ff5252','#ff0055','#0c678a'];

  Plotly.newPlot('plotly', traces, layout,{displayModeBar: false});


  function getCSV(feature){
    for(var f=0; f < feature.length; f++){

     (function(i){
        Plotly.d3.csv(ENV+"data/"+feature[i]+"_"+patient+".csv", function(data){
          var reverse = false;
          if(feature[i] === 'sum_by_hour_all_outputs'){
            reverse = true;
          }
          processCSV(data,featureDict[feature[i]],colors[i],reverse);
        });
     })(f);

    }
  }

  function processCSV(allRows,name,color,reverse) {
    var x = [], y = [];

    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['time'] );
      y.push( row['value'] );
    }
    trace = {
      x: x.map(toDate),
      y: reverse ? y.map(reverse_fn) : y,
      name: name,
      mode: 'lines+markers',
      type: chart._type,
      marker:{
        color:color
      }
    }
    Plotly.addTraces('plotly',  trace);
  }
  

  function getJSON(feature){
    Plotly.d3.json(ENV+"data/"+feature[0]+"_"+patient+".json", function(data){
      var allRows = [];
      var c = 0;
      for(key in data){
        if(data[key].length){

          if(feature[0] == 'Neurochecks'){
            processNeurochecks(key,data[key],colors[c]);
          }else if(feature[0] == "Pressure_drugs_nitro"){
            processDrugs(key,data[key],colors[c]);
          }
          c++;
        }
      }
      
    })
  }


  function processNeurochecks(name,allRows,color){
    var x = [], y = [];
    for (var i = 0; i < allRows.length; i++) {
      row = allRows[i];
      x.push( row['charttime'] );
      y.push( row['valuenum'] );
    }

    trace = {
      x: x.map(toDate),
      y: y,
      name: name,
      mode: 'lines',
      type: chart._type,
      marker:{
        color:color
      }
      // ,line: {shape: 'spline'} //step function
    };

    Plotly.addTraces('plotly', trace);
  }

  function processDrugs(name,allRows,color) {
    
    var x = [], y = [];

    for (var i = 0; i < allRows.length; i++) {
      row = allRows[i];
      x.push( row['starttime'] );
      y.push( 0 );
      x.push( row['starttime'] );
      y.push( row['amount'] );

      x.push( row['endtime'] );
      y.push( row['amount'] );
      x.push( row['endtime'] );
      y.push( 0 );
    }
    
    trace = {
      x: x.map(toDate),
      y: y,
      name: name,
      mode: 'lines',
      type: chart._type,
      marker:{
        color:color
      }
      ,line: {shape: 'hv'} //step function
    };

    Plotly.addTraces('plotly', trace);
  };


  function reverse_fn(d){
    return -d;
  }
 

  function toDate(s) {
    // Date.parse("06 Apr 2112 16:00:00")
    // Date.parse("4/3/2112 16:00")
    // Date.parse(5428202640000)

    // input: < "2112-04-03 16:34:00" | "4/3/2112 16:00" | 5428202640000 >

    if(typeof s === 'string'){
        var ds = s.split('-');
      if(ds.length > 1){
        var ds2 = ds[2].split(' ');
        s = ds[1]+"/"+ds2[0]+"/"+ds[0]+" "+ds2[1];
      }
    }
  

    return new Date(s);
  }

 
  

};
