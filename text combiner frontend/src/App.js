import Navbar from "./Navbar";
import MetinBox from "./MetinBox";
import axios from "axios";
import React from "react";
import combineStrings from "./combineStrings";
import "./styles/index.css";
import { useState, useEffect } from "react";

import Slide from "react-reveal/Slide";

function App() {

  const [combinedText, setCombinedText] = useState("");
  const [noMerge, setNoMerge] = useState([]);
  const [percent, setPercent] = useState(40);

  const [changeControl, setchangeControl] = useState(false);

  const [state, setState] = useState({ 0: "", 1: "" });

  const [inputText, setInputText] = useState([]);

  const [calculatedTime, setCalculatedTime] = useState('');
  const [data, setData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  {

}

  function handleCombine() {
    if (isEmpty()) {
      alert("Lütfen Bütün Kutuları Doldurun");
    } 
    else if(percent <= 0 || percent > 100){
      alert("Benzerlik Oranı 1-100 Arasında olmalıdır");

    }
    else {

        setInputText(Object.values(state));

        setchangeControl(true)

        combineStrings(inputText,percent).then((result) => {
       
        setCombinedText(result.mergedString);

        setCalculatedTime(result.calculatedTime);

        setNoMerge(result.noMerge)

      });
    }
  }

  const deleteText = () => {
    setState(
      Object.values(state).filter(
        (item, key) => key !== Object.keys(state).length - 1
      )
    );
  };

  const isEmpty = () => {
    var isEmpty = false;
    Object.values(state).filter((item) => {
      if (item === "") {
        isEmpty = true;
      }
    });

    return isEmpty;
  };

  const percentControl = () => {
   
    if(percent <= 0 && percent >100){
      
    }

    return isEmpty;
  };
  useEffect(() => {
  setData({
    inputText: inputText,
    combinedText: combinedText,
    calculatedTime: calculatedTime,
  }) 
  }, [inputText,combinedText,calculatedTime]);

  const saveFun = () => {
    if (combinedText === "") {
      alert("Birleştirme Metin Kutusu Boş. Lütfen Birleştirme Yapın.");
    } else {

      if(changeControl){
        axios.post('http://localhost:8080/api/data', data)
        .then(response => {
          console.log(response.data);
          alert("Başarıyla Kaydedildi")
          // Do something with the response, such as show a success message
        })
        .catch(error => {
          console.error(error);
          alert("Kayıt Etme Başarısız Oldu. Lütfen Tekrar Deneyiniz")

          // Do something with the error, such as show an error message
        });

      }
      else{
        alert("Değişiklik Yapılmış Lütfen Tekrar Birleştirme İşlemi Yapınız")
      }
    }
  };

  useEffect(() => {
    setchangeControl(false);

    setInputText(Object.values(state));
  }, [state]);


  const jsonFileDownload = () => {


    const fileName = "combinedTextData.json";
    const data2 = new Blob([JSON.stringify(data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data2);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "rgba(8,8,8,0.9)",
          color: "white",
          margin: 0,
          padding: 0,
        }}
      >
        <Navbar />
        <div class="container mt-3">
          <div class="row g-4">
            <div class="col-sm-12 col-md-12 col-lg-4">
              {Object.keys(state).map((item, index) => {
                return <MetinBox handleChange={handleChange} name={index} />;
              })}

              <div class=" d-flex flex-direction-column gap-2 py-3" style={{display:'flex',flexDirection:'column'}}>
                <div
                  class="btn button"
                  onClick={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      [Object.keys(state).length]: "",
                    }));
                  }}
                  role="button"
                  aria-disabled="true"
                >
                  Yeni Metin Ekle
                </div>
                {Object.keys(state).length > 2 ? (
                  <div
                    class={`btn delete-button`}
                    onClick={(e) => deleteText()}
                    role="button"
                    aria-disabled="true"
                  >
                    Metin Sil
                  </div>
                ) : null}
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-4 ">
              <Slide top>
                <form>
                  <div class="form-group">
                    <div className="d-flex justify-content-between" style={{height:'30px' }}>
                      <label
                        for="exampleFormControlTextareaBirlestirilmis"
                        style={{ fontSize: "18px" }}
                      >
                        Birleştirilmiş Metin
                      </label>
                      {calculatedTime !== "" && (
                        <div className="d-flex justify-content-between gap-2 ">
                          Hesaplama Süresi: {calculatedTime}{" "}
                        </div>
                      )}
                    </div>

                    <textarea
                      readOnly
                      class="form-control disable"
                      value={combinedText}
                      style={{
                        width: "100%",
                        height: "310px",
                        backgroundColor: "transparent",
                        color: "white",
                        borderRadius: 0,
                      }}
                      id="exampleFormControlTextareaBirlestirilmis"
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </Slide>

              <div className="gap-3 py-3"  style={{display:'flex',flexDirection:'column',justifyContent:"center"}}>

              <div class="input-group input-group-sm "  >
                <div class="input-group-prepend " >
                  <span class="input-group-text" id="inputGroup-sizing-sm" style={{
                        backgroundColor: "transparent",
                        color: "white",
                        border:'none',
                        color:'white'

                      }}>Benzerlik Oranı</span >
                </div>
                <input type="number"  class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                 onChange={(e) => setPercent(e.target.value)}
                 value={percent}
                style={{
                        backgroundColor: "transparent",
                        color: "white",
                  
                        borderRadius:6,
                        border:'2px solid white',
                        textAlign:"center"
                   
                      }}/>
              </div>
             
               
                <div
                  class="btn  button  "
                  onClick={handleCombine}
                  role="button"
                  aria-disabled="true"
                >
                  Metinleri Birleştir
                </div>
                
                {combinedText !== "" && ( <div
                  class={`btn button`}
                  role="button"
                  onClick={saveFun}
                  aria-disabled="true" 

                >
                  Birleştirlimiş Metni Kaydet
                </div>
                )
                }   
               
              </div>
              {
              noMerge.map((item) =>
                
                  <div>
                    {item+1}. Metin Birleştirilemedi
                    </div>
                
                )
              
              }

            </div>
            <div class="col-sm-12 col-md-12 col-lg-4 ">
              <Slide top>
                <form>
                  <div class="form-group">
                    <div className="d-flex justify-content-between" style={{height:'30px' }}>
                      <label
                        for="exampleFormControlTextareaJSON"
                        style={{ fontSize: "18px" }}
                      >
                        JSON Formatı
                      </label>
                  
                    </div>

                    <textarea
                      readOnly
                      class="form-control disable"
                      value={JSON.stringify(data)}
                      style={{
                        width: "100%",
                        height: "310px",
                        backgroundColor: "transparent",
                        color: "white",
                        borderRadius: 0,
                      }}
                      id="exampleFormControlTextareaJSON"
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </Slide>

              <div className="gap-2 py-3"  style={{display:'flex',justifyContent:"center"}}>
                <div
                  class="btn  button  "
                  onClick={jsonFileDownload}
                  role="button"
                  aria-disabled="true"
                  
                >
                 JSON Dosyası Olarak Kaydet
                </div>
        
               
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default App;
