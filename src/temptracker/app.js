class TempTracker {
    constructor() {
        this.temperatures = [];
    }

    insert(temperature) {
        this.temperatures[this.temperatures.length] = temperature;
    }

    getMax() {
        return Math.max(...this.temperatures);
    }

    getMin() {
        return Math.min(...this.temperatures);
    }

    getMean() {
        return this.__sum() / this.temperatures.length;
    }

    getMode() {
        return this.__ntimes();
    }
    __sum() {
        const initialValue = 0;
        const sumAll = this.temperatures.reduce((previousVal, currentValue) => previousVal + currentValue, initialValue);
        return sumAll;

    }

    __ntimes() {
        const map = new Map();
        this.temperatures.forEach((temp) => {
            if (map.has(temp)) {
                map.set(temp, map.get(temp) + 1);
            } else {
                map.set(temp, 1);
            }
        });
        console.log(temp);
    }
}

