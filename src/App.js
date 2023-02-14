import React, { useState } from 'react';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState('');
  const [msg, setMsg] = useState('Masukkan berat dan tinggi kamu!');

  let calBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0 || weight === "" || height === "") {
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
      if (bmi < 25) {
        setMsg("berat badan kamu kurang");
      } else if (bmi >= 25 && bmi < 30) {
        setMsg("berat badan kamu normal");
      } else {
        setMsg("kamu kelebihan berat badan");
      }
    }
  };

  let srcImage;

  /**
   * `resetForm` is a function that sets the state of `height`, `weight`, `bmi`, `msg`, and `srcImage` to
   * an empty string, null, and "Masukkan berat dan tinggi kamu!" respectively.
   **/
  let resetData = () => {
    setHeight("")
    setWeight("")
    setBmi("")
    setMsg("Masukkan berat dan tinggi kamu!")
    srcImage = null
  }

  if (bmi < 1) {
    srcImage = null;
  } else {
    if (bmi < 25) {
      srcImage = require("../src/Assets/underweight.png");
    } else if (bmi >= 25 && bmi < 30) {
      srcImage = require("../src/Assets/healthy.png");
    } else {
      srcImage = require("../src/Assets/overweight.png");
    }
  }

  // let load = () => {
  //   window.location.reload();
  // }

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>BMI YOU</h1>
        </div>
        <form onSubmit={calBmi}>
          <div>
            <label>Weight (berat)</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (Tinggi)</label>
            <input value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <button className="btn">Submit</button>
          <ToastContainer />
        </form>
        <div>
          <button className="btn btn-outline" onClick={() => resetData()}>
            Reset
          </button>
        </div>

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
