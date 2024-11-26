import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { NgForm } from '@angular/forms';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private courseService = inject(CourseService);

  model = signal<any>({});
  cover = signal<string | null>(null);
  cover_file = signal<any>(null);
  showError = signal<boolean>(false);
  isSaved = signal<boolean>(false);

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cover_file.set(file);

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result!.toString();
        this.cover.set(dataURL);
      };
      reader.readAsDataURL(file);
      this.showError.set(false);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.cover()) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover()) {
        this.showError.set(true);
      }
      return;
    }

    this.saveCourse(form);
  }

  async saveCourse(form: NgForm): Promise<void> {
    try {
      const formVal = form.value;
      console.log('Data submitted: ', formVal);

      const data: Course = {
        ...formVal,
        image: this.cover(),
      };

      await this.courseService.addCourse(data);

      this.isSaved.set(true);
      setTimeout(() => {
        this.isSaved.set(false);
      }, 1500);
      this.clearForm(form);
    } catch (err) {
      console.log(err);
    }
  }

  clearForm(form: NgForm): void {
    form.reset();
    this.cover.set(null);
    this.cover_file.set(null);
  }
}
