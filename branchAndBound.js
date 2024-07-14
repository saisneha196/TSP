// algorithm/branchAndBound.js

class TSP {
    constructor(matrix) {
        this.matrix = matrix;
        this.N = matrix.length;
        this.finalPath = [];
        this.finalCost = Infinity;
    }

    copyToFinal(currPath) {
        this.finalPath = [...currPath, currPath[0]];
    }

    firstMin(costMatrix, i) {
        let min = Infinity;
        for (let k = 0; k < this.N; k++) {
            if (costMatrix[i][k] < min && i !== k) {
                min = costMatrix[i][k];
            }
        }
        return min;
    }

    secondMin(costMatrix, i) {
        let first = Infinity, second = Infinity;
        for (let j = 0; j < this.N; j++) {
            if (i === j) continue;

            if (costMatrix[i][j] <= first) {
                second = first;
                first = costMatrix[i][j];
            } else if (costMatrix[i][j] <= second && costMatrix[i][j] !== first) {
                second = costMatrix[i][j];
            }
        }
        return second;
    }

    branchAndBound(costMatrix, currBound, currCost, level, currPath) {
        if (level === this.N) {
            if (costMatrix[currPath[level - 1]][currPath[0]] !== 0) {
                let currRes = currCost + costMatrix[currPath[level - 1]][currPath[0]];
                if (currRes < this.finalCost) {
                    this.copyToFinal(currPath);
                    this.finalCost = currRes;
                }
            }
            return;
        }

        for (let i = 0; i < this.N; i++) {
            if (costMatrix[currPath[level - 1]][i] !== 0 && !currPath.includes(i)) {
                let temp = currBound;
                currCost += costMatrix[currPath[level - 1]][i];

                if (level === 1) {
                    currBound -= ((this.firstMin(costMatrix, currPath[level - 1]) + this.firstMin(costMatrix, i)) / 2);
                } else {
                    currBound -= ((this.secondMin(costMatrix, currPath[level - 1]) + this.firstMin(costMatrix, i)) / 2);
                }

                if (currBound + currCost < this.finalCost) {
                    currPath[level] = i;
                    this.branchAndBound(costMatrix, currBound, currCost, level + 1, currPath);
                }

                currCost -= costMatrix[currPath[level - 1]][i];
                currBound = temp;
            }
        }
    }

    solve() {
        let currBound = 0;
        let currPath = Array(this.N + 1).fill(-1);
        let visited = Array(this.N).fill(false);

        for (let i = 0; i < this.N; i++) {
            currBound += (this.firstMin(this.matrix, i) + this.secondMin(this.matrix, i));
        }

        currBound = Math.ceil(currBound / 2);
        visited[0] = true;
        currPath[0] = 0;

        this.branchAndBound(this.matrix, currBound, 0, 1, currPath);
        return { path: this.finalPath, cost: this.finalCost };
    }
}

module.exports = TSP;
