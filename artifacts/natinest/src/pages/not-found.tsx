import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[#FAF7F0]">
      <p className="text-[#C9A227] text-[10px] font-bold uppercase tracking-[0.28em] mb-4">404</p>
      <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#1B3A2D] mb-4">
        This nest is empty.
      </h1>
      <p className="text-[#0F1F18]/50 text-lg max-w-md leading-relaxed mb-10">
        The page you're looking for doesn't exist. Maybe it laid its last egg and moved on.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#C9A227] text-[#0F1F18] px-8 py-4 rounded-full text-base font-bold hover:bg-[#b08e1f] hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
