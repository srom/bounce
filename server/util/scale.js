import { RATIO } from '../constants';

export const pixelsToMeters = function (pixels) {
    return pixels * RATIO;
};

export const metersToPixels = function (meters) {
    return meters / RATIO;
};
