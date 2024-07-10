// get recurring elements
const canvasDiv = document.getElementById("visual");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// backing linked list
class ListNode {

    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

let linkedListHead = null;
let linkedListTail = null;
let size = 0;

function addToList() {

    if (size == 50) {
        console.log("Not adding any more!");
        return;
    }

    if (linkedListHead == null) {

        linkedListHead = new ListNode(0);
        linkedListTail = linkedListHead;
    }
    else {

        linkedListTail.next = new ListNode(0);
        linkedListTail = linkedListTail.next;
    }

    size++;
}

// graphics functions
function drawBlankCanvas() {

    canvas.setAttribute("width", canvasDiv.offsetWidth);
    canvas.setAttribute("height", canvasDiv.offsetHeight);

    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLinkedList() {

    drawBlankCanvas();

    // at least 20% of the width and height should be used to space out each individual node 
    var widthSpacing = Math.min((canvas.getAttribute("width") / 5) / 11, 15);
    var heightSpacing = Math.min((canvas.getAttribute("height") / 5) / 6, 15);

    // figure out how large we can make each node based on the screen size, use the more constrained value
    var maxNodeWidth = (canvas.getAttribute("width") - 11 * widthSpacing) / 10;
    var maxNodeHeight = (canvas.getAttribute("height") - 6 * widthSpacing) / 5;
    var nodeSize = Math.min(maxNodeWidth, maxNodeHeight);

    // unless the screen is a perfect square one of the spacing values will be too small to fill the entire canvas
    // use the determined node size to redetermine how much space should be between each node so that they all fit on the screen evenly
    widthSpacing = (canvas.getAttribute("width") - 10 * nodeSize) / 11; 
    heightSpacing = (canvas.getAttribute("height") - 5 * nodeSize) / 6;

    // draw each individual node
    ctx.fillStyle = "grey";
    var curr = linkedListHead;
    var index = 0;
    var invertRow = false;
    while (curr != null) {

        if (invertRow) {
            ctx.fillRect(canvas.getAttribute("width") - (widthSpacing + nodeSize + (nodeSize + widthSpacing) * (index % 10)), heightSpacing + (nodeSize + heightSpacing) * Math.floor(index / 10), nodeSize, nodeSize);
        }
        else {
            ctx.fillRect(widthSpacing + (nodeSize + widthSpacing) * (index % 10), heightSpacing + (nodeSize + heightSpacing) * Math.floor(index / 10), nodeSize, nodeSize);
        }
        
        index++;
        if (index % 10 == 0) {
            invertRow = true;
        }
        if (index % 20 == 0) {
            invertRow = false;
        }

        curr = curr.next;
    }
}

window.onresize = drawLinkedList;

function addAndDrawLinkedList() {

    addToList();
    drawLinkedList();
}

document.getElementById("addButton").onclick = addAndDrawLinkedList;

// initial setup
drawLinkedList();