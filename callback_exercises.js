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

function askIfGreaterThan(el1, el2, callback){
    reader.question(`Is ${el1} greater than ${el2}? Answer: `, function(string){
        if (string === 'yes'){
            callback(true);
        }else{
            callback(false);
        }
    })
    
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop){
    if (i < arr.length -1){
        askIfGreaterThan(arr[i], arr[i + 1], isGreaterThan => {
            if (isGreaterThan){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                innerBubbleSortLoop(arr, i + 1, true, outerBubbleSortLoop);
            }else{
                innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
            }
        })
    }else if (i === arr.length - 1){
        outerBubbleSortLoop(madeAnySwaps);
    }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
    function  outerBubbleSortLoop(madeAnySwaps){
      // Begin an inner loop if you made any swaps. Otherwise, call
      // `sortCompletionCallback`.
      if(madeAnySwaps){
          innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
      }else{
          sortCompletionCallback(arr);
      }
    }
  
    // Kick the first outer loop off, starting `madeAnySwaps` as true.
    outerBubbleSortLoop(true)
  }
  
  absurdBubbleSort([3, 2, 1], function(arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
  });