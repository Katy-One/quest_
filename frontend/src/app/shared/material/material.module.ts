import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const material = [
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatDialogModule,
	MatAutocompleteModule,
	MatMenuModule,
	MatSnackBarModule,
	FormsModule,
	MatProgressSpinnerModule,
];

@NgModule({
	exports: [...material],
	imports: [...material],
})
export class MaterialModule {}
