import { Origami } from '../Model/origami';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

test('Fold should not happen when face with ID does not exists', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  let isFolded = origami.singleFold(3, crease1, 1);

  expect(isFolded).toBe(false);
})

test('Fold should not happen when fold direction is not feasible', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);

  let isFolded;
  isFolded = origami.singleFold(1, crease1, 2);
  expect(isFolded).toBe(false);

  isFolded = origami.singleFold(1, crease1, -2);
  expect(isFolded).toBe(false);
})

test('Fold should not happen when face does not have fold edge', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0,1),new Point(1,0));
  origami.singleCrease(1,crease1);

  let isFolded;
  isFolded = origami.singleFold(1, crease2, 1);
  expect(isFolded).toBe(false);
})

test('Fold should not happen when face folded penetrate crease', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.1,1),new Point(1,0.1));
  origami.singleCrease(1,crease1);
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, -1);

  let isFolded;
  isFolded = origami.singleFold(3, crease2, -1);
  expect(isFolded).toBe(false);
})

test('Fold should not happen when face is floating', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0.5,0),new Point(0.5,1));
  origami.singleCrease(1,crease1);
  origami.singleFold(1, crease1, 1);

  let isFolded;
  isFolded = origami.singleFold(1, crease1, 1);
  expect(isFolded).toBe(false);
})

test('Empty layer should be removed when face is fold up and down', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0.5,0),new Point(0.5,1));
  origami.singleCrease(1, crease1);
  origami.singleFold(1, crease1, 1);
  origami.singleFold(1, crease1, -1);

  expect(origami.layers.length).toBe(1);
})

test('Twin creases should have same parent faces', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(1,0),new Point(0,1));
  origami.singleCrease(1, crease1);
  origami.singleFold(1, crease1, 1);
  let crease2 = new Edge(new Point(0.5,0.5),new Point(1,1));
  origami.singleCrease(1, crease2);

  expect(origami.getFaceByID(1).edges[2].parentFace1.id).toBe(origami.getFaceByID(1).edges[2].twin.parentFace2.id);
  expect(origami.getFaceByID(1).edges[1].parentFace1.id).toBe(origami.getFaceByID(1).edges[1].twin.parentFace2.id);
})


test('Layers should be correct when folded to top', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  origami.singleFold(1, crease1, 1);

  expect(origami.getFaceByID(1).layer).toBe(1);
  expect(origami.getFaceByID(2).layer).toBe(0);
})

test('Layers should be correct when folded to bottom', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  origami.singleFold(1, crease1, -1);

  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(1);
})

test('Layers should be correct when folded to bottom and not overlapped', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  let crease2 = new Edge(new Point(0.5,1),new Point(1,0.5));
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, -1);
  origami.singleFold(3, crease2, -1);

  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(1);
  expect(origami.getFaceByID(3).layer).toBe(0);
})

test('Layers should be correct when folded to bottom and overlapped', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  let crease2 = new Edge(new Point(0.25,1),new Point(1,0.25));
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, -1);
  origami.singleFold(3, crease2, -1);

  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(2);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and not overlapped', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  let crease2 = new Edge(new Point(0.5,1),new Point(1,0.5));
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, 1);
  origami.singleFold(3, crease2, 1);

  expect(origami.getFaceByID(1).layer).toBe(1);
  expect(origami.getFaceByID(2).layer).toBe(0);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and overlapped', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  let crease2 = new Edge(new Point(0.25,1),new Point(1,0.25));
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, 1);
  origami.singleFold(3, crease2, 1);

  expect(origami.getFaceByID(1).layer).toBe(2);
  expect(origami.getFaceByID(2).layer).toBe(0);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and overlapped completely', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,1/3),new Point(1,1/3));
  origami.singleCrease(1,crease1);
  let crease2 = new Edge(new Point(0,2/3),new Point(1,2/3));
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, 1);
  origami.singleFold(3, crease2, 1);

  expect(origami.getFaceByID(1).layer).toBe(2);
  expect(origami.getFaceByID(2).layer).toBe(0);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and bottom and not overlapped', () => {
  let origami = new Origami();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  origami.singleCrease(1,crease1);
  let crease2 = new Edge(new Point(0.5,1),new Point(1,0.5));
  origami.singleCrease(2,crease2);
  origami.singleFold(1, crease1, -1);
  origami.singleFold(3, crease2, 1);

  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(1);
  expect(origami.getFaceByID(3).layer).toBe(2);
})
