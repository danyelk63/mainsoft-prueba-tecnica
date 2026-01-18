import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ToolbarModule, InputTextModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
