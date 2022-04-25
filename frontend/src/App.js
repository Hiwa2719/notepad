import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";

function App() {
    return (
        <Router>
            <div className="bg-dark">
                <h1>hello world</h1>
                <Routes>
                    <Route path='/' element={<NotesPage/>}/>
                    <Route path='/api/notes/:id' element={<NotePage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
