function findPairWithSum(M, N) {
    const seen = new Set();

    for (let number of M) {
        const complement = N - number;

        if (seen.has(complement)) {
            return [complement, number];
        }

        seen.add(number);
    }

    return []; 
}

const M = [2, 5, 8, 14, 0];
const N = 10;
const result = findPairWithSum(M, N);
console.log(result); // [2, 8]