import React, { Component } from 'react';
import List from '@material-ui/core/List'
import {
  Search,
  Task
} from './components'
import tasks from './contacts/index';
import './App.css';
import { v4 as uuidv4} from 'uuid';

class App  extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      result: tasks,
      addInputValue: '',
      isSearched: [],
      searching: false,
      error: ' ',
      task_done_t: 0,
      task_done_f: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.filterTaskDone = this.filterTaskDone.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.clickSearchTask = this.clickSearchTask.bind(this);
    this.activateLocalStorage = this.activateLocalStorage.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this)
  }

  //inputChanges
  handleInputChange(event) {
    this.setState({
      addInputValue: event.target.value
    })
  }
  handleAddClick(value) {
    const {result} = this.state;
    const inputField = document.querySelectorAll('.MuiInputBase-input')[0];

    console.log(value.length)
    if (value.length === 0) {
      inputField.setAttribute('error',true)
    }else {
      let oldResult = result;

      const task = [{
        task_id: uuidv4(),
        task_text: value,
        task_done: false,
      }]
  
      let twoResult = [...oldResult,...task];
  
      let task_done = twoResult.filter(item => item.task_done === true);
      let task_undone = twoResult.filter(item => item.task_done === false);
      
      this.setState({
        result: [...task_undone,...task_done]
      })
    }
  }
  handleCheckClick(id) {
    const {result} = this.state;

    let item =  result.filter(item => item.task_id === id);
    let updateResult = result.filter(item => item.task_id !== id);


    item[0].task_done = !item[0].task_done;

    this.setState({
      result: [...updateResult,...item]
    })

    this.filterTaskDone()

  }
  handleDeleteClick(id) {
    const {result} = this.state;

    let items = result.filter(item => item.task_id !== id);

    this.setState({
      result: items
    })

  }
  filterTaskDone() {
    let {result} = this.state;


    let task_done = this.state.result.filter(item => item.task_done === true);
    let task_undone = this.state.result.filter(item => item.task_done === false);

    this.setState({
      result: [...task_undone,...task_done]
    })
  }
  clickSearchTask(value) {
    const {result, searching} = this.state;

    let valLowCase = value.toLowerCase();
    let searchArray = result.filter(item => item.task_text.toLowerCase().includes(valLowCase));

    if (value.length === 0) {
      this.setState({
        searching: false
      })
    }else {
      this.setState({
        searching: true
      })
    }
    
    if (searchArray) {
      this.setState({
        isSearched: searchArray
      })
    }else {
      this.setState({
        isSearched: []
      })
    }


  }
  activateLocalStorage() {
    const {result} = this.state;

    if (localStorage.getItem('result')) {
      this.setState({
        result: JSON.parse(localStorage.getItem('result'))
      })
    }else {
      localStorage.setItem('result', JSON.stringify(result))
    }
  }
  updateLocalStorage(value) {
    localStorage.setItem('result', JSON.stringify(value));
  }

  componentDidMount() {
    this.activateLocalStorage();
  }
  

  componentDidUpdate() {
    const {result} = this.state;

    this.updateLocalStorage(result);
  }

  render() { 
    const {
      addInputValue,
      result,
      searching,
      isSearched,
      error
    } = this.state;

    return ( 
      <div className="App">
        <h1>Todo-App</h1>
        <Search 
          handleInputChange={this.handleInputChange} 
          addInputValue={addInputValue}
          handleAddClick={() => this.handleAddClick(addInputValue)}
          clickSearchTask={() => this.clickSearchTask(addInputValue)}
          error={error}
        />
        <div className="container__items">
          {
            result.length !== 0 ? (
              <List>
            {
              (!searching) ? result.map(item => {
                const itemId = `checkbox-list-label-${item.task_id}`;
                return (
                  <Task 
                    key={item.task_id} 
                    itemId={itemId} 
                    task_text={item.task_text} 
                    handleCheckClick={() => this.handleCheckClick(item.task_id)}
                    task_done={item.task_done}
                    handleDeleteClick={() => this.handleDeleteClick(item.task_id)}
                  /> 
                )
              }) : (isSearched.length === 0) ? <h3>Ничего не найдено!</h3> : isSearched.map(item => {
                const itemId = `checkbox-list-label-${item.task_id}`;
                return (
                  <Task 
                    key={item.task_id} 
                    itemId={itemId} 
                    task_text={item.task_text} 
                    handleCheckClick={() => this.handleCheckClick(item.task_id)}
                    task_done={item.task_done}
                    handleDeleteClick={() => this.handleDeleteClick(item.task_id)}
                  /> 
                )
              })
            }  
          </List>
            ) : <h3>Вы всё сделали ?</h3>
           }
          
        </div>
        <div className="container">
          <p>Выполнено: {result.filter(item => item.task_done === true).length} | Не выполнено: {result.filter(item => item.task_done === false).length}</p>
        </div>
      </div>
     );
  }
}

export default App;
