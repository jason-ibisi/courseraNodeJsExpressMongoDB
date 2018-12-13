module.exports = (x,y,callback) => {
    if (x <= 0 || y <= 0) {
        // simulate a delay of 2s
        setTimeout(() => 
            callback(new Error("Rectangle dimensions should be greater than zero: l = " + x + ", and b = " + y),
            null), 
            2000);
    } 
    else {
        // simulate a delay of 2s
        setTimeout(() =>
            callback(null, {
                perimeter: () => (2 * (x + y)),
                area: () => (x * y),
            }),
            2000);
    }
};