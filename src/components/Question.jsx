import PropTypes from 'prop-types';


export default function Question({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])).isRequired,
  onAnswer: PropTypes.func.isRequired,
};