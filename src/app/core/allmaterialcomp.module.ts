import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


 
@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatDividerModule,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatDialogModule, MatExpansionModule, MatSelectModule, 
    MatGridListModule, MatSnackBarModule, MatMenuModule,
    MatTabsModule,MatRadioModule, MatDatepickerModule,
    MatNativeDateModule,MatSlideToggleModule,MatStepperModule,
    MatAutocompleteModule,MatMomentDateModule,MatProgressSpinnerModule

  ],
  exports: [
      MatButtonModule, MatCardModule, MatFormFieldModule,
      MatInputModule, MatIconModule, MatDividerModule,
      MatToolbarModule, MatSidenavModule, MatListModule,
      MatDialogModule, MatExpansionModule, MatSelectModule,
      MatGridListModule, MatSnackBarModule, MatMenuModule,
      MatTabsModule,MatRadioModule, MatDatepickerModule,
      MatNativeDateModule,MatSlideToggleModule,MatStepperModule,
      MatAutocompleteModule,MatMomentDateModule,MatProgressSpinnerModule
      
  ],
  declarations: []
})
export class AllmaterialcompModule { }
