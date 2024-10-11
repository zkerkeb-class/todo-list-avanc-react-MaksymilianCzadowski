interface ButtonProps {
  onClick: () => void;
  display: string;
}

export function Button({onClick, display}: ButtonProps) {
  return (
    <button
      className="h-8 w-auto border text-gray-500 border-gray-500 text-xs p-1 px-2
      rounded-md flex justify-center items-center text-center"
      onClick={onClick}>
      <p className="mb-0.5">{display}</p>
    </button>
  );
}
