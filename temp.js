

function make_great(magecians){
    const newMagicians = [...magecians];

    for (let index = 0; index < newMagicians.length; index++) {
        newMagicians[index] =  "the Great " + newMagicians[index];
    }

    return newMagicians;
};


let arr = ["one", "two", "three"]
let newArr = make_great(arr);


for (const a of arr) {
    console.log(a)
}

for (const a of newArr) {
    console.log(a)
}