export default function FeedbackAndSuggestions() {
  const subjects = ["Maths", "Science", "English"];

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-blue-700">Feedback & Suggestions</h2>

      {/* TWO CARD LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ====================== FEEDBACK CARD ====================== */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Give Feedback
          </h3>

          <select className="p-3 border rounded-lg w-full">
            <option>Select Subject</option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <textarea
            className="p-3 border rounded-lg w-full"
            rows="4"
            placeholder="Write feedback..."
          ></textarea>

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
            Submit Feedback
          </button>
        </div>

        {/* ====================== SUGGESTION CARD ====================== */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Suggestions
          </h3>

          <textarea
            className="p-3 border rounded-lg w-full"
            rows="4"
            placeholder="Suggest improvements..."
          ></textarea>

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
            Submit Suggestion
          </button>
        </div>

      </div>
    </div>
  );
}

