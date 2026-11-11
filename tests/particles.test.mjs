import test from 'node:test';
import assert from 'node:assert/strict';
import { createFormations, createParticleData, createAmbient } from '../src/components/cinematic/formations.ts';
import { sequenceAt, CYCLE_DURATION, PARTICLE_CONFIG, FORMATIONS } from '../src/components/cinematic/config.ts';
import { canvasComposition } from '../src/components/cinematic/layout.ts';

test('40-second timeline joins every formation, including the loop boundary', () => {
  assert.equal(CYCLE_DURATION,40);
  for(let boundary=8; boundary<=80; boundary+=8) {
    const before=sequenceAt(boundary-.000001), after=sequenceAt(boundary);
    assert.equal(before.current,after.previous);
    assert.equal(after.localTime,0);
    assert.equal(before.localTime>7.999,true);
  }
  assert.deepEqual(sequenceAt(45),sequenceAt(5));
  assert.ok(PARTICLE_CONFIG.constructionDuration<PARTICLE_CONFIG.formationDuration);
  assert.deepEqual(FORMATIONS.map(f=>f.name),['Website Construction','Connected Globe','Business Network','Responsive Transformation','Connected Digital Ecosystem']);
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
    assert.ok(max[0]-min[0]>(index===3 ? 2.8 : 4) && max[1]-min[1]>1.2,'formation is spatially legible');
    assert.ok(max[2]-min[2]>.5,'formation has real depth');
  }
});

test('responsive reflow preserves every interface particle and its section identity', () => {
  const targets=createParticleData(3000);
  for(const index of [3,4]) {
    assert.deepEqual(targets[index].features,targets[0].features,'chrome, image, text and card particles must not shuffle');
    assert.notDeepEqual(targets[index].positions,targets[0].positions);
    for(let i=3;i<targets[index].positions.length;i+=4) assert.equal(targets[index].positions[i],targets[0].positions[i],'particles retain their luminosity through reflow');
  }
});

test('ambient particles occupy every hero region, including behind the copy and near all edges', () => {
  for(const quality of [PARTICLE_CONFIG.desktop,PARTICLE_CONFIG.mobile,PARTICLE_CONFIG.lowPower]) {
    const dust=createAmbient(quality.ambient), cells=Array(12).fill(0);
    for(let i=0;i<dust.length;i+=3) {
      const column=Math.min(3,Math.floor((dust[i]+1)*2));
      const row=Math.min(2,Math.floor((dust[i+1]+1)*1.5));
      cells[row*4+column]++;
    }
    assert.ok(cells.every(n=>n>quality.ambient/18),'all four columns and three rows stay visibly populated');
    for(const [axis,sign] of [[0,-1],[0,1],[1,-1],[1,1]]) assert.ok(Array.from({length:quality.ambient},(_,i)=>dust[i*3+axis]*sign).some(n=>n>.97),'ambient samples reach every edge');
  }
});

test('formations are centered on the whole canvas across desktop, tablet and mobile', () => {
  for(const [width,height] of [[1440,900],[1920,1080],[820,1180],[390,946]]) {
    const placement=canvasComposition(width,height,9), worldWidth=9*width/height;
    assert.equal(placement.x,0,'formation cannot be anchored to a right column');
    const websiteWidth=10.4*placement.scale/worldWidth;
    assert.ok(websiteWidth>.69 && websiteWidth<.9,'website must extend substantially into both halves of the hero');
    assert.ok(Number.isFinite(placement.y));
  }
});

test('density changes preserve deterministic surface distribution and persistent ambient particles', () => {
  const compact=createFormations(350), full=createFormations(700);
  compact.forEach((data,i) => assert.deepEqual(data,full[i].subarray(0,data.length)));
  const dust=createAmbient(450);
  assert.equal(dust.length,1350);
  assert.ok(dust.every(Number.isFinite));
});
