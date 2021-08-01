import { useEffect, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";

const STAGE_WIDTH = 640;
const STAGE_HEIGHT = 360;
const VERTEX_EDGE_LENGTH = 4;

interface CanvasRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

const Playground = (): JSX.Element => {
  const [image, setImage] = useState<HTMLImageElement>();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [area, setArea] = useState<CanvasRect | undefined>();
  const [vertices, setVertices] = useState<Position[] | undefined>();

  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src =
      "https://images.bemz.com/_images/6bf08969-46ec-44d7-a5fc-920bb2949139/ikea-nockeby-simplyvelvet-ivygreen-bemz.jpg";
    setImage(imageToLoad);
  }, []);

  useEffect(() => {
    if (area?.height && area?.width) {
      const { x, y, height, width } = area;
      const vertices: Position[] = [
        { x: x, y: y },
        { x: x + width, y: y },
        { x: x + width, y: y + height },
        { x: x, y: y + height },
      ];
      setVertices(vertices);
    }
  }, [area]);

  const handleMouseDown = (e) => {
    if (!area) {
      setIsMouseDown(true);
      const stage = e.target.getStage();
      const { x, y } = stage.getPointerPosition(e);
      setArea({ x, y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const stage = e.target.getStage();
      const { x: curX, y: curY } = stage.getPointerPosition(e);
      setArea(({ x, y }) => ({ x, y, width: curX - x, height: curY - y }));
    }
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);
  };

  const handleVertexDrag = (index) => (e) => {
    // 0 = top left, 1 = top right, 2 = bottom right, 3 = bottom left
    const stage = e.target.getStage();
    const { x: curX, y: curY } = stage.getPointerPosition(e);
    setVertices((prevVertices) => {
      const updatedVertices = [...prevVertices];
      updatedVertices[index] = { x: curX, y: curY };

      switch (index) {
        case 0:
          updatedVertices[1].y = curY;
          updatedVertices[3].x = curX;
          break;
        case 1:
          updatedVertices[0].y = curY;
          updatedVertices[2].x = curX;
          break;
        case 2:
          updatedVertices[1].x = curX;
          updatedVertices[3].y = curY;
          break;
        case 3:
          updatedVertices[0].x = curX;
          updatedVertices[2].y = curY;
          break;
        default:
          break;
      }

      setArea({
        x: updatedVertices[0].x,
        y: updatedVertices[0].y,
        width: updatedVertices[1].x - updatedVertices[0].x,
        height: updatedVertices[3].y - updatedVertices[0].y,
      });

      return updatedVertices;
    });
  };

  return (
    <Stage
      height={STAGE_HEIGHT}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={STAGE_WIDTH}
    >
      <Layer>
        <Image image={image} width={STAGE_WIDTH} height={STAGE_HEIGHT} />
        {area && (
          <Rect
            x={area.x}
            y={area.y}
            width={area.width}
            height={area.height}
            stroke="#ff5722"
            strokeWidth={1}
            fill="rgb(255 87 34 / 30%)"
          />
        )}
        {vertices?.map(({ x: vertexX, y: vertexY }, index) => (
          <Rect
            x={vertexX}
            y={vertexY}
            offsetX={VERTEX_EDGE_LENGTH / 2}
            offsetY={VERTEX_EDGE_LENGTH / 2}
            width={VERTEX_EDGE_LENGTH}
            height={VERTEX_EDGE_LENGTH}
            stroke="#673ab7"
            fill="#673ab7"
            draggable
            onDragMove={handleVertexDrag(index)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Playground;
