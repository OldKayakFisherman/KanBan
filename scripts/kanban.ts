import {doPostRequest, doPutRequest, doDeleteRequest, APIRequestResponse} from './apiHelper.js'
import {HttpHelperResponse} from "./httpRequestHelper";



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


async function itemDropped(el, target, source, sibling)
{
    let model = parseSwimlaneTaskData(el.id, target);
    let apiResponse = await doPutRequest("/task/updateSwimlane", model);

    if(!apiResponse.success)
    {
        console.log(apiResponse.error);
    }

}


function parseSwimlaneTaskData(cardId, target){

    let taskId = cardId.replace("taskCard", "");

    let baseModel  = {
        "id": cardId.replace("taskCard", ""),
        "title": document.getElementById(`task${taskId}-title`).textContent.trim(),
        "description": document.getElementById(`task${taskId}-description`).textContent.trim(),
        "tags": [],
        "currentSwimlane": target.id
    };

    //Parse the tags
    let tagContainer = document.querySelector(`#task${taskId}-tags`);
    let tagSpans = tagContainer.querySelectorAll("span");

    tagSpans.forEach((el) =>{
        baseModel.tags.push(el.textContent);
    });

    return baseModel;
}


function wireEvents(){

    let deleteAnchors = document.querySelectorAll("a[data-task-delete]");

    deleteAnchors.forEach((el) =>{
        el.addEventListener('click', handleDeleteTask);
    });

}

async function handleDeleteTask(ev){

    let deleteLink:HTMLAnchorElement = ev.target as HTMLAnchorElement;

    if(deleteLink){
        let taskid = deleteLink.attributes['task-id'].value;
        let httpReponse:APIRequestResponse = await doDeleteRequest(`/task/${taskid}`);

        if(httpReponse.success)
        {
            let taskCard: HTMLDivElement = document.getElementById(`taskCard${taskid}`) as HTMLDivElement;

            if(taskCard){
                taskCard.parentElement.removeChild(taskCard);
            }
        }

    }


    console.log("Deleting ...")
}

window.onload = () => {
    wireDragula();
    wireEvents();
}