import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule]
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService, MessageService]
    };
  }
}
