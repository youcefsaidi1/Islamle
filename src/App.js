
import './App.css';
import {Row, Col} from 'reactstrap'
import React, {useState, useEffect} from 'react'
import Verses from './components/Verses'
import Answers from './components/Answers'
import axios from 'axios'

function App() {
  const [verse, setVerse] = useState("")
  const [surahData, setSurahData] = useState()
  const [versesLoaded, setVersesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ENV = 'PROD'

  const getTestSurah = () => {
    return require('./testSurah.json')
  }
  
  useEffect( ()=>{

    checkIfMobile()
    if (ENV === 'PROD'){
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

 const newVerse = ()=>{
  setVersesLoaded(false)
  if (ENV === 'PROD'){
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
      <Row className="NavBar mb-2">
        <div>Islamle</div>
      </Row>
      <Row className="mt-3 mb-3">
        {
          versesLoaded
          ?
          <Verses surah_verses={verse} data={surahData}/>
          :
          <Row className="mt-2 mb-5 d-flex justify-content-center">
            <Col sm={{size:4}}>
              <img src={require("./loading.gif")} alt="loading gif" width="25" hieght="25"></img>
            </Col>    
          </Row>  
          }
      </Row>
      <Row className="mt-3">
        <Answers data={surahData} surah_verses={verse} new_verse={newVerse} isMobile={isMobile}/>
      </Row>
      </>
      
    </div>
  );
}

export default App;
