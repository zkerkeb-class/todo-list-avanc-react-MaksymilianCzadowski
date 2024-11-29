interface InputProps {
  updateValue: (value: string) => void;
  value: string;
}

export function Input({updateValue = () => {}, value}: InputProps) {
  return (
    <>
      <input
        type="text"
        className="w-11/12 h-10 border-2 border-gray-300 rounded-lg px-2"
        placeholder="Add a task"
        value={value}
        onChange={event => updateValue(event.target.value)}
      />
    </>
  );
}
