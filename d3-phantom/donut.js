var fs = require('fs');
var d3 = require('d3');
var jsdom = require('jsdom');
var xmldom = require('xmldom');

var document = require('jsdom').jsdom();
var svg = d3.select(document.body).html('').append('svg');



var data = [4, 8, 15, 16, 23, 42].reverse();

var margin = {top: 30, right: 0, bottom: 0, left: 30},
    width = 420,
    barHeight = 20,
    height = barHeight * data.length;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .tickSize(-height);

var chart = d3.select(document.body).html('').append('chart')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("g")
    .attr("class", "bars")
  .selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("y", function(d, i) { return i * barHeight; })
    .attr("height", barHeight - 1)
    .attr("width", x)
    .attr("fill", "steelblue");

chart.append("g")
    .attr("class", "axis")
    .call(xAxis)
  .select(".tick line")
    .style("stroke", "#000")
    .attr("font-size", "70px");


var svgGraph = d3.select(document.body).select('chart')
  .attr('xmlns', 'http://www.w3.org/2000/svg');
var svgXML = (new xmldom.XMLSerializer())
                 .serializeToString(svgGraph[0][0]).toLowerCase();

fs.writeFile('chart_steelblue_bar.svg', svgXML);
