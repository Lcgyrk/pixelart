let paint = document.querySelector('#color').value;

function paintBox(box){
    const confirm = document.addEventListener('keypress');
    let oldColor = box.style.backgroundColor;
    switch (confirm){
        case 'SpacePress':
            box.style.backgroundColor = paint;
            box.style.borderColor = paint;
            break;
        case 'BackSpacePress':
            box.style.backgroundColor = oldColor;
            box.style.borderColor = oldColor;
            break;
    }
}