import { BarretenbergBackend, BarretenbergVerifier as Verifier } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/target/zk_bootcamp_project.json";

document.addEventListener("DOMContentLoaded", async () => {
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit, backend);

  try {

    // Set up inputs for proof
    const inputs = {
      king: { x: 5, y: 4 },
      path: [
        { x: 0, y: 0},
        { x: 1, y: 2},
        { x: 0, y: 4},
        { x: 2, y: 5},
        { x: 4, y: 6},
        { x: 6, y: 7},
        { x: 4, y: 6},
        { x: 5, y: 4},
      ],
    }

    // Generate and diplay proof
    display('logs', 'Generating proof... ⌛');
    const proof = await noir.generateProof(inputs);
    display('logs', 'Generating proof... ✅');
    display('results', proof.proof);
    console.log("Proof: ", proof);

    // Generate verification
    display('logs', 'Verifying proof... ⌛');
    const verification = await noir.verifyProof(proof);
    if (verification) {
      display('logs', 'Verifying proof... ✅');
    } else {
      display('logs', "Unable to verify proof");
    }

    // display('logs', 'Verifying proof... ⌛');
    // const verificationKey = await backend.getVerificationKey();
    // const verifier = new Verifier();
    // const isValid = await verifier.verifyProof(proof, verificationKey);
    // if (isValid) {
    //   display('logs', 'Verifying proof... ✅');
    // } else {
    //   display('logs', "Unable to verify proof :(");
    // }

  } catch (err) {
    console.error(err);
    display('logs', 'Oh 💔 Wrong path');
  }
});

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement('p');
  p.textContent = msg;
  c.appendChild(p);
}
