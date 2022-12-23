

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

async function itemDropped(el, target, source, sibling)
{
    let model = parseTaskData(el.id, target);
    await updateTask(model);

}

function parseTaskData(cardId, target){

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
        console.log(el);
        baseModel.tags.push(el.textContent);
    });

    return baseModel;
}

async function updateTask(task){

     try {
            const response = await fetch('/api/updateTask', {
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
    console.log("Loaded");
    wireDragula();
}