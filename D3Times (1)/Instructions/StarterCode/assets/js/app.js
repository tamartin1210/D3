// @TODO: YOUR CODE HERE!
// log the data 
var svgWidth = 960;
var svgHeight = 500;
var margin = {top:20, right: 40, bottom:60, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create an svg wrapper
var svg = d3.select('#scatter')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
var scatter = svg.append("g");

// append a div to the body to create tooltips
d3.select("#scatter").append("div").attr("class","tooltip").style("opacity",0);
// create scale functions


d3.csv("./assets/data/data.csv").then((healthData) => {
   
    healthData.forEach(function(data){
        data.healthcare = +data.healthcare
        data.poverty = +data.poverty
        console.log(data)
        
    })
    var yLinearScale = d3.scaleLinear().range([height,0]);
    var xLinearScale = d3.scaleLinear().range([0,width]);
    // create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // scale the domain
    var xMin;
    var xMax;
    var yMin;
    var yMax;
    xMin = d3.min(healthData,function(data){
        return +data.poverty * 0.95;

    })
    xMax = d3.max(healthData , function(data){
        return +data.poverty * 1.05;
    });
    yMin = d3.min(healthData, function(data){
        return +data.healthcare * 0.98;
    })
    yMax = d3.max(healthData, function(data){
        return +data.healthcare * 1.02
    })
    xLinearScale.domain([xMin, xMax])
    yLinearScale.domain([yMin, yMax])

    // initialize tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(data){
            var stateName = data.state;
            var pov = +data.poverty;
            var healthcare = +data.healthcare;
            return(
                stateName + '<br> Poverty: ' + pov + '% <br> Healthcare: ' + healthcare + '%'
            );
        })
    // create tooltip
    scatter

.call(toolTip);
    scatter

.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", function(data, index){
            return  xLinearScale(data.poverty)
        })
        .attr("cy", function(data, index){
            return yLinearScale(data.healthcare)
        })
        .attr("r", "11")
        .attr("fill", "red")
        .on("mouseover", function(data){
            toolTip.show(data, this);
        })
        .on("mouseout", function(data, index){
            toolTip.hide(data);
        })
    scatter

.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
            .attr("x", function(data){
                return xLinearScale(data.poverty - 0);

            })
            .attr("y", function(data){
                return yLinearScale(data.healthcare - 0.2)
            })
            .text(function(data){
                return data.abbr
            });
    scatter

.append("g")
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis)
    scatter

.append("g").call(leftAxis);
    scatter

.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-margin.left + 40)
        .attr("x", 0- height/2)
        .attr("dy", "1em")
        .attr("class", "axis-text")
        .text("Healthcare (%)")
    scatter

.append("text")
        .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 30) +")")
        .attr("class", "axis-text")
        .text("In Poverty(%)");
    });

// set up the scatter


    