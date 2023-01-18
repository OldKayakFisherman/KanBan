class IndexViewModel:
    def __init__(self, tasks):
        self.backlog_data = [task for task in tasks if task.swimlane == 'BackLog']
        self.planning_data = [task for task in tasks if task.swimlane == 'Planning']
        self.inprogress_data = [task for task in tasks if task.swimlane == 'In-Progress']
        self.complete_data = [task for task in tasks if task.swimlane == 'Complete']


