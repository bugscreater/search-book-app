import React from 'react'
import { useLocation,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'


function Bookdetails() {
  const location = useLocation();
  const[book,setBook] = useState();
  let navigate = useNavigate();
 
  useEffect(()=>{
      setBook(location.state.book);
      
  },[])
 
  if(book){
  return (
 
      <div>
     
     <button className='container btn m-10'>
           <Link to = "/Books">
            Go back
           </Link>
      </button>
     
      {book?
      <img  src={
        book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : ""
      } 
      style={{ width: "30rem", padding: "1.5rem" }}
      className="img-fluid" alt="Responsive image"></img>
      :null}
      {
        book?<div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1> {book.volumeInfo.imageLinks
          ? book.volumeInfo.title:"unknown"}</h1>
             <p className='h-6'>{book.searchInfo
          ? book.searchInfo.textSnippet:""}</p>
            </div>
        </div>
    </div>:null
       
      }
      
      {book? <button className='btn'>
      <a href={book.volumeInfo
          ? book.volumeInfo.previewLink:"#"}>Know more</a>
      </button>:null
      }
     
     
      
      </div>
  
   
  )
  }
  
}

export default Bookdetails
