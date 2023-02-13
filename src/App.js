import React, { useState } from 'react';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [msg, setMsg] = useState('data tidak ditemukan!');

  let calBmi = (event) => {
    event.preventDefault();

    if(weight === 0 || height === 0) {
      toast.info("Berat dan Tinggi wajib di isi", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));

      // Logika menampilkan pesan status 
      if(bmi < 25) {
        setMsg("berat badan kamu kurang");
      } else if(bmi >= 25 && bmi < 30) {
        setMsg("berat badan kamu normal");
      } else {
        setMsg("kamu kelebihan berat badan");
      }
    }
  };


  let srcImage;

  if(bmi < 1) {
    srcImage = null;
  } else {
    if(bmi < 25) {
      srcImage = require("../src/Assets/underweight.png");
    } else if(bmi >= 25 && bmi < 30) {
      srcImage = require("../src/Assets/healthy.png");
    } else {
      srcImage = require("../src/Assets/overweight.png");
    }
  }

  let load = () => {
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>BMI YOU</h1>
        </div>
        <form onSubmit={calBmi}>
          <div>
            <label>Height (cm)</label>
            <input value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <button className="btn">Submit</button>
            <ToastContainer/>
            <button className="btn btn-outline" onClick={load}>
              Reload
            </button>
          </div>
        </form>

        <div className="title">
          <h3>bmi kamu itu: {bmi}</h3>
          <p>{msg}</p>
        </div>

        <div className="img-bmi">
          <img src={srcImage} alt="" />
        </div>
      </div>
    </div>
  );
}
export default App;
