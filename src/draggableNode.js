/**
 * DraggableNode Component
 * 
 * Represents a draggable node in the toolbar.
 * Can be dragged to the canvas to create a new node instance.
 * Uses Sparkle Button design from UIverse.
 */

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.currentTarget.style.cursor = 'grab';
  };

  return (
    <button
      className="sparkle-button sparkle-button--compact"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
      title={`Drag to add ${label}`}
    >
      <div className="sp">
        <svg className="sparkle" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.999 1.17924C12.999 0.5 12.546 0 11.999 0C11.452 0 11 0.5 11 1.17924V4.51315C11 5.19239 11.452 5.69239 11.999 5.69239C12.546 5.69239 12.999 5.19239 12.999 4.51315V1.17924Z" />
          <path d="M20 12.5C20.8284 12.5 21.5 11.8284 21.5 11C21.5 10.1716 20.8284 9.5 20 9.5C19.1716 9.5 18.5 10.1716 18.5 11C18.5 11.8284 19.1716 12.5 20 12.5Z" />
          <path d="M3.5 20C4.32843 20 5 19.3284 5 18.5C5 17.6716 4.32843 17 3.5 17C2.67157 17 2 17.6716 2 18.5C2 19.3284 2.67157 20 3.5 20Z" />
        </svg>
      </div>
      <span className="text">{label}</span>
      <div className="spark" style={{ '--spark': '0.6' }}>
        <div className="backdrop" />
      </div>
    </button>
  );
};