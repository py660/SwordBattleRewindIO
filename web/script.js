// Example input
/*
fa81ba7|2023-10-12 18:35:20 -0500|<gautamgxtv@gmail.com>|Fishymine us2
d624f74|2023-10-12 18:34:43 -0500|<gautamgxtv@gmail.com>|hex changes
bd4d4d8|2023-10-07 10:57:43 -0500|<gautamgxtv@gmail.com>|Bug fix
cf85268|2023-10-07 10:56:45 -0500|<gautamgxtv@gmail.com>|Bug fix
*/

let problematicHashes = ["64c4c41", "6be1531", "de52aa5"];
let suggestedHashes = [];

function process(input){
  
  // GET ALL HASHES
  console.log(input);
  let data = input.split("\n");
  let rows = [];
  for (let row of data){
    let rowData = row.split("|")
    rows.push(
      {hash: rowData[0], time: new Date(rowData[1]), email: rowData[2], message: rowData.slice(3).join("|")}
    )
  }
  console.log(rows)
  let selectBox = document.getElementById("commitsbydate");
  selectBox.innerHTML  = "";
  for (let row of rows){
    if (problematicHashes.includes(row.hash)){
      continue;
    }
    // add a child <option> element to the <select> box regarding the commit details
    let option = document.createElement("option");
    option.value = row.hash;
    option.innerHTML = `${row.hash} | ${row.time.toDateString()}: ${row.message}`;
    option.id = row.hash;
    selectBox.appendChild(option);
  }
}

fetch("/revs.txt").then(response => response.text()).then(text => process(text));