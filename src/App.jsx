import 'react-router-dom'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  {UserProvider} from './components/UserContext';
//import { UserContext } from './src/components/UserContext.jsx'
import Header from './components/header';
import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';


const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
];

const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  // Continue mapping all your possible options to a keyword
};


function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState("")
  const [element, setElement] = useState("")
  const [artwork, setArtwork] = useState(0)
  const [error, setError] = useState("");
  


  function handleAnswer(answer) {
  setAnswers([...answers, answer]);
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};

function handleUserFormSubmit(name) {
  setUserName(name);
};

function determineElement(answers) {
  const counts = {};
  answers.forEach(function(answer) {
    const element = elements[answer];
    counts[element] = (counts[element] || 0) + 1;
  });
  return Object.keys(counts).reduce(function(a, b) {
    return counts[a] > counts[b] ? a : b
  });
};

useEffect(() => {
    function fetchArtwork(keyword) {
      const apiEndpoint = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`;
      
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          if (data.total > 0) {
            const randomIndex = Math.floor(Math.random() * data.objectIDs.length); // Get a random index
            const objectId = data.objectIDs[randomIndex]; // Get a random object ID
            fetchArtworkDetails(objectId);
          }
        })
        .catch(error => {
          console.error('Error fetching artwork:', error);
        });
    }

    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex, answers]);

  function fetchArtworkDetails(objectId) {
    const detailsEndpoint = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
    
    fetch(detailsEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('Artwork details:', data); // Debugging: Log the artwork details

        setArtwork({
          title: data.title,
          primaryImage: data.primaryImage && data.primaryImage !== '' ? data.primaryImage : 'https://picsum.photos/300',
          artistDisplayName: data.artistDisplayName || 'Unknown Artist',
          objectDate: data.objectDate || 'Unknown Date',
        });
      })
      .catch(error => {
        console.error('Error fetching artwork details:', error);
      });
  }

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}


export default App
