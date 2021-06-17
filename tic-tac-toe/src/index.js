import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { // function components are a simpler way to write components that only contain a 'render' method and don't have their own state.
  // Many components can be expressed this way.
  // Since this component no longer mantain a 'state', it receive values from the Board component through 'onClick'. This component now is 'controlled component' by the Board class.
  return ( 
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  ) // In functional components there's no need for the use of 'this'. Note the 'props.value' instead of 'this.props.value', no parenthesis at end either.
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={ () => this.props.onClick(i) }
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(0); // using slice to create a copy of the existing array, instead of modifying the original data
    // There are generally two approaches to changing data, modifying its values or creating a copy of it.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  // Avoiding direct data mutation let me keep previous versions of the game's history intact, and reuse them later. It makes complex features easier to implement.
  // Also, detecting changes in mutable objects is difficult, cause they are modified directly, with previous versions we can now it has changed.

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });


    let status;
    if (winner) {
      status = '  Winner: ' + winner;
    } else {
      status = '  Next Player:' + (this.state.xIsNext ? 'X' : 'O')
    }
    return(
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// Helper Function to Determine the Winner

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// --------------------------------

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



