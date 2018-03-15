import React from "react";
import * as d3 from "d3";

export default class Minibar extends React.Component {
  componentDidMount() {
    this.draw();
  }

  componentWillUpdate() {
    this.draw();
  }

  draw = () => {
    let data = [...this.props.data];
    data.sort((a, b) => a.value - b.value);

    let svg = d3.select(this.svg);
    let margin = { top: 10, right: 10, bottom: 10, left: 100 };
    let width = svg.attr("width") - margin.left - margin.right;
    let height = svg.attr("height") - margin.top - margin.bottom;
    
    svg.selectAll('g').remove();
    
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define x axis
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .rangeRound([0, width]);

    // define y axis
    let y = d3
      .scaleBand()
      .rangeRound([height, 0])
      .padding(0.2)
      .domain(data.map(d => d.text));

    // y.domain([0, data.map(d => d.text)]);

    //append y axis to svg
    g
      .append("g")
      // draw axis & remove ticks on axis
      .call(d3.axisLeft(y).tickSize(0))
      // set axis font
      .attr("font-size", "0.9rem")
      // hide y axis line
      .selectAll("path")
      .attr("stroke", "transparent");

    //append bars
    g
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.text))
      .attr("height", y.bandwidth())
      .style("fill", "darkred")
      .transition()
      .delay(250)
      .attr("width", d => x(d.value));
  };

  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        ref={e => (this.svg = e)}
      />
    );
  }
}
