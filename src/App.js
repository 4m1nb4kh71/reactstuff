
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
const onSearch = (term)=>{
  return (item)=>{
    return item.name.toLowerCase().includes(term.toLowerCase());
  };
 }
class App extends Component  {
  constructor(props){
    super(props);

    this.state={
      list,searchterm:'',
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss = (id)=>{
   const updatedlist = this.state.list.filter((item)=>{
     return item.objID !== id;
    } );
    this.setState({list:updatedlist});

  }

  onsearchchange=(event)=>{

    this.setState({searchterm:event.target.value});
    console.log(this.state.searchterm);
  }
  
  render(){
 
    
    const visibleitems = this.state.list.filter(onSearch(this.state.searchterm)).map((item)=>{
      return (
       
          <div key = {item.objID}>
            <h1> {item.name}</h1> 
            <button onClick = {()=> {this.onDismiss(item.objID)}} type="button">Dismiss</button>
          </div>
          
       
        
      )
    });
   
    return (
      <div className="App">
        <form>
            <input type = "text" onChange= {this.onsearchchange}/>
        </form>
        {visibleitems}
      </div>
    );


  }
  
}

export default App;
