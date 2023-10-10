import { IGraphPoint } from "./Interfaces";

function getRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function getShortestPath(
  graph: { [id: string]: IGraphPoint },
  startId: string,
  endIds: string[]
): IGraphPoint[] {
  if (endIds.indexOf(startId) !== -1) {
      return [graph[startId]];
  }

  const queue: string[] = [];
  const visited = new Set<string>();
  const parentMap = new Map();

  queue.push(startId);
  visited.add(startId);

  while (queue.length > 0) {
      const currentId = queue.shift();

      if (!currentId) {
          break;
      }

      const currentVertex = graph[currentId];

      for (const linkedId of currentVertex.links) {
          if (!visited.has(linkedId)) {
              queue.push(linkedId);
              visited.add(linkedId);
              parentMap.set(linkedId, currentId);

              if (endIds.indexOf(linkedId) !== -1) {
                  const path = [graph[linkedId]];
                  let parent = currentId;
                  while (parent) {
                      path.unshift(graph[parent]);
                      parent = parentMap.get(parent);
                  }
                  return path;
              }
          }
      }
  }

  return [];
}

export {
    getRandomString,
    getShortestPath
};