
import './App.css';
import React , {Component} from 'react'
const list = [
  {
    name:'amine',
    age:25,
    role:'student',
    objID:0,
  },
  {
    name:'adil',
    age:22,
    role:'student',
    objID:1,
  },
  {
    name:'chaymaa',
    age:20,
    role:'student',
    objID:2,
  },

];
class App extends Component  {
  constructor(props){
    super(props);

    this.state={
      list,
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss = (id)=>{
   const updatedlist = this.state.list.filter((item)=>{
     return item.objID !== id;
    } );
    this.setState({list:updatedlist});

  }
  
  render(){
 
    const visibleitems = this.state.list.map((item)=>{
      return (
        <div key = {item.objID}>
          <h1> {item.name}</h1> 
          <button onClick = {()=> {this.onDismiss(item.objID)}} type="button">Dismiss</button>
        </div>
      )
    });
   
    return (
      <div className="App">
        {visibleitems}
      </div>
    );


  }
  
}

export default App;
