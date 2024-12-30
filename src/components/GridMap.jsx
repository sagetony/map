import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Tooltip } from 'react-tooltip';
import '../styles.css';

const GridMap = () => {
  const [lands, setLands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');

    fetch('/mockLands.json')
      .then((response) => {
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        // Filter to ensure lands are within the bounds of the grid
        const filteredLands = data.filter(
          (land) => land.x >= 1 && land.x <= 100 && land.y >= 1 && land.y <= 30
        );
        console.log('Filtered lands:', filteredLands);
        setLands(filteredLands);
      })
      .catch((error) => {
        console.error('Error fetching lands:', error);
        setError(
          'Failed to fetch lands. Please check the file path or the server.'
        );
      });
  }, []);

  const maxRows = 30; // Set the number of rows in the grid
  const maxColumns = 100; // Set the number of columns in the grid

  const getGridItem = (land, row, col) => {
    if (land) {
      return (
        <div
          key={land.id}
          className='grid-item'
          style={{
            gridRow: land.y,
            gridColumn: land.x,
          }}
          data-tooltip-id={`tooltip-${land.id}`}
          data-tooltip-content={`<b>${land.name}</b><br/>Owner: ${land.owner}`}
          data-html={true}
        >
          <img src={land.avatar} alt={land.name} className='grid-avatar' />
          <Tooltip id={`tooltip-${land.id}`} />
        </div>
      );
    } else {
      return (
        <div key={`empty-${row}-${col}`} className='grid-item empty'>
          {/* Empty box */}
        </div>
      );
    }
  };

  // Generate the grid by iterating over all grid positions
  const gridItems = [];
  for (let row = 1; row <= maxRows; row++) {
    for (let col = 1; col <= maxColumns; col++) {
      // Find the land item at this position (if it exists)
      const land = lands.find((land) => land.x === col && land.y === row);
      gridItems.push(getGridItem(land, row, col)); // Push either the land or an empty box
    }
  }

  return (
    <div className='grid-map-container'>
      {error && <div className='error-message'>{error}</div>}{' '}
      {/* Display error message if there's an error */}
      <TransformWrapper
        defaultScale={0.3} // Set default zoom level (smaller for zoomed-out view)
        wheel={{ step: 0.1 }} // Adjust zoom sensitivity
        panning={{ disabled: false }} // Enable panning
      >
        <TransformComponent>
          <div className='grid-container'>{gridItems}</div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default GridMap;
