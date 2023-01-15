//import {HttpRequestHelper} from "./apiHelper.js";
import { TagHelper } from "./tagHelper.js";
import { BootstrapValidator} from "./bootstrapValidator.js";

class TaskAdditionHelper {


    public watch() {

        let tagInput: HTMLInputElement = document.getElementById("tagInput") as HTMLInputElement;
        let tagTarget: HTMLSpanElement = document.getElementById("tagTarget") as HTMLSpanElement;
        let tagFormInput: HTMLInputElement = document.getElementById("hdnTags") as HTMLInputElement;

        new TagHelper(tagInput, tagTarget, tagFormInput).watch();
        new BootstrapValidator().AddValidation();
        this.wireEvents();
    }


    private wireEvents() {
        let submitBtn = document.getElementById("btnbtnAddRecord");
        submitBtn?.addEventListener('click', this.submitRecord);
    }

    private submitRecord() {
        //TODO
    }
}



window.onload = () => {

    let pa = new TaskAdditionHelper();
    pa.watch();

};