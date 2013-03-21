(function () {
    "use strict";
    /*global JAWM */

// Dependencies
var Window = JAWM.gui.Window;

// Ctor
var Memery = JAWM.extend("apps").Memery = function (rows, cols) {
    // TODO dynamic size
    Window.call(this, "Memery", 360, 370, "css/apps/Memery.png");

    this.init(rows, cols);
    this.show();
};

Memery.prototype = Object.create(Window.prototype);

/**
 * Start the memory-game
 * @param  {Number} rows      Rows of bricks
 * @param  {Number} cols      Columns of bricks
 */
Memery.prototype.init = function(rows, cols) {
    var path = "css/Memery/",
        grid,
        table,
        firstBrick,
        secondBrick,
        count = 0, // Number of turns
        unfoundPairs = (rows * cols) / 2,
        that = this;


    // Standard values
    rows = rows || 4;
    cols = cols || 4;

    grid = getPictureArray(rows, cols);

    // Replace the picture source of an a-tag containing an img-tag
    var changePic = function (pic, node) {
        if(node) {
            node.firstChild.src = path + pic + ".jpg";
        }
    };

    var turnBrick = function () {
        var that = this;

        // Only allow two bricks turned
        if (secondBrick) {
            return false;
        } else if (firstBrick && firstBrick !== this) {
            secondBrick = this;
            count++;
        } else {
            firstBrick = this;
        }

        changePic(grid[this.className], this);

        // If both bricks are set, perform the check
        if (secondBrick) {
            if (grid[secondBrick.className] === grid[firstBrick.className]) {
                unfoundPairs--;
                firstBrick = null;
                secondBrick = null;
            } else {
            // Hide the images again
                window.setTimeout(function () {
                    changePic("blank", firstBrick);
                    changePic("blank", secondBrick);
                    firstBrick = null;
                    secondBrick = null;
                }, 1000);
            }
        }

        if (unfoundPairs === 0) {
            window.alert("You won! It took you " + count + " turns to do it.");
        }

        return false;
    };



    // Initialize the memory-board
    (function init() {
        var tr, td, img, a, i, j, count = 0;

        // Generate table
        table = document.createElement("table");
        table.className = "memory";

        for (i = 0; i < rows; i++) {
            tr = document.createElement("tr");
            for (j = 0; j < cols; j++) {
                td = document.createElement("td");

                a = document.createElement("a");
                a.href = "#";
                a.className = count++;
                a.onclick = turnBrick;

                img = document.createElement("img");
                img.src = path + "blank.jpg";


                a.appendChild(img);
                td.appendChild(a);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }


        // Add to DOM
        that.content.appendChild(table);

    }());

};


function getPictureArray(rows, cols) {
    var numberOfImages = rows * cols,
        maxImageNumber = numberOfImages / 2,
        imgPlace = [];

   for (var i = 0; i < numberOfImages; i++)
      imgPlace[i] = 0;

    for(var currentImageNumber=1; currentImageNumber<=maxImageNumber; currentImageNumber++) {
        var imageOneOK = false;
        var imageTwoOK = false;

        do {
            if (imageOneOK === false) {
                var randomOne = Math.floor( (Math.random() * (rows*cols-0) + 0) );

                if (imgPlace[randomOne] === 0) {
                    imgPlace[randomOne] = currentImageNumber;
                    imageOneOK = true;
                }
            }

            if (imageTwoOK === false) {
                var randomTwo = Math.floor( (Math.random() * (rows*cols-0) + 0) );

                if (imgPlace[randomTwo] === 0) {
                    imgPlace[randomTwo] = currentImageNumber;
                    imageTwoOK = true;
                }
            }
        }
        while(imageOneOK === false || imageTwoOK === false);
    }

    return imgPlace;
}

}());