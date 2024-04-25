import { v4 as uuidv4 } from 'uuid';
import { loadTodo } from './LoadTodo';

class Todo {
    constructor(description, completed = false) {
        this.id = uuidv4();
        this.description = description;
        this.completed = completed;
    }
}

export default Todo;
