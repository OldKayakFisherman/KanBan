export class TagHelper {

    private entry: HTMLInputElement;
    private display: HTMLElement;

    constructor(entryControl: HTMLInputElement, displayControl: HTMLElement) {

        this.entry = entryControl;
        this.display = displayControl;
    }

    public watch(): void {
        this.wireEvents();
    }

    private wireEvents(): void {
        this.entry.addEventListener('keydown', this.handleEntryKeyDown);
    }

    handleEntryKeyDown = (ev: KeyboardEvent) => {

        if (ev.keyCode == 13) {

            let sourceElement = (ev.target as HTMLInputElement);

            if (sourceElement.value.length > 0) {
                this.addTag(sourceElement.value);
            }

            ev.preventDefault();

            sourceElement.value = "";
            sourceElement.focus();
        }
    }

    private removeTag(ev: PointerEvent): void {

         ev.preventDefault();

         let sourceButton = ev.target as HTMLButtonElement;
         let parentSpan = sourceButton.parentElement as HTMLSpanElement;
         let grandfatherSpan = parentSpan.parentElement as HTMLSpanElement;
         grandfatherSpan.removeChild(parentSpan);

    }




    private addTag(tagContent: string) {

        let newTag: HTMLSpanElement = document.createElement("span") as HTMLSpanElement;
        newTag.className = "badge bg-secondary p2 mt-1 me-1";
        newTag.innerText = tagContent;

        newTag.setAttribute("data-tag", tagContent);



        this.display.appendChild(newTag);

        //Add the close button
        let closeButton: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
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