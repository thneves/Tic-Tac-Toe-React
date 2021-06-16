import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { // function components are a simpler way to write components that only contain a 'render' methos and don't have their own state.
  // Many components can be expressed this way.
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // using slice to create a copy of the existing array, instead of modifying the original data
    // There are generally two approaches to changing data, modifying its values or creating a copy of it.
    squares[i] = 'X';
    this.setState({ squares: squares});
  }

  // Avoiding direct data mutation let me keep previous versions of the game's history intact, and reuse them later. It makes complex features easier to implement.
  // Also, detecting changes in mutable objects is difficult, cause they are modified directly, with previous versions we can now it has changed.

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={ () => this.handleClick(i) }
      />
    )
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return(
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <div>{/* TODO */}</div>
        </div>
      </div>
    )
  }
}

// --------------------------------

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

