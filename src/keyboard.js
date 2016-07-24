// Add the 'keydown' event listener to our document
document.addEventListener('keydown', function (key) {
    var refX = -initialBallX;
    var refY = -initialBallY;

    console.log(ball.position);

    // W Key is 87
    // Up arrow is 87
    if (key.keyCode === 87 || key.keyCode === 38) {
        // If the W key or the Up arrow is pressed, move the player up.
        if (ball.position.y > refY + moveDiff) {
            // Don't move up if the player is at the top of the stage
            ball.position.y -= moveDiff;
        }
    }

    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        // If the S key or the Down arrow is pressed, move the player down.
        if (ball.position.y < renderer.height + refY - moveDiff) {
            // Don't move down if the player is at the bottom of the stage
            ball.position.y += moveDiff;
        }
    }

    // A Key is 65
    // Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
        // If the A key or the Left arrow is pressed, move the player to the left.
        if (ball.position.x > refX + moveDiff) {
            // Don't move to the left if the player is at the left side of the stage
            ball.position.x -= moveDiff;
        }
    }

    // D Key is 68
    // Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
        // If the D key or the Right arrow is pressed, move the player to the right.
        if (ball.position.x < renderer.width + refX - moveDiff) {
            // Don't move to the right if the player is at the right side of the stage
            ball.position.x += moveDiff;
        }
    }
});
