import React, { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import ButtonWidget from "../button/ButtonWidget";
import useInitCesiumViewer from "../../hooks/init/useInitCesiumViewer";
import useLoadTerrain from "../../hooks/useLoadTerrain";
import useCesiumLayerControls from "../../hooks/layers/useCesiumLayerControls";
import useCesiumEntityControls from "../../hooks/entity/useCesiumEntityControls";
import useMouseEventHandlers from "../../hooks/useMouseEventHandlers";

const initFlyOption = {
  destination: Cesium.Cartesian3.fromDegrees(-74.019, 40.6912, 750),
  orientation: {
    heading: Cesium.Math.toRadians(20),
    pitch: Cesium.Math.toRadians(-20),
  },
  duration: 0,
}
const entities = {
  polygon: {
    id: "polygon1",
    data: {
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
          -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
          -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
          -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
        ]),
        height: 0,
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    },
  },
  material: {
    id: "material1",
    data: {
      position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
      ellipse: {
        semiMinorAxis: 250000.0,
        semiMajorAxis: 400000.0,
        material: Cesium.Color.BLUE.withAlpha(0.5),
      },
    },
  },
  point: {
    id: "point1",
    data: {
      name: "Citizens Bank Park",
      position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
      label: {
        text: "Citizens Bank Park",
        font: "14pt monospace",
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9),
      },
    },
  },
};

const CesiumMap = () => {
  const viewContainerRef = useRef(null);
  const { viewer } = useInitCesiumViewer(viewContainerRef);
  const { toggleOSMLayer, toggleGoogleTileset, resetToDefault } =
    useCesiumLayerControls(viewer);
  const {
    addPolygon,
    removePolygon,
    addMaterial,
    removeMaterial,
    addPoint,
    removePoint,
  } = useCesiumEntityControls(viewer);

  useLoadTerrain(viewer);

  useEffect(() => {
    if (!viewer) return;
    viewer.camera.flyTo(initFlyOption);
  }, [viewer]);

  // 마우스 이벤트 핸들러
  useMouseEventHandlers(viewer);

  // 버튼 데이터 배열
  const buttons = [
    { label: "Toggle OSM Layer", onClick: toggleOSMLayer },
    { label: "Toggle Google 3D Tileset", onClick: toggleGoogleTileset },
    { label: "Reset to Default", onClick: resetToDefault },
    {
      label: "Add Polygon",
      onClick: () => addPolygon(entities.polygon.id, entities.polygon.data),
    },
    {
      label: "Remove Polygon",
      onClick: () => removePolygon(entities.polygon.id),
    },
    {
      label: "Add Material",
      onClick: () => addMaterial(entities.material.id, entities.material.data),
    },
    {
      label: "Remove Material",
      onClick: () => removeMaterial(entities.material.id),
    },
    {
      label: "Add Point",
      onClick: () => addPoint(entities.point.id, entities.point.data),
    },
    {
      label: "Remove Point",
      onClick: () => removePoint(entities.point.id),
    },
  ];

  return (
    <div ref={viewContainerRef} style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div style={buttonGroupStyle}>
        {buttons.map((button, index) => (
          <ButtonWidget key={index} onClick={button.onClick}>
            {button.label}
          </ButtonWidget>
        ))}
      </div>
    </div>
  );
};

const buttonGroupStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 10,
  display: "flex",
  gap: "10px",
};

export default CesiumMap;