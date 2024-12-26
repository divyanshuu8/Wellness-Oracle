import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from Predict import get_prediction  # Import the function from predict.py
from NLPTransformer import process_symptoms
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://wellness-oracle.netlify.app"],  # Update to match your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a model for the input data (matched symptoms)
class SymptomRequest(BaseModel):
    matched_symptoms: list  # List of symptoms with their matching scores

@app.get("/")
def index():
    return {"name": "Health Data API"}

@app.get("/getMatches")
def predict(user_input: str):
    matched_symptoms = process_symptoms(user_input)
    return {"matched_symptoms": matched_symptoms}

@app.post("/predict")
def predict(request: SymptomRequest):
    try:
        predictions = get_prediction(request.matched_symptoms)
        if predictions is not None:
            return {"predictions": predictions.tolist()}
        raise HTTPException(status_code=400, detail="Error making predictions")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# Read the port from environment variables
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
