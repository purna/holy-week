// Reusable conservative AABB broadphase. Coordinates may be 2D (z = 0) or 3D.
// Call clear()/insert() when static placements change; reinsert moving entities.
export class SpatialGrid {
  constructor(cellSize = 16) {
    if (!(cellSize > 0)) throw new RangeError('cellSize must be positive');
    this.cellSize = cellSize;
    this.cells = new Map();
    this.overflow = new Set();
    this._seen = new Set();
  }

  clear() { this.cells.clear(); this.overflow.clear(); }

  insert(value, min, max = min) {
    const s = this.cellSize;
    const x0 = Math.floor(min.x / s), x1 = Math.floor(max.x / s);
    const y0 = Math.floor(min.y / s), y1 = Math.floor(max.y / s);
    const z0 = Math.floor((min.z || 0) / s), z1 = Math.floor((max.z || 0) / s);
    // Large scenery must not create an unbounded number of cells.
    if ((x1 - x0 + 1) * (y1 - y0 + 1) * (z1 - z0 + 1) > 4096) {
      this.overflow.add(value);
      return;
    }
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) {
      const key = `${x},${y},${z}`;
      let cell = this.cells.get(key);
      if (!cell) this.cells.set(key, cell = []);
      cell.push(value);
    }
  }

  query(min, max = min, result = []) {
    result.length = 0;
    const seen = this._seen;
    seen.clear();
    const add = value => { if (!seen.has(value)) { seen.add(value); result.push(value); } };
    this.overflow.forEach(add);
    const s = this.cellSize;
    for (let x = Math.floor(min.x / s); x <= Math.floor(max.x / s); x++) {
      for (let y = Math.floor(min.y / s); y <= Math.floor(max.y / s); y++) {
        for (let z = Math.floor((min.z || 0) / s); z <= Math.floor((max.z || 0) / s); z++) {
          const cell = this.cells.get(`${x},${y},${z}`);
          if (cell) cell.forEach(add);
        }
      }
    }
    return result;
  }
}
