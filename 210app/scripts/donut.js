function makeDonuts(patient){

  var plots = Object.keys(patient.probalities)
  var plots = ['HOME']

  var donut_layout = {
    margin: {
        l: 40,
        r: 40,
        b: 0,
        t: 0,
        pad: 0
    },
    height: 150,
    width: 200,
    showlegend: false,
    annotations: [
      {
        font: {
          size: 38,
          family:"PT Sans Narrow"
        },
        showarrow: false,
        text: (patient.probalities[plots[0]][0] * 100).toFixed(0) +"%",
        x: 0.25,
        y: 0.5
      }
    ]
  };

  for(var i = 0; i<plots.length; i++){

    var donut_data = [{
      values: patient.probalities[plots[i]],
      labels: ['yes','no'],
      domain: {
        x: [0, 1]
      },
      hoverinfo: 'none',
      textinfo:'none',
      hole: .8,
      type: 'pie',
      marker: {
        colors: ["#ff5252","#cccccc"]
      }
    }];


    Plotly.newPlot(plots[i], donut_data, donut_layout, {displayModeBar: false});
  }

}
