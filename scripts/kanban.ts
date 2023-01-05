
import {doPostRequest} from './apiHelper.js'
import {doPutRequest} from "./apiHelper.js";

function wireModal(){
   let btnSave:HTMLButtonElement = document.getElementById("btnSaveChanges") as HTMLButtonElement;
   btnSave.onclick = saveNewEntity;
}

function wireDragula(){

     // @ts-ignore
    let drake = dragula(
            [
                document.querySelector("#BackLogLane"),
                document.querySelector("#PlanningLane"),
                document.querySelector("#InProgressLane"),
                document.querySelector("#CompleteLane")
            ]
       );

     drake.on("drop", itemDropped);
}

async function saveNewEntity(){
    let data = parseNewTaskData();
    let response = await doPostRequest('/api/addTask', data);

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
}


async function itemDropped(el, target, source, sibling)
{
    let model = parseSwimlaneTaskData(el.id, target);
    await updateTask(model);

}

function parseNewTaskData(){

    let titleControl: HTMLInputElement = document.getElementById('txtNewTitle') as HTMLInputElement;
    let descriptionControl: HTMLTextAreaElement = document.getElementById('txtNewDescription') as HTMLTextAreaElement;
    let tagControl: HTMLInputElement = document.getElementById('txtNewTags') as HTMLInputElement;

    let model = {
        "title": titleControl.value,
        "description": descriptionControl.value,
        "tags": tagControl.value,
        "currentSwimlane": "BackLogLane"
    };

    return model;
}

function parseSwimlaneTaskData(cardId, target){

    let baseModel  = {
        "id": cardId.replace("task", ""),
        "title": document.getElementById(`${cardId}-title`).textContent.trim(),
        "description": document.getElementById(`${cardId}-description`).textContent.trim(),
        "tags": [],
        "currentSwimlane": target.id
    };

    //Parse the tags
    let tagContainer = document.querySelector(`#${cardId}-tags`);
    let tagSpans = tagContainer.querySelectorAll("span");

    tagSpans.forEach((el) =>{
        baseModel.tags.push(el.textContent);
    });

    return baseModel;
}

async function updateTask(task){

     try {
            const response = await fetch('/api/updateTask', {
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
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
}

async function addTask(task){

     try {
            const response = await fetch('/api/addTask', {
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
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
}


window.onload = () => {
    wireDragula();
    wireModal();
}