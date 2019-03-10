import { Component, OnInit } from '@angular/core';
import { MakeService } from 'src/app/services/make/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  makes;
  constructor(private makesService: MakeService) { }

  ngOnInit() {
    this.makesService.getMakes().subscribe(makes => {
      console.log(makes);
      this.makes = makes;
    });
  }

}
