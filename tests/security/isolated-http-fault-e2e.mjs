import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {PDFDocument} from "pdf-lib";
const base="https://flightclaimly-signing-isolated-e2e-lvbbde4br.vercel.app";
const claimId="c3333333-3333-4333-8333-333333333333";
const body={claimId,fullName:"Synthetic HTTP Fault Passenger",bookingReference:"HTTPFAULT1",viewerToken:"synthetic-http-fault-token-20261015",signatureDataUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/uXcAAAAASUVORK5CYII="};
async function call(payload){const r=await fetch(base+"/api/authority/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload),signal:AbortSignal.timeout(90000)});return {status:r.status,bytes:Buffer.from(await r.arrayBuffer())};}
const mode=process.env.FAULT_PHASE;
assert.ok(["inject","recover"].includes(mode),"Explicit fault phase required");
const wrong=await call({...body,viewerToken:"incorrect"});assert.equal(wrong.status,403);
const first=await call(body);
if(mode==="inject"){
assert.equal(first.status,500,"Injected DB metadata failure must produce HTTP 500: "+first.bytes.toString().slice(0,250));
assert.match(first.bytes.toString(),/Authority metadata save failed|Failed to generate PDF/);
const retry=await call(body);
assert.equal(retry.status,500,"While fault remains, retry must fail safely, not overwrite evidence");
assert.match(retry.bytes.toString(),/Authority metadata repair failed|Failed to generate PDF/);
console.log(JSON.stringify({test:"http-fault-injection",result:"PASS",first:first.status,retry:retry.status,wrongToken:wrong.status}));
}else{
assert.equal(first.status,200,"Recovery must return stored PDF: "+first.bytes.toString().slice(0,250));
assert.equal(first.bytes.subarray(0,5).toString(),"%PDF-");
const parsed=await PDFDocument.load(first.bytes);assert.equal(parsed.getPageCount(),2);
const retry=await call(body);assert.equal(retry.status,200);assert.deepEqual(retry.bytes,first.bytes);
console.log(JSON.stringify({test:"http-fault-recovery",result:"PASS",status:first.status,retry:retry.status,pages:parsed.getPageCount(),sha256:createHash("sha256").update(first.bytes).digest("hex"),bytes:first.bytes.length,wrongToken:wrong.status}));
}