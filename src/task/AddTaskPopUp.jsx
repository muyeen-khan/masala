import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FilterContext, TaskContext } from "../context";

export default function AddTaskPopUp({ onClose, editable }) {
  const { tasks, dispatch } = useContext(TaskContext);
  const { filtered, setFiltered } = useContext(FilterContext);

  const [inputFields, setInputFields] = useState(
    editable || {
      title: "",
      description: "",
      tags: "",
      priority: "",
    }
  );

  function handleOnChange(e) {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  }

  function handleCreateTask(e) {
    e.preventDefault();

    const keys = Object.keys(inputFields);

    let errors = [];
    keys.map((k) => {
      if (inputFields[k].length < 1) {
        errors.push(`please fill up ${k} field`);
      } else {
        return null;
      }
    });

    if (!errors[0] && editable) {
      dispatch({
        type: "edited",
        editable: editable,
        inputFields: inputFields,
      });

      toast.success("task updated successfully", {
        position: "bottom-right",
      });
      onClose();
    } else if (!errors[0]) {
      dispatch({
        type: "added",
        inputFields: inputFields,
      });

      toast.success("task added successfully", {
        position: "bottom-right",
      });
      setFiltered(null);
      onClose();
    } else {
      errors.map((e) => {
        toast.error(e, {
          position: "bottom-right",
        });
      });
    }
  }

  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {editable ? "Edit task" : "Add New Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={inputFields.title}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              value={inputFields.description}
              onChange={(e) => handleOnChange(e)}
              required
            ></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={inputFields.tags}
                onChange={(e) => handleOnChange(e)}
                required
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={inputFields.priority}
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={(e) => handleCreateTask(e)}
          >
            {editable ? "Update task" : "Create new Task"}
          </button>
        </div>
      </form>
    </>
  );
}
