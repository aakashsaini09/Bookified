import { Plus } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-[#f5f1eb] to-white py-8 px-6 mt-8">
      <div className="rounded-3xl bg-linear-to-r from-[#E8DCC8] to-[#F0EAE0] px-12 py-16 flex items-center justify-between gap-8">
        {/* Left Section */}
        <div className="flex-1 max-w-sm">
          <h1 className="text-5xl font-serif font-bold text-black mb-4">
            Your Library
          </h1>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
          </p>
          <button className="bg-white hover:bg-gray-50 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-colors shadow-sm hover:shadow-md">
            <Plus size={20} />
            Add new book
          </button>
        </div>

        {/* Center Section - Illustration */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/assets/hero-illustration.png"
            alt="Books and globe illustration"
            width={300}
            height={300}
            className="object-contain"
            priority
          />
        </div>

        {/* Right Section - Steps Card */}
        <div className="flex-1 max-w-sm">
          <div className="bg-white rounded-2xl p-8 space-y-6 shadow-lg">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                <span className="font-bold text-black">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-black text-lg">Upload PDF</h3>
                <p className="text-gray-600 text-sm">Add your book file</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                <span className="font-bold text-black">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-black text-lg">AI Processing</h3>
                <p className="text-gray-600 text-sm">We analyze the content</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                <span className="font-bold text-black">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-black text-lg">Voice Chat</h3>
                <p className="text-gray-600 text-sm">Discuss with AI</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
