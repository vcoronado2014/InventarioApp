import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProgressbarComponent } from './progressbar/progressbar.component';

@NgModule({
    declarations: [
      ProgressbarComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      MatCardModule,
      MatButtonModule,
    ],
    exports: [
      ProgressbarComponent,
    ]
  })
  export class ComponentsModule { }