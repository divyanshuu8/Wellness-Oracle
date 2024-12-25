import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Howto from "./HowTo";
import Symptoms from "./Symptoms"; // New Symptoms component to display fetched data

const Product = () => {
  // State for the input field
  const [message, setMessage] = useState("");
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for matched symptoms
  const [matchedSymptoms, setMatchedSymptoms] = useState(null);

  // Handle input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    if (!message.trim()) {
      toast.error("Please Enter symptoms!!!");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      // Construct the URL with the user input
      const url = `http://127.0.0.1:8000/getMatches?user_input=${encodeURIComponent(
        message
      )}`;

      // Make the GET request to the FastAPI backend
      const response = await fetch(url);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch matched symptoms");
      }

      // Parse the JSON response
      const data = await response.json();

      // Update the state with matched symptoms
      setMatchedSymptoms(data.matched_symptoms);
      toast.success("Symptoms fetched successfully!");
    } catch (error) {
      // Log or handle the error
      console.error("Error:", error.message);
      toast.error("Failed to fetch symptoms. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <>
      <div className="container mb-4">
        {/* Medium-sized heading */}
        <h1 className="title is-4">Wellness Oracle</h1>

        {/* Paragraph describing GenNotes */}
        <p className="content is-medium">
          Wellness Oracle aims to empower individuals with valuable insights to
          make informed decisions about their health, fostering proactive care
          and improved well-being.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input field */}
          <div className="field">
            <label className="label">Symptoms</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                placeholder="My chest is hurting"
                value={message}
                onChange={handleMessageChange}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="field">
            <div className="is-flex is-justify-content-center">
              <button
                type="submit"
                className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                disabled={isLoading || matchedSymptoms}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>

        {/* Conditional rendering of components */}
        {matchedSymptoms ? (
          <Symptoms symptoms={matchedSymptoms} /> // Pass matched symptoms as prop
        ) : (
          <Howto />
        )}
      </div>
    </>
  );
};

export default Product;
