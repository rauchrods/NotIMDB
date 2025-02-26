interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const MyPagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center gap-2 text-[#D6C7FF] border-1 border-[#D6C7FF] rounded-full p-2 px-4 text-2xl my-6">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="cursor-pointer"
      >
        Prev
      </button>
      <p className="flex items-center gap-x-3">
        Current Page: <span className="text-4xl ">{currentPage}</span>
      </p>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default MyPagination;
