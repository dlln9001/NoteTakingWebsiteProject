function getIndexes(fontFunc = false) {
    selected_string = window.getSelection()
    console.log(selected_string, selected_string.data)
    if (fontFunc) {
        let selected_string_font = selections[selections.length - 2]
        selectedNode = selected_string_font.anchorNode
        firstIndex = selected_string_font.anchorOffset
        lastIndex = selected_string_font.focusOffset
    }
    else {
        selectedNode = selected_string.anchorNode
        firstIndex = selected_string.anchorOffset
        lastIndex = selected_string.focusOffset
    }
    if (firstIndex > lastIndex) {
        savedVal = lastIndex
        lastIndex = firstIndex
        firstIndex = savedVal
    }
    return [firstIndex, lastIndex, selectedNode]
}


document.addEventListener('selectionchange', selectionListener)
var selections = []
var copied
function selectionListener() {
    selected_string = document.getSelection()

    if (selected_string != typeof null && selected_string != typeof undefined) {
        copied = {
            anchorNode: selected_string.anchorNode,
            anchorOffset: selected_string.anchorOffset,
            focusOffset: selected_string.focusOffset,
        }
        selections.push(copied)
    }
}


function changeState(state, image = false, imgUrl = '') {
    let selected_info = getIndexes()
    firstIndex = selected_info[0]
    lastIndex = selected_info[1]
    selectedNode = selected_info[2]
    let original = selectedNode.data
    let parent = selectedNode.parentElement
    while (parent.id != "notetext") {
        if (state.toUpperCase() === parent.tagName) {
            parent.replaceWith(parent.textContent)
            return
        }
        parent = parent.parentElement
    }
    if (image) {
        var modified = original.slice(0, lastIndex) + `<${state} src="${imgUrl}" alt="${imgUrl}" class="noteImage" onclick="showImageUpload()" id="noteImageId">`
    }
    else {
        var modified = original.slice(0, firstIndex) + `<${state}>` + original.slice(firstIndex, lastIndex) + `</${state}>` + original.slice(lastIndex)
    }
    let newChild = document.createElement('span')
    newChild.innerHTML = modified
    selectedNode.replaceWith(newChild)
}


function setImageUrl(url) {
    let imgs = document.getElementsByTagName('img')
    console.log(imgs)
    let img = imgs[imgs.length - 1]
    console.log(img)
    img.setAttribute('src', url)
}


function makeList(listType) {
    let selected_info = getIndexes()
    firstIndex = selected_info[0]
    lastIndex = selected_info[1]
    selectedNode = selected_info[2]
    let parent = selectedNode.parentElement
    while (parent.id != "notetext") {
        if (listType.toUpperCase() === parent.tagName) {
            parent.replaceWith(parent.textContent)
            return
        }
        parent = parent.parentElement
    }
    parent = selectedNode.parentElement
    while (true) {
        // this if is for the fist line in the text box. Since it's not given a div tag
        childSaved = parent
        if (parent.id === 'notetext') {
            parent.childNodes[1].innerHTML = `<${listType}><li>` + parent.childNodes[1].innerHTML + `</li><${listType}>`
            return
        }
        if (parent.tagName === "DIV") {
            parent.innerHTML = `<${listType}><li>` + parent.innerHTML + `</li><${listType}>`
            return
        }
        parent = parent.parentElement
    }
}

// I know, I know, it's probably too similar to the functions above
function changeFont(fontSize) {
    let selected_info = getIndexes(true)
    firstIndex = selected_info[0]
    lastIndex = selected_info[1]
    selectedNode = selected_info[2]
    let original = selectedNode.data
    let modified = original.slice(0, firstIndex) + `<span style="font-size: ${fontSize}px;">` + original.slice(firstIndex, lastIndex) + `</span>` + original.slice(lastIndex)
    let newChild = document.createElement('span')
    newChild.innerHTML = modified
    selectedNode.replaceWith(newChild)
}


function showSorts() {
    document.getElementById('sortOptions').style.visibility = 'visible'
}
function showFonts() {
    document.getElementById('fontSizesId').style.visibility = 'visible'
}
function showImageUpload() {
    document.getElementById('uploadImageDivId').style.visibility = 'visible'
}

function makeInvisible(event) {
    let element = event.target
    if (document.getElementsByTagName('body')[0].id === 'homeBody') {
        if (document.getElementById('sortOptions').style.visibility === 'visible' && element.id != 'sortIconId') {
            document.getElementById('sortOptions').style.visibility = 'hidden'
        }
    }
    else if (document.getElementsByTagName('body')[0].id === 'openedNotesBody') {
        if (document.getElementById('fontSizesId').style.visibility === 'visible' && element.id != 'fontButton') {
            document.getElementById('fontSizesId').style.visibility = 'hidden'
        }
        if (document.getElementById('uploadImageDivId').style.visibility === 'visible' && element.id != 'uploadImageDivId' && element.id != 'imageFormId' && element.id != 'submitButton' && element.id != 'uploadInputId' && element.id != 'noteImageId') {
            document.getElementById('uploadImageDivId').style.visibility = 'hidden'
        }
    }
}
document.addEventListener('click', makeInvisible)


function onLoad() {
    // without this, it prints out the html tags as shown text. e.g. The user would see <strong> Hello </strong>
    document.getElementById('notetext').innerHTML = document.getElementById('notetext').textContent

    // loads font sizes
    let fontSizes = [8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 30, 36, 48, 64, 72, 96]
    for (let i = 0; i < fontSizes.length; i++) {
        newElement = document.createElement('div')
        newElement.innerHTML = fontSizes[i]
        newElement.className = 'fontSizeSelection'
        newElement.classList.add('buttonhover')
        newElement.setAttribute('onclick', `changeFont(${fontSizes[i]})`)
        document.getElementById('fontSizesId').append(newElement)
    }
}
function fixHTML2() {
    document.getElementById('textPreview').innerHTML = document.getElementById('textPreview').textContent
}

