import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchPanelComponent, ResultsTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: Employee[] = [];

  constructor(private empService: EmployeeService) {}

  handleSearch(query: any) {
    const hasAny = Object.values(query || {}).some(
      v => v && v.toString().trim().length > 0
    );

    if (!hasAny) {
      this.empService.getAll().subscribe(list => this.employees = list);
      return;
    }

    this.empService.searchEmployees(query).subscribe(list => this.employees = list);
  }

  ngOnInit() {
    this.empService.getAll().subscribe(list => this.employees = list);
  }
}
