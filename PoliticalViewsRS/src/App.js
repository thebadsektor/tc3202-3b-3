import React from 'react';
import StatementCards from './StatementCards';

function App() {
  return (
    <div className="App">
      <StatementCards
        optionA="This is a short sentence for Option A."
        optionB="This is a very long sentence for Option B that will determine the width of both cards."
      />
    </div>
  );
}

export default App;