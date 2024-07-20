export default class Drag {
    constructor(conf) {
        this.CONF = conf
        conf.note.forEach(nota => {
            this.addEvent(nota, "dragstart", this.dragStartEvent)
            this.addEvent(nota, "dragend", this.dragEndEvent)
        });
        this.addEvent(conf.noteWrapper, "dragover", this.dragOverEvent)
        this.addEvent(conf.trashBtn, "dragover", this.trashOverEvent)
        this.addEvent(conf.trashBtn, "dragleave", this.trashLeaveEvent)
        this.addEvent(conf.trashBtn, "drop", this.trashDropEvent)
    }

    addEvent(element, type, fn) {
        element.addEventListener(type, fn.bind(this))
    }

    trashOverEvent(e) {
        e.preventDefault()
        this.CONF.trashBtn.style.color = "red"
    }

    trashLeaveEvent() {
        this.CONF.trashBtn.style.color = "#333"
    }

    trashDropEvent(e) {
        e.preventDefault()
        this.CONF.trashBtn.style.color = "#333"
        const notaInDrag = document.querySelector("div[data-drag=true]")
        this.CONF.noteWrapper.removeChild(notaInDrag)
        this.CONF.note = this.CONF.note.filter(nota => nota != notaInDrag)
        console.log(this.CONF.note)
    }

    dragStartEvent(e) {
        e.target.dataset.drag = "true"
    }

    dragEndEvent(e) {
        e.target.dataset.drag = "false"
        if(this.CONF.soundBtn.dataset.sound === "1") {
            this.CONF.sound.play()
        }
    }

    dragOverEvent(e) {
        const notaInDrag = document.querySelector("div[data-drag=true]")
        const notaDaSostituire = this.getSubstituteNote(e)
        if(notaInDrag == notaDaSostituire) return
        

        const notaInDragNext = notaInDrag.nextElementSibling
        const notaDaSostituireNext = notaDaSostituire.nextElementSibling

        this.replace(notaInDrag, notaDaSostituire, notaInDragNext, notaDaSostituireNext)
        this.replace(notaDaSostituire, notaInDrag, notaDaSostituireNext, notaInDragNext)
    }

    getSubstituteNote({ clientX, clientY}) {
        let sostituto, distMinima = 1e5
        this.CONF.note.forEach(nota => {
            let pos = nota.getBoundingClientRect()
            let spostamentoX = Math.abs(clientX - pos.x)
            let spostamentoY = Math.abs(clientX - pos.y)
            let dist = Math.hypot(spostamentoX, spostamentoY)
            if(dist < distMinima) {
                distMinima = dist
                sostituto = nota
            }
        })
        return sostituto

    }

    replace(nota, sostituto, notaNext, sostitutoNext) {
        if(!sostitutoNext) return this.CONF.noteWrapper.appendChild(nota)
        this.CONF.noteWrapper.insertBefore(nota, sostitutoNext)
    }

}