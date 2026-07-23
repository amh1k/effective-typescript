//Item 23: Be Consistent in Your Use of Aliases

const place = { name: "New York", latLng: [41.6868, -74.2692] };
const loc = place.latLng;

interface Coordinate {
  x: number;
  y: number;
}
interface BoundingBox {
  x: [number, number];
  y: [number, number];
}
interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  if (polygon.bbox) {
    if (
      pt.x < polygon.bbox.x[0] ||
      pt.x > polygon.bbox.x[1] ||
      pt.y < polygon.bbox.y[0] ||
      pt.y > polygon.bbox.y[1]
    ) {
      return false;
    }
  } // ... more complex check
}

function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (
      pt.x < box.x[0] ||
      pt.x > box.x[1] ||
      // ~~~ 'box' is possibly 'undefined'
      pt.y < box.y[0] ||
      pt.y > box.y[1]
    ) {
      // ~~~'box' is possibly 'undefined'
      return false;
    }
  }

  /*
The property check refines the type of polygon.bbox but not the type of
box, hence the errors. This leads us to the golden rule of aliasing: if you
introduce an alias, use it consistently.
Using box in the property check fixes the error

*/

  function isPointInPolygonCorrect(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox;
    if (box) {
      if (
        pt.x < box.x[0] ||
        pt.x > box.x[1] ||
        pt.y < box.y[0] ||
        pt.y > box.y[1]
      ) {
        // OK
        return false;
      }
    }
  }
}

/*
Object destructuring syntax rewards consistent naming by letting us write
more concise code. You can even use it on arrays and nested structures:
*/
function isPointInPolygonWithDestructuring(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon;
  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
      return false;
    }
  }
  // ...
}

/*Things to Remember
Aliasing can prevent TypeScript from narrowing types. If you create
an alias for a variable, use it consistently.
Be aware of how function calls can invalidate type refinements on
properties. Trust refinements on local variables more than on
properties.
*/
