import { useEffect, useState } from "react";
import { Image, Layer, Stage } from "react-konva";

const STAGE_WIDTH = 640;
const STAGE_HEIGHT = 360;

const Playground = (): JSX.Element => {
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src =
      "https://images.bemz.com/_images/6bf08969-46ec-44d7-a5fc-920bb2949139/ikea-nockeby-simplyvelvet-ivygreen-bemz.jpg";
    setImage(imageToLoad);
  }, []);

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
      <Layer>
        <Image image={image} width={STAGE_WIDTH} height={STAGE_HEIGHT} />
      </Layer>
    </Stage>
  );
};

export default Playground;
