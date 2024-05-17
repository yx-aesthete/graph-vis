import React from "react";

const Edge = ({ edge, nodes }) => {
  const sourceNode = nodes.find((node) => node.id === edge.source);
  const targetNode = nodes.find((node) => node.id === edge.target);

  // Debugging: Log coordinates to check if they are correct
  console.log("Edge:", {
    x1: sourceNode?.x,
    y1: sourceNode?.y,
    x2: targetNode?.x,
    y2: targetNode?.y,
  });

  if (!sourceNode || !targetNode) {
    return null; // Return null if source or target node is not found
  }

  return (
    <line
      x1={sourceNode.x}
      y1={sourceNode.y}
      x2={targetNode.x}
      y2={targetNode.y}
      stroke="black"
      strokeWidth="2" // Ensure stroke width is sufficient for visibility
    />
  );
};

export default Edge;
