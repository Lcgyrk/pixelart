let posimatrix16 = [[11,12,13,14,15,16,17,18,19,110,111,112,113,114,115,116],
                    [21,22,23,24,25,26,27,28,29,120,121,122,123,124,125,126],
                    [31,32,33,34,35,36,37,38,39,310,311,312,313,314,315,316]]

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