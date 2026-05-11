import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EggCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="egg-cursor"
          className="fixed pointer-events-none z-[9999] select-none"
          animate={{ x: pos.x - 12, y: pos.y - 16 }}
          transition={{ type: "spring", damping: 28, stiffness: 400, mass: 0.5 }}
          initial={false}
        >
          <span className="text-2xl opacity-70">🥚</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
