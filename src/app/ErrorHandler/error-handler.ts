import * as Raven from 'raven-js';
import { ErrorHandler , Inject , NgZone} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export class AppErrorHandler implements ErrorHandler {
  /**
   *
   */
  constructor(
    private zone: NgZone,
    @Inject(ToastrService) private toasterService: ToastrService) {
  }
  handleError(error: any): void {
    Raven.captureException(error.originalError || error);
    // zone here is to enusure that angular detects the state of the toaster service has changed
    this.zone.run(() => {
      this.toasterService.error('unexexted error happend');
    });
  }
}
