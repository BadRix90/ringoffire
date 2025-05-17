import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: false,
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

  async newGame() {
    const game = new Game();
    const coll = collection(this.firestore, 'games');
    const gameInfo = await addDoc(coll, { game: game.toJSON() });

    console.log('Neue Spiel-ID:', gameInfo.id);

    this.router.navigateByUrl(`/game/${gameInfo.id}`);
  }
}
