import React, { useState } from "react";

import PropTypes from "prop-types";
import "./../../styles/buildGraph.styles.scss";

const BuildGraph = ({
  nodes,
  edges,
  transform,
  nodeSize,
  svgWidth,
  svgHeight,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  if (!nodes || !edges) {
    return null;
  }

  // console.log("Nodes - from BuildGraph: ", nodes);
  // console.log("Edges - from BuildGraph: ", edges);

  const minX = Math.min(...nodes.map((node) => node.x));
  const maxX = Math.max(...nodes.map((node) => node.x));
  const minY = Math.min(...nodes.map((node) => node.y));
  const maxY = Math.max(...nodes.map((node) => node.y));
  const graphWidth = maxX - minX;
  const graphHeight = maxY - minY;

  // Calculate the center of the graph
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  // console.log("Graph center: ", { centerX, centerY });

  // Calculate positions for the dots in the middle of the edges of the red rectangle
  const midTopX = centerX * transform.scale + transform.translateX;
  const midTopY = minY * transform.scale + transform.translateY;
  const midBottomX = centerX * transform.scale + transform.translateX;
  const midBottomY = maxY * transform.scale + transform.translateY;
  const midLeftX = minX * transform.scale + transform.translateX;
  const midLeftY = centerY * transform.scale + transform.translateY;
  const midRightX = maxX * transform.scale + transform.translateX;
  const midRightY = centerY * transform.scale + transform.translateY;

  return (
    <svg
      className="graph"
      style={{ width: "100%", height: "100%" }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`} // Use the passed SVG dimensions
    >
      {edges.map((edge, index) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        if (
          !sourceNode ||
          !targetNode ||
          isNaN(sourceNode.x) ||
          isNaN(sourceNode.y) ||
          isNaN(targetNode.x) ||
          isNaN(targetNode.y)
        ) {
          return null;
        }

        return (
          <line
            key={index}
            x1={sourceNode.x * transform.scale + transform.translateX}
            y1={sourceNode.y * transform.scale + transform.translateY}
            x2={targetNode.x * transform.scale + transform.translateX}
            y2={targetNode.y * transform.scale + transform.translateY}
            className="edge"
          />
        );
      })}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x * transform.scale + transform.translateX}
          cy={node.y * transform.scale + transform.translateY}
          r={nodeSize * window.innerWidth * 0.001} // Adjust radius based on scale
          className="node"
          onMouseEnter={() => {
            console.log(`Hovering over node: ${node.id}`);
            setHoveredNodeId(node.id);
          }}
          onMouseLeave={() => setHoveredNodeId(null)}
          fill={hoveredNodeId === node.id ? "red" : "blue"} // Change color on hover
        />
      ))}
      {/* Red rectangle */}
    </svg>
  );
};

BuildGraph.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  transform: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
  }).isRequired,
  nodeSize: PropTypes.number.isRequired,
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
};

export default BuildGraph;
