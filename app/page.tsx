export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <div className="max-w-4xl">
        <div className="inline-block bg-indigo-600/20 text-indigo-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
          AI-Powered • No Code • Live in Minutes
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-6">
          Build Websites with AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Describe your idea in plain English.<br />Claude builds, deploys, and maintains it forever.
        </p>
        <div className="text-6xl animate-bounce">Down Arrow</div>
        <p className="mt-8 text-gray-500">Sign-in & dashboard coming in 2 minutes</p>
      </div>
    </main>
  );
}
