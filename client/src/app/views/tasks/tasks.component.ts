import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private displayedColumns: string[] = ['color','id','title','date','priority','category'];
  private dataSource: MatTableDataSource<Task>;

  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.refreshTable()
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed
  }

  private getPriorityColor(task: Task) {
    if(task.completed){
      return '#eeeeee';
    }
    if(task.priority && task.priority.color){
      return task.priority.color;
    }
    return '#fff';
  }

  private refreshTable() {
    this.dataSource.data = this.tasks;
  }
}
