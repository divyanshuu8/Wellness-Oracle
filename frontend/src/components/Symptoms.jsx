import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Symptoms = ({ symptoms }) => {
  // State to keep track of selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSymptomClick = (symptom) => {
    // If the symptom is already selected, remove it
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      // Otherwise, add it to the selected symptoms list
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSubmit = async () => {
    // Prepare the data to send
    const payload = {
      matched_symptoms: selectedSymptoms,
    };
    console.log(payload);

    try {
      // Make the POST request
      const response = await fetch("https://wellness-oracle.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to submit symptoms");
      }

      // Parse the response if needed
      const data = await response.json();
      console.log("Response Data:", data);

      // Check if there is a prediction and show it in the toast
      if (data.predictions && data.predictions.length > 0) {
        const predictedDisease = data.predictions[0];
        toast.success(`You have ${predictedDisease}`);
      } else {
        toast.error("No prediction available");
      }

      // Handle any post-submission logic if needed
    } catch (error) {
      // Handle the error
      console.error("Error:", error.message);

      // Show error toast
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title is-4">Please Select Symptoms:</h1>

      {/* Display symptoms in a row of cards */}
      <div className="columns is-multiline">
        {symptoms.length > 0 ? (
          symptoms.map((symptom, index) => (
            <div className="column is-one-quarter" key={index}>
              <div
                className={`card ${
                  selectedSymptoms.includes(symptom)
                    ? "has-background-primary"
                    : ""
                }`}
                onClick={() => handleSymptomClick(symptom)} // Handle selection
              >
                <div className="card-content">
                  <p className="title is-5" style={{ color: "white" }}>
                    {symptom[0].charAt(0).toUpperCase() + symptom[0].slice(1)}
                  </p>

                  <p className="title is-6">
                    {(symptom[1] * 100).toFixed(2)}% Matched Symptom
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No symptoms matched.</p>
        )}
      </div>

      {/* Show selected symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="notification is-primary mt-4">
          <strong>Selected Symptoms: </strong>
          <ul>
            {selectedSymptoms.map((symptom, index) => (
              <li key={index}>{symptom[0]}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit button to send selected symptoms */}
      <div className="field mt-4">
        <div className="is-flex is-justify-content-center">
          <button
            className="button is-primary"
            onClick={handleSubmit}
            disabled={selectedSymptoms.length === 0} // Disable button if no symptoms are selected
          >
            Submit Selected Symptoms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
