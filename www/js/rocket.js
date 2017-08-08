var w = 1240,
    h = 800,
    bottomOffset = 10;

// create canvas
var svg = d3.select("#viz").append("svg:svg")
    .attr("class", "chart")
    .attr("width", w)
    .attr("height", h )
    .append("svg:g")
    .attr("transform", "translate(0,600)");


////////////////////////////////////////////////////////////
// DATA 
////////////////////////////////////////////////////////////

var startDate = 1994;
var endDate = 2018;
m = endDate - startDate;

// TODO: Use a JSON object not matrix, so that the remapped function will not be necessary
var matrix = [
    [ 1994,  0, 0, 0, 0, 0], // all zeros so we can draw the triangles instead
    [ 2001, 50, 0, 30, 20, 0],
    [ 2004, 50, 0, 25, 25, 0],
    [ 2009, 50, 0, 20, 30, 0],
    [ 2012, 0, 0, 0, 100, 0],
    [ 2013, 0, 0, 0, 100, 0],
    [ 2015, 0, 0, 50, 25, 25],
    [ 2017, 0, 0, 25, 25, 50]
];
var years = matrix.map(function(list){
    return list[0]
})

var cvData = {
    'experience':[
        {
            'year':1994,
            'title':'Designer/Artist',
            'company':'Freelance'
        },
        {
            'year':2001,
            'title':'Principal',
            'company':'Hamilton Thomas Design, LLC'
        },
        {
            'year':2004,
            'title':'Creative Director',
            'company':'Princeton Internet Group'
        },
        {
            'year':2009,
            'title':'Web Developer',
            'company':'Freelance'
        },
        {
            'year':2012,
            'title':'Front-end Web Developer',
            'company':'Advance Digital'
        },
        {
            'year':2013,
            'title':'Software Engineer',
            'company':'SnapOne, INC'
        },
        {
            'year':2015,
            'title':'Chief Innovation & Data Officer',
            'company':'iQ4'
        },
        {
            'year':2017,
            'title':'Lecturer - Machine Learning @Scale',
            'company':'UC Berkeley'
        }
    ],
    'education':[
        {
            'year':1994,
            'college':'The Cooper Union',
            'degree':'Bachelor of Fine Art'
        },
        {
            'year':2014,
            'college':'MCCC',
            'degree':'Computer Science Certificate'
        },
        {
            'year':2017,
            'college':'University of California, Berkeley',
            'degree':'Master of Information and Data Science'
        }
    ]
}

//console.log("REMAP---------------------------");
var remapped =[1,1,1,1,1].map(function(dat,i){
    return matrix.map(function(d,ii){

        if (ii < matrix.length-1){
            return {
                x: ii, 
                y: d[i+1], 
                w: matrix[ii+1][0] - matrix[ii][0] 
            };
        }else{
            return {
                x: ii, 
                y: d[i+1], 
                w: endDate - matrix[ii][0]
            };
        }
        
    })
});
console.log("remapped",remapped)

//console.log("LAYOUT---------------------------");
var stacked = d3.layout.stack()(remapped)

for(var i = 0; i < stacked.length; i++){
    stacked[i][0].offset = 0
    for(var j = 1; j < stacked[i].length; j++){
        stacked[i][j].offset = stacked[i][j-1].w + stacked[i][j-1].offset
    }
}
console.log("stacked",stacked)


////////////////////////////////////////////////////////////
// Make Dates Axis 
////////////////////////////////////////////////////////////

//var dates = [1994,1996,1998,2000,2002,2004,2006,2008,2010,2012,2014,2016]; 
var xScale = d3.scale.linear()
    .domain([startDate, endDate])
    .range([0,w]); // domain takes bounds as arguments, not all numbers
    //xScale.domain() // [-2.347, 7.431];
    //xScale.nice() // [-3, 8]

var xAxis = d3.svg.axis()
    .orient("bottom") // default
    .scale(xScale)
    .tickSize(0, 0)
    .tickFormat(d3.format("d"));

svg.append("svg:g")
    .attr("class", "dategroup")
    .attr("fill","#666")
    .call(xAxis)

////////////////////////////////////////////////////////////
var clr_data    ="#ddfd02";
var clr_code    ="#0188ba";
var clr_business="#cccccc";
var clr_design  ="#07904e";
var clr_art     ="#421789";

x = d3.scale.ordinal().rangeRoundBands([0, w]);
y = d3.scale.linear().range([0, 100]);
z = d3.scale.ordinal().range(["#cccccc", "#421789", "#07904e", "#0188ba", "#ddfd02"]);

x.domain(stacked[0].map(function(d) { return d.x; }));
y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);
//y.domain([0, 0]);

// show the domains of the scales              
console.log("x.domain(): " + x.domain())
console.log("xScale.domain(): " + xScale.domain())
console.log("xScale.range(): " + xScale.range())
console.log("y.domain(): " + y.domain())
console.log("------------------------------------------------------------------");




// Make a triangle for the first date group

// var trianglePoints = xScale(3) + ' ' + yScale(18) + ', ' + xScale(1) + ' ' + yScale(0) + ', ' + xScale(12) + ' ' + yScale(3) + ' ' + xScale(12) + ', ' + yScale(3) + ' ' + xScale(3) + ' ' + yScale(18);

// svg.append('polyline')
//     .attr('points', trianglePoints)
//     .style('stroke', 'blue');


////////////////////////////////////////////////////////////
// Make lines and circles
////////////////////////////////////////////////////////////
var linegroup = svg.append('g')
    .attr('class','linegroup')

var v_line = linegroup.selectAll('line')
    .data(years)
    .enter().append("line")
    .attr("x1", function(d,i) { 
        if(years[i+1]){
            return (xScale(d) + xScale(years[i+1]))/2
        }else{
            return (xScale(d) + xScale(endDate))/2
        }
    })
    .attr("x2", function(d,i) { 
        if(years[i+1]){
            return (xScale(d) + xScale(years[i+1]))/2
        }else{
            return (xScale(d) + xScale(endDate))/2
        }
    })
    .attr("y1", function(d) { return - bottomOffset; })
    .attr("y2", function(d,i) { return - (Math.pow(i,3)+150); })
    .attr("stroke-width", 2)
    .attr("stroke", "#cccccc");    

var linegroup2 = svg.append('g')
    .attr('class','linegroup2')
var edu_line = linegroup2.selectAll('line')
    .data(cvData.education)
    .enter().append('line')
    .attr({
        'x1':function(d){
            return xScale(d.year)
        },
        'x2':function(d){
            return xScale(d.year)
        },
        "y1": function(d) { return 30; },
        "y2": function(d,i) { return i%2==0 ? 80 : 140; },
        "stroke-dasharray": ("4, 4"),
        'stroke':'#cccccc',
        'stroke-width':4
    })

var small_circle = linegroup.selectAll('circle')
    .data(years)
    .enter().append("svg:circle")    
    .attr("cx", function(d,i) { 
        if(years[i+1]){
            return (xScale(d) + xScale(years[i+1]))/2
        }else{
            return (xScale(d) + xScale(endDate))/2
        }
    })
    .attr("cy", function(d,i) { return - (Math.pow(i,3)+150); })
    .attr("r", 5)
    .style("fill", "#cccccc");

////////////////////////////////////////////////////////////
// Experience text
////////////////////////////////////////////////////////////
var textgroup = svg.append('g')
    .attr('class','textgroup')

var fo = svg.selectAll('textgroup')
    .data(cvData.experience)
    .enter().append('foreignObject')
    .attr({
        'x': function(d,i) { 
            if(cvData.experience[i+1]){
                return ((xScale(d.year) + xScale(cvData.experience[i+1].year))/2)-150
            }else{
                return ((xScale(d.year) + xScale(endDate))/2)-150
            }
        },
        'y': function(d,i) { return - (Math.pow(i,3)+200); },
        'width': 300,
        'height':50,
        'class': 'svg-tooltip'
    });

var exp_div = fo.append('xhtml:div')
    .attr('class','annotaion')
    exp_div.append('p').append('span')
    .attr('class', 'job-title')
    .html(function(d){return d.title})
    exp_div.append('p').append('span')
    .attr('class', 'company-name')
    .html(function(d){return d.company});

////////////////////////////////////////////////////////////
// Education text
////////////////////////////////////////////////////////////
var educationgroup = svg.append('g')
    .attr('class','educationgroup')
var edu_fo = svg.selectAll('educationgroup')
    .data(cvData.education)
    .enter().append('foreignObject')
    .attr({
        'x': function(d,i) { return xScale(d.year)-200},
        'y': function(d,i) { return i%2==0 ? 80 : 140; },
        'width': 400,
        'height':50,
    })

var edu_div = edu_fo.append('xhtml:div')
    .attr('class','annotaion')
    edu_div.append('p').append('span')
    .attr('class', 'job-title')
    .html(function(d){return d.degree})
    edu_div.append('p').append('span')
    .attr('class', 'company-name')
    .html(function(d){return d.college});


////////////////////////////////////////////////////////////
// Make rectangles
////////////////////////////////////////////////////////////

// Add a group for each column.
var valgroup = svg.selectAll("g.valgroup")
    .data(stacked)
    .enter().append("svg:g")
    .attr("class", "valgroup")
    .style("fill", function(d, i) { return z(i); })
    .style("stroke", 0);
//.attr("stroke-width", 1);
// Add a rect for each date.
var rect = valgroup.selectAll("rect")
    .data(function(d){return d;})
    .enter().append("svg:rect")
    .attr("x", function(d) { return d.offset/m * (w)})
    .attr("y", function(d) { return (-y(d.y0) - y(d.y)) - bottomOffset; }) // -20 raises the whole chart
    .attr("height", function(d) { return y(d.y); })
    .attr("width", function(d) {
        return d.w/m * (w) - 1; // -1 makes space between sections
    })
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
// Make triangles
////////////////////////////////////////////////////////////
var triangle1 = svg.append('path')
    .attr('fill','#421789')
    .attr('d', function(d,i) { 
        return 'M'+ 0 +' '+ -bottomOffset + 'l' + xScale(2001)/2 +' '+ -50 + 'l' + ((xScale(2001)/2)-1)  +' '+ 0 + 'l' + 0 +' '+ 50 +'z'; 
  });
var triangle2 = svg.append('path')
    .attr('fill','#07904e')
    .attr('d', function(d,i) { 
        return 'M'+ xScale(2001)/2 +' '+ -(bottomOffset+50) + 'l' + ((xScale(2001)/2)-1)  +' '+ -50 + 'l' + 0 +' '+ 50 +'z'; 
  });
var triangle2 = svg.append('path')
    .attr('fill','#000000')
    .attr('opacity',0.2)
    .attr('d', function(d,i) { 
        return 'M'+ xScale(2010) +' '+ -bottomOffset + 'l' + (xScale(2018)-xScale(2010))  +' '+ -100 + 'l' + 0 +' '+ 100 +'z'; 
  });    

////////////////////////////////////////////////////////////


