import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName); 
    navigate('/quiz'); // Navigate using useNavigate
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Enter Your Name:</label>
      <input 
        type="text" 
        id="name" 
        value={inputName} 
        onChange={(e) => setInputName(e.target.value)} 
      />
      <button type="submit">Start Quiz</button>
    </form>
  );
}