import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundComponent } from './not-found.component';

const components = [NotFoundComponent];

@NgModule({
	imports: [SharedModule],
	declarations: [...components],
})
export class NotFoundModule {}
