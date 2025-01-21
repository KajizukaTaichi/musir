function modifyColor(element, newAlpha) {
    // 色名（redなど）の場合、色をrgbaに変換
    const computedColor = window.getComputedStyle(element).color;
    console.log(computedColor);
    let rgbaValues = computedColor.match(/rgba\((\d+), (\d+), (\d+), (\d+)\)/);

    if (rgbaValues) {
        const red = rgbaValues[1];
        const green = rgbaValues[2];
        const blue = rgbaValues[3];
        element.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${newAlpha})`;
    }
}

function createNote() {
    let noteElm = document.createElement("div");
    noteElm.style.backgroundColor = "blueviolet";
    noteElm.className = "notePanel";
    modifyColor(noteElm, 0.4);

    let scaleSelectElm = document.createElement("select");
    for (scale of ["C", "D", "E", "F", "G", "A", "B"]) {
        let optElm = document.createElement("option");
        if (scale == "C") {
            optElm.selected = true;
        }
        optElm.innerText = scale;
        optElm.value = optElm.innerText;
        scaleSelectElm.appendChild(optElm);
    }
    scaleSelectElm.onchange = function (event) {
        let scale = event.target.value;
        let convertTable = {
            C: "blueviolet",
            D: "blue",
            E: "aqua",
            F: "green",
            G: "yellow",
            A: "orange",
            B: "red",
        };
        event.target.parentElement.style.backgroundColor = convertTable[scale];
    };
    noteElm.appendChild(scaleSelectElm);

    let isSharpSelectElm = document.createElement("select");
    for (isSharp of ["", "#"]) {
        let optElm = document.createElement("option");
        if (isSharp == "") {
            optElm.selected = true;
        }
        optElm.innerText = isSharp;
        optElm.value = optElm.innerText;
        isSharpSelectElm.appendChild(optElm);
    }
    noteElm.appendChild(isSharpSelectElm);

    let octaveNumInputElm = document.createElement("input");
    octaveNumInputElm.value = 4;
    octaveNumInputElm.type = "number";
    octaveNumInputElm.min = 1;
    octaveNumInputElm.max = 6;
    octaveNumInputElm.onchange = function (event) {
        let octave = parseInt(event.target.value);
        modifyColor(event.target.parentElement, octave / 10);
    };
    noteElm.appendChild(octaveNumInputElm);

    let contiNumInputElm = document.createElement("input");
    contiNumInputElm.value = 0.5;
    contiNumInputElm.type = "number";
    contiNumInputElm.min = 0;
    contiNumInputElm.max = 5;
    noteElm.appendChild(contiNumInputElm);

    let playMeBtnElm = document.createElement("button");
    playMeBtnElm.innerHTML = "Play";
    playMeBtnElm.addEventListener("click", (event) => {
        play([compile(event.target.parentElement)]);
    });
    noteElm.appendChild(playMeBtnElm);

    let delMeBtnElm = document.createElement("button");
    delMeBtnElm.innerHTML = "Delete";
    delMeBtnElm.addEventListener("click", (event) => {
        event.target.parentElement.remove();
    });
    noteElm.appendChild(delMeBtnElm);

    return noteElm;
}

const addNoteBtn = document.getElementById("addNote");
const noteEditor = document.getElementById("editor");

addNoteBtn.addEventListener("click", function () {
    let notePanel = createNote();
    noteEditor.appendChild(notePanel);
});

function compileAll() {
    let result = [];
    for (note of noteEditor.children) {
        result.push(compile(note));
    }
    return result;
}

function compile(note) {
    let [scale, isSharp, octave, continueTime, _, __] = note.children;
    return new Note(
        scale.value + isSharp.value + octave.value,
        parseFloat(continueTime.value),
    );
}
