import React, { useState } from 'react';
import Description from '../DocumentBoard/Description';

function DocumentBoard() {
  const [descriptions, setDescriptions] = useState([
    
  ]);

  const addDescription = () => {
    const newDescription = {
      id: Date.now(), // Unique ID for each description
      content: '',
    };
    setDescriptions([...descriptions, newDescription]);
  };

  const deleteDescription = (id) => {
    const updatedDescriptions = descriptions.filter((desc) => desc.id !== id);
    setDescriptions(updatedDescriptions);
  };

  const updateDescription = (id, updatedContent) => {
    const updatedDescriptions = descriptions.map((desc) =>
      desc.id === id ? { ...desc, content: updatedContent } : desc
    );
    setDescriptions(updatedDescriptions);
  };

  return (
    <div>
      <button onClick={addDescription}>Add Notes</button>
      {descriptions.map((desc) => (
        <Description
        key={desc.id}
        currentValue={desc.content}
        updateTicketField={(field) => updateDescription(desc.id, field.value)}
        updateTicketHistory={(...args) => updateDescription(desc.id, ...args)}
        onDelete={() => deleteDescription(desc.id)}
      />
      ))}
    </div>
  );
}

export default DocumentBoard;
