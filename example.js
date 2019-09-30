const fs = require("fs");
const WASI = require("@wasmer/wasi");

const file = "./cowsay.wasm";

// Instantiate a new WASI Instance
let wasi = new WASI({ args: ["cowsay", "a"], env: {} });

// Instantiating the WebAssembly file
const wasm_bytes = new Uint8Array(fs.readFileSync(file)).buffer;
WebAssembly.instantiate(wasm_bytes, {
  wasi_unstable: wasi.wasiImport,
}).then(wasm => {
    console.log("STARTING");
  wasi.start(wasm.instance);
  console.log("ENDING");
});
