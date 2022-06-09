import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation} from "react-router-dom";
import { GoogleLogout } from "react-google-login";

const api_key = "AIzaSyAn9KgGl2thIwSra461VmlWbUotCQVL_GY";

function Books() {
  let navigate = useNavigate();
 
  const [bookname, setBookname] = useState(window.localStorage.getItem("search-book"));
  const [result, setResult] = useState();
  const [loading, setloading] = useState(false);

  const handlechange = (e) => {
    setBookname(e.target.value);
  };
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(window.localStorage.getItem("loginEmail"));

    if (!window.localStorage.getItem("loginEmail")) {
      navigate("/", { replace: true });
    }
  }, [email]);

  const handlelogout = () => {
    window.localStorage.clear();
    setEmail(null);
  };

  const handleSubmit = async(e) => {
   
    window.localStorage.setItem("search-book",bookname);
    e.preventDefault();
    setResult();
    setloading(false);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookname}&key=${api_key}&maxResults=40`
      )
      .then((res) => {
        setResult(res.data.items);
        setloading(true);
      });

      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/saveHistory",
          {email:email,searchquery:bookname},
          config
        );
  
        
      } catch (error) {
        console.log(error)
      }

  };
  
  const fetchbooks = () =>{
    if(bookname){
    setResult();
    setloading(false);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookname}&key=${api_key}&maxResults=40`
      )
      .then((res) => {
        setResult(res.data.items);
        setloading(true);
      });
    }
    return;
  }
  useEffect(()=>{
    fetchbooks();
  },[]) 
  
  return (
    <div className="container d-flex justify-content-center">
      <h4>{email}</h4>
      <span>
      <GoogleLogout
            clientId="199565205664-2ltm55l5sf0d4h3172okaol1420b1g5l.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handlelogout}
            style={{paddingRight:"20px"}}
          />
      </span>
     
      
      <h3>Search Book here 😎</h3>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handlechange}
            className="form-control mt-20"
            placeholder="Search Book"
            spellCheck={false}
            value = {bookname?bookname:""}
          />
        </div>

          <div className="d-flex p-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          
         
          </div>
         
           
          
          
         
       
      </form>
      <div className="container">
        
        {result
          ? result.map((book) => (
              
                <img
                  className="cursor-pointer"
                  style={{ width: "20rem", padding: "1.5rem" }}
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : ""
                  }
                  alt={book.title}
                  onClick = {()=>{navigate("/Bookdetails",{state:{book:book}})}}
                  key = {book.id}
                  
                />
              
            ))
          : null}
      </div>
    </div>
  );
}

export default Books;
