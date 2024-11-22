import * as Cesium from "cesium";

export const getDataSourceByName = (viewer, dataSourceName) => {
    if (!viewer) return null;
    const dataSources = viewer.dataSources.getByName(dataSourceName);
    if (dataSources.length === 0) return null;
    if (dataSources.length > 1) {
        console.warn(`Multiple dataSources found with name: ${dataSourceName}`);
    }
    return dataSources[0];
};

export const createDataSource = (viewer, dataSourceName) => {
    if (!viewer) return null;

    const existingDataSource = getDataSourceByName(viewer, dataSourceName);
    if (existingDataSource) return existingDataSource;

    const newDataSource = new Cesium.CustomDataSource(dataSourceName);
    viewer.dataSources.add(newDataSource);
    return newDataSource;
};

export const removeDataSource = (viewer, dataSourceName) => {
    if (!viewer) return false;

    const dataSource = getDataSourceByName(viewer, dataSourceName);
    if (!dataSource) return false;

    return viewer.dataSources.remove(dataSource);
};

export const addEntity = (viewer, entity, dataSourceName) => {
    if (!viewer || !entity || !dataSourceName) return false;

    const dataSource = getDataSourceByName(viewer, dataSourceName);
    if (!dataSource) {
        console.warn(`DataSource with name "${dataSourceName}" not found.`);
        return null;
    }

    const addedEntity = dataSource.entities.add(entity);
    return addedEntity;
};

export const removeEntity = (viewer, entity, dataSourceName) => {
    if (!viewer || !entity || !entity.id || !dataSourceName) return false;

    const dataSource = getDataSourceByName(viewer, dataSourceName);
    if (!dataSource) {
        console.warn(`DataSource with name "${dataSourceName}" not found.`);
        return false;
    }

    return dataSource.entities.removeById(entity.id);
};
