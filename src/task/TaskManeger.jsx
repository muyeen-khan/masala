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
      title: "নামায",
      description:
        "ইসলামের গুরুত্বপূর্ণ বিধান।নামায শুরু করতে হয় তাকবিরে উলা দিয়ে।শেষ হয় সালামের মাধ্যমে",
      tags: ["tag1", "tag2", "tag3"],
      priority: "ফরয",
      isFavorite: true,
    },
    {
      id: 2,
      title: "রোযা",
      description:
        "ইসলামের গুরুত্বপূর্ণ বিধান।সুবহে সাদিক থেকে সূর্যাস্ত পর‌্যন্ত উপবাসের মাধ্যমে রোযা রাখতে হয়।",
      tags: ["tag4", "tag5", "tag6"],
      priority: "ফরয",
      isFavorite: false,
    },
    {
      id: 3,
      title: "যাকাত",
      description:
        "নেসাব পরিমাণ সম্পদের মালিক হলে ৪০ ভাগের একভাগ সদকাহ দিতে হয়।",
      tags: ["tag7", "tag8", "tag9"],
      priority: "ফরয",
      isFavorite: true,
    },
    {
      id: 4,
      title: "হজ্ব",
      description: "বিস্তারিত বিধান",
      tags: ["tag10", "tag11", "tag12"],
      priority: "ফরয",
      isFavorite: false,
    },
    {
      id: 5,
      title: "বিতর নামায",
      description: "তিন রাকাত নামায।এশার পর আদায় করতে হয়।",
      tags: ["tag13", "tag14", "tag15"],
      priority: "ওয়াজিব",
      isFavorite: true,
    },
    {
      id: 6,
      title: "তাহাজ্জুদ নামায",
      description: "Description Six",
      tags: ["tag16", "tag17", "tag18"],
      priority: "নফল",
      isFavorite: false,
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
