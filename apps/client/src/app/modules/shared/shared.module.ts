import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './components/page/page.component';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    PageComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
