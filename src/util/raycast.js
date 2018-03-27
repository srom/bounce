import Box2D from 'box2dweb';

const RAYCAST_LENGTH = 100;


export const rayCast = (prevBallPos, ballPos, paddle, bricks, walls) => {
    const rayCastInput = new Box2D.Collision.b2RayCastInput(
        prevBallPos,
        ballPos,
        RAYCAST_LENGTH
    );

    let closestElement = null;
    let closestFraction = RAYCAST_LENGTH;

    [paddle, ...bricks, ...walls].forEach((element) => {
        const fixture = getFixture(element.body);
        if (fixture) {
            let output = new Box2D.Collision.b2RayCastOutput();
            if (fixture.RayCast(output, rayCastInput)) {
                if (output.fraction < closestFraction) {
                    closestFraction = output.fraction;
                    closestElement = element;
                }
            }
        }
    });

    return closestElement;
};

const getFixture = (body) => {
    return body ? body.GetFixtureList() : null;
};
