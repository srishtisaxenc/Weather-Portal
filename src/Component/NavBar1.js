import { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "./ContextApi/UserContext";


  

export default function Navbar1({ onSearch , emailid }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); 

  // const { email } = UserContext(UserContext)

   
  

  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "9affe4b12aac445093672630251308";

  //------------------------------------------------------------------
  const [showProfileMenu, setShowProfileMenu] = useState(false);

 //---------------------------------------------------------------

 const email = localStorage.getItem("userEmail");
const handleDelete = async ({ email }) => {
  const confirmDelete = window.confirm(
    "This action will permanently delete your account. Do you wish to proceed?"
  );

  if (confirmDelete) {
    try {
      await axios.delete(`https://weather.com/weather/${email}`);
      console.log("email id -" + email);
      
      alert("Your account has been deleted");
      navigate("/");
    } catch (error) {
      alert(`Failed to delete account: ${error.response?.data || error.message}`);
    }
  }
};

//----------------------------------------------------------------------------

  const handlelogout = () =>{
    const confirmLogout = window.confirm("Are you sure you want to Logout??");
    if(confirmLogout){
    
       console.log("Logout email -" + email);
       //  console.log("location - " +   );
         
       
      localStorage.removeItem("userEmail");
       sessionStorage.removeItem('sessionActive');
       sessionStorage.removeItem('setIsLoggedIn');
              navigate('/');
          alert("User Logged Out");

             
    }

    
  };


  //----------------------------------------------------------------------

  // Fetch matching cities whenever query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);

        return;
      }
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
        );
        setSuggestions(response.data);
       
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setSuggestions([]);
     setQuery("");
    
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    onSearch(name);
    
    setSuggestions([]);
   
  };

  return (
    <nav className="navbar navbar-dark bg-Primary me-3  " style={{backgroundColor:"skyblue"}}>
      <span className="navbar-brand ms-3">Weather Portal</span>
      <form className="d-flex position-relative " onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter City"
          value={query}
          onChange={(e) => setQuery(e.target.value)}

          
        />
        <button className="btn btn-light" type="button" onClick={handleSubmit} ><i class="bi bi-search"></i></button>
        <button className="btn btn-light ms-2 " type="button" onClick={()=>{navigate("/history")}}>History</button>
        
       
        {/* <button className="btn btn-light  ms-2" type="button"></button> */}

        <div className="position-relative ms-3" >
          <button className="btn btn-light" type="button" onClick={()=>setShowProfileMenu(!showProfileMenu)}><i class="bi bi-person-circle"></i>
          {showProfileMenu && (
            <div  style={{
             

                position: "absolute",
                right: 0,
                top: "100%",
                backgroundColor: "#fff",
                zIndex: 1000,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ccc",
                padding: "10px",
                minWidth: "160px",
                maxHeight: "300px",
                overflowY: "auto",
                whiteSpace: "nowrap",
                wordWrap: "break-word",
                fontSize: "14px", 
                borderRadius: "4px",


            }}>
             

              <button className="dropdown-item " type="button" onClick={handlelogout}>Logout  <i class="bi bi-box-arrow-right"></i></button>
                <button className="dropdown-item text-danger" type="button"onClick={() => handleDelete({ email })}
                >Delete Account   <i class="bi bi-x-square"></i></button>
                 

            </div>
          )}
          </button>
        </div>
         

        {suggestions.length > 0 && (
          <ul
            className="list-group position-absolute"
            style={{
              top: "100%",
              zIndex: 1000,
              width: "100%",
              left: 0,
              
             
            }}
          >
            {suggestions.map((city) => (
              <li
                key={city.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(city.name)}
              >
                {city.name}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </form>
    </nav>
  );
}
