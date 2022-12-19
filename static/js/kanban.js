function wireDragula() {
    dragula([
        document.querySelector("#BackLogLane"),
        document.querySelector("#PlanningLane"),
        document.querySelector("#InProgressLane"),
        document.querySelector("#CompleteLane")
    ]);
}
window.onload = function () {
    console.log("Loaded");
    wireDragula();
};
//# sourceMappingURL=kanban.js.map