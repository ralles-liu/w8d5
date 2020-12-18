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
  
//   absurdBubbleSort([3, 2, 1], function(arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     reader.close();
//   });

Function.prototype.myBind = function(context){
    return () => this.apply(context)
}


class Lamp {
    constructor() {
      this.name = "a lamp";
    }
  }
  
  const turnOn = function() {
    console.log("Turning on " + this.name);
  };
  
  const lamp = new Lamp();
  
//   turnOn(); // should not work the way we want it to
  
  const boundTurnOn = turnOn.bind(lamp);
  const myBoundTurnOn = turnOn.myBind(lamp);
  
//   boundTurnOn(); // should say "Turning on a lamp"
//   myBoundTurnOn();



Function.prototype.myThrottle = function(interval) {
  let tooSoon = false;
  return (...args) => {
    if (tooSoon === false){
        tooSoon = true;
        setTimeout(() => tooSoon = false, interval);
        this(...args);
        }
    }
}

class Neuron {
    fire() {
      console.log("Firing!");
    }
  }
  
  const neuron = new Neuron();
  // When we create a new Neuron,
  // we can call #fire as frequently as we want
  
  // The following code will try to #fire the neuron every 10ms. Try it in the console:
  const interval = setInterval(() => {
    neuron.fire();
  }, 10);
  
  // You can use clearInterval to stop the firing:
//   clearInterval(interval);
  
  // Using Function#myThrottle, we should be able to throttle
  // the #fire function of our neuron so that it can only fire
  // once every 500ms:
  
  neuron.fire = neuron.fire.myThrottle(500);
  
  Function.prototype.myDebounce = function(interval) {
    // declare a variable outside of the returned function
    let timeout;
    // return a function that takes an arbitrary number of arguments
    return (...args) => {
      // declare a function that sets timeout to null and invokes this with args
      const fnCall = () => {
        timeout = null;
        this(...args);
      }
      // each time this function is called, it will clear the previous timeout
      // and create a new one that invokes fnCall after the interval has passed
      // since the timeout is reset every time the function is invoked, 
      // fnCall will only be called once the interval has passed without any new 
      // invocations
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, interval);
    }
  }
  