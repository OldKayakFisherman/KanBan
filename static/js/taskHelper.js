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
    }
}
window.onload = () => {
    let pa = new TaskAdditionHelper();
    pa.watch();
};
