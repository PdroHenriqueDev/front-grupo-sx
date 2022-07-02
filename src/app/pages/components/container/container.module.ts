import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    ContainerComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ContainerModule { }
