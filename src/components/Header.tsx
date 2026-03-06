import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>Which Element Are You?</h1>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/quiz"> Quiz</Link>
      </nav>
    </header>
  );
}