import React, {Component} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import { createMinedBoard, cloneBoard, hadExplosion, wonGame, showMines, openField, invertFlag, flagsUsed } from './src/functions'

export default class App extends Component{

  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmout = () =>{
    const cols = params.getColumnsAmout()
    const rows = params.getRowsAmout()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () =>{
    const cols = params.getColumnsAmout()
    const rows = params.getRowsAmout()
    return {
      board: createMinedBoard(rows, cols, this.minesAmout()),
      won: false,
      lost: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
  
    if (lost){
      showMines(board)
      Alert.alert('Errrrrrrrrrrrrooooou', ' Nhãtã ! ')
    }

    if (won) {
      Alert.alert('Maas Rapaaz !!! Tu Venceeeeu !!', 'Piazãaaao Bão!')
    }
    this.setState({ board, lost, won })
  }

  onSelectField = (row, column) =>{
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board )

    if (won){
      Alert.alert('Parabéns Piá, venceu !')
    }
    this.setState({board, won})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header flagsLeft={this.minesAmout() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())} />
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});
