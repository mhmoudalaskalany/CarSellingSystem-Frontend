import { Component, OnInit } from '@angular/core';
import { MakeService } from 'src/app/services/make/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  vechile: any = {};
  constructor(private makesService: MakeService) { }

  ngOnInit() {
    this.makesService.getMakes().subscribe((makes: any) =>{
      this.makes = makes;
    });
  }

  onMakeChange() {
    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(m => m.id == this.vechile.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
