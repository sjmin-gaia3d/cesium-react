import React, { useState, useEffect } from 'react'
import * as Cesium from "cesium";

const useInitCesiumViewer = (viewContainerRef) => {
    const [viewer, setViewer] = useState(null);

    useEffect(() => {
        if (!viewContainerRef.current) return;

        const viewerOption = {
            terrainProvider: new Cesium.EllipsoidTerrainProvider(),
            homeButton: false,
            baseLayerPicker: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            geocoder: false,
        };
        const viewerInstance = new Cesium.Viewer(viewContainerRef.current, viewerOption);
        setViewer(viewerInstance);

        return () => {
            if (viewerInstance && !viewerInstance.isDestroyed()) viewerInstance.destroy();
        };
    }, [viewContainerRef]);

    return { viewer }
}

export default useInitCesiumViewer