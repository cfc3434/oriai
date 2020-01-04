import { Edge } from '../Model/edge';
import { Point } from '../Model/point';
import { Face } from '../Model/face';

test('Should not intersect when edge is collinear with one of the edges of face', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = face.intersectEdge(new Edge(new Point(0,1),new Point(0,0)));
  let e2 = face.intersectEdge(new Edge(new Point(0,1),new Point(0,0)), true);
  expect(e1).toBe(null);
  expect(e2).toBe(null);
});

test('Should not intersect when both endpoints are not touching and not infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = face.intersectEdge(new Edge(new Point(0.25,0.5),new Point(0.75,0.5)));

  expect(e1).toBe(null);
});

test('Should not intersect when one endpoints is not touching and not infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = face.intersectEdge(new Edge(new Point(0,0),new Point(0.5,0.5)));

  expect(e1).toBe(null);
});

test('Should intersect correctly when not infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = face.intersectEdge(new Edge(new Point(0,0),new Point(1,1)));
  let e2 = face.intersectEdge(new Edge(new Point(0.5,0),new Point(0.5,1)));

  expect(e1.isEqual(new Edge(new Point(0,0),new Point(1,1)))).toBe(true);
  expect(e2.isEqual(new Edge(new Point(0.5,0),new Point(0.5,1)))).toBe(true);
});

test('Should intersect correctly when infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = face.intersectEdge(new Edge(new Point(0.5,0.1),new Point(0.5,0.9)), true);
  let e2 = face.intersectEdge(new Edge(new Point(0.1,0.1),new Point(0.8,0.8)), true);

  expect(e1.isEqual(new Edge(new Point(0.5,0),new Point(0.5,1)), true)).toBe(true);
  expect(e2.isEqual(new Edge(new Point(0,0),new Point(1,1)), true)).toBe(true);
});

test('Should return index if given edge is the same as one of the edges of face when not infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = new Edge(new Point(0,1),new Point(0,0));
  let list = face.edgeIndexList(e1);
  expect(list[0]).toBe(3);
});

test('Should return -1 if given edge is not the same as one of the edges of face when not infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = new Edge(new Point(0,1),new Point(0,0.1));
  let list = face.edgeIndexList(e1);
  expect(list.length).toBe(0);
});


test('Should return index if given edge is shorter or longer than but collinear with the edge of face when infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = new Edge(new Point(0,0.1),new Point(0,0.6));
  let list = face.edgeIndexList(e1, true);
  expect(list[0]).toBe(3);

  let e2 = new Edge(new Point(0,-1),new Point(0,2));
  list = face.edgeIndexList(e2, true);
  expect(list[0]).toBe(3);
});

test('Should return -1 if given edge is shorter or longer than but collinear with the edge of face when not infinite length', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = new Edge(new Point(0,0.1),new Point(0,0.6));
  let list = face.edgeIndexList(e1);
  expect(list.length).toBe(0);

  let e2 = new Edge(new Point(0,-1),new Point(0,2));
  list = face.edgeIndexList(e2);
  expect(list.length).toBe(0);
});
