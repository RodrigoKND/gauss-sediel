function multiplyMatrices(A, B) {
    let C = [];

    for (let i = 0; i < A.length; i++) {
        C[i] = [];
        for (let j = 0; j < A[i].length; j++) C[i][j] = A[i][j] * B[i];
    }

    return C;
}



function gaussSeidel(A, b, e) {
    let D = [];
    for (let i = 0; i < A.length; i++) {
        D[i] = [];
        for (let j = 0; j < A.length; j++) {
            if (i === j) D[i][j] = A[i][j];
        }
    }
    let inverseD = D.map(row => row.map(col => 1 / col)).flat();
    let mA = multiplyMatrices(A, inverseD);
    let mb = multiplyMatrices(b.map(i => [i]), inverseD).flat();

    console.log(
        `${mA[0][0]}x + ${mA[0][1]}y + ${mA[0][2]}z = ${mb[0]}` +
        `${mA[1][0]}x + ${mA[1][1]}y + ${mA[1][2]}z = ${mb[1]}` +
        `${mA[2][0]}x + ${mA[2][1]}y + ${mA[2][2]}z = ${mb[2]}`
    );

    let x = 0, y = 0, z = 0, error = Infinity, i = 0;
    while (error > e) {
        let x1 = mb[0] - mA[0][1] * y - mA[0][2] * z;
        let y1 = mb[1] - mA[1][0] * x1 - mA[1][2] * z;
        let z1 = mb[2] - mA[2][0] * x1 - mA[2][1] * y1;
        
        error = Math.max(Math.abs(x1 - x), Math.abs(y1 - y), Math.abs(z1 - z));
        x = x1; y = y1; z = z1; i++;
    }

    console.log(
        `x = ${x}, y = ${y}, z = ${z}` +
        `Iterations: ${i}` +
        `Error: ${error}`
    );

    return { x, y, z, i, error };
}

gaussSeidel([
    [0.25, 0.20, 0.06],
    [0.05, 0.81, 0.12],
    [0.35, -0.27, 0.08]
], [1.35, -1.54, 1.68], 10 ** -6);