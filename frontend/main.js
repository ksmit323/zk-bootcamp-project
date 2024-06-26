// example of user input: 0,0 1,2 0,4 2,5 4,6 6,7 4,6 5,4

import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/target/zk_bootcamp_project.json";


const setup = async () => {
  await Promise.all([
    import('@noir-lang/noirc_abi').then((module) =>
      module.default(new URL('@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm', import.meta.url).toString()),
    ),
    import('@noir-lang/acvm_js').then((module) =>
      module.default(new URL('@noir-lang/acvm_js/web/acvm_js_bg.wasm', import.meta.url).toString()),
    ),
  ]);
};

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitPath');
  const verifyButton = document.getElementById('verifyProof');
  const proofContainer = document.getElementById('results');
  const logsContainer = document.getElementById('logs');
  let noir;
  let generatedProof;

  submitButton.addEventListener('click', async () => {
    const backend = new BarretenbergBackend(circuit);
    noir = new Noir(circuit, backend);

    clearProofBox(proofContainer);
    clearProofBox(logsContainer);
    verifyButton.style.display = 'none';

    try {
      const userInput = document.getElementById("pathInput").value;
      console.log("User input:", userInput);
      const path = parseUserInput(userInput);
      console.log("Parsed path:", path);

      const inputs = {
        king: { x: 5, y: 4 },
        path: path,
      }

      await setup();

      display('logs', 'Generating proof... ⌛');
      generatedProof = await noir.generateProof(inputs);
      display('logs', 'Generating proof... ✅');
      displayProof(proofContainer, generatedProof.proof);
      console.log("Proof: ", generatedProof);

      verifyButton.style.display = 'inline-block';
    } catch (err) {
      console.error(err);
      display('logs', 'Oh 💔 Wrong path');
    }
  });

  verifyButton.addEventListener('click', async () => {
    if (!noir || !generatedProof) {
      display('logs', 'Error: Proof not generated yet');
      return;
    }

    try {
      display('logs', 'Verifying proof... ⌛');
      const verification = await noir.verifyProof(generatedProof);
      if (verification) {
        display('logs', 'Verifying proof... ✅');
      } else {
        display('logs', "Unable to verify proof ❌");
      }
    } catch (err) {
      console.error(err);
      display('logs', 'Error during proof verification');
    }
  });
});

function parseUserInput(input) {
  try {
    const coordinates = input.trim().split(/\s+/);

    if (coordinates.length !== 8) {
      throw new Error("Invalid input: Please provide exactly 8 coordinate pairs.");
    }

    const path = coordinates.map(coord => {
      const [x, y] = coord.split(',').map(num => {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) {
          throw new Error(`Invalid coordinate: ${coord}`);
        }
        return parsedNum;
      });
      return { x, y };
    });

    return path;
  } catch (error) {
    display('logs', error.message);
    console.error("Error parsing input:", error);
    throw error;
  }
}

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement('p');
  p.textContent = msg;
  c.appendChild(p);
}

function clearProofBox(container) {
  const paragraphs = container.querySelectorAll('p');
  paragraphs.forEach((p) => {
      container.removeChild(p);
  });
}

function displayProof(container, proof) {
  const proofElement = document.createElement('p');
  proofElement.textContent = proof;
  container.appendChild(proofElement);
}