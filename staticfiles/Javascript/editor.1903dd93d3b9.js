window.onload = () => {
    replaceTextArea()
    copyToDiv()

    let submitButtons = document.querySelectorAll("input[type='submit']")
    for (const button of submitButtons) {
        button.addEventListener("click", () => {
            processData()
        })
    }

    function replaceTextArea() {
        let textarea = document.querySelectorAll("textarea")
        let divEditor = document.createElement("div")
        divEditor.contentEditable = true
        divEditor.className = "divEditor"
        divEditor.style.border = "1px solid green"
        divEditor.style.width = "50%"
        divEditor.style.height = "200px"
        divEditor.style.overflowY = "scroll"
        divEditor.style.padding = "8px 10px 8px 20px"
        divEditor.style.backgroundColor = "white"

        for (const area of textarea) {
            area.style.display = "none"
            let parentNode = area.parentNode
            if (area.nextElementSibling != divEditor.cloneNode()) {
                parentNode.insertBefore(divEditor.cloneNode(), area.nextSibling.nextSibling)
            }
        }
    }



    function copyToDiv() {
        let textarea = document.querySelectorAll("textarea")
        for (const area of textarea) {
            if (area.innerHTML.length > 0) {
                let data = area.value.replace(/p>/ig, 'div>')
                let div = document.createElement("div")
                div.innerHTML = data
                area.nextElementSibling.appendChild(div)
            }
        }
    }

    function processData() {
        let divEditor = document.querySelectorAll(".divEditor")
        for (const editor of divEditor) {
            //change all Div tags to Paragraph tags
            let editorData = editor.innerHTML.replace(/div>/ig, 'p>')
                //tag an untaged data at the end with a paragrapy tag
                //especially when paste function is used
            let Data = editorData;
            if (!/p>$/.test(editorData)) {
                Data = editorData.replace(/(.+p>)(.+)$/, "$1<p>$2</p>")
            }
            //remove emty tags and collaspe white spaces
            let fData = Data.replace(/<p><br\/?p>|<br.*?>|&nbsp;;*?/ig, "").replace(/<p>\s*<\/p>*/ig, "")
                //remove the outer Div/P on article edit
            let finalData = fData
            if (/^<p><p>|<\/p><\/p>$/ig.test(fData)) {
                finalData = fData.replace(/^<p>|<\/p>$/ig, "")
            }
            //assign to data to textareas
            editor.previousElementSibling.innerHTML = finalData
                //empty every DivEditor
                //editor.innerHTML=""
                //console.log(editor.previousElementSibling.innerHTML)
        }
    }
    //assign execCommand to buttons onclick
    let buttons = document.querySelectorAll(".tool-btn")
    for (const button of buttons) {
        button.addEventListener("click", () => {
            let cmd = button.dataset["command"]
            if (cmd === "createLInk") {
                let url = prompt("Enter a URl:", "https://")
                document.execCommand(cmd, false, url)
            } else if (cmd === "raisenumber") {
                let selected = window.getSelection().toString()
                if (window.Selection && parseInt(selected)) {
                    document.execCommand("superscript", false, null)
                    document.execCommand("createLInk", false, "#end_notes")
                }
            } else if (cmd === "removenumber") {
                let selected = window.getSelection().toString()
                if (window.Selection && parseInt(selected)) {
                    let intId = parseInt(selected)
                    document.execCommand("unlink", false, null)
                    document.execCommand("superscript", false, null)
                    window.getSelection().deleteFromDocument()
                    window.getSelection().removeAllRanges()
                }
            } else {
                document.execCommand(cmd, false, null)
            }
        })
    }

    let divEditors = document.querySelectorAll(".divEditor")
    for (const divEditor of divEditors) {

        divEditor.addEventListener("paste", function(event) {
            let paste = (event.clipboardData || window.clipboardData).getData('text')
                //console.log(paste)
            const selection = window.getSelection()
            if (!selection.rangeCount) return false
            selection.deleteFromDocument();
            selection.getRangeAt(0).insertNode(document.createTextNode(paste))
            event.preventDefault()
        })

        divEditor.addEventListener("keydown", function(event) {
            let keyCode = event.which || event.keyCode
            if (keyCode == 32) {
                document.execCommand("unlink", false, null)
                let sup = window.getSelection().focusNode.parentNode.nodeName
                if (sup === "SUP") {
                    document.execCommand("superscript", false, null)
                }
                //console.log(window.getSelection())
            }
        })
    }


    let headingSeletor = document.querySelector("#heading")
    headingSeletor.addEventListener("change", function() {
        let cmd = this.value
        document.execCommand("formatBlock", false, `<${cmd}>`)
        this.selectedIndex = 0
    })

}