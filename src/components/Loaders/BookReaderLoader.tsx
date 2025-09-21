// import React from 'react';
// import { motion } from 'framer-motion';

// interface BookReaderLoaderProps {
//   label?: string;
//   className?: string;
// }

// const BookReaderLoader: React.FC<BookReaderLoaderProps> = ({ label = 'Loading...', className = '' }) => {
//   return (
//     <div className={`flex flex-col items-center justify-center ${className}`}>
//       <div className="relative">
//         {/* Floating icons */}
//         <motion.div
//           className="absolute -top-6 -left-6 text-primary-500"
//           initial={{ opacity: 0, y: 8, scale: 0.8 }}
//           animate={{ opacity: [0, 1, 0], y: [-4, -14, -24], scale: [0.8, 1, 0.8] }}
//           transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
//           aria-hidden
//         >
//           {/* Bookmark icon */}
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z" />
//           </svg>
//         </motion.div>
//         <motion.div
//           className="absolute -top-3 -right-5 text-rose-500"
//           initial={{ opacity: 0, y: 8, scale: 0.8 }}
//           animate={{ opacity: [0, 1, 0], y: [-2, -12, -22], scale: [0.8, 1, 0.8] }}
//           transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
//           aria-hidden
//         >
//           {/* Heart icon */}
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 21s-7.5-4.35-10-8.5C-0.5 7.5 3 4 6.5 5.5 8.5 6.3 10 8 12 9.8 14 8 15.5 6.3 17.5 5.5 21 4 24.5 7.5 22 12.5 19.5 16.65 12 21 12 21z" />
//           </svg>
//         </motion.div>

//         {/* Reader (head and body) */}
//         <motion.div
//           className="absolute left-1/2 -translate-x-1/2 -top-5 flex flex-col items-center"
//           initial={{ y: 0 }}
//           animate={{ y: [0, -1.5, 0] }}
//           transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
//           aria-hidden
//         >
//           {/* Head */}
//           <div className="w-5 h-5 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600 shadow" />
//           {/* Body peeking */}
//           <div className="w-6 h-3 rounded-b-xl bg-gray-300 dark:bg-gray-600 -mt-1" />
//         </motion.div>

//         {/* Book base */}
//         <motion.svg
//           width="220"
//           height="120"
//           viewBox="0 0 220 120"
//           xmlns="http://www.w3.org/2000/svg"
//           className="drop-shadow-sm"
//           aria-label="Loading"
//           role="img"
//           initial={{ scale: 1 }}
//           animate={{ scale: [1, 1.02, 1] }}
//           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//         >
//           {/* Background */}
//           <defs>
//             <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#8b5cf6" />
//               <stop offset="100%" stopColor="#06b6d4" />
//             </linearGradient>
//             <linearGradient id="page" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#ffffff" />
//               <stop offset="100%" stopColor="#f3f4f6" />
//             </linearGradient>
//           </defs>

//           {/* Left cover */}
//           <path d="M10 20 h90 a10 10 0 0 1 10 10 v60 a10 10 0 0 1 -10 10 h-90 a10 10 0 0 1 -10 -10 v-60 a10 10 0 0 1 10 -10 z" fill="url(#bookCover)" opacity="0.85" />
//           {/* Right cover */}
//           <path d="M210 20 h-90 a10 10 0 0 0 -10 10 v60 a10 10 0 0 0 10 10 h90 a10 10 0 0 0 10 -10 v-60 a10 10 0 0 0 -10 -10 z" fill="url(#bookCover)" opacity="0.9" />

//           {/* Static pages */}
//           <rect x="20" y="28" width="80" height="64" rx="6" fill="url(#page)" stroke="#e5e7eb" />
//           <rect x="120" y="28" width="80" height="64" rx="6" fill="url(#page)" stroke="#e5e7eb" />

//           {/* Center binding */}
//           <rect x="108" y="22" width="4" height="76" rx="2" fill="#f59e0b" opacity="0.8" />

//           {/* Flipping page (animated) */}
//           <motion.path
//             d="M120 28 h75 a5 5 0 0 1 5 5 v54 a5 5 0 0 1 -5 5 h-75 q40 -28 0 -64 z"
//             fill="#ffffff"
//             stroke="#e5e7eb"
//             initial={{ rotateY: 0, opacity: 0.9 }}
//             animate={{ rotateY: [0, 170, 0], opacity: [0.9, 0.6, 0.9] }}
//             transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
//             style={{ transformOrigin: '120px 60px' } as any}
//           />

//           {/* Lines on pages (left side) */}
//           {Array.from({ length: 5 }).map((_, i) => (
//             <rect key={`l-${i}`} x={28} y={36 + i * 10} width="64" height="3" rx="1.5" fill="#e5e7eb" />
//           ))}
//           {/* Lines on pages (right side) */}
//           {Array.from({ length: 5 }).map((_, i) => (
//             <rect key={`r-${i}`} x={128} y={36 + i * 10} width="64" height="3" rx="1.5" fill="#e5e7eb" />
//           ))}
//         </motion.svg>
//       </div>
//       <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 select-none">
//         {label}
//       </div>
//     </div>
//   );
// };

// export default BookReaderLoader;







import React from 'react';
import './PencilLoader.css';

interface PencilLoaderProps {
  label?: string;
  className?: string;
}

const PencilLoader: React.FC<PencilLoaderProps> = ({ label = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="typewriter">
        <div className="slide"><i></i></div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
      <div className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
        {label}
      </div>
    </div>
  );
};

export default PencilLoader;

