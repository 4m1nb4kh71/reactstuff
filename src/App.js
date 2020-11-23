
import './App.css';
import React , {Component} from 'react';
const DEFAULT_QUERY = 'readux';
const PATH_BASE='https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH='query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
const list = [];


 
class App extends Component  {
  constructor(props){
    super(props);

    this.state={
      list,
      searchterm:DEFAULT_QUERY,
      result:null,
      
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories= (result)=>{
    this.setState({result});
  }
  fetchSearchTopStories = (searchTerm)=>{
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response =>response.json())
    .then(result =>this.setSearchTopStories(result))
    .catch(e=>e);
  }
// fetching data when the component mounts 
  componentDidMount(){
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
   }
//
  onDismiss = (id)=>{
   
    
    const updatedhits = this.state.result.hits.filter((item)=>{
     return item.objectID !== id;
    } );
    this.setState({
      result:{...this.state.result ,hits: updatedhits}
      });

  }

  onsearchchange=(event)=>{

    this.setState({searchterm:event.target.value});
    console.log(this.state.searchterm);
  }
  
  render(){
    const {list,searchterm,result}=this.state;
 
    if (!result){
      return null;
    };
    console.log(this.state);
    
   
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
          list = {result.hits}
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
    return item.title.toLowerCase().includes(term.toLowerCase());
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
             
                <div key = {item.objectID} className="table-row">
                  <span> {item.title}</span> 
                  <Button onClick = {()=> {onDismiss(item.objectID)}} type="button">x</Button>
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
