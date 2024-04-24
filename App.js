// import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";


function App() {
  const[isCompleteScreen,setIsCompleteScreen] = useState(false)
  const[allTodos,setTodos] = useState([]);
  const[newTitle,setNewTitle] = useState("");
  const[newDescription,setNewDescription] = useState("");
  const[completedTodos,setCompletedTodos] = useState([]);


  const handleAddTodo = ()=>{
    let newTodoItem = {
      Title:newTitle,
      Desscription:newDescription
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo = index =>{
    let deletTodo = [...allTodos];
    deletTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(deletTodo));
    setTodos(deletTodo)
  };
  const handlecompleted = index=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':'+m+':'+s;

    let fillteredItem = {
      ...allTodos[index],
      CompletedOn:CompletedOn
    };
    let updatedCompletedTodoArr = [...completedTodos];
    updatedCompletedTodoArr.push(fillteredItem);
    setCompletedTodos(updatedCompletedTodoArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedTodoArr));
  };

  const handleDeletCompltedTodo = (index)=>{
      let completdeletTodo = [...completedTodos];
      completdeletTodo.splice(index,1);
      localStorage.setItem('completedTodos',JSON.stringify(completdeletTodo));
      setCompletedTodos(completdeletTodo)
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodos){
      setCompletedTodos(savedCompletedTodos);
    }
  },[]);
  
  return (
    <div className="App">
     

      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} placeholder="What's the text title?"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} placeholder="What's the text description?"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

      <div className='btn-area'>
        <button className={`btn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>
          Todo</button>
        <button className={`btn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>
          Completed</button>
      </div>

      <div className='todo-list'>
         {isCompleteScreen ===false && allTodos.map((item,index)=>{
          
            return(
              <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{item.Title}</h3>
                    <p>{item.Desscription}</p>
                  </div>
                <div>
                  <MdDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
                  <BsCheck2 className='check-icon' onClick={()=>handlecompleted(index)} title='Compelete?'/>
                </div>
              </div> 
              );
          
          
         })}  

          {isCompleteScreen ===true && completedTodos.map((item,index)=>{
           return(
            <div className='todo-list-item' key={index}>
                 <div>
                    <h3>{item.Title}</h3>
                    <p>{item.Desscription}</p>
                    <p><small>Completed on: {item.CompletedOn}</small></p>
                  </div>
                    <div>
                      <MdDelete className='icon' onClick={()=>handleDeletCompltedTodo(index)} title="Delete?"/>
                      {/* <BsCheck2 className='check-icon' onClick={()=>handlecompleted(index)} title='Compelete?'/> */}
                   </div>
            </div> 
             );
            })} 

        </div> 
      </div>
    </div>
  );
}

export default App;
