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
  winBy: number = 0;
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
  winner: boolean = false;
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
      this.gameType = '2';
    }
  }
  gameTypeChange(key: any) {
    this.gameType = key.target.value;
  }
  playersChange(key: any) {
    this.noOfPlayers = +key.target.value;
  }
  winByConditionChange(key: any) {
    this.winBy = +key.target.value;
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
    if (this.gameType === '2') {
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
      const isWinner =
        this.horizantalWinCheck(rowIndex, colIndex) ||
        this.verticalWinCheck(rowIndex, colIndex);
      // ||
      // this.diagonalWinnerCheck(rowIndex, colIndex);
      if (isWinner) {
        if (information === null) {
          alert('oops');
        } else {
          if (this.gameType === '2') {
            information.innerHTML = 'Winner is ' + this.currentPlayer.name;
          } else {
            let winnngTeam = this.currentPlayer === 0 ? 'Team 2' : 'Team 1';
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
  // winnerCheck() {
  //   if (this.grids === 3) {
  //     this.horizantalWinCheck();
  //     if (!this.winner) {
  //       this.verticalWinCheck();
  //     }
  //     if (!this.winner) {
  //       this.diagonalWinnerCheck();
  //     }
  //   } else if (this.grids === 5 && this.winBy === 5) {
  //     this.horizantalWinCheck();
  //     if (!this.winner) {
  //       this.verticalWinCheck();
  //     }
  //     if (!this.winner) {
  //       this.diagonalWinnerCheck();
  //     }
  //   }
  //   return this.winner;
  // }
  horizantalWinCheck(rowIndex: number, colIndex: number) {
    const rowValues = this.squares[rowIndex];
    let leftCount = 1,
      rightCount = 1;
    let winner = false;
    for (let j = colIndex; j < this.columns.length; j++) {
      if (rowValues[j] === rowValues[j + 1]) {
        rightCount++;
        if (rightCount === this.winBy) {
          winner = true;
          return winner;
        }
      } else {
        break;
      }
    }
    for (let j = colIndex; j >= 0; j--) {
      if (rowValues[j] === rowValues[j - 1]) {
        leftCount++;
        if (leftCount === this.winBy) {
          winner = true;
          return winner;
        }
      } else {
        break;
      }
    }
    if (leftCount + rightCount - 1 === this.winBy) {
      return true;
    }
    return null;
  }
  verticalWinCheck(rowIndex: number, colIndex: number) {
    let colValues = [];
    for (let i = 0; i < this.rows.length; i++) {
      colValues.push(this.squares[i][colIndex]);
    }

    let leftCount = 1,
      rightCount = 1;
    let winner = false;
    for (let j = rowIndex; j < this.columns.length; j++) {
      if (colValues[j] === colValues[j + 1]) {
        rightCount++;
        if (rightCount === this.winBy) {
          winner = true;
          return winner;
        }
      } else {
        break;
      }
    }
    for (let j = rowIndex; j >= 0; j--) {
      if (colValues[j] === colValues[j - 1]) {
        leftCount++;
        if (leftCount === this.winBy) {
          winner = true;
          return winner;
        }
      } else {
        break;
      }
    }
    if (leftCount + rightCount - 1 === this.winBy) {
      return true;
    }
    return null;
  }
  diagonalWinnerCheck(rowIndex: number, colIndex: number) {
    let leftCount = 1,
      rightCount = 1;
    let winner = false;
    for (
      let i = rowIndex, j = colIndex;
      i < this.rows.length, j < this.columns.length;
      i++, j++
    ) {
      if (this.squares[i][j] === this.squares[i + 1][j + 1]) {
        rightCount++;
        if (rightCount === this.winBy) {
          winner = true;
          return winner;
        }
      } else {
        break;
      }
    }
    for (let i = rowIndex, j = colIndex; i >= 0 && j >= 0; i--, j--) {
      if (this.squares[i][j] === this.squares[i - 1][j - 1]) {
        leftCount++;
        if (leftCount === this.winBy) {
          winner = true;
          return winner;
        }
      } else {
        break;
      }
    }
    if (leftCount + rightCount - 1 === this.winBy) {
      return true;
    }
    return null;
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
