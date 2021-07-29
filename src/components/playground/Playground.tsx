import { useEffect, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";

const STAGE_WIDTH = 640;
const STAGE_HEIGHT = 360;

interface CanvasRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Playground = (): JSX.Element => {
  const [image, setImage] = useState<HTMLImageElement>();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [area, setArea] = useState<CanvasRect | undefined>();

  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src =
      "https://images.bemz.com/_images/6bf08969-46ec-44d7-a5fc-920bb2949139/ikea-nockeby-simplyvelvet-ivygreen-bemz.jpg";
    setImage(imageToLoad);
  }, []);

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
            stroke="red"
            strokeWidth={3}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default Playground;
