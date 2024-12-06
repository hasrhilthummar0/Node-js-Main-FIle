// rest operator ...
// spred operator ...

function sum(...c) {
    let b = 0;
    for (let value of c) {
        b += value;

    }
    console.log(b)
}

sum(10, 20, 30, 40, 50)