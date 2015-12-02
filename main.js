
// demo of javascript being asynchronous

d3.json("nations.json", function(nations) {
  // everything in here!

  var chart_area = d3.select("#chart_area");
  var svg = chart_area.append("svg");
  var canvas = svg.append("g");


  var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
  var svg_width = 960;
  var svg_height = 350;
  var canvas_width = svg_width - margin.left - margin.right;
  var canvas_height = svg_width - margin.top - margin.bottom;

  svg.attr("width", svg_width);
  svg.attr("height", svg_height);

  canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // adding a circle
  var circle = canvas.append("circle");

  circle.attr("cx",50);
  circle.attr("cy",50);
  circle.attr("r",40);
  circle.attr("stroke","black");
  circle.attr("stroke-width",5);
  circle.attr("fill","green");
  
});