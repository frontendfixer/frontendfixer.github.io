import { Duration } from 'date-fns';

// Helper function to format numbers with leading zeros (e.g., 5 -> 05)
const formatTime = (time: number | undefined) => {
  return time && time < 10 ? `0${time}` : (time ?? 0);
};

// Main Countdown component
const Countdown = ({ duration }: { duration: Duration }) => {
  return (
    <div className="p-3">
      <div className="grid grid-cols-[repeat(3,minmax(100px,1fr))] gap-4 text-center ">
        <div className="transform rounded-xl bg-purple-800 p-4 shadow-md transition-transform duration-200 hover:-translate-y-1">
          <div className="text-7xl font-bold text-yellow-300">
            {formatTime(duration.years ?? 0)}
          </div>
          <div className="text-lg text-gray-300">Years</div>
        </div>

        <div className="transform rounded-xl bg-purple-800 p-4 shadow-md transition-transform duration-200 hover:-translate-y-1">
          <div className="text-7xl font-bold text-blue-300">
            {formatTime(duration.months ?? 0)}
          </div>
          <div className="text-lg text-gray-300">Months</div>
        </div>

        <div className="transform rounded-xl bg-purple-800 p-4 shadow-md transition-transform duration-200 hover:-translate-y-1">
          <div className="text-7xl font-bold text-green-300">
            {formatTime(duration.days)}
          </div>
          <div className="text-lg text-gray-300">Days</div>
        </div>
      </div>
    </div>
  );
};
export default Countdown;
