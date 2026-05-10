export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Thank you! 🎉
        </h1>
        <p>Your message has been successfully sent.</p>
      </div>
    </div>
  );
}
