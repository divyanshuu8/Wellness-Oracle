from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from Predict import get_prediction  # Import the function from predict.py
from NLPTransformer import process_symptoms
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update to match your frontend origin
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

#http://127.0.0.1:8000/getMatches?user_input=my+chest+is+hurting
@app.get("/getMatches")
def predict(user_input: str):
    # Call the process_symptoms function to match symptoms and return the result
    matched_symptoms = process_symptoms(user_input)
    # Return the matched symptoms
    return {"matched_symptoms": matched_symptoms}

@app.post("/predict")
def predict(request: SymptomRequest):
    try:
        # Get prediction based on the matched symptoms
        predictions = get_prediction(request.matched_symptoms)
        
        if predictions is not None:
            return {"predictions": predictions.tolist()}  # Return predictions as a list
        
        # If no predictions, raise an exception
        raise HTTPException(status_code=400, detail="Error making predictions")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")