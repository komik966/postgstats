import React, { FC } from 'react';
import * as d3 from 'd3';

const VerticalBarChart: FC<Props> = ({ data, color, height }) => {
  return (
    <div
      ref={elem => {
        if (!elem) {
          return;
        }
        const svg = chart(data, elem.offsetWidth, height, color);
        if (!svg) {
          return;
        }
        elem.innerHTML = '';
        elem.appendChild(svg);
      }}
    />
  );
};

const chart = (
  dataRemote: Props['data'],
  width: number,
  height: number,
  color: string,
) => {
  const margin = { top: 30, right: 0, bottom: 30, left: 40 };
  const data = Object.assign(
    Object.keys(dataRemote).reduce(
      (prev, curr) => [...prev, { name: curr, value: dataRemote[curr] }],
      [],
    ),
    { format: 'kB', y: 'Rozmiar' },
  );
  const yAxis = g =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(data.y),
      );
  const xAxis = g =>
    g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat(i => data[i].name)
        .tickSizeOuter(0),
    );
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const svg = d3.create('svg').attr('viewBox', `0, 0, ${width}, ${height}`);

  svg
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', d => y(d.value))
    .attr('height', d => y(0) - y(d.value))
    .attr('width', x.bandwidth());
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);

  return svg.node();
};

interface Props {
  data: Record<number | string, number | string>;
  color: string;
  height: number;
}

export default VerticalBarChart;
