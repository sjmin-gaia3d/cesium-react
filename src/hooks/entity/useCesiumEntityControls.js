import { useState } from "react";

const useCesiumEntityControls = (viewer) => {
  const [entities, setEntities] = useState({}); // 엔티티를 객체로 관리

  // 엔티티 추가
  const addEntity = (id, entity) => {
    if (!viewer || !entity || !id) return;
    const addedEntity = viewer.entities.add(entity);
    setEntities((prev) => ({ ...prev, [id]: addedEntity }));
    viewer.zoomTo(addedEntity);
    return addedEntity;
  };

  // 엔티티 제거
  const removeEntity = (id) => {
    if (!viewer || !entities[id]) return;
    const entityToRemove = entities[id];
    viewer.entities.remove(entityToRemove); // 엔티티 제거
    setEntities((prev) => {
      const newEntities = { ...prev };
      delete newEntities[id];
      return newEntities;
    });
  };

  return {
    addPolygon: (id, polygon) => addEntity(id, polygon),
    removePolygon: (id) => removeEntity(id),
    addMaterial: (id, material) => addEntity(id, material),
    removeMaterial: (id) => removeEntity(id),
    addPoint: (id, point) => addEntity(id, point),
    removePoint: (id) => removeEntity(id),
  };
};

export default useCesiumEntityControls;
