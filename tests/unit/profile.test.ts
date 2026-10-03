import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateProfile } from '../../src/content/profile-schema.ts';
const empty = JSON.parse(readFileSync('src/content/profile.json','utf8').replace(/^\uFEFF/,''));
test('empty optional personal sections and current skill content are valid',()=>assert.doesNotThrow(()=>validateProfile(empty)));
test('profile authoring supports add/remove education, experience, credentials and contacts',()=>{
 const record={...empty,education:[{institution:'Test institution',qualification:'Test qualification',location:'',period:'2020–2024'}],experience:[{organization:'Test organization',role:'Test role',period:'2024',context:'',highlights:['Test fixture']}],certificates:[{title:'Test credential',issuer:'Test issuer',date:'',url:'https://example.com/credential'}],contact:{email:'test@example.com',message:'Test fixture',links:[{label:'GitHub',url:'https://github.com/example'}]}};assert.doesNotThrow(()=>validateProfile(record));assert.doesNotThrow(()=>validateProfile({...record,education:[],experience:[],certificates:[]}));
});
test('reject malformed content and unsafe links or image paths',()=>{
 assert.throws(()=>validateProfile({...empty,experience:[{role:'missing organization'}]}),/organization/);assert.throws(()=>validateProfile({...empty,photo:{src:'/images/../secret.png',alt:'test'}}),/photo/);assert.throws(()=>validateProfile({...empty,photo:{src:'/images/profile/me.webp',alt:''}}),/photo/);assert.throws(()=>validateProfile({...empty,contact:{...empty.contact,email:'invalid'}}),/email/);assert.throws(()=>validateProfile({...empty,contact:{...empty.contact,links:[{label:'unsafe',url:'javascript:alert(1)'}]}}),/URL/);
});
