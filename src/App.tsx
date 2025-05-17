// import Card from "./components/Card";
import Container from "./components/Container";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <div className="ml-[16rem] mt-[2rem]">
        <h1 className="text-2xl ml-[2rem] font-bold">Work Board</h1>
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
        {/* <Card
          title="Design a simple Kanban Board"
          content="Using figma design tool, design a simple kanban board with the following design requirement and minimum components"
        /> */}
      </div>
    </div>
  );
};

export default App;
