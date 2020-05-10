import React, { FC } from 'react';
import * as d3 from 'd3';

const HorizontalBarChart: FC<Props> = ({ data, color }) => {
  if (data.length === 0) {
    return null;
  }
  return (
    <div
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const svg = chart(data, elem.offsetWidth, color);
        if (!svg) {
          return;
        }
        elem.innerHTML = '';
        elem.appendChild(svg);
      }}
    />
  );
};

const chart = (data: Data, width: number, color: string) => {
  const maxLabelLength = data.reduce(
    (prev, curr) => (curr.label.length > prev ? curr.label.length : prev),
    0,
  );
  const labelFontSize = 10;
  const margin = {
    bottom: 10,
    left: maxLabelLength * labelFontSize,
    right: 10,
    top: 30,
  };
  const barHeight = 15;
  const height =
    Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) || 0])
    .range([margin.left, width - margin.right]);
  const xAxis = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
    g
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80, '~s'))
      .call((g) => g.select('.domain').remove());

  const y = d3
    .scaleBand<number>()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);
  const yAxis = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat((i) => data[i].label)
          .tickSizeOuter(0),
      )
      .attr('font-family', 'monospace')
      .attr('font-size', `${labelFontSize}px`);

  const svg = d3.create('svg').attr('viewBox', `0, 0, ${width}, ${height}`);
  svg
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', x(0))
    .attr('y', (d, i) => y(i) || 0)
    .attr('width', (d) => x(d.value) - x(0))
    .attr('height', y.bandwidth());
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);

  return svg.node();
};

interface Props {
  data: Data;
  color: string;
}
type Data = Array<{ value: number; label: string }>;

export default HorizontalBarChart;
