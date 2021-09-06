import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gamemenu',
  templateUrl: './gamemenu.component.html',
  styleUrls: ['./gamemenu.component.css'],
})
export class GamemenuComponent implements OnInit {
  continue: boolean = false;
  play: boolean = false;
  editMode: boolean = false;
  player1: string = '';
  player2: string = '';
  player3: string = '';
  player4: string = '';
  playerMark1: any;
  playerMark2: any;
  playerMark3: any;
  playerMark4: any;
  editPlayer1: boolean = false;
  editPlayer2: boolean = false;
  editPlayer3: boolean = false;
  editPlayer4: boolean = false;

  radioSelected: any;
  grids: any;
  rows: any[] = [];
  columns: any[] = [];
  gameType: any;
  noOfPlayers: any;
  editPlayer: any;
  constructor() {}

  ngOnInit(): void {}
  continueToAddPlayers(): void {
    this.continue = true;
  }
  gamePlay(): void {
    this.play = true;
    alert(this.playerMark1 + this.playerMark2);
    if (this.radioSelected === 1) {
      this.grids = 3;
    } else {
      this.grids = 5;
    }
    this.rows = Array(this.grids).fill('');
    this.columns = Array(this.grids).fill('');
    console.log(this.grids);
  }
  gridChangeSelect(key: any) {
    this.radioSelected = +key.target.value;
  }
  gameTypeChange(key: any) {
    this.gameType = key.target.value;
  }
  playersChange(key: any) {
    this.noOfPlayers = +key.target.value;
  }
  editPlayerDetails(editPlayer: any) {
    this.editMode = true;
    if (editPlayer === this.player1) {
      this.editPlayer1 = true;
    } else if (editPlayer === this.player2) {
      this.editPlayer2 = true;
    } else if (editPlayer === this.player3) {
      this.editPlayer3 = true;
    } else {
      this.editPlayer4 = true;
    }
  }
  saveEditedDeatails() {
    this.editMode = false;
    this.editPlayer1 = false;
    this.editPlayer2 = false;
    this.editPlayer3 = false;
    this.editPlayer4 = false;

    // console.log(player);
    // console.log(playerMark);
  }
}
