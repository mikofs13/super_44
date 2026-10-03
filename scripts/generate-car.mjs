import { BoxGeometry, CylinderGeometry } from 'three';
import { mkdir, writeFile } from 'node:fs/promises';

// Original generic open-wheel greybox. Shared unit meshes, meters, +Z nose.
const chunks = [], bufferViews = [], accessors = [];
let byteOffset = 0;
function accessor(array, itemSize, type) {
  const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
  const padded = Buffer.alloc(Math.ceil(bytes.length / 4) * 4); bytes.copy(padded);
  const view = bufferViews.push({ buffer: 0, byteOffset, byteLength: bytes.length }) - 1;
  chunks.push(padded); byteOffset += padded.length;
  const result = { bufferView: view, componentType: array instanceof Float32Array ? 5126 : 5123, count: array.length / itemSize, type };
  if (type === 'VEC3') {
    result.min = [Infinity, Infinity, Infinity]; result.max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < array.length; i++) { const axis = i % 3; result.min[axis] = Math.min(result.min[axis], array[i]); result.max[axis] = Math.max(result.max[axis], array[i]); }
  }
  return accessors.push(result) - 1;
}
function geometry(value) {
  return { attributes: { POSITION: accessor(value.attributes.position.array, 3, 'VEC3'), NORMAL: accessor(value.attributes.normal.array, 3, 'VEC3') }, indices: accessor(value.index.array, 1, 'SCALAR') };
}
const box = geometry(new BoxGeometry(1, 1, 1));
const wheel = geometry(new CylinderGeometry(1, 1, 1, 20));
const colors = [[.7,.23,.055,1], [.055,.065,.055,1], [.63,.66,.57,1], [.85,.76,.55,1]];
const materials = colors.map((baseColorFactor, i) => ({ name: ['Signal paint','Rubber and chassis','Brushed metal','Ivory marking'][i], pbrMetallicRoughness: { baseColorFactor, metallicFactor: i === 2 ? .55 : .08, roughnessFactor: i === 1 ? .94 : .52 } }));
const meshes = [0,1,2,3].map(material => ({ primitives: [{ ...box, material }] }));
meshes.push({ primitives: [{ ...wheel, material: 1 }] });
meshes.push({ primitives: [{ ...wheel, material: 2 }] });
const nodes = [];
function part(name, mesh, translation, scale, rotation) { nodes.push({ name, mesh, translation, scale, ...(rotation ? { rotation } : {}) }); }
part('Floor',1,[0,.25,0],[1.6,.16,4.8]);
part('Monocoque',0,[0,.65,-.25],[.8,.62,2.5]);
part('Nose',0,[0,.48,1.65],[.43,.3,1.8]);
part('Left sidepod',0,[-.7,.48,-.5],[.6,.45,1.85]);
part('Right sidepod',0,[.7,.48,-.5],[.6,.45,1.85]);
part('Cockpit',1,[0,1,-.2],[.58,.12,.72]);
part('Headrest',1,[0,1.04,-.65],[.6,.22,.2]);
part('Roll hoop',2,[0,1.13,-.8],[.18,.4,.15]);
part('Front wing',1,[0,.29,2.55],[2.75,.12,.6]);
part('Front wing signal',0,[0,.34,2.76],[2.75,.08,.15]);
part('Rear wing',0,[0,1.15,-2.35],[2.3,.16,.6]);
for (const x of [-.65,.65]) part('Rear wing strut',1,[x,.7,-2.35],[.08,.9,.2]);
for (const z of [-1.65,1.7]) {
  part('Axle',2,[0,.46,z],[2.45,.06,.1]);
  for (const x of [-1.15,1.15]) {
    const rotation = [0,0,Math.SQRT1_2,Math.SQRT1_2];
    part('Tire',4,[x,.5,z],[.5,.46,.5],rotation);
    part('Hub',5,[x + Math.sign(x)*.235,.5,z],[.25,.012,.25],rotation);
  }
}
part('Nose marking',3,[0,.636,1.7],[.16,.014,.65]);
const gltf = { asset: { version: '2.0', generator: 'Super 44 original greybox generator' }, scene:0, scenes:[{nodes:nodes.map((_,i)=>i)}], nodes, meshes, materials, accessors, bufferViews, buffers:[{byteLength:byteOffset,uri:`data:application/octet-stream;base64,${Buffer.concat(chunks).toString('base64')}`}] };
await mkdir('public/models',{recursive:true});
await writeFile('public/models/placeholder-car.gltf',JSON.stringify(gltf));
console.log(`Generated original car: ${nodes.length} parts, ${byteOffset} geometry bytes.`);
