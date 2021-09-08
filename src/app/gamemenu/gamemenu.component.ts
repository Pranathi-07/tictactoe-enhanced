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
  gameStatus: boolean = false;
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

  players: any[] = [];
  teams: any[] = [];
  radioSelected: any;
  grids: any;
  rows: any[] = [];
  columns: any[] = [];
  squares: any[][] = [];
  gameType: any;
  noOfPlayers: any;
  editPlayer: any;
  currentPlayer: any = {};
  currentPlayerIndex: number = 0;
  count: number = 0;
  constructor() {}

  ngOnInit(): void {}
  continueToAddPlayers(): void {
    this.continue = true;
  }
  gamePlay(): void {
    this.play = true;
    if (this.radioSelected === 1) {
      this.grids = 3;
    } else {
      this.grids = 5;
    }
    this.rows = Array(this.grids).fill('');
    this.columns = Array(this.grids).fill('');
    console.log(this.grids);
    if (this.gameType === '2') {
      this.setPlayersArray();
    } else {
      this.setTeamsArray();
      this.noOfPlayers = 4;
    }
    this.setSquaresInitial();
  }

  setPlayersArray() {
    this.players = [
      { id: 1, name: this.player1, symbol: this.playerMark1 },
      { id: 2, name: this.player2, symbol: this.playerMark2 },
    ];
    if (this.noOfPlayers === 2) {
      this.players.push({
        id: 3,
        name: this.player3,
        symbol: this.playerMark3,
      });
    }
    if (this.noOfPlayers === 3) {
      this.players.push(
        {
          id: 3,
          name: this.player3,
          symbol: this.playerMark3,
        },
        {
          id: 4,
          name: this.player4,
          symbol: this.playerMark4,
        }
      );
    }

    this.currentPlayer = this.players[this.currentPlayerIndex];
  }
  setTeamsArray() {
    this.teams = [
      {
        id: 1,
        name: 'Team1',
        player1: this.player1,
        player2: this.player3,
        symbol: this.playerMark1,
      },
      {
        id: 2,
        name: 'Team2',
        player1: this.player2,
        player2: this.player4,
        symbol: this.playerMark2,
      },
    ];
    this.currentPlayer = this.teams[this.currentPlayerIndex];
  }

  setSquaresInitial() {
    for (let i = 0; i < this.rows.length; i++) {
      let colValues = [];
      for (let j = 0; j < this.columns.length; j++) {
        colValues.push('');
      }
      this.squares.push(colValues);
    }
  }

  gridChangeSelect(key: any) {
    this.radioSelected = +key.target.value;
    if (this.radioSelected === 1) {
      this.noOfPlayers = 1;
    }
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
  saveEditedDeatails(id: number) {
    let mark;
    let player;
    let player1;
    if (this.gameType === '2') {
      if (id === 1) {
        mark = this.playerMark1;
        player = this.player1;
      } else if (id === 2) {
        mark = this.playerMark2;
        player = this.player2;
      } else if (id === 3) {
        mark = this.playerMark3;
        player = this.player3;
      } else if (id === 4) {
        mark = this.playerMark4;
        player = this.player4;
      }
      this.players[id - 1] = {
        id: id,
        name: player,
        symbol: mark,
      };
      // console.log(this.players);
      this.updateBoard(id);
    } else {
      if (id === 1) {
        mark = this.playerMark1;
        player = this.player1;
        player1 = this.player3;
      } else if (id === 2) {
        mark = this.playerMark2;
        player = this.player2;
        player1 = this.player4;
      }
      this.teams[id - 1] = {
        id: id,
        player: player,
        player1: player1,
        symbol: mark,
      };
      this.updateBoard(id);
    }
    this.editMode = false;
    this.editPlayer1 = false;
    this.editPlayer2 = false;
    this.editPlayer3 = false;
    this.editPlayer4 = false;

    // console.log(player);
    // console.log(playerMark);
  }
  updateBoard(id: number) {
    if (this.gameType === 2) {
      for (let i = 0; i < this.squares.length; i++) {
        this.squares[i]
          .filter((el) => el.id === id)
          .map((el) => (el.symbol = this.players[id - 1].symbol));
      }
    } else {
      for (let i = 0; i < this.squares.length; i++) {
        this.squares[i]
          .filter((el) => el.id === id)
          .map((el) => (el.symbol = this.teams[id - 1].symbol));
      }
    }
  }

  makeMove(rowIndex: number, colIndex: number) {
    if (!this.squares[rowIndex][colIndex]) {
      this.squares[rowIndex][colIndex] = this.currentPlayer;
      const information = document.querySelector('.current-status');
      const isWinner = this.winnerCheck();
      if (isWinner) {
        if (information === null) {
          alert('oops');
        } else {
          if (this.gameType === '2') {
            information.innerHTML = 'Winner is Player ' + this.currentPlayer;
          } else {
            let winnngTeam = this.currentPlayer === 0 ? 'Team 1' : 'Team 2';
            information.innerHTML = 'Winner is:' + winnngTeam;
          }
        }
      }
      if (!isWinner) {
        this.checkGamefull(this.grids).then((end: Boolean) => {
          // console.log(end);
          // console.log(this.grid.gameStatus);
          if (!this.gameStatus && end) {
            if (information === null) {
              alert('oops');
            } else {
              information.innerHTML = 'No Winner, DRAW ';
            }
          }
        });
      }
      if (this.gameType === '2') {
        this.currentPlayerIndex =
          this.currentPlayerIndex === this.noOfPlayers
            ? 0
            : this.currentPlayerIndex + 1;
        this.setNextPlayer();
      } else {
        this.currentPlayerIndex =
          this.currentPlayerIndex === 1 ? 0 : this.currentPlayerIndex + 1;
        this.setNextPlayer();
      }
    }
  }
  winnerCheck() {
    return false;
  }
  async checkGamefull(rows: any): Promise<boolean> {
    let isFull = true;
    this.gameStatus = false;
    if (this.count < 8 && this.grids === 3) {
      this.gameStatus = true;
      isFull = false;
    } else if (this.count < 24 && this.grids === 5) {
      this.gameStatus = true;
      isFull = false;
    }
    return isFull;
  }

  setNextPlayer() {
    if (this.gameType === '2') {
      this.currentPlayer = this.players[this.currentPlayerIndex];
      this.count++;
    } else {
      this.currentPlayer = this.teams[this.currentPlayerIndex];
      this.count++;
    }
  }
}
