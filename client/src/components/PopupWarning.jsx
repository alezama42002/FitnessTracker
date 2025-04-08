export default function PopupQuantity({ onClose, onSave }) {
  return (
    <div className="absolute right-0 top-6 z-1 flex justify-center items-center">
      <div className=" p-4 rounded-lg w-80 bg-[#2C3441]">
        <div className="flex justify-center">
          <h2 className="text-xl mb-4 text-white">Are you sure?</h2>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#19212C] text-white py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-green-500 text-white py-1 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
