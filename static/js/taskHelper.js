//import {HttpRequestHelper} from "./apiHelper.js";
import { TagHelper } from "./tagHelper.js";
import { BootstrapValidator } from "./bootstrapValidator.js";
class TaskAdditionHelper {
    watch() {
        let tagInput = document.getElementById("tagInput");
        let tagTarget = document.getElementById("tagTarget");
        let tagFormInput = document.getElementById("hdnTags");
        new TagHelper(tagInput, tagTarget, tagFormInput).watch();
        new BootstrapValidator().AddValidation();
        this.wireEvents();
    }
    wireEvents() {
        let submitBtn = document.getElementById("btnbtnAddRecord");
        submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', this.submitRecord);
    }
    submitRecord() {
        //TODO
    }
}
window.onload = () => {
    let pa = new TaskAdditionHelper();
    pa.watch();
};
