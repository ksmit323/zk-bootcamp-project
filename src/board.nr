use dep::std;

struct Square {
    x: Field,
    y: Field
}

pub fn is_valid_path(path: [Square; 8], king: Square) {
    // Part 1

    // Should flag invalid start
    assert(path[0].x == 0);
    assert(path[0].y == 0);

    // Should flag invalid end
    assert(path[7].x == king.x);
    assert(path[7].y == king.y);

    // Should flag invalid move
    for i in 1..8 {

        // Current move
        let current_x = path[i].x as i32;
        let current_y = path[i].y as i32;

        // Should flag out-of-bounds
        assert(current_x >= 0);
        assert(current_x < 8);
        assert(current_y >= 0);
        assert(current_y < 8);

        // Previous move
        let prev_x = path[i - 1].x as i32;
        let prev_y = path[i - 1].y as i32;

        // Difference in move
        let dx = current_x - prev_x;
        let dy = current_y - prev_y;
        let modulo_dx = dx % 2;
        let modulo_dy = dy % 2;

        // Assert a move has been made
        assert(dx != 0);
        assert(dy != 0);

        // Assert moves are valid Knight moves
        // if current move of x is 1 more than prev move of x
        if modulo_dx == 1 {
            // assert that current y should be 2 more or less than prev y
            assert(modulo_dy == 0);
        } else {
            // assert that current y should be 1 more than prev y
            assert(modulo_dy == 1);
        }
    }
}