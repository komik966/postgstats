import React, { FC } from 'react';
import * as d3 from 'd3';

const VerticalBarChart: FC<Props> = ({ data, color, height }) => {
  return (
    <div
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const svg = chart(
          Object.keys(data).map((label) => ({ label, value: data[label] })),
          elem.offsetWidth,
          height,
          color,
        );
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
  data: Array<{ value: number; label: string }>,
  width: number,
  height: number,
  color: string,
) => {
  const margin = { bottom: 30, left: 40, right: 0, top: 30 };
  const yData = data.map((v) => v.value);
  const yMin = 0; //d3.min(yData) || 0;
  const yMax = d3.max(yData) || 0;

  const x = d3
    .scaleBand<number>()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const svg = d3.create('svg').attr('viewBox', `0, 0, ${width}, ${height}`);

  svg
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d, i) => x(i) || 0)
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => y(yMin) - y(d.value))
    .attr('width', x.bandwidth());

  svg.append('g').call((g) =>
    g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => data[i].label)
        .tickSizeOuter(0),
    ),
  );
  svg.append('g').call((g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, '~s'))
      .call((g) => g.select('.domain').remove()),
  );

  return svg.node();
};

interface Props {
  data: Record<string, number>;
  color: string;
  height: number;
}

export default VerticalBarChart;
