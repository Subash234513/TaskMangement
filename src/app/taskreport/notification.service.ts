import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastService: ToastrService) { }

  
  showSuccess(message:any) {
    this.toastService.success(message)
  }

  showError(message:any) {
    this.toastService.error(message)
  }

  showInfo(message:any) {
    this.toastService.info(message)
  }

  showWarning(message:any) {
    this.toastService.warning(message)
  }

  
}
