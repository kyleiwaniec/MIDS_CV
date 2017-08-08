var width = 1240,
    height = 300,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 12;
    color = d3.scale.ordinal()
      .domain(["Computer Science", 
              "Data Science", 
              "Art",
              "Graphic Design",
              "Business"])
      .range(['#0188ba',
            '#ddfd02',
            '#421789',
            '#07904e',
            '#cccccc']);


      var tree = {
        "name": "Skills",
        "children": [{
          "name": "Computer Science",
          "children": [{
              "name": "Linux",
              "value": 3
            },{
              "name": "Java",
              "value": 2
            },{
              "name": "Grails",
              "value": 1
            },{
              "name": "Javascript",
              "value": 15
            },{
              "name": "jQuery",
              "value": 5
            },{
              "name": "Angular",
              "value": 5
            },{
              "name": "Backbone",
              "value": 2
            },{
              "name": "CSS",
              "value": 5
            },{
              "name": "HTML",
              "value": 5
            }]
          },{
            "name": "Graphic Design",
            "children": [{
              "name": "Photoshop",
              "value": 15
            }]
          },{
            "name": "Art",
            "children": [{
              "name": "Painting",
              "value": 10
            }]
          }, {
            "name": "Data Science",
            "children": [{
              "name": "Statistics",
              "value": 2
            }, {
              "name": "Research Design",
              "value": 4
            },{
              "name": "Machine Learning",
              "value": 2
            },{
              "name": "R",
              "value": 2
            },{
              "name": "Python",
              "value": 2
            },{
              "name": "Hadoop",
              "value": 2
            },{
              "name": "SQL",
              "value": 2
            },{
              "name": "Spark",
              "value": 2
            }]
          }]
              }       

      var flattree = [];
      var sizes = [];

      for(var h = 0; h < tree.children.length; h++){
          var c = tree.children[h];
          for(var j = 0; j < c.children.length; j++){
            flattree.push({
              "cluster": h, 
              "name": c.children[j].name, 
              "cat" : c.name,
              "radius" : Math.log(c.children[j].value),
              "x": Math.cos(h / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
              "y": Math.sin(h / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
            })
            sizes.push(c.children[j].value)
          }
          
        }


      function zscore(arr,val){
        return Math.abs((val - arr.mean())/arr.stdDev())
      }


      var n = flattree.length; // total number of nodes
      var m = tree.children.length; // number of distinct clusters

      var clusters = new Array(m);

      var nodes = flattree.map(function(item) {

        var i = item.cluster,
            r = item.radius * maxRadius,
            d = {
              name:item.name,
              cat:item.cat,
              cluster: i,
              radius: r,
              x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
              y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
            };
        if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
        return d;
      });

      var force = d3.layout.force()
          .nodes(nodes)
          .size([width, height])
          .gravity(.02)
          .charge(0)
          .on("tick", tick)
          .start();

      var svg = d3.select("#bubbles").append("svg")
          .attr("width", width)
          .attr("height", height);

      var node = svg.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          
          node.append("circle")
            .style("fill", function(d) { console.log("cat",d.cat);return color(d.cat); })
            .call(force.drag)
            .transition()
              .duration(0)
              .delay(function(d, i) { return i * 0; })
              .attrTween("r", function(d) {
                var i = d3.interpolate(0, d.radius);
                return function(t) { return d.radius = i(t); };
              });
          node.append("title")
              .text(function(d) { return d.name; });


      function tick(e) {
        node.select("circle")
            .each(cluster(10 * e.alpha * e.alpha))
            .each(collide(.5))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        node.select("text")
            .each(cluster(10 * e.alpha * e.alpha))
            .each(collide(.5))
            .attr("dx", function(d) { return d.x; })
            .attr("dy", function(d) { return d.y; });    
      }

      // Move d to be adjacent to the cluster node.
      function cluster(alpha) {
        return function(d) {
          var cluster = clusters[d.cluster];
          if (cluster === d) return;
          var x = d.x - cluster.x,
              y = d.y - cluster.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + cluster.radius;
          if (l != r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            cluster.x += x;
            cluster.y += y;
          }
        };
      }

      // Resolves collisions between d and all other circles.
      function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {
          var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
              nx1 = d.x - r,
              nx2 = d.x + r,
              ny1 = d.y - r,
              ny2 = d.y + r;
          quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
              var x = d.x - quad.point.x,
                  y = d.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
              if (l < r) {
                l = (l - r) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
              }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
          });
        };
      }
      /***************************************************************
      var legend_data = tree.children.filter(function(d,i){  
        return d.children;
      });


      var legend = svg.append("g")
              .attr("class", "legend")
              .selectAll("g")
              .data(legend_data)
              .enter()
                  .append("g")
                  .attr("transform", function(d,i){
                      return "translate(" + 20 + "," + (i*20+10) + ")"; 
                    })

          // Draw rects, and color them by original_index
          legend.append("circle")
              .attr("r", 5)
              .style("fill", function(d,i){return color(d.name)});

          legend.append("text")
              .attr("x", function(d,i){ return 20;})
              .attr("dy", "0.40em")
              .text(function(d,i){return d.name;})
              .attr("font-family", "'Roboto',sans-serif")    
      //***************************************************************/ 
