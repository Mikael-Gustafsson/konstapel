import { useState } from 'react';

function IconDragGame({ userName }) {
  const items = [
    { id: 'badge', label: 'Polism\u00e4rke', icon: '\uD83C\uDFC5' },
    { id: 'car', label: 'Polisbil', icon: '\uD83D\uDE93' },
    { id: 'shield', label: 'Skydd', icon: '\uD83D\uDEE1\uFE0F' },
  ];

  const [placed, setPlaced] = useState({});

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (event, id) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    if (draggedId === id) {
      setPlaced((p) => ({ ...p, [id]: true }));
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
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
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, id)}
            className="w-24 h-24 border rounded flex items-center justify-center"
          >
            {placed[id] ? label : '?'}
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-6 text-3xl">
        {items.map(({ id, icon }) => (
          !placed[id] && (
            <div
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              className="cursor-grab"
            >
              {icon}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default IconDragGame;
