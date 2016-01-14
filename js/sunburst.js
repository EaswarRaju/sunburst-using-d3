/**
 * Created by Easwar Raju on 14-Jan-16.
 */

var simpleSunburstChart = function(data, keyAttribute){
    var width = 500,
        height = 400,
        radius = (Math.min(width, height) / 2) - 10;

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    var color = d3.scale.category20();

    var partition = d3.layout.partition()
        .value(function(d) { return d[keyAttribute]; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    var svgContainer = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    svgContainer.selectAll("path")
        .data(partition.nodes(data))
        .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .attr("stroke", "white")
        .append("title")
        .text(function(d) { return d.name + "\n" + d.value; });

    return svgContainer;
};