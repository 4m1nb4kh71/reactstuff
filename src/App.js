
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
    const {list,searchterm}=this.state;
 
    
    
   
    return (
      <div className="page">
        <div className="interactions">
        <Search
         value ={searchterm} 
         onSchange = {this.onsearchchange}
         >
           search
        </Search>
        </div>
        <Table 
          list = {list}
          pattern = {searchterm} 
          onDismiss = {this.onDismiss} 
          />
      </div>
    );
  }
  
}
class Search extends Component{

  render(){
    const {value,onSchange,children} = this.props;
    return (
      <form>
            {children} <input type = "text" onChange= {onSchange} value = {value}/>
      </form>
    )
  }
}


const onSearch = (term)=>{
  return (item)=>{
    return item.name.toLowerCase().includes(term.toLowerCase());
  };
 }

 
class Table extends Component {
 
  render(){
   
    const {list,pattern,onDismiss}= this.props;
    return (
      
     <div className="table">
       {
         
           list.filter(onSearch(pattern)).map((item)=>{
            return (
             
                <div key = {item.objID} className="table-row">
                  <span> {item.name}</span> 
                  <Button onClick = {()=> {onDismiss(item.objID)}} type="button">x</Button>
                </div>
      
            );
          })
       }
     </div>
    );
  };
}
class Button extends Component{
  render(){
    const {onClick,type,children}=this.props;
    return(
    <button onClick={onClick} type={type} className="button">{children}</button>
    )
  }
}

export default App;
