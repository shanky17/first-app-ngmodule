import { Component, inject } from '@angular/core';
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

  model: any = {};
  cover!: string;
  cover_file: any;
  showError: boolean = false;

  /**
   * Handles the file selection event to set the cover image.
   *
   * @function onFileSelected
   * @param {any} event - The file selection event from the file input.
   *
   * @returns {void} This function performs actions but does not return a value.
   *
   * @description
   * This function processes a selected file from an input event. It retrieves the first file selected,
   * assigns it to `cover_file`, and uses a `FileReader` to read the file as a Data URL. Once the file is loaded,
   * it sets `cover` to the result, which is the base64 encoded image string. If a file is selected, it also sets
   * `showError` to `false` to clear any previous file selection errors.
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;
      const reader = new FileReader();

      reader.onload = () => {
        const dataURL = reader.result!.toString();
        this.cover = dataURL;
      };
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }

  /**
   * Handles form submission, validating the form and ensuring required data is present before proceeding.
   *
   * @function onSubmit
   * @param {NgForm} form - An Angular `NgForm` instance representing the course form data.
   *
   * @returns {void} This function performs actions but does not return a value.
   *
   * @description
   * This function is triggered on form submission. It first checks if the form is valid and if a `cover` image is provided.
   * If the form is invalid or if `cover` is missing, it logs an error message, marks all form controls as touched to display validation errors,
   * and sets `showError` to `true` to visually indicate the missing `cover` requirement. If all validations pass, it calls the `saveCourse` function to save the course.
   */
  onSubmit(form: NgForm): void {
    if (form.invalid || !this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }

    this.saveCourse(form);
  }

  /**
   * Asynchronously saves a new course by submitting form data.
   *
   * @async
   * @function saveCourse
   * @param {NgForm} form - An Angular `NgForm` containing form data for the course.
   *
   * @returns {Promise<void>} No return value, but handles the form data submission.
   *
   * @description
   * This function is responsible for saving a new course. It retrieves the form
   * data, creates a `Course` object by merging the form values with additional properties
   * (such as an `image` from `this.cover`), and then submits this object to the `courseService`
   * to be saved. After successfully adding the course, it clears the form.
   */
  async saveCourse(form: NgForm): Promise<void> {
    try {
      const formVal = form.value;
      console.log('Data submitted: ', formVal);

      const data: Course = {
        ...formVal,
        image: this.cover,
      };

      await this.courseService.addCourse(data);
      this.clearForm(form);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Clears the form data and resets related properties.
   *
   * @function clearForm
   * @param {NgForm} form - An Angular `NgForm` instance representing the form to be cleared.
   *
   * @returns {void} This function performs actions but does not return a value.
   *
   * @description
   * This function resets the provided form, clearing all input fields and resetting the form's state.
   * Additionally, it clears the `cover` and `cover_file` properties, effectively removing any selected cover image data.
   */
  clearForm(form: NgForm): void {
    form.reset();
    this.cover = '';
    this.cover_file = null;
  }
}
