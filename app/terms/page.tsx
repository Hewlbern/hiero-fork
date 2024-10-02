export default function Home() {
  return (
    <main className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
        <div className="space-y-4 text-gray-700">
          <p>Welcome to our service. By using our website, you agree to these Terms of Service.</p>
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>By accessing or using our service, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-xl font-semibold">2. Use of Service</h2>
          <p>You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
          <h2 className="text-xl font-semibold">3. Privacy Policy</h2>
          <p>Your use of our service is also governed by our Privacy Policy.</p>
          <h2 className="text-xl font-semibold">4. Modifications</h2>
          <p>We reserve the right to modify or replace these Terms at any time.</p>
          <h2 className="text-xl font-semibold">5. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
        </div>
      </div>
    </main>
  );
}
