import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Stopwatch } from '../../../../shared/models/stopwatch';
import { Task } from '../../../../shared/models/task';
import { StopwatchService } from '../../../../core/auth/Stopwatch.service';
import { TaskService } from '../../../../core/http/Task.servicr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskForm: FormGroup;
  taskDurationForm: FormGroup;
  id: any;
  stopwatch: Stopwatch = { taskId: null, action: '' };
  visibleInputReason: boolean = false;
  disabledBtn: boolean = false;
  task: Task;
  totalDuration: number;
  remainingTime: number;
  remainingTimeTest: number;
  totalDurationTest: number;
  private totalDurationInterval: any;

  constructor(
    private service: StopwatchService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceTask: TaskService
  ) {
    this.taskForm = this.createForm();
    this.taskDurationForm = this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  createForm() {
    return this.formBuilder.group({
      reasonForStop: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.stopwatch.taskId = this.id;
    this.stopwatch.stopReason = '';
    this.stopwatch.action = '';
    
    this.serviceTask.read(this.id).subscribe(
      (task) => {
        this.task = task;
        this.totalDuration = task.totalDuration;
        this.totalDurationTest = task.totalDuration;
        this.remainingTime = this.task.duration * 3600 - this.task.totalDuration;
        this.remainingTimeTest = this.remainingTime;
  
        setInterval(() => {
          if (this.remainingTimeTest > 0) {
            this.remainingTimeTest -= 1;
          }
        }, 1000);
      },
      (error) => {
        console.error('Erreur lors de la lecture de la tâche :', error);
      }
    );
  }

  start() {
    this.stopwatch.action = 'start';
    this.visibleInputReason = true;
    this.disabledBtn = true;

    this.service.create(this.stopwatch).subscribe(
      (data) => {
        this.stopwatch.id = data.id;
        this.stopwatch.startDate = data.startDate;

        this.totalDurationInterval = setInterval(() => {
          this.totalDurationTest += 1;
        }, 1000);
      },
      (error) => {
        console.error('Erreur lors du démarrage du chronomètre :', error);
      }
    );
  }

  stop() {
    this.stopwatch.action = 'stop';
    clearInterval(this.totalDurationInterval);

    if (this.taskForm.get('reasonForStop').valid) {
      this.stopwatch.stopReason = this.taskForm.get('reasonForStop').value;

      this.service.update(this.stopwatch).subscribe(
        (data) => {
          this.disabledBtn = false;
          this.taskForm.get('reasonForStop').setValue('');
          this.visibleInputReason = false;

          this.serviceTask.read(this.id).subscribe(
            (task) => {
              this.task = task;
              this.totalDuration = task.totalDuration;
              this.remainingTime = this.task.duration * 3600 - this.task.totalDuration;
            },
            (error) => {
              console.error('Erreur lors de la lecture de la tâche :', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de l\'arrêt du chronomètre :', error);
        }
      );
    } else {
      console.log('Le champ Raison de l\'arrêt est requis.');
    }
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
