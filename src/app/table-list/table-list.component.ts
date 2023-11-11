import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contributor } from 'app/models/Contributor';
import { Task } from 'app/models/Task';
import { ContributorsService } from 'app/services/contributors/contributors.service';
import { TasksService } from 'app/services/tasks/tasks.service';
import { TableListDialogComponent } from 'app/table-list-dialog/table-list-dialog.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tasks: Task[] = [];
  contributors: Contributor[] = [];

  constructor(private taskService: TasksService,
              private contributorsService: ContributorsService,
              private dialogModel: MatDialog) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.contributorsService.getContributors().subscribe(res => {
      this.contributors = res;
    });

    this.taskService.getTasks().subscribe(res => {
      res.forEach(item => {
        if (item.assignee !== "") {
          const contributor = this.contributors.find(con => con.userName == item.assignee);
          if (contributor) {
            this.tasks.push({ id: item.id, title: item.title, description: item.description, assignee: contributor });
          } 
        } else {
          this.tasks.push({ id: item.id, title: item.title, description: item.description, assignee: new Contributor() });
        }
      })
    });
  }

  deleteTask(e : Task) {
    const taskIndex = this.tasks.findIndex((obj : Task) => obj.id == e.id);
    this.tasks.splice(taskIndex, 1);
  }

  openDialog(e: Task) {
    const dialog = this.dialogModel.open(TableListDialogComponent, {
      width: '600px',
      data: { title: e.title, description: e.description, assignee: e.assignee, contributors: this.contributors }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        const taskIndex = this.tasks.findIndex( (obj: Task) => obj.id == e.id);
        this.tasks[taskIndex].title = result.title;
        this.tasks[taskIndex].description = result.description;
        this.tasks[taskIndex].assignee = result.assignee;
      }
    });
  }
}
