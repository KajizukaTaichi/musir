function createNote() {
    let noteElm = document.createElement("div");
    noteElm.className = "notePanel";

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
    octaveNumInputElm.ariaValueMin = 1;
    octaveNumInputElm.ariaValueMax = 6;
    noteElm.appendChild(octaveNumInputElm);

    let contiNumInputElm = document.createElement("input");
    contiNumInputElm.value = 0.5;
    contiNumInputElm.ariaValueMin = 0;
    contiNumInputElm.ariaValueMax = 5;
    noteElm.appendChild(contiNumInputElm);

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
    noteEditor.appendChild(createNote());
});

function compile() {
    let result = [];
    for (note of noteEditor.children) {
        let [scale, isSharp, octave, continueTime, _] = note.children;
        result.push(
            new Note(
                scale.value + isSharp.value + octave.value,
                parseFloat(continueTime.value),
            ),
        );
    }
    return result;
}
