export interface Task {
  id?: string;
  category: string;
  completed: boolean;
  content: string;
  name?: string | null;
  title: string;
}

export interface TodoState {
  selectedTab: string;
  tasks: Task[];
  loading: boolean;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  newTask: {
    content: string;
    title: string;
    completed: boolean;
    category: string;
  };
  editingTaskId: string | undefined;
  newTaskTitle: string;
  newTaskContent: string;
  deletingTaskId: string | undefined;
}
