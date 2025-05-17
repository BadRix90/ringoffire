import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc, docData } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();


  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      const gameDocRef = doc(this.firestore, 'games', gameId);

      docData(gameDocRef).subscribe((data: any) => {
        const gameData = data?.game;

        if (gameData) {
          this.game.updateFromData(gameData);
          console.log('🔁 Live-Spielstand empfangen:', gameData);
        } else {
          console.warn('Kein gültiger Spielstand gefunden!');
        }
      });
    });
  }

  async newGame() {
    this.game = new Game();

  }

  async updateFirestore() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (!gameId) return;

    const gameDocRef = doc(this.firestore, 'games', gameId);
    await setDoc(gameDocRef, { game: this.game.toJSON() });
  }

  async takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      const card = this.game.stack.pop() || '';
      this.game.currentCard = card;
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      await this.updateFirestore(); // 🔄 erste Firestore-Aktualisierung: Karte & Animation starten

      setTimeout(async () => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;

        await this.updateFirestore();
      }, 1000); // Dauer deiner Animation
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(async (name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);

        const gameId = this.route.snapshot.paramMap.get('id');
        const gameDocRef = doc(this.firestore, 'games', gameId!);
        await setDoc(gameDocRef, { game: this.game.toJSON() });
      }
    });
  }

}
