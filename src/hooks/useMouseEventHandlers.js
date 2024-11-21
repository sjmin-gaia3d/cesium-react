import * as Cesium from "cesium";
import useCesiumEventHandlers from "./useCesiumEventHandlers";
import {
  handleMouseMove,
  handleMouseDown,
  handleMouseUp,
  handleMouseClick,
  handleMouseRightClick,
} from "../handlers/mouseEventHandlers";

const useMouseEventHandlers = (viewer) => {
  useCesiumEventHandlers(viewer, {
    [Cesium.ScreenSpaceEventType.MOUSE_MOVE]: handleMouseMove,
    [Cesium.ScreenSpaceEventType.LEFT_DOWN]: handleMouseDown,
    [Cesium.ScreenSpaceEventType.LEFT_UP]: handleMouseUp,
    [Cesium.ScreenSpaceEventType.LEFT_CLICK]: handleMouseClick,
    [Cesium.ScreenSpaceEventType.RIGHT_CLICK]: handleMouseRightClick,
  });

  return null;
};

export default useMouseEventHandlers;
