import { Injectable, signal, WritableSignal } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { Strings } from '../../enum/strings.enum';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: WritableSignal<Course[]> = signal<Course[]>([]);

  get coursesSignal() {
    return this.courses.asReadonly();
  }

  constructor() {
    this.loadCourses();
  }

  loadCourses() {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    if (data) {
      const courses = JSON.parse(data);
      this.courses.set(courses);
    }
  }

  addCourse(data: Course): Course[] {
    this.courses.update((courses) => {
      const newCourse = { ...data, id: courses.length + 1 };
      const updateCourses = [...courses, newCourse];
      this.setData(updateCourses);
      return updateCourses;
    });
    return this.courses();
  }

  deleteCourse(course: Course): void {
    this.courses.update((courses) => {
      const updateCourses = courses.filter((c) => c.id !== course.id);
      this.setData(updateCourses);
      return updateCourses;
    });
  }

  setData(data: Course[]): void {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }
}
