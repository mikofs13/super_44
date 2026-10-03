import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseChoice, shouldLoadScene, sectionProgress } from '../../src/experience/policy.ts';

test('explicit static always prevents scene loading', () => {
  for (const reduced of [true,false]) for (const consent of [true,false]) {
    assert.equal(shouldLoadScene('static',reduced,consent,false,false),false);
  }
});
test('saved 3D never overrides reduced motion without session consent', () => {
  assert.equal(shouldLoadScene('3d',true,false,false,false),false);
  assert.equal(shouldLoadScene('3d',true,true,false,false),true);
});
test('auto respects compact and data saving; explicit 3D can opt in', () => {
  assert.equal(shouldLoadScene('auto',false,false,false,false),true);
  assert.equal(shouldLoadScene('auto',false,false,true,false),false);
  assert.equal(shouldLoadScene('auto',false,false,false,true),false);
  assert.equal(shouldLoadScene('3d',false,false,true,true),true);
  assert.equal(parseChoice('invalid'),'auto');
});
test('progress is reversible and clamps direct jumps and empty ranges', () => {
  assert.deepEqual([0,100,200,100,0].map(y=>sectionProgress(y,0,200)),[0,.5,1,.5,0]);
  assert.equal(sectionProgress(-10,0,200),0);
  assert.equal(sectionProgress(900,0,200),1);
  assert.equal(sectionProgress(10,20,20),0);
});
