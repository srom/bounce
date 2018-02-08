
export const randomFloat = (max, min) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
};


export const randomBoolean = () => {
    return Math.random() >= 0.5;
};
