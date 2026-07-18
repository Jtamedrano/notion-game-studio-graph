"use client";

import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "one" } },
  { id: "2", position: { x: 0, y: 120 }, data: { label: "two" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Graph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(c: Connection) => setEdges((eds) => addEdge(c, eds))}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
