//import {HttpRequestHelper} from "./apiHelper.js";
import { TagHelper } from "./tagHelper.js";
class TaskAdditionHelper {
    watch() {
        let tagInput = document.getElementById("tagInput");
        let tagTarget = document.getElementById("tagTarget");
        new TagHelper(tagInput, tagTarget).watch();
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
