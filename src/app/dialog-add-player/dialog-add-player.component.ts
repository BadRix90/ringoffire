import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-add-player',
  standalone: false,
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';

  ngOnInit(): void {
    // Initialize the component
  }

  onNoClick(): void {
    // Handle the cancel button click
  }
}
