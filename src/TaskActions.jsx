import { useContext, useState } from "react";
import { TaskContext } from "./context";
import DeletePopup from "./task/DeletePopUP";
import Search from "./task/Search";

export default function TaskActions({ onAddTask, term, onChange }) {
  const [showPopup, setShowPopup] = useState(false);
  const { tasks, dispatch } = useContext(TaskContext);

  function handleDelete() {
    dispatch({
      type: "deleted",
    });
    setShowPopup(false);
  }

  return (
    <>
      {showPopup && (
        <DeletePopup
          deleteAll={"all"}
          onDelete={handleDelete}
          onCancel={() => setShowPopup(false)}
        />
      )}
      <div className="mb-14 items-center justify-between sm:flex">
        <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
        <div className="flex items-center space-x-5">
          <Search term={term} onChange={onChange} />
          <button
            className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={onAddTask}
          >
            Add Task
          </button>
          <button
            className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={() => setShowPopup(true)}
          >
            Delete All
          </button>
        </div>
      </div>
    </>
  );
}
