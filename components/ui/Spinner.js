export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center space-x-2 animate-pulse">
      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
    </div>
  );
}
