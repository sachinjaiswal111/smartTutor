

const StatCard = ({ title, value, description, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {description}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3">
          <Icon
            size={28}
            className="text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;