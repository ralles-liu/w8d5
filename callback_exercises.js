class Clock {
    constructor() {
        let curr_date = new Date();
        this.hours = curr_date.getHours();
        this.minutes = curr_date.getMinutes();
        this.seconds = curr_date.getSeconds();
    }

    printTime() {
        console.log(`${this.hours}:${this.minutes}:${this.seconds}`)
    }

    _tick() {
        this.increment();
        this.printTime();
    }

    increment() {
        this.seconds += 1;
        if (this.seconds >= 60) {
            this.minutes += 1;
            this.seconds = 0;
        }

        if (this.minutes >= 60) {
            this.hours += 1;
            this.minutes = 0;
        }

        this.hours %= 24;
    }
}


// const clock = new Clock();

// clock.printTime();

// clock._tick();

// clock.printTime();

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft > 0) {
        reader.question(`Give me a number ${numsLeft}: `, function(number) {
            let num = parseInt(number);
            sum += num;
            console.log(`Your current sum is ${sum}`);
            addNumbers(sum, numsLeft - 1, completionCallback);            
        })        
    } else {
        // console.log("hello")
        completionCallback(sum);
        reader.close()
    }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));