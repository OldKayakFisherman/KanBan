var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doPutRequest, doDeleteRequest } from './apiHelper.js';
function wireDragula() {
    // @ts-ignore
    let drake = dragula([
        document.querySelector("#BackLogLane"),
        document.querySelector("#PlanningLane"),
        document.querySelector("#InProgressLane"),
        document.querySelector("#CompleteLane")
    ]);
    drake.on("drop", itemDropped);
}
function itemDropped(el, target, source, sibling) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = parseSwimlaneTaskData(el.id, target);
        let apiResponse = yield doPutRequest("/task/updateSwimlane", model);
        if (!apiResponse.success) {
            console.log(apiResponse.error);
        }
    });
}
function parseSwimlaneTaskData(cardId, target) {
    let taskId = cardId.replace("taskCard", "");
    let baseModel = {
        "id": cardId.replace("taskCard", ""),
        "title": document.getElementById(`task${taskId}-title`).textContent.trim(),
        "description": document.getElementById(`task${taskId}-description`).textContent.trim(),
        "tags": [],
        "currentSwimlane": target.id
    };
    //Parse the tags
    let tagContainer = document.querySelector(`#task${taskId}-tags`);
    let tagSpans = tagContainer.querySelectorAll("span");
    tagSpans.forEach((el) => {
        baseModel.tags.push(el.textContent);
    });
    return baseModel;
}
function wireEvents() {
    let deleteAnchors = document.querySelectorAll("a[data-task-delete]");
    deleteAnchors.forEach((el) => {
        el.addEventListener('click', handleDeleteTask);
    });
}
function handleDeleteTask(ev) {
    return __awaiter(this, void 0, void 0, function* () {
        let deleteLink = ev.target;
        if (deleteLink) {
            let taskid = deleteLink.attributes['task-id'].value;
            let httpReponse = yield doDeleteRequest(`/task/${taskid}`);
            if (httpReponse.success) {
                let taskCard = document.getElementById(`taskCard${taskid}`);
                if (taskCard) {
                    taskCard.parentElement.removeChild(taskCard);
                }
            }
        }
        console.log("Deleting ...");
    });
}
window.onload = () => {
    wireDragula();
    wireEvents();
};
