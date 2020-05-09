import React, { FC } from 'react';
import * as d3 from 'd3';

const ScatterPlot: FC<Props> = ({ data, height, xLabel, yLabel }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <div
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const svg = chart(data, elem.offsetWidth, height, xLabel, yLabel);
        if (!svg) {
          return;
        }
        elem.innerHTML = '';
        elem.appendChild(svg);
      }}
    />
  );
};

// https://observablehq.com/@d3/scatterplot
const chart = (
  data: Data,
  width: number,
  height: number,
  xLabel: string,
  yLabel: string,
) => {
  const margin = { bottom: 35, left: 40, right: 20, top: 25 };
  const xDomain = d3.extent(data, (d) => d.x);
  const yDomain = d3.extent(data, (d) => d.y);

  const x = d3
    .scaleLinear()
    .domain([xDomain[0] || 0, xDomain[1] || 0])
    .nice()
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([yDomain[0] || 0, yDomain[1] || 0])
    .nice()
    .range([height - margin.bottom, margin.top]);
  const xAxis = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', width)
          .attr('y', margin.bottom - 4)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .text(xLabel),
      );
  const yAxis = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(yLabel),
      );
  const grid = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
    g
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1)
      .call((g) =>
        g
          .append('g')
          .selectAll('line')
          .data(x.ticks())
          .join('line')
          .attr('x1', (d) => 0.5 + x(d))
          .attr('x2', (d) => 0.5 + x(d))
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom),
      )
      .call((g) =>
        g
          .append('g')
          .selectAll('line')
          .data(y.ticks())
          .join('line')
          .attr('y1', (d) => 0.5 + y(d))
          .attr('y2', (d) => 0.5 + y(d))
          .attr('x1', margin.left)
          .attr('x2', width - margin.right),
      );

  const svg = d3.create('svg').attr('viewBox', `0, 0, ${width}, ${height}`);

  svg.append('g').call(xAxis);

  svg.append('g').call(yAxis);

  svg.append('g').call(grid);

  svg
    .append('g')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => x(d.x))
    .attr('cy', (d) => y(d.y))
    .attr('r', 3);

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('dy', '0.35em')
    .attr('x', (d) => x(d.x) + 7)
    .attr('y', (d) => y(d.y))
    .text((d) => d.name);

  return svg.node();
};

interface Props {
  data: Data;
  height: number;
  xLabel: string;
  yLabel: string;
}
type Data = Array<{ name: string; x: number; y: number }>;

export default ScatterPlot;
