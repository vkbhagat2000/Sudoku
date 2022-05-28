var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9 ib 1x9 board
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i//i=1-9
        number.innerText = i;
        number.addEventListener("click", selectNumber);//on clicking on digits on 1x9 board selectNumber fun is triggered
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // digits form 1-9 (81 digits) in the 9x9 board 
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {//bringing  question "--74916-5",
                                                       // "2---6-3-9",
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }                                              //       |      |
                                                           //_______|______|_______
                                                           //       |      |
                                                           //       |      |
                                                          // _______|______|_______
            if (r == 2 || r == 5) {                       //        |      |
                tile.classList.add("horizontal-line");    //        |      |
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);//on click after selecting a digit ,it will display on 9x9 tile
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {// removing gray colour ,if any from previously selected some no.
        numSelected.classList.remove("number-selected");
    }
    numSelected= this;//grey colour if no is clicked
    numSelected.classList.add("number-selected");
} 

function selectTile(){//putting selected digit form 1x9 board to 9x9 board
    if(numSelected){
        if (this.innerText != "") {//to remove overwriting of digits on 9x9 board
            return;                 //better remove this
        }
        this.innerText=numSelected.id;//putting digits on 9x9 board
          
           // "0-0" "0-1" .. "3-1"
           let coords = this.id.split("-"); //["0", "0"]
           let r = parseInt(coords[0]);
           let c = parseInt(coords[1]);
   
           if (solution[r][c] == numSelected.id) {
               this.innerText = numSelected.id;
           }
           else {
               errors += 1;
               document.getElementById("errors").innerText = errors;
           }
    }
}