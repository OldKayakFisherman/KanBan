var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doPostRequest } from './apiHelper.js';
function wireModal() {
    let btnSave = document.getElementById("btnSaveChanges");
    btnSave.onclick = saveNewEntity;
}
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
function saveNewEntity() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = parseNewTaskData();
        let response = yield doPostRequest('/api/addTask', data);
        console.log(data);
        /*
        if (response.success){
            // @ts-ignore
            let addModal: Modal = Modal.getInstance(document.getElementById('addTaskModel'));
            addModal.hide();
        }
        else
        {
            console.log(response.error);
        }
         */
    });
}
function itemDropped(el, target, source, sibling) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = parseSwimlaneTaskData(el.id, target);
        yield updateTask(model);
    });
}
function parseNewTaskData() {
    let titleControl = document.getElementById('txtNewTitle');
    let descriptionControl = document.getElementById('txtNewDescription');
    let tagControl = document.getElementById('txtNewTags');
    let model = {
        "title": titleControl.value,
        "description": descriptionControl.value,
        "tags": tagControl.value,
        "currentSwimlane": "BackLogLane"
    };
    return model;
}
function parseSwimlaneTaskData(cardId, target) {
    let baseModel = {
        "id": cardId.replace("task", ""),
        "title": document.getElementById(`${cardId}-title`).textContent.trim(),
        "description": document.getElementById(`${cardId}-description`).textContent.trim(),
        "tags": [],
        "currentSwimlane": target.id
    };
    //Parse the tags
    let tagContainer = document.querySelector(`#${cardId}-tags`);
    let tagSpans = tagContainer.querySelectorAll("span");
    tagSpans.forEach((el) => {
        baseModel.tags.push(el.textContent);
    });
    return baseModel;
}
function updateTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/api/updateTask', {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            }
            else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
function addTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/api/addTask', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            }
            else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
window.onload = () => {
    wireDragula();
    wireModal();
};
