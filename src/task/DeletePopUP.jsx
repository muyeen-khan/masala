export default function DeletePopup({ deleteAll, onDelete, onCancel }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-12 rounded-md shadow-lg z-50">
      <p className="text-gray-300 mb-8 text-2xl font-bold">
        Are you sure you want to delete {deleteAll ? "all files" : "this file"}?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded transition-all duration-300"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
