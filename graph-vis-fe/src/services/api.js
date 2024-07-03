import axios from "axios";

const API_URL = "http://127.0.0.1:5001";

// it's legacy actually but I will hold it to show the path

export const getBfsTraversal = async (graph) => {
  const response = await axios.post(`${API_URL}/traversal/bfs`, graph);
  return response.data;
};

export const getDfsTraversal = async (graph) => {
  const response = await axios.post(`${API_URL}/traversal/dfs`, graph);
  return response.data;
};

export const generateRandomTreeGraphForTraversal = async (numNodes) => {
  const response = await axios.post(
    `${API_URL}/generate_random_tree_graph_for_traversal`,
    {
      num_nodes: numNodes,
    }
  );
  return response.data;
};

export const generateRandomBuildGraph = async (
  numNodes,
  numEdges,
  connectivity,
  additionalParams = {}
) => {
  const response = await axios.post(`${API_URL}/generate_random_build_graph`, {
    num_nodes: numNodes,
    num_edges: numEdges,
    connectivity: connectivity,
    additional_params: additionalParams,
  });
  console.log("🚀 ~ response:", response);
  return response.data;
};

export const generateTraversalSequence = async (
  graph,
  startNode,
  algorithm,
  goalNode = null
) => {
  const response = await axios.post(`${API_URL}/traversal`, {
    graph: graph,
    start_node: startNode,
    algorithm: algorithm,
    goal_node: goalNode,
  });
  return response.data;
};
