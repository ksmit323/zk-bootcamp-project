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

document.getElementById('submitPath').addEventListener('click', async () => {
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit, backend);

  try {

    // Retrieve and parse user's path input
    const userInput = document.getElementById("pathInput").value;
    console.log("User input:", userInput);
    const path = parseUserInput(userInput);
    console.log("Parsed path:", path);

    // Set up inputs for proof
    const inputs = {
      king: { x: 5, y: 4 },
      path: path,
    }

    await setup(); // squeeze wasm inits here

    // Generate and diplay proof
    display('logs', 'Generating proof... ⌛');
    const proof = await noir.generateProof(inputs);
    display('logs', 'Generating proof... ✅');
    display('results', proof.proof);

    // Generate verification
    display('logs', 'Verifying proof... ⌛');
    const verification = await noir.verifyProof(proof);
    if (verification) {
      display('logs', 'Verifying proof... ✅');
    } else {
      display('logs', "Unable to verify proof ❌");
    }

  } catch (err) {
    console.error(err);
    display('logs', 'Oh 💔 Wrong path');
  }
});

function parseUserInput(input) {
  try {
    // Split the input into individual coordinate pairs
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