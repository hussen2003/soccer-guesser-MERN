import Header from '../components/header/Header.js';
import React, { useState } from 'react';

// will be used for displaying leaderboard
function Leaderboard(){
    const [message, setMessage] = useState("");
    const goback = async (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/LandingPage";
    }
    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
    }
    const grabdata = () =>{
        var js = JSON.stringify(null);
        try {
            const response = fetch("http://localhost:5001/api/daily/leaderboard", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
            var req = JSON.parse(response.text());
            const array = req.split(',');
            if (req.error) {
                <h2>Error occured... Please try again later!</h2>
              return;
            } else {
                <h2>  Name       Score</h2>
              for(let i = 0; i < array.length; i++){
                if(array[i] == null)
                    break;

                <div>
                    {i + 1}  {array[i].name}      {array[i].score}
                </div>
              }
            }
          } catch (e) {
            alert(e.toString());
            return;
          }
    }
    return(
        <div>
            <Header />
            <div className = 'Leaderboard'></div>
            <button onClick = {goback}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style = {{position: 'fixed', top: '100pt', left: '200pt', padding: '10px', backgroundColor: '#efeee9', color: '#000', border: 'none', cursor: 'pointer',}}>
            Home
            </button>
            <h1>Top Players</h1>
                {grabdata()}
        </div>
    );
}

export default Leaderboard;