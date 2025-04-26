const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");

const tbl = document.getElementById("tblNumbers");
const sortVal = document.getElementById("sorting");

let total = 0;

let numbersArr = new Array();

btn1.addEventListener("click", () => {

    const txtNumber = document.getElementById("txtNum").value;

    let num;
    let regex = /^[0-9]+$/; // regular expression for checking valid positive number values.

    if(txtNumber.match(regex)){
        num = parseInt(txtNumber);
        numbersArr.push(num);
        console.log(numbersArr);
        document.getElementById("txtNum").value = "";
        sortNumbers(sortVal.value);
    } else {
        alert("Please input a number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
    
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    document.getElementById("btn3").style.display = "none";
    document.getElementById("btn4").style.display = "none";
    document.getElementById("btn5").style.display = "none";
    document.getElementById("sortLabel").style.display = "none";
    document.getElementById("sorting").style.display = "none";

});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;
        
    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

btn5.addEventListener("click", () => {
    const highest = Math.max(...numbersArr);
    const lowest = Math.min(...numbersArr);

    
    const trHighest = document.createElement("tr");

    const tdHighestLabel = document.createElement("td");
    tdHighestLabel.style.fontWeight = "bold";
    tdHighestLabel.innerHTML = "HIGHEST:";
    trHighest.appendChild(tdHighestLabel);

    const tdHighestValue = document.createElement("td");
    tdHighestValue.style.textDecoration = "underline";
    tdHighestValue.innerHTML = highest;
    trHighest.appendChild(tdHighestValue);

    const trLowest = document.createElement("tr");

    const tdLowestLabel = document.createElement("td");
    tdLowestLabel.style.fontWeight = "bold";
    tdLowestLabel.innerHTML = "LOWEST:";
    trLowest.appendChild(tdLowestLabel);

    const tdLowestValue = document.createElement("td");
    tdLowestValue.style.textDecoration = "underline";
    tdLowestValue.innerHTML = lowest;
    trLowest.appendChild(tdLowestValue);

    // Add the row to the table
    tbl.appendChild(trHighest);
    tbl.appendChild(trLowest);
});

sortVal.addEventListener("click", () => {
    sortNumbers(sortVal.value);
});

function sortNumbers(sorting) {
    if (sorting === "ascend") {
        numbersArr.sort((a, b) => a - b);
        console.log(numbersArr);
    } else {
        numbersArr.sort((a, b) => b - a);
        console.log(numbersArr);
    }   
    iterateNumbers();
}

function deleteNumber(i) {
    numbersArr.splice(i,1);
    iterateNumbers();
    console.log(numbersArr)
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/; // regular expression for checking valid positive number values.
    
    if(editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if(editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
            console.log(numbersArr);
        } else {
            alert("You did not input a valid number!");
        }
    } 
}

function iterateNumbers() {
    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if(!(numbersArr.length == 0)) {

        total = 0;

        console.log(`Array Length: ${numbersArr.length}`);

        // Loop for iterating numbers from the array in a table
        for(let i=0 ; i < numbersArr.length ; i++) {

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td"); // for the delete button
            const td4 = document.createElement("td"); // for the delete button
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";

            if(numbersArr[i] %2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`) ;
            btnDelete.innerHTML = "Remove"; 

            btnEdit.setAttribute("onclick", `editNumber(${i})`) ;
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            if(!(numbersArr.length == 0)) {
                document.getElementById("btn3").style.display = "inline";
                document.getElementById("btn4").style.display = "inline";
                document.getElementById("btn5").style.display = "inline";
                document.getElementById("sortLabel").style.display = "inline";
                document.getElementById("sorting").style.display = "inline";
            }
            total += numbersArr[i];
            console.log(numbersArr[i]);

            console.log(`Total: ${total}`)
        }
    } else {
        total = 0;
        document.getElementById("btn3").style.display = "none";
        document.getElementById("btn4").style.display = "none";
        document.getElementById("btn5").style.display = "none";
        document.getElementById("sortLabel").style.display = "none";
        document.getElementById("sorting").style.display = "none";
    }
}