// Type definitions for @dvgis/dc-sdk
// Project: https://github.com/dvgis/dc-sdk
// Definitions by: Caven Chen  <https://github.com/cavencj>

/// <reference path="./Cesium.d.ts" />

import * as Cesium from './Cesium';

declare type Config = {
  baseUrl?: string;
  Cesium?: any;
  echarts?: any;
  Supercluste?: any;
};

declare type BaseLayerOptions = {
  iconUrl: string;
  name: string;
  alpha: number;
  nightAlpha: number;
  dayAlpha: number;
  brightness: number;
  contrast: number;
  hue: number;
  saturation: number;
  gamma: number;
};

declare type hprObj = {
  heading: number;
  pitch: number;
  roll: number;
};

declare namespace DC {
  enum MouseMode {
    LEFT_MIDDLE,
    LEFT_RIGHT,
  }

  enum MouseEventType {
    LEFT_DOWN,
    LEFT_UP,
    CLICK,
    RIGHT_DOWN,
    RIGHT_UP,
    RIGHT_CLICK,
    DB_CLICK,
    MOUSE_MOVE,
    WHEEL,
    MOUSE_OVER,
    MOUSE_OUT,
  }

  enum SceneEventType {
    CAMERA_MOVE_END,
    CAMERA_CHANGED,
    PRE_UPDATE,
    POST_UPDATE,
    PRE_RENDER,
    POST_RENDER,
    MORPH_COMPLETE,
    CLOCK_TICK,
    RENDER_ERROR,
  }

  function ready(config?: Config): Promise<void>;

  function registerLib(name: string, lib: any): void;

  function getLib(name: string): any;

  class Position {}

  class Viewer {
    readonly delegate: Cesium.Viewer;
    readonly container: Element;
    readonly widgetContainer: Element;
    readonly layerContainer: Element;
    readonly scene: Cesium.Scene;
    readonly camera: Cesium.Camera;
    readonly canvas: HTMLCanvasElement;
    readonly dataSources: Cesium.DataSourceCollection;
    readonly imageryLayers: Cesium.ImageryLayerCollection;
    readonly terrainProvider: Cesium.TerrainProvider;
    readonly entities: Cesium.EntityCollection;
    readonly postProcessStages: Cesium.PostProcessStageCollection;
    readonly clock: Cesium.Clock;
    readonly cameraPosition: Position;
    readonly resolution: number;
    readonly viewBounds: Cesium.Rectangle;
    readonly zoom: number;

    constructor(container: Element | string, options?: object);

    setOptions(options: object): this;

    setPitchRange(min: number, max: number): this;

    changeSceneMode(sceneMode: number, duration: number): this;

    changeMouseMode(mouseMode: MouseMode): this;

    setTerrain(terrain: Cesium.TerrainProvider): this;

    addBaseLayer(
      baseLayer: Cesium.ImageryLayer | Cesium.ImageryLayer[],
      options?: BaseLayerOptions
    ): this;

    changeBaseLayer(index: number): this;

    getImageryLayerInfo(
      windowPosition: Cartesian2
    ): Promise<Cesium.ImageryLayerFeatureInfo[]> | undefined;

    addLayerGroup(layerGroup: LayerGroup): this;

    removeLayerGroup(layerGroup: LayerGroup): this;

    addLayer(layer: Layer): this;

    removeLayer(layer: Layer): this;

    hasLayer(layer: Layer): this;

    getLayer(id: string): Layer;

    getLayers(): Layer[];

    eachLayer(method: Function, context: any): this;

    flyTo(target: any, duration: number): this;

    zoomTo(target: any): this;

    flyToPosition(
      position: string | string[] | number[] | Position,
      completeCallback: Function,
      duration: number
    ): this;

    zoomToPosition(
      position: string | string[] | number[] | Position,
      completeCallback: Function
    ): this;

    flyToBounds(
      position: string | string[] | number[],
      hpr: hprObj,
      completeCallback: Function,
      duration: number
    ): this;

    zoomToBounds(
      position: string | string[] | number[],
      hpr: hprObj,
      completeCallback: Function
    ): this;

    on(
      type: MouseEventType | SceneEventType,
      callback: Function,
      context: any
    ): this;

    once(
      type: MouseEventType | SceneEventType,
      callback: Function,
      context: any
    ): this;

    off(
      type: MouseEventType | SceneEventType,
      callback: Function,
      context: any
    ): this;

    destroy(): this;

    exportScene(name: string): this;
  }

  class Layer {
    readonly layerId: string;
    readonly delegate:
      | Cesium.CustomDataSource
      | Cesium.PrimitiveCollection
      | Cesium.ImageryLayer
      | Element;
    readonly state: string;
    id: string | number;
    show: boolean;
    attr: object;

    addOverlay(overlay: Overlay): this;

    addOverlays(overlays: Overlay[]): this;

    removeOverlay(overlay: Overlay): this;

    getOverlay(overlayId: string): Overlay | undefined;

    getOverlayById(id: string | number): Overlay | undefined;

    getOverlaysByAttr(attrName: string, attrVal: string | number): Overlay[];

    getOverlays(): Overlay[];

    eachOverlay(method: Function, context: any): this;

    clear(): this;

    remove(): this;

    addTo(viewer: Viewer): this;
  }

  class ClusterLayer extends Layer {
    constructor(id: string, options?: object);

    setPoints(points: object[]): this;
  }

  class CzmlLayer extends Layer {
    constructor(id: string, url: string, options?: object);
  }

  class LayerGroup {}

  class Overlay {}

  class Cartesian3 extends Cesium.Cartesian3 {}

  class Cartesian2 extends Cesium.Cartesian2 {}
}

// eslint-disable-next-line @definitelytyped/export-just-namespace
export = DC;

export as namespace DC;
