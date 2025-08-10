import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useIsMobile from "./components/useIsMobile";
import Container from "./components/Container";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const App = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <div>
        <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route
            path="/todo"
            element={<Container state="To-Do" heading="Let's begin!" description="Tasks to be done" />}
          />
          <Route
            path="/in-progress"
            element={<Container state="In-Progress" heading="Work in Progress" description="Tasks you're working on" />}
          />
          <Route
            path="/completed"
            element={<Container state="Completed" heading="Well done!" description="Tasks you've finished" />}
          />
        </Routes>
      </Router>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <div className="flex ">
      <NavBar />
      <div className="mt-28 w-full flex-1 md:pl-[18%]">
        <h1 className="text-2xl ml-[2rem] mb-6 font-bold">Work Board</h1>
        <div className="flex justify-around">
          <Container
            state="To-Do"
            heading="No task yet"
            description="Add a new task to get started"
          />
          <Container
            state="In-Progress"
            description="Start working on a task to move it here"
          />
          <Container
            state="Completed"
            description="Task that are completed will appear here"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default App;
