class IndexViewModel:
    def __init__(self, backlog_data, planning_data, inprogress_data, complete_data):

        self.backlog_data = backlog_data
        self.planning_data = planning_data
        self.inprogress_data = inprogress_data
        self.complete_data = complete_data


        #self.backlog_data = [task for task in tasks if task.swimlane == 'BackLogLane']
        #self.planning_data = [task for task in tasks if task.swimlane == 'PlanningLane']
        #self.inprogress_data = [task for task in tasks if task.swimlane == 'InProgressLane']
        #self.complete_data = [task for task in tasks if task.swimlane == 'CompleteLane']


