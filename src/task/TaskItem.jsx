import { useContext, useState } from "react";
import { TaskContext } from "../context";
import DeletePopup from "./DeletePopUP";

export default function TaskItem({ task, onEdit }) {
  const { tasks, dispatch } = useContext(TaskContext);
  const [showPopup, setShowPopp] = useState(false);

  function handleFav() {
    dispatch({
      type: "favDone",
      payload: task,
    });
  }

  function handleDelete() {
    const newTasks = tasks.filter((t) => t.id !== task.id);

    dispatch({
      type: "singleDeleted",
      payload: [...newTasks],
    });
  }
  return (
    <>
      {showPopup && (
        <DeletePopup
          onDelete={handleDelete}
          onCancel={() => setShowPopp(false)}
        />
      )}
      <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke={task.isFavorite ? "yellow" : "white"}
            fill={task.isFavorite ? "yellow" : ""}
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={handleFav}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        </td>
        <td> {task.title} </td>
        <td>
          <div>{task.description}</div>
        </td>
        <td>
          <ul className="flex justify-center gap-1.5 flex-wrap">
            {task.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </td>
        <td className="text-center"> {task.priority} </td>
        <td>
          <div className="flex items-center justify-center space-x-3">
            <button className="text-red-500" onClick={() => setShowPopp(true)}>
              Delete
            </button>
            <button className="text-blue-500" onClick={() => onEdit(task)}>
              Edit
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
