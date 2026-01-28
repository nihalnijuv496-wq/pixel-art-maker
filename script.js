
let color = "#000000";
let colorBoxes = ["CB1", "CB2", "CB3", "CB4", "CB5", "CB6", "CB7", "CB8", "CB9", "CB10", "CB11", "CB12", "CB13", "CB14"];
let colors = ["#333", "#777", "#cc3333", "#8b3e2f", "#e79b30", "#edd22a", "#3cab5b", "#4bb2c5", "#3c6df0", "#7b3ff0", "#d8479a", "#f58ab0", "#000000", "#ffffff"];
let eraserMode = false;
let currentColorBox = "CB1";


 function updateColorBox()
    {
        for(let i = 0; i < colorBoxes.length; ++i)
        {
            document.getElementById(colorBoxes[i]).style.backgroundColor = colors[i]; 
        }
    }


function addColor(inputColor)
    {
        for(let i = colors.length - 1; i > 0; --i)
        {
            colors[i] = colors[i-1];
        }
        colors[0] = inputColor;

        updateColorBox();
    }

function erase(cell, pos)
    {
        for(let i = 0; i < 900; i += 60)
        {
            let isDone = false;
            for(let j = i; j < i + 30; ++j)
            {
                if(pos == j)
                {
                    ++pos;
                    isDone = true;
                    break;
                }   
            }
            if(isDone)
            {
                break;
            }
        }

        if(pos % 2 == 0)
        {
            cell.style.backgroundColor = "#ffffff";
        }
        else
        {
            cell.style.backgroundColor = "#c7c7c7ff";
        }
    }


document.addEventListener("DOMContentLoaded", ()=>{

    updateColorBox();
    let colorPicker = document.getElementById("colorPicker");
    let container = document.getElementById('gridContainer');
    let eraser = document.getElementById("eraserBtn");

    //creating the grid
    for(let i = 0;i < 900; ++i)
    {
        let cell = document.createElement('div');
        container.appendChild(cell);
        
        
        cell.classList.add('cells');
        erase(cell, i);
        
    }
    
    
    const cells = [...document.getElementsByClassName("cells")];

    //changing the color on click
    container.addEventListener("click", (e)=>{

        if(e.target.classList.contains('cells')){
            if(eraserMode)
            {
                erase(e.target, cells.indexOf(e.target));
                return;
            }    
            e.target.style.backgroundColor = color;
        }
    }); 


    //changing the color on double click
    let isDrawing = false;
    container.addEventListener("dblclick", (e)=>{
        if(e.target.classList.contains('cells'))
        {
            isDrawing = true
        }
    });
    container.addEventListener("mousemove", (e)=>{
        if(isDrawing && e.target.classList.contains('cells'))
        {
            if(eraserMode)
            {
                erase(e.target, cells.indexOf(e.target));
                return;
            }    
            e.target.style.backgroundColor = color;
        }
    });
    container.addEventListener("mouseup", ()=>{
        isDrawing = false;
    }); 

    

    //taking color from color wheel
    colorPicker.addEventListener("change", ()=>{
        color = colorPicker.value;
        eraserMode = false;

        eraser.style.border = "none";
        document.getElementById(currentColorBox).className = "color";
        addColor(color);
    }); 


    //taking color from color boxes
    for(let i = 0; i < colorBoxes.length; ++i)
    {
        document.getElementById(colorBoxes[i]).addEventListener("click", (e)=>{
        color = e.target.style.backgroundColor;
        document.getElementById(currentColorBox).className = "color";
        currentColorBox = colorBoxes[i];
        document.getElementById(currentColorBox).className = "colorActive";


        eraserMode = false;
        eraser.style.border = "none";
        }); 
    }


    //filling the canvas
    document.getElementById("fillAllBtn").addEventListener("click", () => {

        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = color; // current selected color
        }

        eraserMode = false;
        eraser.style.border = "none";
    });   


    eraser.addEventListener("click", ()=>{
        eraser.style.border = "2px solid black";
        document.getElementById(currentColorBox).className = "color";
        eraserMode = true;
    });


    //downloading the pixel art
    document.getElementById("downloadBtn").addEventListener("click", ()=>{

        let art = document.getElementById("gridContainer");
        html2canvas(art).then(canvas=>{
            let link = document.createElement("a");
            link.download = "pixelArt.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }); 


    
});