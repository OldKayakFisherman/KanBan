

function wireDragula(){
     let drake = dragula(
            [
                document.querySelector("#BackLogLane"),
                document.querySelector("#PlanningLane"),
                document.querySelector("#InProgressLane"),
                document.querySelector("#CompleteLane")
            ]
       );

     drake.on("drop", printEnd);
}

function printEnd(el, target, source, sibling)
{
    console.log(el);
    console.log(target);
    console.log(source);
    console.log(sibling);
    console.log(`Dropped ${el.id}`);
}







window.onload = () => {
    console.log("Loaded");
    wireDragula();
}