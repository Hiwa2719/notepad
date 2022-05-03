import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import {useState} from "react";


function App() {
    const [listType, setListType] = useState("Notes")
    return (
        <Router>
            <main className="bg-dark vh-100 d-flex align-items-center justify-content-center">
                <div className="h-75 d-flex flex-column text-light w-25">
                    <Header listType={listType}/>
                    <div className="bg-secondary h-100 py-1 position-relative">
                        <Routes>
                            <Route path='/' element={<NotesPage setListType={setListType}/>}/>
                            <Route path='/api/notes/' element={<NotesPage setListType={setListType}/>}/>
                            <Route path='/api/tasks/' element={<TasksPage setListType={setListType}/>}/>
                            <Route path='/api/notes/:id' element={<NotePage setListType={setListType}/>}/>
                            <Route path='/api/tasks/:id' element={<TaskPage setListType={setListType}/>}/>
                        </Routes>
                    </div>
                </div>
            </main>
        </Router>
    );
}

export default App;
