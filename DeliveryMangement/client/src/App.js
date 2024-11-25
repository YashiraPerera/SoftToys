
import './App.css';
import Report from './getreport/Report';
import AddReport from './addreport/AddReport';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UpdateReport from './updatereport/updateReport'
import Tracker from './map/tracker.js'
import Header from './header/Header.jsx'
import Footer from './footer/Footer.jsx'
import DashBoard from './dashBoard/DashBoard.jsx'


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Report /> },
    { path: "/add", element: <AddReport /> },
    { path: "/update/:id", element: <UpdateReport /> },
    { path: "/map", element: <Tracker /> },
    { path: "/header", element: <Header /> },
    { path: "/footer", element: <Footer /> },
    { path: "/dashboard", element: <DashBoard /> },
  ]);

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
