

function wireDragula(){
    dragula(
            [
                document.querySelector("#BackLogLane"),
                document.querySelector("#PlanningLane"),
                document.querySelector("#InProgressLane"),
                document.querySelector("#CompleteLane")
            ]
       );
}






window.onload = () => {
    console.log("Loaded");
    wireDragula();
}