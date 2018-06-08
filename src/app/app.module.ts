import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component';
import { YearPlannerComponent } from './year-planner/year-planner.component';
import { SelectComponent } from './select/select.component';
import { CapitalizePipe } from './capitalize.pipe';
import { SlotDetailComponent } from './slot-detail/slot-detail.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipContainerComponent } from './tooltip-container/tooltip-container.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    YearPlannerComponent,
    SelectComponent,
    CapitalizePipe,
    SlotDetailComponent,
    TooltipDirective,
    TooltipComponent,
    TooltipContainerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
