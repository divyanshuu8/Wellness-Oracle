# Wellness-Oracle

Wellness-Oracle is a machine learning-based system designed to help individuals identify potential diseases based on their symptoms. By analyzing user-inputted symptoms, the system utilizes advanced machine learning models to predict possible conditions. The project integrates cutting-edge technologies to ensure accurate and efficient predictions.

## Features

- **Symptom Analysis**: Accepts user-provided symptoms and processes them to predict potential diseases.
- **Machine Learning Models**: Built with Python and PyTorch for robust and accurate predictions.
- **Frontend Interface**: React-based user interface for seamless interaction.
- **Backend API**: FastAPI framework for handling requests and serving predictions.
- **Scalable Design**: Built for easy scalability and integration into other platforms.

## Technologies Used

- **Programming Language**: Python
- **Machine Learning Framework**: PyTorch
- **Frontend**: React
- **Backend**: FastAPI

## Installation

### Prerequisites
- Python 3.8 or later
- Node.js and npm
- pip (Python package manager)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/divyanshuu8/Wellness-Oracle.git
    cd wellness-oracle
    ```

2. **Backend Setup**:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

3. **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

4. **Access the Application**:
   - Backend will run at `http://127.0.0.1:8000`
   - Frontend will run at `http://localhost:3000`

## Usage

1. Open the frontend application in your browser.
2. Enter your symptoms in the provided input fields.
3. Click on the **Predict** button to view possible conditions.

## File Structure

```
wellness-oracle/
│
├── backend/               # Backend code with FastAPI
│   ├── models/            # Machine learning models
│   ├── routes/            # API routes
│   └── main.py            # Entry point for FastAPI server
│
├── frontend/              # Frontend code with React
│   ├── src/               # React components and assets
│   └── public/            # Static files
│
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
└── package.json           # Frontend dependencies
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed explanation of your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For questions or feedback, please reach out to [Divyanshu Singh](mailto:singhdivyanshu975@gmail.com).

---

Feel free to customize and enhance the Wellness-Oracle system for your needs!
