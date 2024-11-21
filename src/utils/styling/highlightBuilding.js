import * as Cesium from "cesium";

export const highlightBuilding = (feature, initialColors) => {
  if (Cesium.defined(feature) && feature instanceof Cesium.Cesium3DTileFeature) {
    if (!initialColors.has(feature)) {
      initialColors.set(feature, Cesium.Color.clone(feature.color));
    }
    feature.color = Cesium.Color.GREENYELLOW; // 초록색
  }
};

export const resetHighlightBuilding = (feature, initialColors) => {
  if (Cesium.defined(feature) && initialColors.has(feature)) {
    feature.color = initialColors.get(feature);
  }
};
