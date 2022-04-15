
import './App.css';
import {Row, Col} from 'reactstrap'
import React, {useState, useEffect} from 'react'
import Verses from './components/Verses'
import Answers from './components/Answers'
import axios from 'axios'
import EasyButton from './components/EasyButton';

function App() {
  const long_surah_list = require('./surahs.json')
  const short_surah_list = long_surah_list.slice(77,114)

  const [surahs, setSurahs] = useState(short_surah_list)
  const [verse, setVerse] = useState("")
  const [surahData, setSurahData] = useState()
  const [versesLoaded, setVersesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [easyMode, setEasyMode] = useState(true)
  const ENV = 'QA'

  const getTestSurah = () => {
    return require('./testSurah.json')
  }
  
  useEffect( ()=>{

    checkIfMobile()
    if (ENV === 'PROD'){
        axios.get('https://8dqpicjnn1.execute-api.us-east-1.amazonaws.com/getEasyVerses').then(res => {
          setSurahData(res.data)
          let verses = res.data.verses.map(v => {
              return v.text
          })
          const my_symbol = " ۝ "
          verses[0] += my_symbol
          verses[1] += my_symbol
          
          setVerse(verses)
          setVersesLoaded(true)
        }).catch(error => {
          console.log(error)
        })
    }else {
        const testSurah = getTestSurah()
        setVersesLoaded(true)
        setSurahData(testSurah);
        
        let verses = testSurah.verses.map(v => {
          return v.text
        });
        
        const my_symbol = " ۝ "
        verses[0] += my_symbol;
        verses[1] += my_symbol;
        setVerse(verses);
    }

 },[])

 const newVerse = (isSwitchingDifficulty)=>{
  const difficulty = isSwitchingDifficulty ? !easyMode : easyMode;
  setVersesLoaded(false)
  if (ENV === 'PROD'){
    if (difficulty){
      axios.get('https://8dqpicjnn1.execute-api.us-east-1.amazonaws.com/getEasyVerses').then(res => {
        setSurahData(res.data)
        let verses = res.data.verses.map(v => {
            return v.text
        })
        const my_symbol = " ۝ "
        verses[0] += my_symbol
        verses[1] += my_symbol
        
        setVerse(verses)
        setVersesLoaded(true)
      }).catch(error => {
        console.log(error)
      })    
    }else{
        axios.get('https://8dqpicjnn1.execute-api.us-east-1.amazonaws.com/getRandomVerses').then(res => {
          setSurahData(res.data)
          let verses = res.data.verses.map(v => {
              return v.text
          })
          const my_symbol = " ۝ "
          verses[0] += my_symbol
          verses[1] += my_symbol
          
          setVerse(verses)
          setVersesLoaded(true)
        }).catch(error => {
          console.log(error)
        })      
    }

  }else{
    const testSurah = getTestSurah()
    setVersesLoaded(true)
    setSurahData(testSurah);
    
    let verses = testSurah.verses.map(v => {
      return v.text
    });
    const my_symbol = " ۝ "
    verses[0] += my_symbol;
    verses[1] += my_symbol;
    setVerse(verses);    
  }
 }

 const checkIfMobile = () => {
   if (/Mobi/.test(navigator.userAgent)) {
     setIsMobile(true)
}
 }

  return (
    <div className='App'>
      <>    
      <Row>
        <div className="NavBar mb-2">
         
            <div className="title">Islamle</div>
            <EasyButton id="toggle_button" easyMode={easyMode} setEasyMode={setEasyMode} newVerse={newVerse} setSurahs={setSurahs} longSurahList={long_surah_list} shortSurahList={short_surah_list}/>
        
        </div>
        
      </Row>  
      {/* <EasyButton id="toggle_button" easyMode={easyMode} setEasyMode={setEasyMode} newVerse={newVerse} setSurahs={setSurahs} longSurahList={long_surah_list} shortSurahList={short_surah_list}/> */}
      <Row className="mt-3 mb-3">
        {
          versesLoaded
          ?
          <Verses surah_verses={verse} data={surahData}/>
          :
          <Row className="mt-2 mb-5 d-flex justify-content-center">
            <Col sm={{size:4}}>
              <img src={require("./loading.gif")} alt="loading gif" width="50" hieght="50"></img>
            </Col>    
          </Row>  
          }
      </Row>
      <Row className="mt-3">
        <Answers data={surahData} surah_verses={verse} newVerse={newVerse} isMobile={isMobile} surahs={surahs}/>
      </Row>
      </>
      
    </div>
  );
}

export default App;
