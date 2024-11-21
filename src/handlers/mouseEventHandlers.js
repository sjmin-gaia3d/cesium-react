import * as Cesium from "cesium";
import { hoverBuilding, resetHoverBuilding } from "../utils/styling/hoverBuilding";
import { highlightBuilding, resetHighlightBuilding } from "../utils/styling/highlightBuilding";

// 초기 색상 저장용 맵
const initialColors = new Map();

// 상태 추적 변수
let selectedFeature = null;
let hoveredFeature = null;

/**
 * 좌클릭 이벤트 처리
 */
export const handleMouseClick = (viewer, pickedObject, event) => {
    if (!Cesium.defined(pickedObject) || !(pickedObject instanceof Cesium.Cesium3DTileFeature)) {
        // 빈 공간 클릭 시 선택 상태 초기화
        if (selectedFeature) {
            resetHighlightBuilding(selectedFeature, initialColors);
            selectedFeature = null;
        }
        console.log("No building selected.");
        return;
    }

    if (pickedObject === selectedFeature) {
        console.log("Already selected building:", pickedObject.getProperty("name"));
        return; // 이미 선택된 객체인 경우 아무 작업도 하지 않음
    }

    // 이전 선택된 객체 복원
    if (selectedFeature) {
        resetHighlightBuilding(selectedFeature, initialColors);
    }

    // 새로운 객체 선택 처리
    highlightBuilding(pickedObject, initialColors);
    selectedFeature = pickedObject;

    console.log("Selected building updated:", pickedObject.getProperty("name"));
};

/**
 * 호버 이벤트 처리
 */
export const handleMouseMove = (viewer, pickedObject, event) => {
    if (!Cesium.defined(pickedObject) || !(pickedObject instanceof Cesium.Cesium3DTileFeature)) {
        // 빈 공간으로 이동 시 호버 상태 초기화
        if (hoveredFeature) {
            resetHoverBuilding(hoveredFeature, initialColors, selectedFeature);
            hoveredFeature = null;
        }
        return;
    }

    if (pickedObject === selectedFeature) {
        // 선택된 객체는 호버 처리하지 않음 (초록색 유지)
        return;
    }

    // 이전 호버된 객체 복원
    if (hoveredFeature) {
        resetHoverBuilding(hoveredFeature, initialColors, selectedFeature);
    }

    // 새로운 객체 호버 처리
    hoverBuilding(pickedObject, initialColors);
    hoveredFeature = pickedObject;

    console.log("Hovered building:", pickedObject.getProperty("name"));
};


/**
 * 우클릭 이벤트 처리
 */
export const handleMouseRightClick = (viewer, pickedObject, event) => {
    const coordinates = getCoordinates(viewer, event.position);
    if (coordinates) {
        console.log(`Right Click at: Longitude: ${coordinates.longitude}, Latitude: ${coordinates.latitude}, Height: ${coordinates.height}`);
    }
};

/**
 * 드래그 시작
 */
export const handleMouseDown = (viewer, pickedObject, event) => {
    console.log("Drag started at:", event.position);
};

/**
 * 드래그 중
 */
export const handleMouseMoveWhileDragging = (viewer, event) => {
    const coordinates = getCoordinates(viewer, event.endPosition);
    if (coordinates) {
        console.log(`Dragging at: Longitude: ${coordinates.longitude}, Latitude: ${coordinates.latitude}, Height: ${coordinates.height}`);
    }
};

/**
 * 드래그 종료
 */
export const handleMouseUp = (viewer) => {
    console.log("Drag ended.");
};