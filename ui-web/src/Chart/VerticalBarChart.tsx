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
          Object.keys(data),
          Object.values(data),
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
  xData: string[],
  yData: number[],
  width: number,
  height: number,
  color: string,
) => {
  console.log(xData, yData);
  const margin = { bottom: 30, left: 40, right: 0, top: 30 };

  const x = d3
    .scaleBand()
    .domain(xData)
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([d3.min(yData) || 0, d3.max(yData) || 0])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const svg = d3.create('svg').attr('viewBox', `0, 0, ${width}, ${height}`);

  // svg
  //   .append('g')
  //   .attr('fill', color)
  //   .selectAll('rect')
  //   .data(yData)
  //   .join('rect')
  //   .attr('x', (d, i) => x(i))
  //   .attr('y', (d) => y(d.value))
  //   .attr('height', (d) => y(0) - y(d.value))
  //   .attr('width', x.bandwidth());

  svg
    .append('g')
    .call((g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)),
    );
  svg.append('g').call(
    (g) =>
      g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y)),
    // .call((g) => g.select('.domain').remove())
    // .call(
    //   (g) =>
    //     g
    //       .append('text')
    //       .attr('x', -margin.left)
    //       .attr('y', 10)
    //       .attr('fill', 'currentColor')
    //       .attr('text-anchor', 'start'),
    //   // .text(data),
    // ),
  );

  return svg.node();
};

interface Props {
  data: Record<string, number>;
  color: string;
  height: number;
}

export default VerticalBarChart;
