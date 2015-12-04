
// demo of javascript being asynchronous

d3.json("nations.json", function(nations) {
  // everything in here!

  var chart_area = d3.select("#chart_area");
  var svg = chart_area.append("svg");
  var canvas = svg.append("g");
  var colScale = d3.scale.category20();

  var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
  var svg_width = 960;
  var svg_height = 350;
  var canvas_width = svg_width - margin.left - margin.right;
  var canvas_height = svg_height - margin.top - margin.bottom;

  var filtered_nations = nations.map(function(nation) { return nation; });

  var year_idx = parseInt(document.getElementById("year_slider").value)-1950;

  svg.attr("width", svg_width);
  svg.attr("height", svg_height);

  canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  // Creating an axis scale
	var xScale = d3.scale.log();

	xScale.domain([250, 1e5]);                 // minimum and maximum values
	xScale.range([0, canvas_width]); // min and max on the canvas

	// create the x-axis

	var xAxis = d3.svg.axis().orient("bottom").scale(xScale);

	// Add to our data canvas
	canvas.append("g")
	          .attr("class","x axis")
             .attr("transform", "translate(0," + canvas_height + ")")
	       	// the transform shifts the X axis from the top of the page (position (0,0) to the bottom
	       .call(xAxis);

	// adding y-axis
  	// Creating an axis scale
	var yScale = d3.scale.linear();
	yScale.domain([0,85]);                 // minimum and maximum values
	yScale.range([canvas_height,0]); // min and max on the canvas
	// note how the position of the "0" is different to the x axis

	// create the y-axis

	var yAxis = d3.svg.axis().orient("left").scale(yScale);

	// Add to our data canvas
	canvas.append("g")
	          .attr("class","y axis")
//             .attr("transform", "translate(0," + canvas_height + ")")
	       .call(yAxis);


// exercise
//First, create a 'sqrt' scale with a minimum of 0 and a maximum of 5e8. The range should be between 0 and 40.
// circle radius represents the population

  	// Creating circle radius scale
	var rScale = d3.scale.sqrt();
	rScale.domain([0,5e8]);
	rScale.range([0,40]);




// this function looks for a change in the object of class region_cb
d3.selectAll(".region_cb").on("change", function () { 

	//console.log(this)
	// this shows all the details of the object in console.log

	//console.log(this.name)
	// this shows just one property of the object

	var type = this.value;

	if (this.checked) { // adding data points 
  var new_nations = nations.filter(function(nation){ return nation.region == type;});

  filtered_nations = filtered_nations.concat(new_nations);
}  else { //removing data points

	filtered_nations = filtered_nations.filter(function(nation){
			return nation.region != type;});

}

update(year_idx)
	})

	d3.select("#year_slider").on("input", function () {
	   //console.log(this.value);
	   year_idx = parseInt(this.value) - 1950;
	   update(year_idx);
	});

	 // Now creating the Data Canvas
	 var data_canvas = canvas.append("g")
  			.attr("class", "data_canvas");

update(year_idx);


function update(idx){
	var dot = data_canvas.selectAll(".dot")
  			.data(filtered_nations, function(d){return d.name});
  	// now if we replace the "nations" with the "filtered nations" variable it will display just the filtered nations


	dot.enter().append("circle").attr("class","dot")
		  .style("fill",function(d){
	  		return colScale(d.region)
		  });

	dot.transition().ease("linear").duration(200)
	  .attr("cx", function(d) { return xScale(d.income[idx]); }) 
	  .attr("cy", function(d) { return yScale(d.lifeExpectancy[idx]); })
	  .attr("r", function(d) {return rScale(d.population[idx]);  })

	dot.exit().remove()
}


});
