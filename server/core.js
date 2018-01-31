import { World } from './models/world';

export const parseWorld = (data) => {
    const world = World.decode(data);
    if (!world.ball) {
        // Object is empty
        return null;
    }
    return world;
};

export const getDefaultWorld = () => {
    return World.create({
        Request: {
            frame_rate: 1 / 60,
        },
    });
};
