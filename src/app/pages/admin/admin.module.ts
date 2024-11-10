import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { CoursesModule } from '../courses/courses.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, CoursesModule],
})
export class AdminModule {}
