import { useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import TodoApp from "./components/TodoApp";
import { useAppState } from "./components/AppStateContext";
// import TaskCard from "./components/TaskCard";
// import TaskForm from "./components/TaskForm";



const App = () => {
  const {state} = useAppState();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  }
  return (
    <div>
      <Header toggleForm={toggleForm} />
      <NavBar />
      <div className="ml-[16rem] mt-[2rem]">
        <h1 className="text-2xl ml-[2rem] font-bold">Work Board</h1>
        <div className="flex justify-around">
          {state.lists.map((list, i) => (
            <Container types={list.text} description={list.description} heading={list.heading} />
          ))}
          {/* <Container
            types="To-Do"
            heading="No task yet"
            description="Add a new task to get started"
          />
          <Container
            types="In-Progress"
            description="Start working on a task to move it here"
          />
          <Container
            types="Completed"
            description="Task that are completed will appear here"
          /> */}
          <TodoApp isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} />
        </div>
        {/* <TaskForm /> */}
        {/* <TaskCard /> */}
      </div>
    </div>
  );
};

export default App;
