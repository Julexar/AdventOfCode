require('regenerator-runtime/runtime');
const fs = require('fs');
const { mincut } = require('@graph-algorithm/minimum-cut');

const cutConnection = (connections, componentA, componentB) => {
    const nodesA = connections.get(componentA);
    const nodesB = connections.get(componentB);
  
    connections.set(componentA, nodesA.filter((c) => c !== componentB) || []);
    connections.set(componentB, nodesB.filter((c) => c !== componentA) || []);
  
    return connections;
};

const getComponentGroups = (connections) => {
    const groups = [];
    const visited = new Set();
  
    for (const component of connections.keys()) {
      if (visited.has(component)) continue;
  
      const group = [];
      const queue = [component];
  
      while (queue.length > 0) {
        const connectedComponent = queue.pop();
  
        if (visited.has(connectedComponent)) continue;
        visited.add(connectedComponent);
  
        group.push(connectedComponent);
        queue.push(...connections.get(connectedComponent));
      }
  
      groups.push(group);
    }
  
    return groups;
};

const getComponentGroupSizes = () => {
    const connections = [];
    const connectionsMap = new Map();
  
    input.split("\n").forEach((line) => {
      const [component, connectedComponentsString] = line.split(": ");
      let connectedComponents = connectedComponentsString.split(" ");
  
      if (!connectionsMap.has(component)) {
        connectionsMap.set(component, connectedComponents);
      } else {
        connectionsMap.get(component).push(...connectedComponents);
      }
  
      for (const connectedComponent of connectedComponents) {
        connections.push([component, connectedComponent]);
  
        if (!connectionsMap.has(connectedComponent))
          connectionsMap.set(connectedComponent, []);
  
        const alreadyConnectedComponents = connectionsMap.get(connectedComponent);
  
        alreadyConnectedComponents.push(component);
      }
    });
  
    for (const [componentA, componentB] of mincut(connections)) {
      cutConnection(connectionsMap, componentA, componentB);
    }
  
    const groups = getComponentGroups(connectionsMap);
  
    return groups[0].length * groups[1].length;
};

const input = fs.readFileSync('./Snowverload/text.txt', 'utf8');

console.log("Solution:", getComponentGroupSizes());