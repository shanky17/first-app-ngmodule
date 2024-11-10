import { Component, inject, Input } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  /**
   * Injected instance of `CourseService` for managing course data.
   *
   * @private
   * @type {CourseService}
   */
  private courseService: CourseService = inject(CourseService);

  /**
   * List of courses to be displayed in the component.
   *
   * @type {Course[]}
   */
  courses: Course[] = [];

  /**
   * Boolean input to determine if the user is an admin, allowing for course management features.
   *
   * @Input
   * @type {boolean}
   * @default false
   */
  @Input() isAdmin: boolean = false;

  /**
   * Subscription to the `CourseService.courses` observable, used for real-time course updates.
   *
   * @type {Subscription}
   */
  coursesSub!: Subscription;

  /**
   * Initializes the component, fetching the initial course list and subscribing to future updates.
   *
   * @returns {void}
   *
   * @description
   * This lifecycle hook fetches the current list of courses from the service and subscribes to the
   * `CourseService.courses` observable. When the observable emits updates, the component's `courses`
   * list is updated in real-time. Errors during subscription are logged to the console.
   */
  ngOnInit(): void {
    this.courses = this.courseService.getCourses();

    this.coursesSub = this.courseService.courses.subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  /**
   * Deletes a course from the list using the `CourseService`.
   *
   * @param {Course} course - The course to be deleted.
   *
   * @returns {void}
   *
   * @description
   * Calls the `deleteCourse` method of `CourseService` to remove the specified course from the list.
   */
  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course);
  }

  /**
   * Cleans up the subscription to avoid memory leaks when the component is destroyed.
   *
   * @returns {void}
   *
   * @description
   * This lifecycle hook is called before the component is destroyed. It unsubscribes from the
   * `coursesSub` subscription if it exists, ensuring proper cleanup and preventing memory leaks.
   */
  ngOnDestroy(): void {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }
}
