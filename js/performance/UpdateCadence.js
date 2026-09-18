// Wall-clock display/proximity scheduling; never catch up missed UI ticks.
export class UpdateCadence {
  constructor(hz) { this.interval = 1000 / hz; this.next = 0; }
  due(now) {
    if (now < this.next) return false;
    this.next = now + this.interval - ((now - this.next) % this.interval);
    return true;
  }
  reset() { this.next = 0; }
}
