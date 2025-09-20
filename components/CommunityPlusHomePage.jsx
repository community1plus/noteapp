
export default function CommunityPlusHomePage({ user, signOut }) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow px-6 py-4">
        {/* Left: Logo */}
        <div className="text-red-600 font-bold text-xl">Community+</div>

        {/* Center: AI-powered Search here */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="AI Search engine"
            className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Right: Profile + Logout */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <button
            onClick={signOut}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main body */}
      <main className="flex flex-1">
        {/* Left column */}
        <div className="w-2/3 p-6 space-y-6">
          {/* Media div */}
          <div className="h-64 border rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500">[Video/Images Placeholder]</span>
          </div>

          {/* News blurb div */}
          <div className="h-40 border rounded-lg bg-gray-50 p-4">
            <textarea
              placeholder="Write your news blurb..."
              className="w-full h-full resize-none border-0 focus:ring-0 bg-transparent"
            />
          </div>
        </div>

        {/* Right column (reserved for future feed/content) */}
        <div className="w-1/3 p-6">
          <div className="h-full border rounded-lg bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400">[Reserved Column]</span>
          </div>
        </div>
      </main>
    </div>
  );
}


