import "../src/index.css"
export default function DraggableText(props){
    function handleMouseDown(e){
        const startX = e.clientX;
        const startY = e.clientY;
        const initialX = props.textData.x;
        const initialY = props.textData.y;

        const handleMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            props.onUpdate({
                x: initialX + dx,
                y: initialY + dy
            });
        };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
    return (
        <div onMouseDown={handleMouseDown}
            style={{
            position: 'absolute',
            left: `${props.textData.x}px`,
            top: `${props.textData.y}px`,
            cursor: 'move',
            userSelect: 'none'
            }}
        >
            <div contentEditable suppressContentEditableWarning className="moveText">
                {props.textData.text}
            </div>
        </div>
    )
}