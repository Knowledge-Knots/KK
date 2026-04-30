export default function ProgressBar({ pct, color = '#3CB371', label, showLabel = true }) {
  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="flex justify-between text-sm font-nunito font-bold mb-1">
          <span className="text-gray-700">{label}</span>
          <span style={{ color }}>{pct}%</span>
        </div>
      )}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}