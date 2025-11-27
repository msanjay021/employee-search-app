import { Component } from '@angular/core';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  employees: Employee[] = [];

  constructor(private empService: EmployeeService) {}

  handleSearch(query: any) {
    // If all fields are empty -> get all
    const hasAny = Object.values(query || {}).some(v => v && v.toString().trim().length > 0);
    if (!hasAny) {
      this.empService.getAll().subscribe(list => this.employees = list);
      return;
    }

    this.empService.searchEmployees(query).subscribe(list => this.employees = list);
  }

  ngOnInit() {
    // load all initially
    this.empService.getAll().subscribe(list => this.employees = list);
  }
}
