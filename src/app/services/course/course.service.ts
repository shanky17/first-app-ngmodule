import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../interfaces/course.interface';
import { Strings } from '../../enum/strings.enum';

/**
 * Service for managing courses, including retrieval, addition, deletion, and storage.
 *
 * @@Injectable
 * @providedIn 'root' - This service is provided at the root level, making it available throughout the application.
 */
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  /**
   * A BehaviorSubject to hold the current list of courses as an observable.
   *
   * @private
   * @type {BehaviorSubject<Course[]>}
   */
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );

  /**
   * Observable for the current list of courses.
   *
   * @type {Observable<Course[]>}
   * @readonly
   * @returns {Observable<Course[]>} An observable of the courses list.
   */
  get courses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  /**
   * Retrieves courses from local storage, updates the current list, and returns the courses.
   *
   * @returns {Course[]} An array of courses retrieved from local storage.
   *
   * @description
   * Checks local storage for courses data under a defined key. If data is found, it parses the data,
   * updates the BehaviorSubject, and returns the courses array; otherwise, returns an empty array.
   */
  getCourses(): Course[] {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    if (data) {
      const courses = JSON.parse(data);
      this.updateCourses(courses);
      return courses;
    }
    return [];
  }

  /**
   * Adds a new course to the list, updates the observable and local storage, and returns the updated list.
   *
   * @param {Course} data - The course data to be added.
   * @returns {Course[]} The updated array of courses after adding the new course.
   *
   * @description
   * Creates a new course with a unique ID, adds it to the current list of courses,
   * updates the BehaviorSubject and local storage, and then returns the updated list.
   */
  addCourse(data: Course): Course[] {
    const courses = this.courses$.value;
    const newCourses = [...courses, { ...data, id: courses.length + 1 }];

    this.updateCourses(newCourses);
    this.setData(newCourses);
    return newCourses;
  }

  /**
   * Deletes a course from the list by its ID, updates the observable and local storage.
   *
   * @param {Course} course - The course to be deleted.
   *
   * @returns {void}
   *
   * @description
   * Filters the course list to remove the specified course by its ID, then updates the BehaviorSubject and local storage.
   */
  deleteCourse(course: Course): void {
    let courses = this.courses$.value;
    courses = courses.filter((c) => c.id !== course.id);
    this.updateCourses(courses);
    this.setData(courses);
  }

  /**
   * Updates the BehaviorSubject with a new array of courses.
   *
   * @param {Course[]} data - The array of courses to update the observable with.
   *
   * @returns {void}
   *
   * @description
   * Sets the BehaviorSubject to a new array of courses, effectively updating any subscribers.
   */
  updateCourses(data: Course[]): void {
    this.courses$.next(data);
  }

  /**
   * Saves the current courses array to local storage.
   *
   * @param {Course[]} data - The array of courses to save to local storage.
   *
   * @returns {void}
   *
   * @description
   * Converts the provided array of courses to a JSON string and saves it in local storage under a specified key.
   */
  setData(data: Course[]): void {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }
}
