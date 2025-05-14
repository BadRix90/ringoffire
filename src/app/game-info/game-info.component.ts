import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-game-info',
  standalone: false,
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'You', description: 'You can choose a person to take a sip of their drink.' },
    { title: 'Me', description: 'You have to drink a sip.' },
    { title: 'Floor', description: 'Touch the floor with your hand. The teammate who was last on the ground has to take a sip.' },
    { title: 'Thumbmaster', description: 'Touch the tabletop with your thumb. The last player to touch the table has to take a sip.' },
    { title: 'Chicks', description: 'The women of creation have to take a sip.' },
    { title: 'Heaven', description: 'Point your index finger towards the sky. Whoever points to the sky last has to have a drink.' },
    { title: 'Mate', description: 'Designate a teammate who from now on has to have a drink with you every time you are asked to.' },
    { title: 'Rhyme', description: 'Pick a word. In a clockwise direction, the other players have to find rhymes. Anyone who repeats a word or cannot find a new rhyme has to take a sip.' },
    { title: 'Men', description: 'The men can toast and have a drink.' },
    { title: 'Rule', description: 'The person who draws a jack is allowed to come up with a new rule that applies until the end of the game. The rule cannot override others.' },
    { title: 'Never have I ever...', description: 'The player may call out "Never have I ever ..." for one round. The losers drink.' },
    { title: 'Kingscup', description: 'If a king is drawn, the player may pour a drink of his choice into the Kingscup. If the fourth king is drawn, the player must immediately empty the kingscup in the middle of the game.' },
    { title: 'Waterfall', description: 'All players start to drink. In a clockwise direction, drinking may only be stopped when the person sitting next to you on the right has finished his waterfall. The player who draws the ace is allowed to stop drinking first (when he wants).' }
  ];

  title: string = "";
  description: string = "";

  @Input() card: string = "";

  constructor() { };

  ngOnInit(): void {

  }

ngOnChanges(): void {
  if (this.card) {
    const value = this.card.split('_')[1];

    const cardIndexMap: { [key: string]: number } = {
      '1': 12, // Ace
      '2': 0,
      '3': 1,
      '4': 2,
      '5': 3,
      '6': 4,
      '7': 5,
      '8': 6,
      '9': 7,
      '10': 8,
      '11': 9, // Jack
      '12': 10, // Queen
      '13': 11, // King
    };

    const index = cardIndexMap[value];
    if (index !== undefined) {
      this.title = this.cardAction[index].title;
      this.description = this.cardAction[index].description;
    } else {
      this.title = 'Unknown card';
      this.description = '';
    }
  }
}

}



