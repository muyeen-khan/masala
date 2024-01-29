import { useReducer, useState } from "react";
import TaskActions from "../TaskActions";
import { FilterContext, TaskContext } from "../context";
import taskReducer from "../reducer";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskList from "./TaskList";

export default function TaskManeger() {
  const initialValue = [
    {
      id: 1,
      title: "Sample Title",
      description: "Sample Description",
      tags: ["tag1", "tag2", "tag3"],
      priority: "high",
      isFavorite: true,
    },
  ];
  const [tasks, dispatch] = useReducer(taskReducer, initialValue);
  const [filtered, setFiltered] = useState(null);

  const [showPopUp, setShowPopUp] = useState(false);
  const [editable, setEditable] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleShowPopUp() {
    setShowPopUp(true);
  }

  function handleEditTask(task) {
    setEditable(task);
    setShowPopUp(true);
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  const updated = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskContext.Provider value={{ tasks, dispatch }}>
            <FilterContext.Provider value={{ filtered, setFiltered }}>
              {showPopUp && (
                <AddTaskPopUp
                  editable={editable}
                  onClose={() => {
                    setEditable(null), setShowPopUp(false);
                  }}
                />
              )}

              <TaskActions
                onAddTask={handleShowPopUp}
                onChange={handleChange}
                term={searchTerm}
              />
              <TaskList onEdit={handleEditTask} updated={updated} />
            </FilterContext.Provider>
          </TaskContext.Provider>
        </div>
      </div>
    </section>
  );
}
