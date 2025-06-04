/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { BadgeCheck, Car, Shield } from 'lucide-react';

function IconDragGame({ userName }) {
  const items = [
    { id: 'badge', label: 'Polism\u00e4rke', Icon: BadgeCheck },
    { id: 'car', label: 'Polisbil', Icon: Car },
    { id: 'shield', label: 'Skydd', Icon: Shield },
  ];

  const [placed, setPlaced] = useState({});
  const refs = {
    badge: useRef(null),
    car: useRef(null),
    shield: useRef(null),
  };

  const handleDragEnd = (id, event) => {
    const target = refs[id].current;
    if (!target) return;
    const iconRect = event.target.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (
      iconRect.left > targetRect.left &&
      iconRect.right < targetRect.right &&
      iconRect.top > targetRect.top &&
      iconRect.bottom < targetRect.bottom
    ) {
      setPlaced((p) => ({ ...p, [id]: true }));
    }
  };

  const allDone = items.every((i) => placed[i.id]);

  return (
    <div className="space-y-4">
      <h2 className="text-center text-2xl font-bold">
        Dra ikonerna till r\u00e4tt ruta, {userName}
      </h2>
      {allDone && (
        <p className="text-center text-green-600 font-semibold">Bra jobbat!</p>
      )}
      <div className="flex justify-around mt-4">
        {items.map(({ id, label }) => (
          <div
            key={id}
            ref={refs[id]}
            className="w-24 h-24 border rounded flex items-center justify-center"
          >
            {placed[id] ? label : '?'}
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-6">
        {items.map(({ id, Icon: IconComponent }) => (
          !placed[id] && (
            <Motion.div
              key={id}
              drag
              onDragEnd={(e) => handleDragEnd(id, e)}
              className="cursor-grab"
            >
              <IconComponent size={40} />
            </Motion.div>
          )
        ))}
      </div>
    </div>
  );
}

export default IconDragGame;
