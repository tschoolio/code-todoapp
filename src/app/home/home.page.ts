import { Component, Input } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public todos: Array<Todo> = [];
  
  @Input() mytitle: string;

  constructor(public todoService: TodoService) {}

  async ngOnInit(){
    this.todos = await this.todoService.read();
  }

  getIcon(todo){
    if(todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }

  public async createTodo(){
    let key = await this.todoService.generateKey();
    let todo = {
      title: `${key}`,
      //note: "Small note",
      note: this.mytitle,
      completed: false
    };

    this.mytitle = '';

    await this.todoService.create(key,todo);
    this.todos = await this.todoService.read();
  }

  public async deleteTodo(key: string){
    await this.todoService.delete(key);
    this.todos = await this.todoService.read();
  }

}