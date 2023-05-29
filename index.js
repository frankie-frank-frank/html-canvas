let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d")

canvas.offsetLeft = 50;
canvas.width = 800;
canvas.height = 400;
canvas.style.border = '5px solid red';

let canvas_width = canvas.width;
let canvas_height = canvas.height;

let shapes = [];
let current_shape_index = null;
let is_dragging = false;
let startX;
let startY;

shapes.push({x: 200, y: 50, width: 200, height: 200, color: 'red'})
// shapes.push({x: 10, y: 10, width: 100, height: 100, color: 'blue'})

const is_mouse_in_shape = function(x, y, shape){
    const currPadding = 40;
    let shape_left = shape.x + currPadding;
    let shape_right = shape.x + shape.width + currPadding;
    let shape_top = shape.y + currPadding;
    let shape_bottom = shape.y + shape.height + currPadding;
    return !!(x > shape_left && x < shape_right && y > shape_top && y < shape_bottom)
}

/**
 * 
 * @param {MouseEvent} event 
 */
let mouse_down = function(event){
    console.log("mouse down")
    event.preventDefault();
    startX = parseInt(event.clientX);
    startY = parseInt(event.clientY);

    let index = 0;
    for (let shape of shapes) {
        if(is_mouse_in_shape(startX, startY, shape)){
            current_shape_index = index;
            is_dragging = true;
            return;
        }
        index++;
    }
}

/**
 * 
 * @param {MouseEvent} event 
 */
let mouse_up_or_out = function(event){
    console.log("mouse up or out")
    event.preventDefault();
    if(!is_dragging) return;
    is_dragging = false;
}

/**
 * 
 * @param {MouseEvent} event 
 */
let mouse_move = function(event){
    console.log(event.clientX, event.clientY)
    if(!is_dragging){
        return;
    } else {
        event.preventDefault();
        let mouseX = parseInt(event.clientX);
        let mouseY = parseInt(event.clientY);

        let dx = mouseX - startX;
        let dy = mouseY - startY;
        console.log(dx, dy)
    }
}

canvas.onmousedown = mouse_down;
canvas.onmouseout = mouse_up_or_out;
canvas.onmouseup = mouse_up_or_out;
canvas.onmouseover = mouse_move;

let draw_shapes = function(){
    context.clearRect(0, 0, canvas_width, canvas_height);
    for (let shape of shapes) {
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, shape.width, shape.height)
    }
}

draw_shapes()