
    var chart = d3.select("#Circle-Packing");

    var svg = chart.append("svg").attr("width", "600").attr("height", "600"),
        margin = 20,
        diameter = +svg.attr("width"),
        g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        var color = d3.scaleLinear()
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);


    var pack = d3.pack()
        .size([diameter + margin, diameter + margin])
        .padding(2);

  function createChart(root){

  root = d3.hierarchy(root)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });


  var focus = root,
      nodes = pack(root).descendants(),
      view;


  var circle = g.append("g").selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var txt = function(d) { return d.data.name; }

  var text = g.append("g").selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .text(txt)
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")")
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-5))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r*k; });
  }
}



 function update2(week){
  d3.csv("DATA1.csv", function(data){

  //Data Creation Start
    var root = {};
    var PassArray = [];
    var FailArray = [];
    var WeekResultArray = [];
    var WeekResultObj = {};
    data.forEach(d => {
      if(d[week]>=50){
          var PassArrayObj = {};
          PassArrayObj.name = d.ID;
          PassArrayObj.value = +d[week];
          PassArray.push(PassArrayObj);
      }
      if(d[week]<45){
          var FailArrayObj = {};
          FailArrayObj.name = d.ID;
          FailArrayObj.value = +d[week];
          FailArray.push(FailArrayObj);
      }
    });
    let Top5Array = PassArray
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
          Top5Array.reverse();
    PassArray = PassArray
          .sort((a, b) => b.value - a.value)
          .slice(5, PassArray.length+1);
    let Bottom5Array = FailArray
          .sort((a, b) => b.value - a.value)
          .slice(FailArray.length-5, FailArray.length);
    FailArray = FailArray
          .sort((a, b) => b.value - a.value)
          .slice(0, FailArray.length-5);
    let PassMainArray = [];
    let FailMainArray = [];
    let TopPassArrayObj = {};
    TopPassArrayObj.name = "Top 5";
    TopPassArrayObj.children = Top5Array;
    PassMainArray.push(TopPassArrayObj);
    PassArray.forEach(d => {
          var PassArrayObj = {};
          PassArrayObj.name = d.name;
          PassArrayObj.value = d.value;
          PassMainArray.push(PassArrayObj);
    });
    let BottomFailArrayObj = {};
    BottomFailArrayObj.name = "Bottom 5";
    BottomFailArrayObj.children = Bottom5Array;
    FailMainArray.push(BottomFailArrayObj);
    FailArray.forEach(d => {
          var FailArrayObj = {};
          FailArrayObj.name = d.name;
          FailArrayObj.value = d.value;
          FailMainArray.push(FailArrayObj);
    });
    var PassArrayObj = {};
    PassArrayObj.name = "PASS";
    PassArrayObj.children = PassMainArray;
    WeekResultArray.push(PassArrayObj);
    var FailArrayObj = {};
    FailArrayObj.name = "FAIL";
    FailArrayObj.children = FailMainArray;
    WeekResultArray.push(FailArrayObj);
    if(week=="Score_1"){
      WeekResultObj.name = "WEEK 1 RESULT";
      root.name = "WEEK1";
    }
    if(week=="Score_2"){
      WeekResultObj.name = "WEEK 2 RESULT";
      root.name = "WEEK2";
    }
    if(week=="Score_3"){
      WeekResultObj.name = "WEEK 3 RESULT";
      root.name = "WEEK3";
    }
    if(week=="Score_4"){
      WeekResultObj.name = "WEEK 4 RESULT";
      root.name = "WEEK4";
    }
    if(week=="Score_5"){
      WeekResultObj.name = "WEEK 5 RESULT";
      root.name = "WEEK5";
    }
    if(week=="Score_6"){
      WeekResultObj.name = "WEEK 6 RESULT";
      root.name = "WEEK6";
    }
    if(week=="Score_7"){
      WeekResultObj.name = "WEEK 7 RESULT";
      root.name = "WEEK7";
    }
    if(week=="Score_8"){
      WeekResultObj.name = "WEEK 8 RESULT";
      root.name = "WEEK8";
    }
    if(week=="Score_9"){
      WeekResultObj.name = "WEEK 9 RESULT";
      root.name = "WEEK9";
    }
    if(week=="Score_10"){
      WeekResultObj.name = "WEEK 10 RESULT";
      root.name = "WEEK10";
    }
    if(week=="Score_11"){
      WeekResultObj.name = "WEEK 11 RESULT";
      root.name = "WEEK11";
    }
    if(week=="Score_12"){
      WeekResultObj.name = "WEEK 12 RESULT";
      root.name = "WEEK12";
    }
    if(week=="Score_13"){
      WeekResultObj.name = "WEEK 13 RESULT";
      root.name = "WEEK13";
    }
    WeekResultObj.children = WeekResultArray;
    let rootChild = [];
    rootChild.push(WeekResultObj);
    root.children = rootChild;
    
    createChart(root);

    
});
}
update2("Score_1");
