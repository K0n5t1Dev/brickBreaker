export function detectCollision(gameObject1, gameObject2) {
    let dx = (gameObject1.position.x + gameObject1.width / 2) - (gameObject2.position.x + gameObject2.width / 2);
    let dy = (gameObject1.position.y + gameObject1.height / 2) - (gameObject2.position.y + gameObject2.height / 2);

    let width = (gameObject1.width + gameObject2.width) / 2;
    let height = (gameObject1.height + gameObject2.height) / 2;

    let crossWidth = width * dy;
    let crossHeight = height * dx;

    let collision = 0;

    if(Math.abs(dx) <= width && Math.abs(dy) <= height) {
        if(crossWidth > crossHeight) {
            collision = (crossWidth > (-crossHeight))?4:1;
        } else {
            collision = (crossWidth > -(crossHeight))?2:3;
        }
    }

    return collision;
}

export function ballCollision(ball, gameObject) {
    //0: no collision
    //1: left collision
    //2: right collision
    //3: top collision
    //4: bottom collision

    let dx = (ball.position.x + ball.size / 2) - (gameObject.position.x + gameObject.width / 2);
    let dy = (ball.position.y + ball.size / 2) - (gameObject.position.y + gameObject.height / 2);

    let width = (ball.size + gameObject.width) / 2;
    let height = (ball.size + gameObject.height) / 2;

    let crossWidth = width * dy;
    let crossHeight = height * dx;

    let collision = 0;

    if(Math.abs(dx) <= width && Math.abs(dy) <= height) {
        if(crossWidth > crossHeight) {
            collision = (crossWidth > (-crossHeight))?4:1;
        } else {
            collision = (crossWidth > -(crossHeight))?2:3;
        }
    }

    return collision;
}