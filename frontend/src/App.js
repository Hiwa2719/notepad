import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import ReminderModal from "./components/ReminderModal";
import {useState} from "react";


function App() {
    const [openModal, setOpenModal] = useState(true)
    return (
        <Router>
            <main className="bg-dark vh-100 d-flex align-items-center justify-content-center">
                <div className="h-75 d-flex flex-column text-light w-25">
                    <Header/>
                    <div className="bg-secondary h-100 py-1 position-relative">
                        <Routes>
                            <Route path='/' element={<NotesPage/>}/>
                            <Route path='/api/notes/' element={<NotesPage/>}/>
                            <Route path='/api/notes/:id' element={<NotePage/>}/>
                        </Routes>
                    </div>
                </div>
            <ReminderModal openModal={openModal} setOpenModal={setOpenModal}/>
            </main>
        </Router>
    );
}

export default App;
