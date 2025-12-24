import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import gsap from 'gsap';
import type { GeoPermissibleObjects } from 'd3';
import type { GeoJSON } from 'geojson';

interface InteractiveMapProps {
  data: GeoJSON | null;
  width?: number;
  height?: number;
  onRegionClick?: (region: any) => void;
}

export default function InteractiveMap({
  data,
  width = 1200,
  height = 800,
  onRegionClick,
}: InteractiveMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    // Create projection
    const projection = d3
      .geoMercator()
      .fitSize([width, height], data as GeoPermissibleObjects);

    const pathGenerator = d3.geoPath().projection(projection);

    // Color scale based on development metrics
    const colorScale = d3
      .scaleSequential()
      .domain([0, 100])
      .interpolator(d3.interpolateViridis);

    // Render regions
    const paths = svg
      .append('g')
      .selectAll('path')
      .data((data as any).features || [])
      .join('path')
      .attr('d', pathGenerator as any)
      .attr('fill', (d: any) => {
        const gdp = d.properties?.gdp || Math.random() * 100;
        return colorScale(gdp);
      })
      .attr('stroke', '#D2FF00')
      .attr('stroke-width', 0.5)
      .style('cursor', 'pointer');

    // Add hover effects
    paths
      .on('mouseenter', function (event, d: any) {
        setHoveredRegion(d.properties?.name || 'Unknown');
        gsap.to(this, {
          fill: '#D2FF00',
          strokeWidth: 2,
          duration: 0.3,
          ease: 'power2.out',
        });
      })
      .on('mouseleave', function (event, d: any) {
        setHoveredRegion(null);
        const gdp = d.properties?.gdp || Math.random() * 100;
        gsap.to(this, {
          fill: colorScale(gdp),
          strokeWidth: 0.5,
          duration: 0.3,
        });
      })
      .on('click', (event, d) => {
        if (onRegionClick) {
          onRegionClick(d);
        }
      });

    // Add labels for major regions
    if ((data as any).features) {
      svg
        .append('g')
        .selectAll('text')
        .data((data as any).features)
        .join('text')
        .attr('transform', (d: any) => {
          const centroid = pathGenerator.centroid(d);
          return `translate(${centroid[0]}, ${centroid[1]})`;
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text((d: any) => d.properties?.name || '');
    }
  }, [data, width, height, onRegionClick]);

  return (
    <div className="relative">
      <svg ref={svgRef} width={width} height={height} className="bg-black/50 rounded-lg" />
      {hoveredRegion && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-lg border border-lime-400 px-4 py-2 rounded-lg text-lime-400">
          {hoveredRegion}
        </div>
      )}
    </div>
  );
}

