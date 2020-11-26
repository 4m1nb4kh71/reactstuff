
import './App.css';
import React , {Component} from 'react';
const DEFAULT_QUERY = 'redux';
const PATH_BASE='https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH='query=';


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

  setSearchTopStories = (result)=>{
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
    const {searchterm} = this.state;
    this.fetchSearchTopStories(searchterm);
  
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
  onSearchSubmit = (event)=> {
    const {searchterm} = this.state;
    this.fetchSearchTopStories(searchterm);
    event.preventDefault();
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchterm}`;
    console.log(url);
  }
  render(){
    const {searchterm,result}=this.state;
 
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
         onSubmit = {this.onSearchSubmit}
         >
           search
        </Search>
        </div>
        <Table 
          list = {result.hits}
        
          onDismiss = {this.onDismiss} 
        
          />
      </div>
    );
  }
  
}
class Search extends Component{

  render(){
    const {value,onSchange,onSubmit,children} = this.props;
    return (
      <form >
            {children} <input type = "text" onChange= {onSchange} value = {value}/>
            <Button onClick={onSubmit} type ="submit">Go</Button>
      </form>
    )
  }
}



 
class Table extends Component {
 
  render(){
   
    const {list,onDismiss}= this.props;
    return (
      
     <div className="table">
       {
         
           list.map((item)=>{
            return (
             
                <div key = {item.objectID} className="table-row">
                  <Button onClick = {()=> {onDismiss(item.objectID)}} type="button" >x</Button>
                  <span className="title">
                    <div className='element'><a href={item.url}  target="_blank" rel="noreferrer"><h3>{item.title}</h3></a></div> 
                   
                    <div  className='author' ><h5><i>{item.author}</i></h5></div>
                  </span> 
                  
                  
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
