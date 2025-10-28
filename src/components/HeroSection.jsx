import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Real-time Container Movement & Task Orchestration
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            Coordinate planners, bookers, drivers, QA and more across the full plant flow. See live location, complete pending tasks, and keep every shipment moving.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 shadow"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#flow"
              className="px-5 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50"
            >
              View Flow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
