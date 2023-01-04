import bootstrap = require('bootstrap');
import dragula = require('dragula');
import {doPostRequest} from './apiHelper'
import {doPutRequest} from "./apiHelper";
import {Modal} from "bootstrap";



function wireModal(){
   let btnSave:HTMLButtonElement = document.getElementById("btnSaveChanges") as HTMLButtonElement;
   btnSave.onclick = saveNewEntity;
}

function wireDragula(){
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

    if (response.success){
        let addModal: Modal = Modal.getInstance(document.getElementById('staticBackdrop'));
        addModal.hide();
    }
    else
    {
        console.log(response.error);
    }
}

async function itemDropped(el, target, source, sibling)
{
    let model = parseSwimlaneTaskData(el.id, target);
    await updateTask(model);

}

function parseNewTaskData(){
    let model = {
        "title": document.getElementById('#txtNewTitle').textContent.trim(),
        "description": document.getElementById('txtNewDescription').textContent.trim(),
        "tags": document.getElementById('txtNewTags').textContent.split(','),
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