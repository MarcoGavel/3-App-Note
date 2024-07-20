import Note from "./note.js";

const CONF = {
    ricerca: document.getElementById("ricerca"),
    noteWrapper: document.getElementById("note"),
    note: Array.from(document.querySelectorAll(".nota")),
    soundBtn: document.getElementById("sound-btn"),
    trashBtn: document.getElementById("trash-btn"),
    newNoteBtn: document.getElementById("new-note-btn"),
    newNoteWrapper: document.getElementById("new-note-wrapper"),
    titolo: document.getElementById("new-note-titolo"),
    testo: document.getElementById("new-note-testo"),
    close: document.getElementById("close-note-btn"),
    save: document.getElementById("save-note-btn"),
    sound: new Audio("success-drag.wav")
}

export default () => new Note(CONF)