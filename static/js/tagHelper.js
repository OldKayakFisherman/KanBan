export class TagHelper {
    constructor(entryControl, displayControl) {
        this.handleEntryKeyDown = (ev) => {
            if (ev.keyCode == 13) {
                let sourceElement = ev.target;
                if (sourceElement.value.length > 0) {
                    this.addTag(sourceElement.value);
                }
                ev.preventDefault();
                sourceElement.value = "";
                sourceElement.focus();
            }
        };
        this.entry = entryControl;
        this.display = displayControl;
    }
    watch() {
        this.wireEvents();
    }
    wireEvents() {
        this.entry.addEventListener('keydown', this.handleEntryKeyDown);
    }
    removeTag(ev) {
        ev.preventDefault();
        let sourceButton = ev.target;
        let parentSpan = sourceButton.parentElement;
        let grandfatherSpan = parentSpan.parentElement;
        grandfatherSpan.removeChild(parentSpan);
    }
    addTag(tagContent) {
        let newTag = document.createElement("span");
        newTag.className = "badge bg-secondary p2 mt-1 me-1";
        newTag.innerText = tagContent;
        newTag.setAttribute("data-tag", tagContent);
        this.display.appendChild(newTag);
        //Add the close button
        let closeButton = document.createElement("button");
        closeButton.className = "btn-close btn-close-white";
        closeButton.onclick = this.removeTag;
        newTag.appendChild(closeButton);
    }
}
/*
window.onload = () => {

    let tagInput: HTMLInputElement = document.getElementById("tagInput") as HTMLInputElement;
    let tagTarget: HTMLSpanElement = document.getElementById("tagTarget") as HTMLSpanElement;

    console.log("init");

    let th = new TagHelper(tagInput, tagTarget);
    th.watch();

};

 */ 
