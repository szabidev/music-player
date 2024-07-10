const DeleteMusicData = ({
  onClose,
  data,
  deleteData,
}: {
  onClose: () => void;
  data: string;
  deleteData?: any;
}) => {
  return (
    <div className="w-full py-2 bg-gray-100 cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">
      <button
        tabIndex={-1}
        type="button"
        className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
        onClick={onClose}
      >
        <svg
          tabIndex={-1}
          className="h-4 w-4 cursor-pointer text-fuchsia-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close</span>
      </button>

      <div className="space-y-2 p-2">
        <div className="p-4 space-y-2 text-center">
          <h2
            className="text-xl font-bold tracking-tight"
            id="page-action.heading"
          >
            Delete {data}
          </h2>

          <p className="text-gray-500">
            Are you sure you would like to do this?
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div
          aria-hidden="true"
          className="border-t border-fuchsia-300 px-2"
        ></div>

        <div className="px-6 py-2">
          <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
            <button
              type="button"
              className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-slate-500 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600"
              onClick={onClose}
            >
              <span className="flex items-center gap-1">
                <span className="">Cancel</span>
              </span>
            </button>

            <button
              type="submit"
              onClick={deleteData}
              className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
            >
              <span className="flex items-center gap-1">
                <span className="">Confirm</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMusicData;
