# ZK Chess: A Knight's Path

This project is a Zero Knowledge Proof (ZKP) implementation developed as part of the final project for the Encode Zero Knowledge Bootcamp. It demonstrates the use of ZKP in a chess-like scenario, showcasing the ability to prove knowledge of a solution without revealing the solution itself.

## Project Overview
The premise of this project is based on a chess scenario:

- We have an 8x8 chess board.
- A knight piece starts at the bottom left corner (position 0,0).
- A king is placed at a known position on the board.
- The prover (player) must move the knight to capture the king in exactly **8 moves**.
- The path taken by the knight is private information.

The goal of this Zero Knowledge Proof is to prove that the prover knows a valid path for the knight to capture the king in exactly 8 moves, without revealing the actual path taken.

<p align="center">
  <img src="assets/chess.png" alt="Crypto Cat" width="400"/>
</p>

## Technical Details
This project is implemented using Noir, a domain-specific language for writing zero-knowledge proofs. The main components of the proof system are:

1. **Prover**: Generates a proof of knowing a valid path.
2. **Verifier**: Verifies the proof without learning the path.
3. **Public Inputs**: The starting position of the knight (always 0,0) and the position of the king.
4. **Private Inputs**: The path taken by the knight (represented as an array of 8 moves).

The proof ensures:

- The knight starts at (0,0) and ends at the king's position.
- All moves are valid knight moves.
- The path consists of exactly 8 moves.
- All positions are within the 8x8 board.

## Project Structure
```bash
├── Nargo.toml
├── proofs
│   └── zk_bootcamp_project.proof
├── Prover.toml
├── src
│   ├── board.nr
│   ├── main.nr
│   ├── tests
│   │   └── valid_path_test_1.nr
│   └── tests.nr
├── target
│   ├── debug_zk_bootcamp_project.json
│   └── zk_bootcamp_project.json
└── Verifier.toml
```
- ```Nargo.toml```: Configuration file for the Noir project.
- ```proofs/```: Directory containing generated proofs.
- ```Prover.toml``` & ```Verifier.toml```: Configuration files for the prover and verifier.
- ```src/```: Source code directory.
  - ```board.nr```: Contains the logic for validating the knight's path.
  - ```main.nr```: The main entry point of the program.
  - ```tests/```: Directory for test files.
  - ```tests.nr```: Contains test cases for the project.
- ```target/```: Output directory for compiled files.

## Code Explanation

### main.rs
```rust
mod board;
mod tests;
fn main(
    king: pub board::Square,
    path: [board::Square; 8]
) {
    board::is_valid_path(path, king);
}
```
This is the main entry point of the program. It takes two inputs:

```king```: A public input representing the king's position.
```path```: A private input representing the knight's path as an array of 8 squares.

The ```main``` function calls ```is_valid_path``` from the ```board``` module to verify the path.


### board.nr
This file contains the core logic for validating the knight's path. Key points:

1. ```Square struct```: Represents a position on the chess board.
2. ```is_valid_path function```: Validates the entire path of the knight.
  - Checks if the start and end positions are correct.
  - Ensures all moves are within the board boundaries.
  - Verifies that each move is a valid knight move.

The validation process uses assertions to enforce the rules, which is crucial for the zero-knowledge proof generation.

## How to Run

To install Noir, open a terminal on your machine, and write:
```bash
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
```
Close the terminal, open another one, and run
```bash
noirup
```
Clone this repository and change into the directory
```bash
https://github.com/ksmit323/zk_bootcamp_project.git
cd zk_bootcamp_project
```
Compile the program and from there you can genarate the proof and verify it
```rust
nargo compile
nargo prove
nargo verify
```

## Testing

The project includes a test file (tests.nr) and test cases (valid_path_test_1.nr). To run the tests:
```rust
nargo test
```

## Future Improvements
Potential areas for enhancement:

- Implement more complex chess scenarios.
- Optimize the proof generation for larger board sizes.
- Create a front-end interface to visualize the proof process.

## Conclusion
This project demonstrates the power of Zero Knowledge Proofs in creating verifiable claims without revealing sensitive information. By proving the existence of a valid knight's path without disclosing the path itself, we can showcase a practical application of ZKP in game-like scenarios.  This project was inspired by the quests in Node Guardians.  I would like to thank the organizers of the bootcamp, Encode and the instructors from Extropy. 

