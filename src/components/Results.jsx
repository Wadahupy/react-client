import React from "react";

const Results = ({ results }) => {
  if (!results) return null;

  return (
    <div className="p-4 mt-6 border rounded shadow">
      <h3 className="text-lg font-bold">Results</h3>
      <p className="mt-2">Emotion: {results.emotion}</p>
      <p>Confidence: {results.confidence}</p>
      <div className="mt-4">
        <h4 className="text-sm font-bold">Probabilities:</h4>
        <ul className="list-disc list-inside">
          {Object.entries(results.probabilities).map(([key, value]) => (
            <li key={key}>
              {key}: {value.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
