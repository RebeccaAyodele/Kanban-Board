import { Routes, Route, Navigate } from "react-router-dom";
import useIsMobile from "../useIsMobile";
import Container from "../Container";
import Header from "../Header";
import StatusSummary from "../StatusSummary";

const Boards = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div>
        <Header />
        <h1 className="text-2xl ml-[2rem] mb-6 font-bold">Work Board</h1>
        <StatusSummary />
        <Routes>
          <Route
            path="/todo"
            element={
              <Container
                state="To-Do"
                heading="Let's begin!"
                description="Tasks to be done"
              />
            }
          />
          <Route
            path="/in-progress"
            element={
              <Container
                state="In-Progress"
                heading="Work in Progress"
                description="Tasks you're working on"
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Container
                state="Completed"
                heading="Well done!"
                description="Tasks you've finished"
              />
            }
          />
          {/* Default fallback for mobile */}
          <Route path="*" element={<Navigate to="/todo" replace />} />
        </Routes>
      </div>
    );
  }

  // DESKTOP VIEW
  return (
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
          description="Tasks that are completed will appear here"
        />
      </div>
    </div>
  );
};

export default Boards;
