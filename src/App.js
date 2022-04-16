
import './App.css';
import {Row, Col} from 'reactstrap';
import React, {useState, useEffect} from 'react';
import Verses from './components/Verses';
import Answers from './components/Answers';
import axios from 'axios';
import EasyButton from './components/EasyButton';

function App() {
  const long_surah_list = require('./surahs.json');
  const short_surah_list = long_surah_list.slice(77,114);

  const [surahs, setSurahs] = useState(short_surah_list);
  const [verse, setVerse] = useState("");
  const [surahData, setSurahData] = useState();
  const [versesLoaded, setVersesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [easyMode, setEasyMode] = useState(true);

  //Answers component state required here to make changes when EasyButton is toggled
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);
  const [show, setShow] = useState(false);
  const [ans1, setAns1] = useState(["", 0]);
  const [ans2, setAns2] = useState(["", 0]);
  const [ans3, setAns3] = useState(["", 0]);
  const [lost, setLost] = useState(false);
  const [count, setCount] = useState(0);

  const URL = "https://8dqpicjnn1.execute-api.us-east-1.amazonaws.com";

  const getTestSurah = (easy) => {
    if (!easy){
      return require('./testSurahHard.json');
    }
    return require('./testSurahEasy.json');
  }
  
  useEffect( () => {
    checkIfMobile();
    window.scrollTo(0, 0)
    if (process.env.NODE_ENV === 'production'){
        axios.get(`${URL}/getEasyVerses`).then(res => {
          setSurahData(res.data);
          let verses = res.data.verses.map(v => {
              return v.text;
          })
          const my_symbol = " ۝ ";
          verses[0] += my_symbol;
          verses[1] += my_symbol;
          setVerse(verses);
          setVersesLoaded(true);
        }).catch(error => {
          generateSampleData(easyMode);
          console.log(error);
        })
    }else {
      generateSampleData(easyMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])

 const newVerse = (isSwitchingDifficulty)=>{
  window.scrollTo(0, 0)
  const difficulty = isSwitchingDifficulty ? !easyMode : easyMode;
  setVersesLoaded(false)
  if (process.env.NODE_ENV === 'production'){
    if (difficulty){
      axios.get(`${URL}/getEasyVerses`).then(res => {
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
        generateSampleData(difficulty)
        console.log(error)
      })    
    }else{
        axios.get(`${URL}/getRandomVerses`).then(res => {
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
          generateSampleData(difficulty)
          console.log(error)
        })      
    }
  }else{
    generateSampleData(difficulty)
  }
 }

 const generateSampleData = (difficulty) => {
  const testSurah = getTestSurah(difficulty)
  setSurahData(testSurah);
  let verses = testSurah.verses.map(v => {
    return v.text
  });
  const my_symbol = " ۝ "
  verses[0] += my_symbol;
  verses[1] += my_symbol;
  setVerse(verses);   
  setVersesLoaded(true)
 }

 const checkIfMobile = () => {
   if (/Mobi/.test(navigator.userAgent)) {
     setIsMobile(true)
}
 }

 const easyButtonNewVerses = (isSwitchingDifficulty) =>{
  newVerse(isSwitchingDifficulty);
  setCount(0)
  setLost(false);
  setShow(false);
  setAns1([false, 0]);
  setAns2([false, 0]);
  setAns3([false, 0]);
  setDisabled1(false);
  setDisabled2(true);
  setDisabled3(true)
}

  return (
    <div className='App'>  
        <div className="NavBar mb-2 pr-4">
          <Row className="d-flex align-items-center">
            <Col >
            </Col>
            <Col >
              <div className="title">Islamle</div>
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <EasyButton 
                id="toggle_button" 
                easyMode={easyMode} 
                setEasyMode={setEasyMode} 
                easyButtonNewVerses={easyButtonNewVerses} 
                setSurahs={setSurahs} 
                longSurahList={long_surah_list} 
                shortSurahList={short_surah_list}
                versesLoaded={versesLoaded}
                />
            </Col>            
          </Row>
        </div>
        <Row className="mt-3 mb-3">
          {
            versesLoaded
            ?
            <Verses surah_verses={verse} data={surahData}/>
            :
            <Row className="my-3 d-flex justify-content-center">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </Row>  
            }
        </Row>
        <Row className="mt-3">
          {/* <Answers surahData={surahData} newVerse={newVerse} isMobile={isMobile} surahs={surahs}/> */}
          <Answers surahData={surahData}
            newVerse={newVerse}
            isMobile={isMobile}
            surahs={surahs}
            disabled1={disabled1}
            disabled12={disabled2}
            disabled3={disabled3}
            ans1={ans1}
            ans2={ans2}
            ans3={ans3}
            setAns1={setAns1}
            setAns2={setAns2}
            setAns3={setAns3}
            setDisabled1={setDisabled1}
            setDisabled2={setDisabled2}
            setDisabled3={setDisabled3}
            lost={lost}
            setLost={setLost}
            count={count}
            setCount={setCount}
            show={show}
            setShow={setShow}
            />
        </Row>
    </div>
  );
}

export default App;
