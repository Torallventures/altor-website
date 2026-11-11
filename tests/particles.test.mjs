import test from 'node:test';
import assert from 'node:assert/strict';
import { createFormations, createAmbient } from '../src/components/cinematic/formations.ts';
import { sequenceAt, CYCLE_DURATION, PARTICLE_CONFIG } from '../src/components/cinematic/config.ts';

test('40-second timeline joins every formation, including the loop boundary', () => {
  assert.equal(CYCLE_DURATION,40);
  for(let boundary=8; boundary<=80; boundary+=8) {
    const before=sequenceAt(boundary-.000001), after=sequenceAt(boundary);
    assert.equal(before.current,after.previous);
    assert.equal(after.localTime,0);
    assert.equal(before.localTime>7.999,true);
  }
  assert.deepEqual(sequenceAt(45),sequenceAt(5));
  assert.ok(PARTICLE_CONFIG.chartConstructionDuration<PARTICLE_CONFIG.formationDuration);
});

test('all five authored surfaces have finite positions, meaningful depth and equal particle identities', () => {
  const data=createFormations(PARTICLE_CONFIG.mobile.particles);
  assert.equal(data.length,5);
  for(const [index,formation] of data.entries()) {
    assert.equal(formation.length,PARTICLE_CONFIG.mobile.particles*4);
    const min=[Infinity,Infinity,Infinity], max=[-Infinity,-Infinity,-Infinity];
    for(let i=0;i<formation.length;i+=4) {
      for(let axis=0;axis<3;axis++) {
        const value=formation[i+axis]; assert.ok(Number.isFinite(value),`formation ${index}, particle ${i/4}`);
        min[axis]=Math.min(min[axis],value); max[axis]=Math.max(max[axis],value);
        assert.ok(Math.abs(value)<8,'geometry must fit its camera envelope');
      }
      assert.ok(formation[i+3]>0 && formation[i+3]<2,'particles remain luminous through a morph');
    }
    assert.ok(max[0]-min[0]>4 && max[1]-min[1]>1.2,'formation is spatially legible');
    assert.ok(max[2]-min[2]>.5,'formation has real depth');
  }
});

test('density changes preserve deterministic surface distribution and persistent ambient particles', () => {
  const compact=createFormations(350), full=createFormations(700);
  compact.forEach((data,i) => assert.deepEqual(data,full[i].subarray(0,data.length)));
  const dust=createAmbient(450);
  assert.equal(dust.length,1350);
  assert.ok(dust.every(Number.isFinite));
});
