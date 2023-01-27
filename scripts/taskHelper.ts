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

    }

}



window.onload = () => {

    let pa = new TaskAdditionHelper();
    pa.watch();

};