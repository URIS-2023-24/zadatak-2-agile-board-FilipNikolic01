import { Component, OnInit } from '@angular/core';
import { Contributor } from 'app/models/Contributor';
import { Task } from 'app/models/Task';
import { ContributorsService } from 'app/services/contributors/contributors.service';
import { TasksService } from 'app/services/tasks/tasks.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tasks: Task[] = [];
  contributors: Contributor[] = [];

  constructor(private taskService: TasksService,
              private contributorsService: ContributorsService) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });

    this.contributorsService.getContributors().subscribe(res => {
      this.contributors = res;
    });
  }

}
