import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Clock from 'react-live-clock';
import { initializeApp } from "firebase/app";

import logo from './img/logo.png'
import searchIcon from './img/search.png'
import map_pin from './img/map-pin.png'
import Time from './img/Time.png'
import Moon from './img/Moon.png'
import Mosque from './img/Mosque.png'
import sunrise from './img/sunrise.png'
import sunset from './img/sunset.png'
import muslim_prayer from './img/muslim prayer.png'
import mohamedrassulilah from './img/Muhammad.png'
import mosqueR from './img/Mosque.png'
import mosqueL from './img/Mosque-2.png'


const App = () => {
  const [time, setTime] = useState(new Date());
  const [country,setCountry] = useState('Senegal');
  const [city,setCity] = useState('dakar');
  const [loaded, setLoaded] = useState(false);
  const [dataDaily, setDataDaily] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateHejir, setCurrentDateHejir] = useState();
  const [nextPrayerTime, setNextPrayerTime] = useState(); 
  const [prayerTime, setPrayerTime] = useState({});
  const [fivePrayer, setFivePrayer] = useState({});
  let sun = { "sunset": prayerTime.Sunset ," sunrise": prayerTime.Sunrise}
  let url = "https://api.aladhan.com/v1/timingsByCity?method=3&"+"city="+city+"&country="+country ;
  let urlApi2 = "https://dailyprayer.abdulrcs.repl.co/api/"+city ;
    


  
  let date = new Date();
  let dateLocale = date.toLocaleString('fr-FR' , {
  year: 'numeric' ,
  month: 'long' ,
  day: 'numeric' ,
   }) ;
  
const nextPrayer = () => {
if(loaded==true){

  const ConvertInSec = (time) => {
    var text = time
var tmp = String(text).match(/^(\d+):(\d+)$/);
var minutes = parseInt(tmp[1], 10);
var seconds = parseInt(tmp[2], 10);
return 60 * minutes + seconds;
  }
  for (let prayer in fivePrayer){

       if (ConvertInSec(getTime()) > ConvertInSec(prayerTime[prayer]) ) {
         console.warn(prayer,"prayer");
         
      }
      else{
setNextPrayerTime(prayer)
         console.log(nextPrayerTime);
      }
       }
  //  let res = Math.max.apply(Math,prayerArr)
    // console.log(prayerReturn ,'prayer');
    console.log(fivePrayer);
}

}

  const getTime = () => {   
    function padTo2Digits(num) {
      return String(num).padStart(2, '0');
    }
    
    const date = new Date();
    return padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes());  
  }
  console.log(getTime())
 
 
  const getDataFromAPI = () => {
    axios.get( url )
    .then(res=>setDataDaily(res))
    .catch(err=>console.log(err));
    
  }
  const getUsualData = () => {
    setCurrentDate(dataDaily.data.data.date.readable )
    setCurrentDateHejir(dataDaily.data.data.date.hijri.day+" "+ dataDaily.data.data.date.hijri.month.en +" " +dataDaily.data.data.date.hijri.year)
    setPrayerTime({...dataDaily.data.data.timings})
    setFivePrayer( 
    {
      "Fajr": prayerTime.Fajr,
      "Dhuhr":  prayerTime.Dhuhr,
      "Asr":  prayerTime.Asr,
      "Maghrib":  prayerTime.Maghrib,
      "Isha":  prayerTime.Isha,
   }
    )
    
    if(typeof(currentDate) !== undefined || typeof(currentDateHejir) !== undefined || typeof(prayerTime) !== undefined){
      setLoaded(true)
      console.log('usual data was  loaded');

    }
  
  }
// Get data from api and store in array
  useEffect(() => {
    if(dataDaily.length ==0)  getDataFromAPI();
    console.log("data from api is load");
    }, [dataDaily]);

      useEffect(() => {
        if  (dataDaily.length !==0)  getUsualData()
        nextPrayer()

        }, [dataDaily]);    
     
        let currentDateStyle = {
          fontSize:"x-large",
          fontWeight:500
        }
  return (
    <div className="App">
      

      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="" className={logo} /> hello
          </div>
          <div className="search">
            <label htmlFor="search">Recherche</label>
            <input type="text" id='search' defaultValue={country}  />
            <span id="icon-search"> <img src={searchIcon} alt="" /> </span>
          
          </div>
        </nav>
      </header>

      <main>
        <div className="card top-infos">
          <div className="wrap">

          <div className="sun">
            <img src={Moon} alt="" />
          </div>
          <div className="col">
            <div className="location">
              <span id="icon-mapPin">
                <img src={map_pin} alt="" />
              </span>
              <span id="loc">Dakar</span>
            </div>
            <div className="date">
              <span id="datefr">
                {dateLocale}
                
              </span>
              <span id="dateHejir">
                &nbsp; {currentDateHejir}
               </span>
           </div>
            <div className="currentTime">
            
               <Clock
               style={currentDateStyle}
               className='currentime'
                format={'HH:mm:ss'}
                ticking={true}
                timezone={'Africa/Abidjan'} 
                />
               </div>
          </div>
          </div>
          <div className="wrap-2">

          <div className="col sun">
            <div className="sunrise">
              <span id="icon-sunrise">
                <img className='icon-sun' src={sunrise} alt="" />
              </span>
              <span className='label'>Levée du soleil </span><span className="time">
              {prayerTime.Sunrise}
              </span>
            </div>
            <div className="sunset">
              <span id="icon-sunset">
                <img className='icon-sun' src={sunset} alt="" />
              </span>
              <span className='label'>Levée du soleil </span><span className="time">{prayerTime.Sunset}</span>
            </div>
          </div>
          </div>

        </div>

        <div className="card nextPrayer">
        <div className="prayerName">
          <h3 className="prayer">Dhur</h3>
          <h3 className="prayer">Tisbar</h3>
          <h3 className="prayer">الجمعة</h3>
        </div>

        <div className="prayerTime">
          <img src={muslim_prayer} alt="" id="icon-muslimprayer" /><span id="prayerTime">{prayerTime.Dhuhr}</span>
        </div> 

        </div>
        <div className="prayerTimeDay">
        <h1 className="title">
          Les heures de prieres <span><img src={Time} alt="" /></span>
        </h1>
        <section className="wrap">
        <div className="card prayer">
            <h1>{"Fajr"}</h1>
              <p>{prayerTime.Fajr} </p>
            </div>
            <div className="card prayer">
            <h1>{"Choukour"}</h1>
              <p>{prayerTime.Sunrise} </p>
            </div>
          <div className="card prayer">
          <h1>{"Dhuhr"}</h1>
              <p>{prayerTime.Dhuhr}  </p>
          </div>
            <div className="card prayer">
          <h1>{"Asr"}</h1>
              <p>{prayerTime.Asr} </p>
          </div>

          <div className="card prayer">
            <h1>{"Maghrib"}</h1>
            <p>{ prayerTime.Maghrib}  </p>
            </div>
          <div className="card prayer">
            <h1>{"isha"}</h1>
            <p>             
            { prayerTime.Isha} 
            </p>
            </div>
        </section>
        </div>
      </main>
    </div> 
  );
}

export default App;
