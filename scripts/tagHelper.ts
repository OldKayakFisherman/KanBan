export class TagHelper {

    private entry: HTMLInputElement;
    private display: HTMLElement;
    private formInput: HTMLInputElement;

    constructor(
        entryControl: HTMLInputElement,
        displayControl: HTMLElement,
        formControl: HTMLInputElement
    ) {

        this.entry = entryControl;
        this.display = displayControl;
        this.formInput = formControl;
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

         //remove the value from form control
         let formControl: HTMLInputElement = document.getElementById(sourceButton.getAttribute('form-input')) as HTMLInputElement;

        if(formControl.value)
        {
            let existingValues: string[] = formControl.value.split(',');
            existingValues = existingValues.filter(function(ele){
                return ele != parentSpan.textContent;
            });
            formControl.value = existingValues.toString();
        }
    }




    private addTag(tagContent: string) {

        let newTag: HTMLSpanElement = document.createElement("span") as HTMLSpanElement;
        newTag.className = "badge bg-primary p2 mt-1 me-1";
        newTag.innerText = tagContent;

        newTag.setAttribute("data-tag", tagContent);

        this.display.appendChild(newTag);

        //Add the close button
        let closeButton: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
        closeButton.className = "btn-close btn-close-white";
        closeButton.setAttribute('form-input', this.formInput.id);
        closeButton.onclick = this.removeTag;
        newTag.appendChild(closeButton);

        if(this.formInput.value)
        {
            let existingValues: string[] = this.formInput.value.split(',');
            existingValues.push(tagContent);
            this.formInput.value = existingValues.toString();
        }
        else
        {
            this.formInput.value = tagContent;
        }

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