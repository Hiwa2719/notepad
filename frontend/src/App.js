import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import NotesPage from "./pages/NotesPage";


function App() {
    return (
        <Router>
            <div className="App">
                <h1>hello world</h1>
                <Routes>
                    <Route path='/' element={<NotesPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
