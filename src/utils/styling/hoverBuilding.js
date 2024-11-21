import * as Cesium from "cesium";

export const hoverBuilding = (feature, initialColors) => {
  if (Cesium.defined(feature) && feature instanceof Cesium.Cesium3DTileFeature) {
    if (!initialColors.has(feature)) {
      initialColors.set(feature, Cesium.Color.clone(feature.color));
    }
    feature.color = Cesium.Color.BLUE.withAlpha(0.8); // 파란색
  }
};

export const resetHoverBuilding = (feature, initialColors, selectedFeature) => {
    // 클릭된 객체는 초기화하지 않음
    if (Cesium.defined(feature) && feature === selectedFeature) {
      return; // 선택된 객체는 영향을 받지 않음
    }
  
    // 초기 색상을 복원
    if (Cesium.defined(feature) && initialColors.has(feature)) {
      feature.color = initialColors.get(feature);
    }
  };
  