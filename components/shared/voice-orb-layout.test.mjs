import assert from 'node:assert/strict';
import test from 'node:test';
import { getOrbLayout } from './voice-orb-layout.ts';

test('desktop projection preserves the existing composition and resolution cap', () => {
  const layout = getOrbLayout(1440, 720, 2);
  assert.equal(layout.profile, 'desktop');
  assert.equal(layout.scale, 0.53);
  assert.equal(layout.centerY, 0.12);
  assert.equal(layout.dpr, 1.5);
  assert.deepEqual(layout.shells.map(s => s.rings), [52, 76, 112]);
});

test('mobile and tablet projection fits the reserved frame in either orientation', () => {
  for (const [width, height] of [[320, 260], [375, 285], [390, 296.4], [430, 326.8], [768, 520], [1024, 520], [430, 700]]) {
    const layout = getOrbLayout(width, height, 3);
    assert.equal(layout.centerY, 0);
    assert.ok(layout.scale * height <= Math.min(width, height) * 0.64 + 0.001);
    assert.ok(layout.dpr <= 1.25);
  }
});

test('render quality follows viewport breakpoints without exceeding the device resolution', () => {
  const mobile = getOrbLayout(390, 296.4, 3);
  const tablet = getOrbLayout(1024, 520, 3);
  const desktop = getOrbLayout(1440, 720, 3);
  const density = layout => layout.shells.reduce((n, s) => n + s.rings * s.eqDots, 0);
  assert.ok(density(mobile) < density(tablet));
  assert.ok(density(tablet) < density(desktop));
  assert.equal(getOrbLayout(767, 520, 1).profile, 'mobile');
  assert.equal(getOrbLayout(768, 520, 1).profile, 'tablet');
  assert.equal(getOrbLayout(1279, 520, 1).profile, 'tablet');
  assert.equal(getOrbLayout(1280, 640, 1).profile, 'desktop');
  assert.equal(getOrbLayout(390, 296.4, 0.75).dpr, 0.75);
});
