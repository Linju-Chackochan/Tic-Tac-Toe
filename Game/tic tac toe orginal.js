// var boxes=document.getElementsByClassName("box")     //Html Collection
// console.log(boxes);
// boxes[0].addEventListener('click',()=>{
//     console.log(boxes[0].innerHTML);
// });
var boxes = document.querySelectorAll(".box");            //Node list
console.log(boxes);
var isFirstPerson = true;                                 //Setting  as true
var isGameFinished = false;                                  //Game not yet started therefore set as false   
var gameArea = document.getElementById("gameArea");
var resultDiv = document.getElementById("resultDiv");
var restartBtn = document.getElementById("restartBtn");
restartBtn.style.display = "none";                           //Initially dont display the restart Button

var horData = [
    [0, 1, 2],  //00 01 02
    [3, 4, 5],  //10 11 12
    [6, 7, 8]   //20 21 22
];
function checkHorizontal() {
    for (i = 0; i < horData.length; i++) {
        let checkArray = [
            boxes[horData[i][0]].innerHTML,             //stored in a variable..let is used so that it is accessible inside the block
            boxes[horData[i][1]].innerHTML,
            boxes[horData[i][2]].innerHTML
        ];
        console.log("Check Array is", checkArray);
        let uniqueArray = [...new Set(checkArray)];     //Push() instead of that used ...finds the unique array
        console.log("Unique Array is ", uniqueArray);
        let uniqueArrayLength = uniqueArray.length;
        console.log("Unique Array length is ", uniqueArrayLength);
        if (uniqueArrayLength == 1 && !uniqueArray.includes("")) {      //if count is one,then won the game else game is lost
            console.log("winner is", isFirstPerson ? "Player 1" : "Player 2");
            isGameFinished = !isGameFinished;                                 //now it turns to false
        }
    }
}
var verData = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
function checkVertical() {
    for (i = 0; i < verData.length; i++) {
        let checkArray1 = [
            boxes[verData[i][0]].innerHTML,
            boxes[verData[i][1]].innerHTML,
            boxes[verData[i][2]].innerHTML];
        console.log("Check Array is", checkArray1);
        let uniqueArray1 = [...new Set(checkArray1)];     //Push() instead of that used ...
        console.log("Unique Array is ", uniqueArray1);
        let uniqueArray1Length = uniqueArray1.length;
        console.log("Unique Array length is ", uniqueArray1Length);
        if (uniqueArray1Length == 1 && !uniqueArray1.includes("")) {
            console.log("winner is", isFirstPerson ? "Player 1" : "Player 2");
            isGameFinished = !isGameFinished;
        }
    }
}


function checkDiagonal() {
    // Check for winner in the first diagonal (diaData1)
    let diaData1 = [boxes[0].innerHTML, boxes[4].innerHTML, boxes[8].innerHTML];
    let diaData2 = [boxes[2].innerHTML, boxes[4].innerHTML, boxes[6].innerHTML];
    let uniqueDb1 = [...new Set(diaData1)];
    let uniqueDbLength = uniqueDb1.length;
    let uniqueDb2 = [...new Set(diaData2)];
    let uniqueDbLength2 = uniqueDb2.length;
    if (uniqueDbLength == 1 && !uniqueDb1.includes("")) {
        console.log("winner is ", isFirstPerson ? "Player 1" : "Player 2");
        isGameFinished = !isGameFinished;
    }
    if (uniqueDbLength2 == 1 && !uniqueDb2.includes("")) {
        console.log("winner is ", isFirstPerson ? "Player 1" : "Player 2");
        isGameFinished = !isGameFinished;
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML == "" || box.innerHTML == null) {
            box.innerHTML = isFirstPerson ? "O" : "X";
            checkForWinner();
            if (isGameFinished) {
                gameArea.style.display = "none";
                resultDiv.innerHTML = "The Winner is " + (isFirstPerson ? "Player1" : "Player 2");
                resultDiv.style.display = "";
                restartBtn.style.display = "block";
            } else {
                if (isGameTie()) {
                    gameArea.style.display = "none";
                    resultDiv.innerHTML = "The game is tie";
                    resultDiv.style.display = "";
                    restartBtn.style.display = "block"
                }
                else {
                    isFirstPerson = !isFirstPerson;
                }
            }

        }
    });
});
function isGameTie() {
    let sampleBoxData = [];
    boxes.forEach((box) => {
        sampleBoxData.push(box.innerHTML);
    });
    if (sampleBoxData.includes("")) {
        return false;
    } else {
        isGameFinished = true;
        return true;
    }
}
restartBtn.addEventListener("click", () => {
    gameArea.style.display = "grid";
    boxes.forEach((box) => {
        box.innerHTML = "";
    });
    resultDiv.style.display = "none";
    restartBtn.style.display = "none";
    isFirstPerson = true;
    isGameFinished = false;
});

function checkForWinner() {
    checkHorizontal();
    checkVertical();
    checkDiagonal();
}