
  // set the dimensions and margins of the graph
  var margin = {top: 50, right: 50, bottom: 50, left: 40},
  width = 700 - margin.left - margin.right;
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select("#chart")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


svg1.append('text')
.attr('x', -(height / 2) - "10")
.attr('y', "-25" )
.attr('transform', 'rotate(-90)')
.attr('text-anchor', 'middle')
.text('Score')

svg1.append('text')
  .attr('x', width / 2 )
  .attr('y', "")
  .attr("font-size", "20px")
  .attr('text-anchor', 'middle')
  .text("Learner's Results")

svg1.append('text')
.attr('class', 'label')
.attr('x', width /2)
.attr('y', 600 - margin.bottom)
.attr('text-anchor', 'middle')
.text('Student ID')

// Initialize the X axis
var x = d3.scaleBand()
.range([ 0, width ])
.padding(0.2);
var xAxis = svg1.append("g")
.attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
.range([ height, 0]);
var yAxis = svg1.append("g")
.attr("class", "myYaxis")

var tooltip = d3.select("body").append("div")   
  .attr("class", "tooltip")               
  .style("opacity", 1);

// A function that create / update the plot for a given variable:
function update1(selectedScore) {

// Parse the Data
d3.csv("DATA1.csv", function(data) {

  // X axis
  x.domain(data.map(function(d) { return d.ID; }))
  xAxis.transition().duration(1000).call(d3.axisBottom(x))
  .selectAll("text")
  .attr('y',0)
  .attr("x",9)
  .attr("dy", ".35em")
  .attr("transform","rotate(90)")
  .style("text-anchor", "start")
  .style("font-stretch", "expanded")
  .style("font-family", "inherit")
  .style("font-style", "italic");

  // Add Y axis
  y.domain([0, 100]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // variable u: map data to existing bars
  var u = svg1.selectAll("rect")
    .data(data)
    .on("mouseover", function(d) {
      tooltip.text(d.ID + ", " + d[selectedScore])
      .style("opacity", 0.5)
              .style("left", (d3.event.pageX)+0 + "px") 
              .style("top", (d3.event.pageY)-0 + "px");
  })
  .on("mouseout", function(d) {
      tooltip.style("opacity", 0);
      });

  // update bars
  u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.ID); })
      .attr("y", function(d) { return y(d[selectedScore]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[selectedScore]); })
      .attr("fill", function(d) {
      if (d[selectedScore] < 45) {
      return "#ffa1b5";
      } else if (d[selectedScore] >= 45) {
      return "#c8e1cc";
      }
      })  
      .attr("stroke", function(d) {
      if (d[selectedScore] < 45) {
      return "#ff7290";
      } else if (d[selectedScore] >= 45) {
      return "#a1d99b";
      }
      })

  var sum = d3.sum(data, function(d) { return d[selectedScore]; }); 
  var average = sum/data.length;

  
  //console.log(average);  
  d3.select(".mean").remove();
  d3.select(".AverageLabel").remove();
   line= d3.line()
          .x(function(d, i) { return x(d.ID); })
          .y(function(d, i) { return y(average); })

      svg1.append("path")
      .datum(data)
      .attr("class", "mean")
      .attr("d", line)

      svg1.append("text")
          .attr("class","AverageLabel")
          .attr("transform", "translate(" + (width+3) + "," + y(average) + ")")
          .attr("dy", "1em")
          .attr("text-anchor", "end")
          .style("fill", "red")
          .html("Average = " + average.toFixed(2))


})

}

// Initialize plot
update1('Score_1')