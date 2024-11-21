import { useEffect } from "react";
import * as Cesium from "cesium";

const useCesiumEventHandlers = (viewer, eventHandlers) => {
  useEffect(() => {
    if (!viewer || !eventHandlers) return;

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    Object.entries(eventHandlers).forEach(([eventType, callback]) => {
      handler.setInputAction((event) => {
        const position = event.position || event.endPosition || null;
        const pickedObject = position ? viewer.scene.pick(position) : null;
        callback(viewer, pickedObject, event);
      }, eventType);
    });

    return () => {
      handler.destroy();
    };
  }, [viewer, eventHandlers]);

  return null;
};

export default useCesiumEventHandlers;
