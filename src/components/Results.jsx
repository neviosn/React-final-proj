// Results.js
import PropTypes from 'prop-types';

const Results = ({ element, artwork }) => {
  return (
    <div>
      <h2>Your Element: {element}</h2>
      <div className="artwork-container"> {/* Add this container for centering */}
        {artwork ? (
          <img
            className="artwork-image"
            src={artwork.primaryImage}
            alt={artwork.title}
          />
        ) : (
          <div className="artwork-placeholder">
            No Artwork Found
          </div>
        )}
      </div>
      <h3>{artwork?.title || 'Unknown Title'}</h3>
      <p>{artwork?.artistDisplayName || 'Unknown Artist'}</p>
      <p>{artwork?.objectDate || 'Unknown Date'}</p>
    </div>
  );
};

Results.propTypes = {
  element: PropTypes.string.isRequired,
  artwork: PropTypes.shape({
    primaryImage: PropTypes.string,
    title: PropTypes.string,
    artistDisplayName: PropTypes.string,
    objectDate: PropTypes.string,
  }),
};

export default Results;