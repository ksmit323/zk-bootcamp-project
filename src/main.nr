mod dungeon;
mod tests;

fn main(
    dagger: pub dungeon::Square,
    path: [dungeon::Square; 8]
) {
    dungeon::is_valid_path(path, dagger);
}