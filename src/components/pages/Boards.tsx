import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useIsMobile from "../useIsMobile";
import Container from "../Container";
import Header from "../Header";
import { useState } from "react";
import StatusSummary from "../StatusSummary";

const Boards = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [openModalState, setOpenModalState] = useState<"To-Do" | "In-Progress" | "Completed" | null>(null);

  if (isMobile === null) return null;

  const handleHeaderAddClick = () => {
    if (isMobile) {
      if (location.pathname.includes("in-progress")) {
        setOpenModalState("In-Progress");
      } else if (location.pathname.includes("completed")) {
        setOpenModalState("Completed");
      } else {
        setOpenModalState("To-Do");
      }
    } else {
      setOpenModalState("To-Do");
    }
  };

  return (
    <div>
      <Header onAddClick={handleHeaderAddClick} />

      {isMobile ? (
        <div>
          <h1 className="text-2xl ml-[2rem] sm:mb-6 mb-4 font-bold">Work Board</h1>
          <StatusSummary />
          <Routes>
            <Route
              path="/todo"
              element={
                <Container
                  state="To-Do"
                  heading="Let's begin!"
                  description="Tasks to be done"
                  open={openModalState === "To-Do"}
                  setOpen={(val) => setOpenModalState(val ? "To-Do" : null)}
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
                  open={openModalState === "In-Progress"}
                  setOpen={(val) => setOpenModalState(val ? "In-Progress" : null)}
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
                  open={openModalState === "Completed"}
                  setOpen={(val) => setOpenModalState(val ? "Completed" : null)}
                />
              }
            />
            <Route path="*" element={<Navigate to="/todo" replace />} />
          </Routes>
        </div>
      ) : (
        <div className="mt-28 w-full flex-1 md:pl-[18%]">
          <h1 className="text-2xl ml-[2rem] mb-6 font-bold">Work Board</h1>
          <div className="flex justify-around">
            <Container
              state="To-Do"
              heading="No task yet"
              description="Add a new task to get started"
              open={openModalState === "To-Do"}
              setOpen={(val) => setOpenModalState(val ? "To-Do" : null)}
            />
            <Container
              state="In-Progress"
              description="Start working on a task to move it here"
              open={openModalState === "In-Progress"}
              setOpen={(val) => setOpenModalState(val ? "In-Progress" : null)}
            />
            <Container
              state="Completed"
              description="Tasks that are completed will appear here"
              open={openModalState === "Completed"}
              setOpen={(val) => setOpenModalState(val ? "Completed" : null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
