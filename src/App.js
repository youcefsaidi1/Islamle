
import './App.css';
import {Row, Col} from 'reactstrap'
import React, {useState, useEffect} from 'react'
import Verses from './components/Verses'
import Answers from './components/Answers'
import axios from 'axios'

// import {Modal} from 'react-bootstrap';

function App() {
  const [verse, setVerse] = useState("")
  const [surahData, setSurahData] = useState()
  const [versesLoaded, setVersesLoaded] = useState(false)
  useEffect( ()=>{
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

  //   let test = {
  //       "surah_number": 58,
  //       "surah_name": "Al-Mujadila",
  //       "verses": [
  //           {
  //               "id": 5120,
  //               "number": 16,
  //               "key": "58:16",
  //               "page": 544,
  //               "text": "اتَّخَذُوا أَيْمَانَهُمْ جُنَّةً فَصَدُّوا عَن سَبِيلِ اللَّهِ فَلَهُمْ عَذَابٌ مُّهِينٌ",
  //               "transliteration": "ittakhadhū aymānahum junnatan faṣaddū ʿan sabīli l-lahi falahum ʿadhābun muhīnun",
  //               "translated_text": "They have taken their oaths (as) a cover so they hinder from (the) way of Allah (the) way of Allah so for them (is) a punishment humiliating",
  //               "translations": [],
  //               "interpretations": [],
  //               "words": []
  //           },
  //           {
  //               "id": 5121,
  //               "number": 17,
  //               "key": "58:17",
  //               "page": 544,
  //               "text": "لَّن تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ وَلَا أَوْلَادُهُم مِّنَ اللَّهِ شَيْئًا ۚ أُولَٰئِكَ أَصْحَابُ النَّارِ ۖ هُمْ فِيهَا خَالِدُونَ",
  //               "transliteration": "lan tugh'niya ʿanhum amwāluhum walā awlāduhum mina l-lahi shayan ulāika aṣḥābu l-nāri hum fīhā khālidūna",
  //               "translated_text": "Never will avail them their wealth and not their children against Allah (in) anything Those (will be) companions (of) the Fire they in it will abide forever",
  //               "translations": [],
  //               "interpretations": [],
  //               "words": []
  //           },
  //           {
  //               "id": 5122,
  //               "number": 18,
  //               "key": "58:18",
  //               "page": 544,
  //               "text": "يَوْمَ يَبْعَثُهُمُ اللَّهُ جَمِيعًا فَيَحْلِفُونَ لَهُ كَمَا يَحْلِفُونَ لَكُمْ ۖ وَيَحْسَبُونَ أَنَّهُمْ عَلَىٰ شَيْءٍ ۚ أَلَا إِنَّهُمْ هُمُ الْكَاذِبُونَ",
  //               "transliteration": "yawma yabʿathuhumu l-lahu jamīʿan fayaḥlifūna lahu kamā yaḥlifūna lakum wayaḥsabūna annahum ʿalā shayin alā innahum humu l-kādhibūna",
  //               "translated_text": "(On the) Day Allah will raise them Allah will raise them all then they will swear to Him as they swear to you And they think that they (are) on something No doubt Indeed, they [they] (are) the liars",
  //               "translations": [],
  //               "interpretations": [],
  //               "words": []
  //           }
  //       ]
  //   };
  //   setVersesLoaded(true)
  //   setSurahData(test);
    
  //   let verses = test.verses.map(v => {
  //     return v.text
  // });
  //   const my_symbol = " ۝ "
  //   verses[0] += my_symbol;
  //   verses[1] += my_symbol;
  //   setVerse(verses);

 },[])

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
          <Verses verses={verse} data={surahData}/>
          :
          <Row className="mt-2 mb-5 d-flex justify-content-center">
            <Col sm={{size:4}}>
              <img src={require("./loading.gif")} alt="loading gif" width="25" hieght="25"></img>
            </Col>    
          </Row>  
          }
      </Row>
      <Row className="mt-3">
        <Answers data={surahData} surah_verses={verse}/>
      </Row>
      </>
      
    </div>
  );
}

export default App;
