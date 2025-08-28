import { Component, Input } from '@angular/core';
import { NotificationType } from '../../enums/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input() notificationType = NotificationType.Default;
  @Input() message = '';
  @Input() showIcon = true;

  get alertType(): string {
    return `alert-${this.notificationType.toLowerCase()}`;
  }
}
