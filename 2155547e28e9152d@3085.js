// Create interactive economics charts with d3.js


function _1(md) {
  return (
    md`# Mousetrap`
  )
}

function _2(md) {
  return (
    md`# Section 1: Chart element configuration`
  )
}

function _lines(colors) {
  return (
    [
      {
        label: 'Supply',
        labelSize: "14px",
        point1: [0, 5],
        point2: [6, 10],
        color: colors.supplyRed,
        width: 4,
        moveX: true,
        moveY: false,
        ghostp1: [0, 5],
        ghostp2: [6, 10]
      },
      {
        label: 'Demand',
        labelSize: "14px",
        point1: [1, 12],
        point2: [12, 1],
        width: 4,
        moveX: true,
        moveY: true,
        ghost: true
      },
      {
        label: 'Another line',
        labelSize: "14px",
        point1: [0, 10],
        point2: [4, 1],
        color: colors.brown,
        width: 4,
        moveY: true,
      },
    ]
  )
}

function _intersectionPoints() {
  return (
    [
      {
        labels: ["Supply", "Demand"],
        isPrimary: true
      },
      {
        labels: ["Supply", "Another line"],
        isPrimary: false
      }
    ]
  )
}

function _header() {
  return (
    {
      title: "Title",
      subtitle: "subtitle lorem ipsim solor sit amet."
    }
  )
}

function _footer() {
  return (
    { text: "This is some footer text. There is just one line but it can be as long as you want." }
  )
}

function _xAxisScale(width, margin) {
  return (
    {
      title: {
        text: "Quantity",
        x: (width - margin.right),
        y: margin.bottom / 2,
        size: "13px"
      },
      subtitle: {
        text: "in units",
        x: (width - margin.right),
        y: margin.bottom / 2 + 16,
        size: "13px"
      },
      domain: [0, 13],
      range: [margin.left, width - margin.right],
      numTicks: 5,
      tickSizeOuter: 0
    }
  )
}

function _yAxisScale(margin, height) {
  return (
    {
      title: {
        text: "Price",
        x: -margin.left / 2,
        y: margin.top,
        size: "13px"
      },
      subtitle: {
        text: "per pair",
        x: -margin.left / 2,
        y: margin.top + 16,
        size: "13px"
      },
      domain: [0, 14], range: [height - margin.bottom, margin.top], numTicks: 5, tickSizeOuter: 9
    }
  )
}

function _dropLines() {
  return (
    { width: 3, dashCSS: "5,5" }
  )
}

function _measureLines() {
  return (
    { strokeWidth: 44, includeArrow: true }
  )
}

function _primaryIntersectionPoint(intersectLines, getLineByLabel) {
  return (
    intersectLines(getLineByLabel("Supply"), getLineByLabel("Demand"))
  )
}

function _annotations(width, margin) {
  return (
    [
      {
        width: 250,
        height: 200,
        x: width / 2,
        y: 200,
        html: "<p>This is an annotation that fits the width of the container. You can also use html for <strong>styles</strong> and <span style=color:blue> colors</span>.</p>",
        // 'center', 'left', 'right', or 'justify'
        align: 'right'
      },
      {
        width: 250,
        height: 200,
        x: margin.left,
        y: 200,
        html: "<p>Another note</p>",
        align: 'left'
      }
    ]
  )
}

function _lineMin() {
  return (
    0.2
  )
}

function _14(svg, lines, xAxis, yAxis, header, margin, height, getCursor, xScale, yScale, getColor, drag, appendLabels, appendAnnotations) {

  // clear old objects
  svg.selectAll("line").remove();
  svg.selectAll("g").remove();
  svg.selectAll("text").remove();

  // object to store original lines
  // save initial point of lines
  console.log(lines);


  // Append axes
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  if ('title' in header && header.title != "") {
    svg.append('text')
      .attr('x', margin.left)
      .attr('y', height / 12)
      .style('font-size', 20)
      .text(header.title)
    svg.append('text')
      .attr('x', margin.left)
      .attr('y', height / 12 + 20)
      .style('font-size', 16)
      .text(header.subtitle)
  }

  // Draw lines
  svg.selectAll("line.given").remove();
  svg.selectAll("line.given")
    .data(lines)
    .enter().append('line')
    .attr("cursor", d => getCursor(d))
    .attr('x1', d => {
      if (! 'x1' in d) {
        console.log('settings', d)
        d.originalP1 = d.point1;
        d.originalP2 = d.point2;
        d.x1 = xScale(d.point1[0]);
        d.y1 = yScale(d.point1[1]);
        d.x2 = xScale(d.point2[0]);
        d.y2 = yScale(d.point2[1]);
      }
      return xScale(d.point1[0]);
    })
    .attr('y1', d => yScale(d.point1[1]))
    .attr('x2', d => xScale(d.point2[0]))
    .attr('y2', d => yScale(d.point2[1]))
    .attr('stroke-width', d => d.width)
    .attr('stroke', d => getColor(d))
    .call(drag)

  // update svg at end of render
  update();


  function update() {
    appendLabels();
    svg.selectAll("text.annotation").remove();
    appendAnnotations();
  }

  return svg.node();
}


function _15(md) {
  return (
    md`# Section 2: Style`
  )
}

function _arrowHead() {
  return (
    {
      markerBoxWidth: 4,
      markerBoxHeight: 4,
      refXL: 4,
      refY: 4 / 2,
      markerWidth: 4 / 2,
      markerHeight: 4 / 2,
      arrowPoints: [[0, 0], [0, 4], [4, 2]]
    }
  )
}

function _colors(d3) {
  return (
    {
      demandBlue: d3.color("#0066b3"),
      supplyRed: d3.color("#d12244"),
      shifterPurple: d3.color("#92278f"),
      shifterGreen: d3.color("#007f3e"),
      brown: d3.color("#8f5001"),
      orange: d3.color("#c74a1b"),
      black: d3.color("#000000")
    }
  )
}

function _textShadow() {
  return (
    '1px 1px 0 white, 1px 0 0 white, 0 1px 0 white, -1px -1px 0 white, -1px 0 0 white, 0 -1px 0 white, 1px -1px 0 white, -1px 1px 0 white'
  )
}

function _margin(width, getTopMargin, height) {
  return (
    {
      left: width / 8,
      top: getTopMargin(),
      right: width / 8,
      bottom: height / 8
    }
  )
}

function _getTopMargin(header, height) {
  return (
    function getTopMargin() {
      if (header.hasOwnProperty('title') && header.title != "") {
        return height / 5;
      }
      else {
        return height / 8;
      }
    }
  )
}

function _height() {
  return (
    600
  )
}

function _22(md) {
  return (
    md`# Section 3: CSS`
  )
}

function _23(md) {
  return (
    md`# Section 4: Utilities`
  )
}

function _drag(d3, svg, xScale, yScale, intersectLines, yAxisLine, xAxisLine, topLine, yAxisScale, rightLine, xAxisScale, distance, xyScale, lineMin, lines, getColor, textShadow, intersectionPoints, getLineByLabel, dropLines, appendLabels, getCursor) {
  function dragstarted(event, d) {

    // has this line been dragged before?
    // console.log(d.hasOwnProperty('hasBeenDragged'))
    // console.log(d);
    // if (!d.hasOwnProperty('hasBeenDragged') && d.hasBeenDragged != true) {
    //   d.hasBeenDragged = true;
    // }

    if (d.moveX || d.moveY) {
      d3.select(this).raise();
      d3.select(this).attr("stroke-width", d.width * 1.5).attr("filter", "drop-shadow(0 0 .5rem yellow)");
    }

    // .attr("cursor", "grabbing")
  }

  //////////////// This is Justin's replacement code (which is probably ugy in a bunch of ways, but at the moment, it works
  function dragged(event, d) {

    svg.selectAll("line.vDrop").remove();
    svg.selectAll("line.hDrop").remove();
    svg.selectAll("text.label").remove();
    svg.selectAll("circle.intersection").remove();
    // console.log("d", d)
    // console.log(event);
    // console.log(d.point1);


    var dx = event.dx;
    var dy = event.dy;

    if (d.moveX) {
      d.point1[0] = xScale.invert(xScale(d.point1[0]) + dx);
      d.point2[0] = xScale.invert(xScale(d.point2[0]) + dx);
    }
    if (d.moveY) {
      d.point1[1] = yScale.invert(yScale(d.point1[1]) + dy);
      d.point2[1] = yScale.invert(yScale(d.point2[1]) + dy);
    }

    // && (d.ghostDrawn == false || !d.hasOwnProperty('ghostDrawn'))

    // if ((Math.round(d.point1[0]) != Math.round(d.ghostp1[0]))) {
    console.log("line with ghost moved")

    //   console.log(d.ghostp1)
    //   svg.append('line')
    //     .classed(`ghost${d.label}`, true)
    //     .attr('x1', xScale(d.ghostp1[0]))
    //     .attr('y1', yScale(d.ghostp1[1]))
    //     .attr('x2', xScale(d.ghostp2[0]))
    //     .attr('y2', yScale(d.ghostp2[1]))
    //     .attr('stroke-width', d.width)
    //     .attr('stroke', getColor(d))
    //     // .attr('stroke', d.)
    //   d.ghostDrawn = true;
    // }
    // else if (Math.round(d.point1[0]) == Math.round(d.ghostp1[0])) {
    //   d3.selectAll(`line.ghost${d.label}`).remove();
    //   d.ghostDrawn == false;
    // }


    // bounce
    // const diff = xScale(0) - xScale(d.point1[0])
    // // console.log("diff", diff)
    // d.point1[0] += .01;
    // d.point2[0] += .01;

    d.x1 = xScale(d.point1[0]);
    d.y1 = yScale(d.point1[1]);
    d.x2 = xScale(d.point2[0]);
    d.y2 = yScale(d.point2[1]);

    // console.log("testing")
    // console.log(d)
    // d.test = 1
    // console.log(d)
    // console.log("end test")

    d.il = false;
    d.ib = false;
    d.it = false;
    d.ir = false;

    if (intersectLines(d, yAxisLine)) {
      // console.log("intersecting Y at", intersectLines(d, yAxisLine));
      d.il = true;
      if (xScale(d.point1[0]) < xScale(0)) {
        d.x1 = xScale(0);
        d.y1 = yScale(intersectLines(d, yAxisLine).y);
      }
      else if (xScale(d.point2[0]) < xScale(0)) {
        d.x2 = xScale(0);
        d.y2 = yScale(intersectLines(d, yAxisLine).y);
      }
    }

    if (intersectLines(d, xAxisLine)) {
      // console.log("intersecting X at", intersectLines(d, xAxisLine));
      d.ib = true;
      if (yScale(d.point1[1]) > yScale(0)) {
        d.x1 = xScale(intersectLines(d, xAxisLine).x);
        d.y1 = yScale(0);
      }
      else if (yScale(d.point2[1]) > yScale(0)) {
        d.x2 = xScale(intersectLines(d, xAxisLine).x);
        d.y2 = yScale(0);
      }
    }

    if (intersectLines(d, topLine)) {
      d.it = true;
      if (yScale(d.point1[1]) < yScale(yAxisScale.domain[1])) {
        d.x1 = xScale(intersectLines(d, topLine).x);
        d.y1 = yScale(topLine.point1[1]);
      }
      else if (yScale(d.point2[1]) < yScale(yAxisScale.domain[1])) {
        d.x2 = xScale(intersectLines(d, topLine).x);
        d.y2 = yScale(topLine.point1[1]);
      }
    }

    if (intersectLines(d, rightLine)) {
      d.ir = true;
      if (xScale(d.point1[0]) > xScale(xAxisScale.domain[1])) {
        d.x1 = xScale(rightLine.point1[0]);
        d.y1 = yScale(intersectLines(d, rightLine).y);
      }
      else if (xScale(d.point2[0]) > xScale(0)) {
        d.x2 = xScale(rightLine.point1[0]);
        d.y2 = yScale(intersectLines(d, rightLine).y);
      }
    }


    // if the edit would make the line too short, bounce it.
    if (distance(xyScale(d.point1), xyScale(d.point2)) * lineMin > distance([d.x1, d.y1], [d.x2, d.y2])) {
      console.log("too short")
      if (d.il) {
        d.point1[0] += (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
        d.point2[0] += (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
      }
      if (d.ib) {
        d.point1[1] += (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
        d.point2[1] += (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
      }
      if (d.it) {
        d.point1[1] -= (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
        d.point2[1] -= (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
      }
      if (d.ir) {
        d.point1[0] -= (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
        d.point2[0] -= (xAxisScale.domain[1] - xAxisScale.domain[0]) / 100;
      }
    }
    else {
      d3.select(this)
        .attr('x1', d.x1)
        .attr('y1', d.y1)
        .attr('x2', d.x2)
        .attr('y2', d.y2)
    }

    svg.selectAll("text.label")
      .data(lines)
      .enter().append('text')
      .classed('label', true)
      .style("font-size", d => d.labelSize)
      .style("font-family", 'Helvetica Neue, sans-serif')
      .style('fill', d => getColor(d))
      .style('text-shadow', textShadow)
      .attr("x", d => {
        return ('x2' in d) ? d.x2 : d.point2[0]
      })
      .attr("y", d => {
        return ('y2' in d) ? d.y2 : d.point2[1]
      })
      .text(d => d.label);


    // TODO: map intersections points in object, draw each one. Draw dot or open dot depending on primary.
    intersectionPoints.map(pair => {
      // Guard: in bounds
      const point = intersectLines(getLineByLabel(pair.labels[0]), getLineByLabel(pair.labels[1]));

      if (point.x >= xAxisScale.domain[0] && point.x <= xAxisScale.domain[1] &&
        point.y >= yAxisScale.domain[0] && point.y <= yAxisScale.domain[1]) {
        // TODO: enable styling with CSS
        svg.append("line")
          .classed('vDrop', true)
          .style('stroke-width', dropLines.width)
          .style('stroke-dasharray', dropLines.dashCSS)
          .style('stroke', 'black')
          .attr("x1", xScale(point.x)).attr("y1", yScale(0))
          .attr("x2", xScale(point.x)).attr("y2", yScale(point.y));

        svg.append("line")
          .classed('hDrop', true)
          .style('stroke-width', dropLines.width)
          .style('stroke-dasharray', dropLines.dashCSS)
          .style('stroke', 'black')
          .attr("x1", xScale(0)).attr("y1", yScale(point.y))
          .attr("x2", xScale(point.x)).attr("y2", yScale(point.y))

        // svg.append("circle")
        //   .classed('intersection')
        //   .style("stroke", "gray")
        //   .style("fill", "black")
        //   .attr('r', 100)
        //   .attr('cx', xScale(point.x))
        //   .attr('cy', yScale(point.y))

      }
    })
  }

  function dragended(event, d) {
    appendLabels();
    d3.select(this)
      .attr("cursor", getCursor(d))
      .transition().duration(200).attr("stroke-width", d.width).attr("filter", "drop-shadow(0)")
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}


function _getCursor() {
  return (
    function getCursor(d) {
      if (d.moveX && d.moveY) {
        return 'pointer'
      }
      else if (d.moveX) {
        return 'ew-resize'
      }
      else if (d.moveY) {
        return 'ns-resize'
      }
      else {
        return 'default'
      }
    }
  )
}

function _getColor(colors) {
  return (
    function getColor(d, modifier = "none") {
      if (d.label.toUpperCase() == "DEMAND") {
        return colors.demandBlue;
      }
      else if (d.label.toUpperCase == "SUPPLY") {
        return colors.supplyRed;
      }
      else if ('color' in d) {
        return d.color;
      }
      else {
        return colors.black;
      }
    }
  )
}

function _appendLabels(svg, lines, getColor, textShadow, xScale, yScale) {
  return (
    function appendLabels() {
      svg.selectAll("text.label")
        .data(lines)
        .enter().append('text')
        .classed('label', true)
        .style("font-size", d => d.labelSize)
        .style("font-family", 'Helvetica Neue')
        .style('fill', d => getColor(d))
        .style('text-shadow', textShadow)
        .attr("x", d => xScale(d.point2[0]))
        .attr("y", d => yScale(d.point2[1]))
        .text(d => d.label);
    }
  )
}

function _appendAnnotations(svg, annotations, textShadow) {
  return (
    function appendAnnotations() {
      svg.selectAll(".annotation")
        .data(annotations)
        .enter().append('foreignObject')
        .classed("annotation", true)
        .attr("width", (d) => d.width)
        .attr("height", (d) => d.height)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .append("xhtml:body")
        .style("text-align", d => {
          if ('align' in d) {
            return d.align;
          }
          else {
            return 'left'
          }
        })
        .style("font", "14px 'Helvetica Neue'")
        .style('text-shadow', textShadow)
        .html((d) => d.html);
    }
  )
}

function _svg(d3, width, height) {
  return (
    d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("tabindex", 1)
      .attr("font-family", 'Helvetica Neue')
  )
}

function _xScale(d3, xAxisScale) {
  return (
    d3.scaleLinear()
      // =====================
      // CONFIG: change domain
      // =====================
      .domain(xAxisScale.domain).range(xAxisScale.range)
  )
}

function _yScale(d3, yAxisScale) {
  return (
    d3.scaleLinear()
      // ====================
      // CONFIG: change range
      // ====================
      .domain(yAxisScale.domain)
      .range(yAxisScale.range)
  )
}

function _xAxis(height, margin, d3, xScale, xAxisScale) {
  return (
    g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        // ================================
        // CONFIG: change number of x ticks
        // ================================
        .ticks(xAxisScale.numTicks)
        .tickSizeOuter(xAxisScale.tickSizeOuter)
      )
      .call(g => g.append("text")
        .attr("x", xAxisScale.title.x)
        .attr("y", xAxisScale.title.y)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-size", xAxisScale.title.size)
        .style("font-weight", "bold")
        // ===========================
        // CONFIG: change x-axis title
        // ===========================
        .text(xAxisScale.title.text))
      .call(g => g.append("text")
        .attr("x", xAxisScale.subtitle.x)
        .attr("y", xAxisScale.subtitle.y)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-size", xAxisScale.subtitle.size)
        // ===========================
        // CONFIG: change x-axis title
        // ===========================
        .text(xAxisScale.subtitle.text))
  )
}

function _yAxis(margin, d3, yScale, yAxisScale) {
  return (
    g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale)
        .ticks(yAxisScale.numTicks, "$.2f")
      )
      .call(g => g.append("text")
        .attr("x", yAxisScale.title.x)
        .attr("y", yAxisScale.title.y)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .attr("font-size", yAxisScale.title.size)
        .attr("font-weight", "bold")
        .text(yAxisScale.title.text))
      .call(g => g.append("text")
        .attr("x", yAxisScale.subtitle.x)
        .attr("y", yAxisScale.subtitle.y)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .attr("font-size", yAxisScale.subtitle.size)
        .text(yAxisScale.subtitle.text))
  )
}

function _xyScale(xScale, yScale) {
  return (
    function xyScale([x, y]) {
      return [xScale(x), yScale(y)];
    }
  )
}

function _distance() {
  return (
    function distance([x1, y1], [x2, y2]) {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
  )
}

function _interpolate() {
  return (
    function interpolate([x1, y1], [x2, y2], t) {
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
    }
  )
}

function _project() {
  return (
    function project([x1, y1], [x2, y2], [x3, y3]) {
      const x21 = x2 - x1, y21 = y2 - y1;
      const x31 = x3 - x1, y31 = y3 - y1;
      return (x31 * x21 + y31 * y21) / (x21 * x21 + y21 * y21);
    }
  )
}

function _yAxisLine(yAxisScale) {
  return (
    {
      point1: [0, 0],
      point2: [0, yAxisScale.domain[1]]
    }
  )
}

function _xAxisLine(xAxisScale) {
  return (
    {
      point1: [0, 0],
      point2: [xAxisScale.domain[1], 0]
    }
  )
}

function _topLine(yAxisScale, xAxisScale) {
  return (
    {
      point1: [0, yAxisScale.domain[1]],
      point2: [xAxisScale.domain[1], yAxisScale.domain[1]]
    }
  )
}

function _rightLine(xAxisScale, yAxisScale) {
  return (
    {
      point1: [xAxisScale.domain[1], yAxisScale.domain[1]],
      point2: [xAxisScale.domain[1], 0]
    }
  )
}

function _intersectLines(intersect) {
  return (
    function intersectLines(line1, line2) {
      const x1 = line1.point1[0], y1 = line1.point1[1], x2 = line1.point2[0], y2 = line1.point2[1],
        x3 = line2.point1[0], y3 = line2.point1[1], x4 = line2.point2[0], y4 = line2.point2[1];
      return intersect(x1, y1, x2, y2, x3, y3, x4, y4);
    }
  )
}

function _intersect() {
  return (
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

      // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
      }

      const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

      // Lines are parallel
      if (denominator === 0) {
        return false
      }

      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

      // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
      }

      // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1)
      let y = y1 + ua * (y2 - y1)

      return { x, y }
    }
  )
}

function _dropPoint(xScale, yScale) {
  return (
    function dropPoint(inputY, p0, p1) {

      const dy = p1[1] - p0[1];
      const dx = p1[0] - p0[0];

      const b = p0[1] - (dy / dx) * p0[0];
      const newX = (inputY - b) / (dy / dx);

      const ans = [newX, inputY]
      return [xScale(newX), yScale(inputY)]
    }
  )
}

function _getLineByLabel(lines) {
  return (
    function getLineByLabel(labelIn) {
      return lines.find(line => (line.label.toUpperCase() === labelIn.toUpperCase()));
    }
  )
}

function _d3(require) {
  return (
    require("d3@7")
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("lines")).define("lines", ["colors"], _lines);
  main.variable(observer("intersectionPoints")).define("intersectionPoints", _intersectionPoints);
  main.variable(observer("header")).define("header", _header);
  main.variable(observer("footer")).define("footer", _footer);
  main.variable(observer("xAxisScale")).define("xAxisScale", ["width", "margin"], _xAxisScale);
  main.variable(observer("yAxisScale")).define("yAxisScale", ["margin", "height"], _yAxisScale);
  main.variable(observer("dropLines")).define("dropLines", _dropLines);
  main.variable(observer("measureLines")).define("measureLines", _measureLines);
  main.variable(observer("primaryIntersectionPoint")).define("primaryIntersectionPoint", ["intersectLines", "getLineByLabel"], _primaryIntersectionPoint);
  main.variable(observer("annotations")).define("annotations", ["width", "margin"], _annotations);
  main.variable(observer("lineMin")).define("lineMin", _lineMin);
  main.variable(observer()).define(["svg", "lines", "xAxis", "yAxis", "header", "margin", "height", "getCursor", "xScale", "yScale", "getColor", "drag", "appendLabels", "appendAnnotations"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("arrowHead")).define("arrowHead", _arrowHead);
  main.variable(observer("colors")).define("colors", ["d3"], _colors);
  main.variable(observer("textShadow")).define("textShadow", _textShadow);
  main.variable(observer("margin")).define("margin", ["width", "getTopMargin", "height"], _margin);
  main.variable(observer("getTopMargin")).define("getTopMargin", ["header", "height"], _getTopMargin);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("drag")).define("drag", ["d3", "svg", "xScale", "yScale", "intersectLines", "yAxisLine", "xAxisLine", "topLine", "yAxisScale", "rightLine", "xAxisScale", "distance", "xyScale", "lineMin", "lines", "getColor", "textShadow", "intersectionPoints", "getLineByLabel", "dropLines", "appendLabels", "getCursor"], _drag);
  main.variable(observer("getCursor")).define("getCursor", _getCursor);
  main.variable(observer("getColor")).define("getColor", ["colors"], _getColor);
  main.variable(observer("appendLabels")).define("appendLabels", ["svg", "lines", "getColor", "textShadow", "xScale", "yScale"], _appendLabels);
  main.variable(observer("appendAnnotations")).define("appendAnnotations", ["svg", "annotations", "textShadow"], _appendAnnotations);
  main.variable(observer("svg")).define("svg", ["d3", "width", "height"], _svg);
  main.variable(observer("xScale")).define("xScale", ["d3", "xAxisScale"], _xScale);
  main.variable(observer("yScale")).define("yScale", ["d3", "yAxisScale"], _yScale);
  main.variable(observer("xAxis")).define("xAxis", ["height", "margin", "d3", "xScale", "xAxisScale"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin", "d3", "yScale", "yAxisScale"], _yAxis);
  main.variable(observer("xyScale")).define("xyScale", ["xScale", "yScale"], _xyScale);
  main.variable(observer("distance")).define("distance", _distance);
  main.variable(observer("interpolate")).define("interpolate", _interpolate);
  main.variable(observer("project")).define("project", _project);
  main.variable(observer("yAxisLine")).define("yAxisLine", ["yAxisScale"], _yAxisLine);
  main.variable(observer("xAxisLine")).define("xAxisLine", ["xAxisScale"], _xAxisLine);
  main.variable(observer("topLine")).define("topLine", ["yAxisScale", "xAxisScale"], _topLine);
  main.variable(observer("rightLine")).define("rightLine", ["xAxisScale", "yAxisScale"], _rightLine);
  main.variable(observer("intersectLines")).define("intersectLines", ["intersect"], _intersectLines);
  main.variable(observer("intersect")).define("intersect", _intersect);
  main.variable(observer("dropPoint")).define("dropPoint", ["xScale", "yScale"], _dropPoint);
  main.variable(observer("getLineByLabel")).define("getLineByLabel", ["lines"], _getLineByLabel);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
