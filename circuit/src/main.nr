mod board;
mod tests;

fn main(king: pub board::Square, path: [board::Square; 8]) {
    board::is_valid_path(path, king);
}
