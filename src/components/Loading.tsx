export function Loading() {
  return (
    <div className="flex w-full h-96 items-center justify-center flex-row gap-4">
      <div className="w-4 h-4 rounded-full bg-primary-500 animate-bounce [animation-delay:.1.5s]"></div>
      <div className="w-4 h-4 rounded-full bg-primary-500 animate-bounce [animation-delay:.1s]"></div>
      <div className="w-4 h-4 rounded-full bg-primary-500 animate-bounce [animation-delay:.1.5s]"></div>
    </div>
  );
}
