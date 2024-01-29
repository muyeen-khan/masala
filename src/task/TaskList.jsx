import { useContext } from "react";
import { TaskContext } from "../context";
import TaskItem from "./TaskItem";

export default function TaskList({ onEdit, updated }) {
  const { tasks, dispatch } = useContext(TaskContext);

  const data = updated || tasks;

  return (
    <>
      <div className="overflow-auto">
        <table className="table-fixed overflow-auto xl:w-full">
          <thead>
            <tr>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                Title
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                Description
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                Tags
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                Priority
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length == 0 ? (
              <tr className="border-b border-[#2E3443]">
                <td colSpan="6" className="text-center py-4">
                  <span className="text-3xl text-gray-500">No tasks found</span>
                </td>
              </tr>
            ) : (
              data.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={onEdit} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
