const ExtraSections = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
      <section>
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-600">Why ContestHub?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {["Secure Payment", "Role Based Dashboard", "Winner Leaderboard"].map(item => (
            <div key={item} className="bg-white p-8 rounded-2xl shadow-xl text-center text-indigo-600">
              <h3 className="text-xl font-bold">{item}</h3>
              <p className="text-gray-500 mt-3">
                A modern contest platform for creators, admins and participants.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center mb-10">FAQ</h2>

        <div className="space-y-4">
          {[
            "How can I join a contest?",
            "How are winners selected?",
            "Can I create contests?",
          ].map(q => (
            <div key={q} className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">{q}</h3>
              <p className="text-gray-500 mt-2">
                Login, explore contests, register, submit your task and wait for winner declaration.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;