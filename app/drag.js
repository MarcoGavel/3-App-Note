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
        this.CONF.trashBtn.classList.add("color-trash-dragover")
    }

    trashLeaveEvent() {
        this.CONF.trashBtn.classList.remove("color-trash-dragover")
    }

    trashDropEvent(e) {
        e.preventDefault()
        this.CONF.trashBtn.classList.remove("color-trash-dragover")
        this.CONF.noteWrapper.removeChild(this.CONF.notaInDrag)
        this.CONF.note = this.CONF.note.filter(nota => nota != notaInDrag)
        console.log(this.CONF.note)
    }

    dragStartEvent(e) {
        this.CONF.notaInDrag = e.target
        e.target.classList.add("drag")
    }

    dragEndEvent(e) {
        this.CONF.notaInDrag = null
        e.target.classList.remove("drag")
        if(this.CONF.soundBtn.dataset.sound === "1") {
            this.CONF.sound.play()
        }
    }

    dragOverEvent(e) {
        const notaInDrag = this.CONF.notaInDrag
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