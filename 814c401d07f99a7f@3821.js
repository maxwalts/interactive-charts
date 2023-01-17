function _1(md) {
  return (
    md`# Supply and Demand chart`
  )
}

function _2(md) {
  return (
    md`# Section 1: Chart element configuration`
  )
}

function _header() {
  return (
    {
      title: "Supply and Demand",
      subtitle: ""
    }
  )
}

function _lines(colors) {
  return (
    [
      {
        label: 'Demand',
        labelSize: "14px",
        point1: [10, 60],
        point2: [80, 10],
        color: colors.demandBlue,
        width: 4,
        moveX: true,
        moveY: false,
        drawOriginLine: true
      },
      {
        label: 'Supply',
        labelSize: "14px",
        point1: [10, 10],
        point2: [80, 90],
        color: colors.supplyRed,
        width: 4,
        moveX: true,
        moveY: true,
        drawOriginLine: true
      },

    ]
  )
}

function _intersectionPoints() {
  return (
    [
      {
        labels: ["Demand", "Supply"],
        isPrimary: true
      }
    ]
  )
}

function _xAxisScale(width, margin) {
  return (
    {
      title: {
        width: '170px',
        height: '90px',
        // edit styling in CSS section under axisTitle class
        html: `<p class="axisTitle"> <b> Quantity </b>  </p>`,
        x: (width - margin.right - 160),
        y: 0,
        size: "12px"
      },

      domain: [0, 100],
      range: [margin.left, width - margin.right],
      numTicks: 5,
      // Define a custom set of tick values
      tickValues: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      // Define format of those ticks
      tickFormat: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      // Define length of the ticks
      tickSize: 0,
      tickSizeOuter: 0
    }
  )
}

function _yAxisScale(margin, height) {
  return (
    {
      title: {
        width: '90px',
        height: '100px',
        // edit styling in CSS section under axisTitle class
        html: `<p class="axisTitle"> <b> Price </b> `,
        x: -90,
        y: margin.top - 20,
        size: "13px"
      },
      domain: [0, 100],
      range: [height - margin.bottom, margin.top],
      numTicks: 5,
      // Define a custom set of tick values
      tickValues: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      // Define format of those ticks
      tickFormat: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      // length of the outer ticks
      tickSize: 0,
      tickSizeOuter: 0

    }
  )
}

function _annotations() {
  return (
    [
      //   {
      //   width: 250, 
      //   height: 200, 
      //   x: width/2, 
      //   y: 200, 
      //   html: "<p>This is an annotation that fits the width of the container. You can also use html for <strong>styles</strong> and <span style=color:blue> colors</span>.</p>",
      //   // 'center', 'left', 'right', or 'justify'
      //   align: 'right'
      // },
      // {
      //   width: 250, 
      //   height: 200, 
      //   x: margin.left, 
      //   y: 200, 
      //   html: "<p>Another note</p>",
      //   align: 'left'
      // }
    ]
  )
}

function _footer() {
  return (
    { text: "" }
  )
}

function _interactionBoundary() {
  return (
    { xMin: 0, xMax: 90, yMin: 0, yMax: 100 }
  )
}

function _cutLineOnBoundaryCross() {
  return (
    true
  )
}

function _12(svg, xAxis, yAxis, lines, getCursor, xScale, yScale, getColor, drag, appendHeaderFooter, appendAnnotations, appendLabels, appendStaticIntersectionObjects, appendIntersectionObjects) {

  // TODO responsive width
  // TODO lines easier to grab

  // clear old objects
  svg.selectAll("line").remove();
  svg.selectAll("g").remove();
  svg.selectAll("text").remove();

  // Append axes
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  // Draw lines
  svg.selectAll("line.given").remove();
  svg.selectAll("line.given")
    .data(lines)
    .enter().append('line')
    .attr("cursor", d => getCursor(d))
    .attr('x1', d => {
      if (! 'x1' in d) {
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
    appendHeaderFooter();
    appendAnnotations();
    appendLabels();
    appendStaticIntersectionObjects();
    appendIntersectionObjects();
  }

  return svg.node();
}


function _13(md) {
  return (
    md`# Section 2: Style`
  )
}

function _dropLines() {
  return (
    { width: 1, dashCSS: "8,2" }
  )
}

function _LINE_MIN_LENGTH() {
  return (
    0.2
  )
}

function _GHOST_MIN_DISTANCE() {
  return (
    20
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

function _textShadowDark() {
  return (
    '1px 1px 0 black, 1px 0 0 black, 0 1px 0 black, -1px -1px 0 black, -1px 0 0 black, 0 -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
  )
}

function _margin(width, getTopMargin, getBottomMargin) {
  return (
    {
      left: width / 8,
      top: getTopMargin(),
      right: width / 8,
      bottom: getBottomMargin()
    }
  )
}

function _measureLines() {
  return (
    { strokeWidth: 44, includeArrow: true }
  )
}

function _height() {
  return (
    700
  )
}

function _24(md) {
  return (
    md`# Section 3: CSS`
  )
}

function _25(html) {
  return (
    html`<style>

text, p {
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;

}

.headerTitle {
  font-size: 21px;
}

.headerSubtitle {
  
}

.footer {
  
}

// g.x > .tick:first-of-type {
//   color: #92278f;
// }

// g.x > .tick:first-of-type + .tick, g.x > .tick:first-of-type + .tick + .tick {
//   color: grey;
// }

// g.y > .tick {
//   color: #d12244; // supplyRed
//   // font-weight: bold;
// }

.axisTitle {
  font-size: 16px;
  text-align: right;
}

line.given {
}

line.vDrop {
}

line.hDrop {
}

text.label {
}

circle.intersection {
}

</style>`
  )
}

function _26(md) {
  return (
    md`# Section 4: Utilities`
  )
}

function _lineMap() {
  return (
    {}
  )
}

function _drag(svg, xScale, yScale, getColor, lineMap, d3, appendIntersectionObjects, appendLabels, intersectLines, yAxisLine, interactionBoundary, xAxisLine, topLine, yAxisScale, rightLine, xAxisScale, distance, xyScale, LINE_MIN_LENGTH, GHOST_MIN_DISTANCE, getCursor) {
  function dragstarted(event, d) {

    d.originalP1 = d.point1;
    d.originalP2 = d.point2;

    // First time
    if (d.drawOriginLine && !d.hasOwnProperty('isAwayFromOrigin')) {


      // create ghost lines
      svg.append('line')
        .classed(`ghost${d.label}`, true)
        .attr('x1', xScale(d.originalP1[0]))
        .attr('y1', yScale(d.originalP1[1]))
        .attr('x2', xScale(d.originalP2[0]))
        .attr('y2', yScale(d.originalP2[1]))
        .attr('stroke-width', d.width)
        .attr('stroke', getColor(d))
        .attr('filter', 'brightness(2)')

      svg.append('text')
        .classed(`ghost${d.label}`, true)
        .attr('x', xScale(d.originalP2[0]))
        .attr('y', yScale(d.originalP2[1]))
        .style('fill', getColor(d))
        .style("font-size", d.labelSize)
        .style("font-weight", 'bold')
        // .style('text-shadow', textShadowDark)
        .attr('filter', 'brightness(2)')
        .text(() => `Old ${d.label}`);



      // save coordinates of ghost lines
      lineMap[`line.ghost${d.label}_x1`] = xScale(d.originalP1[0]);
      lineMap[`line.ghost${d.label}_y1`] = yScale(d.originalP1[1]);
      lineMap[`line.ghost${d.label}_x2`] = xScale(d.originalP2[0]);
      lineMap[`line.ghost${d.label}_y2`] = yScale(d.originalP2[1]);

      d.isAwayFromOrigin = true;
    }
    // following times, add color back 
    else if (d.drawOriginLine && !d.isAwayFromOrigin) {
      svg.select(`line.ghost${d.label}`)
        .attr('opacity', '1')

      d3.select(`text.ghost${d.label}`)
        .attr('opacity', '1')

      d.isAwayFromOrigin = true;
    }

    if (d.moveX || d.moveY) {
      d3.select(this).raise();
      d3.select(this).attr("stroke-width", d.width * 1.5).attr("filter", "drop-shadow(0 0 .5rem yellow)");
    }

    appendIntersectionObjects(d.isAwayFromOrigin);

  }

  function dragged(event, d) {

    svg.selectAll("line.vDrop").remove();
    svg.selectAll("line.hDrop").remove();

    appendLabels();

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

    d.x1 = xScale(d.point1[0]);
    d.y1 = yScale(d.point1[1]);
    d.x2 = xScale(d.point2[0]);
    d.y2 = yScale(d.point2[1]);
    d.il = false;
    d.ib = false;
    d.it = false;
    d.ir = false;

    // handle line crossing interaction boundaries
    if (intersectLines(d, yAxisLine)) {
      // console.log("intersecting Y at", intersectLines(d, yAxisLine));
      d.il = true;
      if (xScale(d.point1[0]) < xScale(interactionBoundary.xMin)) {
        d.x1 = xScale(interactionBoundary.xMin);
        d.y1 = yScale(intersectLines(d, yAxisLine).y);
      }
      else if (xScale(d.point2[0]) < xScale(interactionBoundary.xMin)) {
        d.x2 = xScale(interactionBoundary.xMin);
        d.y2 = yScale(intersectLines(d, yAxisLine).y);
      }
    }

    if (intersectLines(d, xAxisLine)) {
      console.log("intersecting X at", intersectLines(d, xAxisLine));
      // remember that yScale is inverted, so this is checking for being less than min.
      d.ib = true;
      if (yScale(d.point1[1]) > yScale(interactionBoundary.yMin)) {
        d.x1 = xScale(intersectLines(d, xAxisLine).x);
        d.y1 = yScale(interactionBoundary.yMin);
      }
      else if (yScale(d.point2[1]) > yScale(interactionBoundary.yMin)) {
        d.x2 = xScale(intersectLines(d, xAxisLine).x);
        d.y2 = yScale(interactionBoundary.yMin);
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
      else if (xScale(d.point2[0]) > xScale(xAxisScale.domain[0])) {
        d.x2 = xScale(rightLine.point1[0]);
        d.y2 = yScale(intersectLines(d, rightLine).y);
      }
    }

    // if the edit would make the line too short, bounce it.
    if (distance(xyScale(d.point1), xyScale(d.point2)) * LINE_MIN_LENGTH > distance([d.x1, d.y1], [d.x2, d.y2])) {
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

    appendIntersectionObjects();
  }

  function dragended(event, d) {

    if (d.drawOriginLine) {
      const ghostLineX1 = lineMap[`line.ghost${d.label}_x1`]
      const ghostLineY1 = lineMap[`line.ghost${d.label}_y1`]
      const ghostLineX2 = lineMap[`line.ghost${d.label}_x2`]
      const ghostLineY2 = lineMap[`line.ghost${d.label}_y2`]
      const draggedLineX1 = d.x1
      const draggedLineY1 = d.y1

      if (
        (ghostLineX1 < draggedLineX1 + GHOST_MIN_DISTANCE && ghostLineX1 > draggedLineX1 - GHOST_MIN_DISTANCE) &&
        (ghostLineY1 > draggedLineY1 - GHOST_MIN_DISTANCE && ghostLineY1 < draggedLineY1 + GHOST_MIN_DISTANCE)) {

        d.x1 = ghostLineX1
        d.y1 = ghostLineY1
        d.x2 = ghostLineX2
        d.y2 = ghostLineY2
        d.point1[0] = xScale.invert(ghostLineX1)
        d.point1[1] = yScale.invert(ghostLineY1)
        d.point2[0] = xScale.invert(ghostLineX2)
        d.point2[1] = yScale.invert(ghostLineY2)
        d3.select(this)
          .attr('x1', d.x1)
          .attr('y1', d.y1)
          .attr('x2', d.x2)
          .attr('y2', d.y2)

        d3.select(`line.ghost${d.label}`)
          .attr('opacity', '0')

        d3.select(`text.ghost${d.label}`)
          .attr('opacity', '0')

        d3.selectAll("text.staticIntersection").remove();
        d.isAwayFromOrigin = false;
      }
    }

    appendLabels();
    appendIntersectionObjects();

    d3.select(this)
      .attr("cursor", getCursor(d))
      .transition().duration(200).attr("stroke-width", d.width).attr("filter", "drop-shadow(0)")

  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}


function _appendHeaderFooter(header, svg, margin, height, footer) {
  return (
    function appendHeaderFooter() {
      if ('title' in header && header.title != "") {
        svg.append('text')
          .classed("headerTitle", true)
          .attr('x', margin.left)
          .attr('y', height / 12)
          .text(header.title)
        svg.append('text')
          .classed("headerSubtitle", true)
          .attr('x', margin.left)
          .attr('y', height / 12 + 20)
          .text(header.subtitle)
      }

      if ('text' in footer && footer.text != "") {
        svg.append('text')
          .classed("footer", true)
          .attr('x', margin.left)
          .attr('y', height - 38)
          .text(footer.text)
      }
    }
  )
}

function _appendStaticIntersectionObjects(intersectionPoints, intersectLines, getLineByLabel, xAxisScale, yAxisScale, svg, dropLines, xScale, height, margin, yScale) {
  return (
    function appendStaticIntersectionObjects() {


      intersectionPoints.map(pair => {

        // Guard: in bounds
        const point = intersectLines(getLineByLabel(pair.labels[0]), getLineByLabel(pair.labels[1]));

        if (point.x >= xAxisScale.domain[0] && point.x <= xAxisScale.domain[1] &&
          point.y >= yAxisScale.domain[0] && point.y <= yAxisScale.domain[1]) {

          svg.append("line")
            .classed('staticVDrop', true)
            .style('stroke-width', dropLines.width)
            .style('stroke-dasharray', dropLines.dashCSS)
            .style('stroke', 'gray')
            .attr("x1", xScale(point.x)).attr("y1", height - margin.bottom)
            .attr("x2", xScale(point.x)).attr("y2", yScale(point.y));

          svg.append("line")
            .classed('staticHDrop', true)
            .style('stroke-width', dropLines.width)
            .style('stroke-dasharray', dropLines.dashCSS)
            .style('stroke', 'gray')
            .attr("x1", xScale(xAxisScale.domain[0])).attr("y1", yScale(point.y))
            .attr("x2", xScale(point.x)).attr("y2", yScale(point.y))


          svg.append("circle")
            .classed("staticIntersection", true)
            .attr('cx', xScale(point.x))
            .attr('cy', yScale(point.y))
            .attr('r', '5px')
            .style("stroke", '#5A5A5A')
            .style("stroke-width", "2px")
            .style('fill', 'none')
        }
      })
    }
  )
}

function _appendIntersectionObjects(d3, svg, textShadow, intersectionPoints, intersectLines, getLineByLabel, xAxisScale, yAxisScale, dropLines, xScale, height, margin, yScale) {
  return (
    function appendIntersectionObjects(isAwayFromOrigin = false) {


      if (isAwayFromOrigin) {
        d3.select('circle.staticIntersection').raise();
        d3.selectAll("text.staticIntersection").remove();
        const tempX = d3.select("circle.staticIntersection").attr("cx")
        const tempY = d3.select("circle.staticIntersection").attr("cy")
        svg.append('text')
          .classed("staticIntersection", true)
          .attr('x', tempX)
          .attr('y', tempY)
          .style('fill', 'gray')
          .style('text-shadow', textShadow)
          .style("font-size", 14)
          // .style("font-weight", 'bold')
          .text("Old equilibrium");

      }

      // remove last objects before appending updated objects 
      svg.selectAll("circle.intersection").remove();
      svg.selectAll("line.hDrop").remove();
      svg.selectAll("line.vDrop").remove();
      svg.selectAll('text.vDropLabel').remove();
      svg.selectAll('text.hDropLabel').remove();


      intersectionPoints.map(pair => {

        // Guard: in bounds
        const point = intersectLines(getLineByLabel(pair.labels[0]), getLineByLabel(pair.labels[1]));

        if (point.x >= xAxisScale.domain[0] && point.x <= xAxisScale.domain[1] &&
          point.y >= yAxisScale.domain[0] && point.y <= yAxisScale.domain[1]) {
          // TODO: enable styling with CSS
          // moving vertical drop line
          svg.append("line")
            .classed('vDrop', true)
            .style('stroke-width', dropLines.width)
            .style('stroke-dasharray', dropLines.dashCSS)
            .style('stroke', 'black')
            .attr("x1", xScale(point.x)).attr("y1", height - margin.bottom)
            .attr("x2", xScale(point.x)).attr("y2", yScale(point.y));

          // moving horizontal drop line
          svg.append("line")
            .classed('hDrop', true)
            .style('stroke-width', dropLines.width)
            .style('stroke-dasharray', dropLines.dashCSS)
            .style('stroke', 'black')
            .attr("x1", xScale(xAxisScale.domain[0])).attr("y1", yScale(point.y))
            .attr("x2", xScale(point.x)).attr("y2", yScale(point.y))

          // moving intersection line
          svg.append("circle")
            .classed("intersection", true)
            .attr('cx', xScale(point.x))
            .attr('cy', yScale(point.y))
            .attr('r', '5px')
            .style("stroke", () => {
              return (pair.isPrimary) ? 'none' : '#5A5A5A'
            })
            .style("stroke-width", "2px")
            .style('fill', () => {
              return (pair.isPrimary) ? 'black' : 'none'
            })

          // moving numbers
          d3.selectAll('text.vDropLabel').remove();
          d3.selectAll('text.hDropLabel').remove();
          svg.append('text')
            .classed("vDropLabel", true)
            .attr('x', xScale(point.x) - 9)
            .attr('y', height - margin.bottom + 15)
            .style('fill', 'black')
            .style('text-shadow', textShadow)
            .style("font-size", 18)
            .style("font-weight", 'bold')
            .text(() => `${Math.round((point.x))}`)

          svg.append('text')
            .classed("hDropLabel", true)
            .attr('x', xScale(xAxisScale.domain[0]) - 22)
            .attr('y', yScale(point.y) + 6)
            .style('fill', 'black')
            .style('text-shadow', textShadow)
            .style("font-size", 18)
            .style("font-weight", 'bold')
            .text(() => `${Math.round((point.y))}`)



        }
      })
    }
  )
}

function _appendLabels(svg, lines, getColor, textShadow, xScale, yScale) {
  return (
    function appendLabels() {
      svg.selectAll("text.label").remove();

      svg.selectAll("text.label")
        .data(lines)
        .enter().append('text')
        .classed('label', true)
        .style("font-size", d => d.labelSize)
        .style('fill', d => getColor(d))
        .style('text-shadow', textShadow)
        .attr("x", d => {
          return ('x2' in d) ? d.x2 : xScale(d.point2[0])
        })
        .attr("y", d => {
          return ('y2' in d) ? d.y2 : yScale(d.point2[1])
        })
        .text(d => d.label);
    }
  )
}

function _appendAnnotations(svg, annotations, textShadow) {
  return (
    function appendAnnotations() {
      svg.selectAll("text.annotation").remove()

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
        .style('text-shadow', textShadow)
        .html((d) => d.html);
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

function _getBottomMargin(footer, header, height) {
  return (
    function getBottomMargin() {
      if (footer.hasOwnProperty('text') && header.text != "") {
        return height / 5;
      }
      else {
        return height / 8;
      }
    }
  )
}

function _getSideMargin(height, margin, width) {
  return (
    function getSideMargin() {
      const chartHeight = height - margin.top - margin.bottom;
      const chartWidth = width - margin.left - margin.right;
      if ((chartHeight * 2) > chartWidth) {
        return (width - height / 2)
      }
      else {
        return width / 8
      }
    }
  )
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

function _getLineByLabel(lines) {
  return (
    function getLineByLabel(labelIn) {
      return lines.find(line => (line.label.toUpperCase() === labelIn.toUpperCase()));
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
      .domain(xAxisScale.domain).range(xAxisScale.range)
  )
}

function _yScale(d3, yAxisScale) {
  return (
    d3.scaleLinear()
      .domain(yAxisScale.domain)
      .range(yAxisScale.range)
  )
}

function _xAxis(height, margin, d3, xScale, xAxisScale) {
  return (
    g => g
      .classed("x", true)
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .ticks(xAxisScale.numTicks)
        .tickValues(xAxisScale.tickValues)
        .tickFormat((d, i) => xAxisScale.tickFormat[i])
        .tickSize(xAxisScale.tickSize)
        .tickSizeOuter(xAxisScale.tickSizeOuter)
      )
      .call(g => g.append("foreignObject")
        .attr("width", xAxisScale.title.width)
        .attr("height", xAxisScale.title.height)
        .attr("x", xAxisScale.title.x)
        .attr("y", xAxisScale.title.y)
        .append("xhtml:body")
        .html(xAxisScale.title.html))
  )
}

function _yAxis(margin, d3, yScale, yAxisScale) {
  return (
    g => g
      .attr("transform", `translate(${margin.left},0)`)
      .classed("y", true)
      // Ticks
      .call(d3.axisLeft(yScale)
        .ticks(yAxisScale.numTicks, "$.2f")
        .tickValues(yAxisScale.tickValues)
        .tickFormat((d, i) => yAxisScale.tickFormat[i])
        .tickSize(yAxisScale.tickSize)
        .tickSizeOuter(yAxisScale.tickSizeOuter)
      )
      // Axis title
      .call(g => g.append("foreignObject")
        .attr("width", yAxisScale.title.width)
        .attr("height", yAxisScale.title.height)
        .attr("x", yAxisScale.title.x)
        .attr("y", yAxisScale.title.y)
        .append("xhtml:body")
        .html(yAxisScale.title.html))
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

function _yAxisLine(interactionBoundary) {
  return (
    {
      point1: [interactionBoundary.xMin, interactionBoundary.yMin],
      point2: [interactionBoundary.xMin, interactionBoundary.yMax]
    }
  )
}

function _xAxisLine(interactionBoundary) {
  return (
    {
      point1: [interactionBoundary.xMin, interactionBoundary.yMin],
      point2: [interactionBoundary.xMax, interactionBoundary.yMin]
    }
  )
}

function _topLine(interactionBoundary) {
  return (
    {
      point1: [interactionBoundary.xMin, interactionBoundary.yMax],
      point2: [interactionBoundary.xMax, interactionBoundary.yMax]
    }
  )
}

function _rightLine(interactionBoundary) {
  return (
    {
      point1: [interactionBoundary.xMax, interactionBoundary.yMax],
      point2: [interactionBoundary.xMax, interactionBoundary.yMin]
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

function _d3(require) {
  return (
    require("d3@7")
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("header")).define("header", _header);
  main.variable(observer("lines")).define("lines", ["colors"], _lines);
  main.variable(observer("intersectionPoints")).define("intersectionPoints", _intersectionPoints);
  main.variable(observer("xAxisScale")).define("xAxisScale", ["width", "margin"], _xAxisScale);
  main.variable(observer("yAxisScale")).define("yAxisScale", ["margin", "height"], _yAxisScale);
  main.variable(observer("annotations")).define("annotations", _annotations);
  main.variable(observer("footer")).define("footer", _footer);
  main.variable(observer("interactionBoundary")).define("interactionBoundary", _interactionBoundary);
  main.variable(observer("cutLineOnBoundaryCross")).define("cutLineOnBoundaryCross", _cutLineOnBoundaryCross);
  main.variable(observer()).define(["svg", "xAxis", "yAxis", "lines", "getCursor", "xScale", "yScale", "getColor", "drag", "appendHeaderFooter", "appendAnnotations", "appendLabels", "appendStaticIntersectionObjects", "appendIntersectionObjects"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("dropLines")).define("dropLines", _dropLines);
  main.variable(observer("LINE_MIN_LENGTH")).define("LINE_MIN_LENGTH", _LINE_MIN_LENGTH);
  main.variable(observer("GHOST_MIN_DISTANCE")).define("GHOST_MIN_DISTANCE", _GHOST_MIN_DISTANCE);
  main.variable(observer("arrowHead")).define("arrowHead", _arrowHead);
  main.variable(observer("colors")).define("colors", ["d3"], _colors);
  main.variable(observer("textShadow")).define("textShadow", _textShadow);
  main.variable(observer("textShadowDark")).define("textShadowDark", _textShadowDark);
  main.variable(observer("margin")).define("margin", ["width", "getTopMargin", "getBottomMargin"], _margin);
  main.variable(observer("measureLines")).define("measureLines", _measureLines);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["html"], _25);
  main.variable(observer()).define(["md"], _26);
  main.define("initial lineMap", _lineMap);
  main.variable(observer("mutable lineMap")).define("mutable lineMap", ["Mutable", "initial lineMap"], (M, _) => new M(_));
  main.variable(observer("lineMap")).define("lineMap", ["mutable lineMap"], _ => _.generator);
  main.variable(observer("drag")).define("drag", ["svg", "xScale", "yScale", "getColor", "lineMap", "d3", "appendIntersectionObjects", "appendLabels", "intersectLines", "yAxisLine", "interactionBoundary", "xAxisLine", "topLine", "yAxisScale", "rightLine", "xAxisScale", "distance", "xyScale", "LINE_MIN_LENGTH", "GHOST_MIN_DISTANCE", "getCursor"], _drag);
  main.variable(observer("appendHeaderFooter")).define("appendHeaderFooter", ["header", "svg", "margin", "height", "footer"], _appendHeaderFooter);
  main.variable(observer("appendStaticIntersectionObjects")).define("appendStaticIntersectionObjects", ["intersectionPoints", "intersectLines", "getLineByLabel", "xAxisScale", "yAxisScale", "svg", "dropLines", "xScale", "height", "margin", "yScale"], _appendStaticIntersectionObjects);
  main.variable(observer("appendIntersectionObjects")).define("appendIntersectionObjects", ["d3", "svg", "textShadow", "intersectionPoints", "intersectLines", "getLineByLabel", "xAxisScale", "yAxisScale", "dropLines", "xScale", "height", "margin", "yScale"], _appendIntersectionObjects);
  main.variable(observer("appendLabels")).define("appendLabels", ["svg", "lines", "getColor", "textShadow", "xScale", "yScale"], _appendLabels);
  main.variable(observer("appendAnnotations")).define("appendAnnotations", ["svg", "annotations", "textShadow"], _appendAnnotations);
  main.variable(observer("getTopMargin")).define("getTopMargin", ["header", "height"], _getTopMargin);
  main.variable(observer("getBottomMargin")).define("getBottomMargin", ["footer", "header", "height"], _getBottomMargin);
  main.variable(observer("getSideMargin")).define("getSideMargin", ["height", "margin", "width"], _getSideMargin);
  main.variable(observer("getCursor")).define("getCursor", _getCursor);
  main.variable(observer("getColor")).define("getColor", ["colors"], _getColor);
  main.variable(observer("getLineByLabel")).define("getLineByLabel", ["lines"], _getLineByLabel);
  main.variable(observer("svg")).define("svg", ["d3", "width", "height"], _svg);
  main.variable(observer("xScale")).define("xScale", ["d3", "xAxisScale"], _xScale);
  main.variable(observer("yScale")).define("yScale", ["d3", "yAxisScale"], _yScale);
  main.variable(observer("xAxis")).define("xAxis", ["height", "margin", "d3", "xScale", "xAxisScale"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin", "d3", "yScale", "yAxisScale"], _yAxis);
  main.variable(observer("xyScale")).define("xyScale", ["xScale", "yScale"], _xyScale);
  main.variable(observer("distance")).define("distance", _distance);
  main.variable(observer("interpolate")).define("interpolate", _interpolate);
  main.variable(observer("project")).define("project", _project);
  main.variable(observer("yAxisLine")).define("yAxisLine", ["interactionBoundary"], _yAxisLine);
  main.variable(observer("xAxisLine")).define("xAxisLine", ["interactionBoundary"], _xAxisLine);
  main.variable(observer("topLine")).define("topLine", ["interactionBoundary"], _topLine);
  main.variable(observer("rightLine")).define("rightLine", ["interactionBoundary"], _rightLine);
  main.variable(observer("intersectLines")).define("intersectLines", ["intersect"], _intersectLines);
  main.variable(observer("intersect")).define("intersect", _intersect);
  main.variable(observer("dropPoint")).define("dropPoint", ["xScale", "yScale"], _dropPoint);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
