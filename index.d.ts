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

  enum TerrainType {
    NONE,
    XYZ,
    ARCGIS,
    GOOGLE,
    VR,
  }

  enum TrackViewMode {
    FP,
    TP,
    TRACKED,
    FREE,
  }

  enum ImageryType {
    ARCGIS,
    BING,
    OSM,
    SINGLE_TILE,
    WMS,
    WMTS,
    XYZ,
    COORD,
    GRID,
    MAPBOX,
    MAPBOX_STYLE,
    TMS,
    AMAP,
    BAIDU,
    GEO_VIS,
    GOOGLE,
    TDT,
    TENCENT,
  }

  enum PositionEditorType {
    TRANSLATION,
    ROTATION,
  }

  enum MeasureType {
    ANGLE,
    AREA,
    AREA_HEIGHT,
    AREA_SURFACE,
    DISTANCE,
    DISTANCE_SURFACE,
    HEADING,
    HEIGHT,
    TRIANGLE_HEIGHT,
  }

  function ready(config?: Config): Promise<void>;

  function registerLib(name: string, lib: any): void;

  function getLib(name: string): any;

  class DomUtil {
    static get(id: string): HTMLElement;

    static getStyle(el: HTMLElement, style: JSON): any;

    static create(
      tagName: string,
      className?: string,
      container?: HTMLElement
    ): HTMLElement;

    static remove(el: HTMLElement): void;

    static empty(el: HTMLElement): void;

    static hasClass(el: HTMLElement, name: string): boolean;

    static addClass(el: HTMLElement, name: string): void;

    static removeClass(el: HTMLElement, name: string): void;

    static setClass(el: HTMLElement, name: string): void;

    static getClass(el: HTMLElement): string;

    static createSvg(
      width: number,
      height: number,
      path: string,
      container?: HTMLElement
    ): SVGElement;

    static parseDom(
      domStr: string,
      withWrapper?: boolean,
      className?: string
    ): HTMLDivElement | Array<ChildNode>;
  }

  class Util {
    static uuid(prefix?: string): string;

    static merge(dest: JSON, sources: any): JSON;
  }

  class Position {
    constructor(
      lng: number,
      lat: number,
      alt?: number,
      heading?: number,
      pitch?: number,
      roll?: number
    );

    lng: number;
    lat: number;
    alt: number;
    heading: number;
    pitch: number;
    roll: number;

    serialize(): Object;

    distance(target: Position): number;

    copy(): Position;

    toArray(): number[];

    toObject(): Object;

    static fromArray(arr: Array<number | string>): Position;

    static fromstring(str: string): Position;

    static fromObject(obj: Object): Position;

    static deserialize(valStr: JSON): Position;
  }

  class Parse {
    static parsePosition(
      position: string | number[] | JSON | Position
    ): Position;

    static parsePositions(
      positions: string | Array<string | number[] | JSON | Position>
    ): Array<Position>;

    static parsePointCoordToArray(
      position: string | number[] | JSON | Position
    ): number[];

    static parsePolylineCoordToArray(
      positions: string | Array<string | number[] | JSON | Position>
    ): Array<number[]>;

    static parsePolygonCoordToArray(
      positions: string | Array<string | number[] | JSON | Position>
    ): Array<Array<number[]>>;
  }

  class Transform {
    static transformCartesianToWGS84(cartesian: any): Position;

    static transformWGS84ToCartesian(position: Position): any;

    static transformWGS84ToCartographic(position: Position): any;

    static transformCartesianArrayToWGS84Array(
      cartesianArr: Array<any>
    ): Array<Position>;

    static transformWGS84ArrayToCartesianArray(
      WGS84Arr: Array<Position>
    ): Array<any>;

    static transformWGS84ToMercator(position: Position): Position;

    static transformMercatorToWGS84(position: Position): Position;

    static transformWindowToWGS84(position: Position, viewer: Viewer): Position;

    static transformWGS84ToWindow(position: Position, viewer: Viewer): any;
  }

  class Math {
    static toDegrees(radians: number): number;

    static toRadians(degrees: number): number;

    static log2(num: number): number;

    static area(positions: Array<Position>): number;

    static bounds(positions: Array<Position>, expand?: number): number;

    static center(positions: Array<Position>): Position;

    static curve(positions: Array<Position>, options: JSON): Array<Position>;

    static distance(positions: Array<Position>): number;

    static heading(start: Position, end: Position): number;

    static midPosition(start: Position, end: Position): Position;

    static parabola(
      start: Position,
      end: Position,
      height?: number,
      count?: number
    ): Array<number[]>;
  }

  class ImageryLayerFactory {
    static createAmapImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createBaiduImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createGeoVisImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createGoogleImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createTdtImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createTencentImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createArcGisImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createBingImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createOSMImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createSingleTileImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createWMSImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createWMTSImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createXYZImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createCoordImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createGridImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createMapboxImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createMapboxStyleImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createTMSImageryLayer(options: JSON): Cesium.ImageryProvider;

    static createImageryLayer(
      type: ImageryType,
      options: JSON
    ): Cesium.ImageryProvider;
  }

  class TerrainFactory {
    static createEllipsoidTerrain(options: JSON): Cesium.TerrainProvider;

    static createUrlTerrain(options: JSON): Cesium.TerrainProvider;

    static createGoogleTerrain(options: JSON): Cesium.TerrainProvider;

    static createArcgisTerrain(options: JSON): Cesium.TerrainProvider;

    static createVRTerrain(options: JSON): Cesium.TerrainProvider;

    static createTerrain(
      type: TerrainType,
      options: JSON
    ): Cesium.TerrainProvider;
  }

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

    constructor(container: Element | string, options?: JSON);

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
    constructor(id: string, options?: JSON);

    setPoints(points: object[]): this;
  }

  class CzmlLayer extends Layer {
    constructor(id: string, url: string, options?: JSON);
  }

  class DynamicLayer extends Layer {
    constructor(id: string);
  }

  class GeoJsonLayer extends Layer {
    constructor(id: string, url: string, options?: JSON);
    toVectorLayer(): VectorLayer;
    toModelLayer(modelUrl: string): VectorLayer;
  }

  class GraticuleLayer extends Layer {
    constructor(id: string, options?: JSON);
  }

  class HtmlLayer extends Layer {
    constructor(id: string);
  }

  class KmlLayer extends Layer {
    constructor(id: string, url: string, options?: JSON);
  }

  class PrimitiveLayer extends Layer {
    constructor(id: string);
  }

  class RasterTileLayer extends Layer {
    constructor(id: string, provider: Cesium.ImageryProvider, options?: JSON);
  }

  class TilesetLayer extends Layer {
    constructor(id: string);
  }

  class TopoJsonLayer extends Layer {
    constructor(id: string, url: string, options?: JSON);
  }

  class VectorLayer extends Layer {
    constructor(id: string);
  }

  class HeatMapLayer extends Layer {
    constructor(id: string, options?: JSON);

    setPoints(points: Position[]): this;
  }

  class ChartLayer extends Layer {
    constructor(id: string);

    readonly chart: any;

    setOption(option: any): ChartLayer;
  }

  class WindLayer extends Layer {
    constructor(id: string, options: JSON);

    setData(data: any, options: JSON): WindLayer;

    setOptions(options: JSON): WindLayer;
  }

  class CameraVideoLayer extends Layer {
    constructor(id: String);

    showHelp(show: boolean, videoOverlay: Overlay, color: any): this;
  }

  class PlaneVideoLayer extends Layer {
    constructor(id: string);
    showHelp(show: boolean, videoOverlay: Overlay, color: any): this;
  }

  class LayerGroup {
    readonly id: string;
    readonly type: string;
    readonly state: string;
    show: string;

    addLayer(layer: Layer): this;

    removeLayer(layer: Layer): this;

    getLayer(id: string): Layer;

    geLayers(): Layer[];

    addTo(viewer: Viewer): this;

    remove(): this;
  }

  class Overlay {
    readonly overlayId: string;
    readonly type: string;
    readonly delegate: string;
    readonly state: string;
    id: string;
    allowDrillPicking: boolean;
    contextMenu: Array<any>;

    setLabel(text: string, textStyle: JSON): Overlay;

    setStyle(style: Object): Overlay;

    remove(): Overlay;

    addTo(layer: Layer): Overlay;

    on(type: string | number, callback: Function, context: any): Overlay;

    off(type: string | number, callback: Function, context: any): Overlay;

    fire(type: string | number, params: JSON): Overlay;
  }

  class CustomBillboard extends Overlay {
    constructor(position: string | number[] | JSON | Position, icon: string);

    position: string | number[] | JSON | Position;
    icon: string;
    size: number[];

    setVLine(style: JSON): CustomBillboard;

    setBottomCircle(
      radius: number,
      style: JSON,
      rotateAmount?: number
    ): CustomBillboard;
  }

  class CustomLabel extends Overlay {
    constructor(position: string | number[] | JSON | Position, text: string);

    position: string | number[] | JSON | Position;
    text: string;

    setVLine(style: JSON): CustomLabel;

    setBottomCircle(
      radius: number,
      style: JSON,
      rotateAmount?: number
    ): CustomLabel;
  }

  class DynamicBillboard extends Overlay {
    constructor(position: string | number[] | JSON | Position, icon: string);

    position: string | number[] | JSON | Position;
    icon: string;
    size: number[];
    maxCacheSize: number;

    addPosition(position: Position, interval: number): DynamicBillboard;
  }

  class DynamicModel extends Overlay {
    constructor(
      position: string | Array<number> | JSON | Position,
      modelUrl: string
    );

    position: string | Array<number> | JSON | Position;
    modelUrl: string;
    maxCacheSize: number;

    addPosition(position: Position, interval: number): DynamicModel;
  }

  class DivIcon extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      content: string | HTMLElement
    );

    position: string | number[] | JSON | Position;
    content: string | HTMLElement;

    static fromEntity(entity: any, content: string | HTMLElement): DivIcon;
  }

  class Model extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      modelUrl: string
    );

    position: string | number[] | JSON | Position;
    modelUrl: string;
    rotateAmount: number;

    static fromEntity(entity: any, modelUrl: string): DivIcon;
  }

  class Tileset extends Overlay {
    constructor(url: string, options?: JSON);

    setPosition(position: Position): this;

    setHeadingPitchRoll(heading: number, pitch: number, roll: number): this;

    clampToGround(): Tileset;

    setHeight(height: number, isAbsolute?: boolean): this;

    setScale(scale: number): this;

    setProperties(properties: JSON): this;

    setCustomShader(fragmentShader: Cesium.CustomShader): this;

    setSplitDirection(splitDirection: number): this;
  }

  class AttackArrow extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class DoubleArrow extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class FineArrow extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class GatheringPlace extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class TailedAttackArrow extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class BillboardPrimitive extends Overlay {
    constructor(position: string | number[] | JSON | Position, icon: string);

    position: string | number[] | JSON | Position;
    icon: string;
    size: number[];
  }

  class BounceBillboardPrimitive extends BillboardPrimitive {}

  class BounceLabelPrimitive extends LabelPrimitive {}

  class CloudPrimitive extends Overlay {
    constructor(position: string | number[] | JSON | Position);

    position: string | number[] | JSON | Position;
  }

  class DiffuseWallPrimitive extends Overlay {
    constructor(
      center: string | number[] | JSON | Position,
      radius: number,
      height: number
    );

    position: string | number[] | JSON | Position;
    radius: number;
    height: number;
  }

  class ElecEllipsoidPrimitive extends Overlay {
    constructor(center: string | number[] | JSON | Position, radius: JSON);

    position: string | number[] | JSON | Position;
    radius: JSON;
  }

  class FlowLinePrimitive extends Overlay {
    constructor(
      positions: string | Array<string | number[] | JSON | Position>,
      width?: number
    );

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class LabelPrimitive extends Overlay {
    constructor(position: string | number[] | JSON | Position, text: string);

    position: string | number[] | JSON | Position;
    text: string;
  }

  class LightCylinderPrimitive extends Overlay {
    constructor(
      center: string | number[] | JSON | Position,
      length: number,
      topRadius: number,
      bottomRadius: number
    );

    center: string | number[] | JSON | Position;
    length: number;
    topRadius: number;
    bottomRadius: number;
  }

  class ModelPrimitive extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      modelUrl: string
    );
    position: string | number[] | JSON | Position;
    modelUrl: string;
  }

  class PointPrimitive extends Overlay {
    constructor(position: string | number[] | JSON | Position);

    position: string | number[] | JSON | Position;
  }

  class PolylinePrimitive extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class ScanCirclePrimitive extends Overlay {
    constructor(position: string | number[] | JSON | Position, radius: number);

    position: string | number[] | JSON | Position;
    radius: number;
  }

  class TrailLinePrimitive extends Overlay {
    constructor(
      positions: string | Array<string | number[] | JSON | Position>,
      width?: number
    );

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class VideoPrimitive extends Overlay {
    constructor(
      positions: string | Array<string | number[] | JSON | Position>,
      video: HTMLVideoElement
    );

    positions: string | Array<string | number[] | JSON | Position>;
    video: HTMLVideoElement;
  }

  class WaterPrimitive extends Overlay {
    constructor(
      positions: string | Array<string | number[] | JSON | Position>,
      holes?: Array<string | number[] | JSON | Position>
    );

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class Billboard extends Overlay {
    constructor(position: string | number[] | JSON | Position, icon: string);

    position: string | number[] | JSON | Position;
    icon: string;
    size: number[];
  }

  class Box extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      length: number,
      width: number,
      height: number
    );

    position: string | number[] | JSON | Position;
    length: number;
    width: number;
    height: number;
  }

  class Circle extends Overlay {
    constructor(center: string | number[] | JSON | Position, radius: number);

    position: string | number[] | JSON | Position;
    radius: number;
  }

  class Corridor extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class Cylinder extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      length: number,
      topRadius: number,
      bottomRadius: number
    );

    position: string | number[] | JSON | Position;
    length: number;
    topRadius: number;
    bottomRadius: number;
  }

  class Ellipse extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      semiMajorAxis: number,
      semiMinorAxis: number
    );

    position: string | number[] | JSON | Position;
    semiMajorAxis: number;
    semiMinorAxis: number;
  }

  class Ellipsoid extends Overlay {
    constructor(position: string | number[] | JSON | Position, radius: JSON);

    position: string | number[] | JSON | Position;
    radius: JSON;
  }

  class Label extends Overlay {
    constructor(position: string | number[] | JSON | Position, text: string);

    position: string | number[] | JSON | Position;
    text: string;
  }

  class Plane extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      width: number,
      height: number,
      plane: Object
    );

    position: string | number[] | JSON | Position;
    width: number;
    height: number;
    distance: number;
  }

  class Point extends Overlay {
    constructor(position: string | number[] | JSON | Position);

    position: string | number[] | JSON | Position;
  }

  class Polygon extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class Polyline extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class PolylineVolume extends Overlay {
    constructor(
      positions: string | Array<string | number[] | JSON | Position>,
      shape?: Array<any>
    );

    positions: string | Array<string | number[] | JSON | Position>;
    shape: Array<any>;
  }

  class Rect extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class Wall extends Overlay {
    constructor(positions: string | Array<string | number[] | JSON | Position>);

    positions: string | Array<string | number[] | JSON | Position>;
  }

  class CameraVideo extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      video: HTMLVideoElement,
      maskUrl?: string
    );

    position: string | number[] | JSON | Position;
    video: HTMLVideoElement;
    maskUrl: string;
  }

  class PlaneVideo extends Overlay {
    constructor(
      position: string | number[] | JSON | Position,
      video: HTMLVideoElement
    );

    position: string | number[] | JSON | Position;
    video: HTMLVideoElement;
  }

  class Animation {
    constructor(viewer: Viewer);

    readonly type: string;

    start(): this;

    stop: this;
  }

  class AroundPoint extends Animation {
    constructor(
      viewer: Viewer,
      position: string | number[] | JSON | Position,
      options: JSON
    );
  }

  class AroundView extends Animation {
    constructor(viewer: Viewer, options: JSON);
  }

  class CircleScan extends Animation {
    constructor(
      viewer: Viewer,
      position: string | number[] | JSON | Position,
      radius: number,
      options: JSON
    );
  }

  class Flying extends Animation {
    constructor(viewer: Viewer, options: JSON);
  }

  class GlobeRotate extends Animation {
    constructor(viewer: Viewer, options: JSON);
  }

  class RadarScan extends Animation {
    constructor(
      viewer: Viewer,
      position: Position,
      radius: number,
      options: JSON
    );
  }

  class Effect {
    constructor(viewer: Viewer);
    readonly blackAndWhite: any;
    readonly bloom: any;
    readonly brightness: any;
    readonly depthOfField: any;
    readonly lensFlare: any;
    readonly night: any;
    readonly silhouette: any;
  }

  class GroundSkyBox {
    constructor(options: JSON);
  }

  class TrackController {
    constructor(viewer: Viewer);

    readonly delegate: any;
    readonly state: string;

    addTrack(track: Track): this;

    getTrack(id: string): Track;

    removeTrack(track: Track): this;

    getTracks(): Track[];

    play(): this;

    pause(): this;

    restore(): this;

    viewTrack(track: Track, viewOption: JSON): this;

    releaseTrack(track: Track): this;

    clear(): this;
  }

  class Track {
    constructor(
      positions: string | Array<string | number[] | JSON | Position>,
      duration: number,
      callback: Function,
      options?: JSON
    );

    positions: string | Array<string | number[] | JSON | Position>;
    duration: number;

    addPosition(position: Position, duration: number): this;

    setModel(modelPath: string, style: JSON): this;

    setBillboard(icon: string, style: JSON): this;

    setLabel(text: string, style: JSON): this;

    setPath(visible: boolean, style: JSON): this;
  }

  class CircleBlurMaterialProperty {
    constructor(options: JSON);
  }

  class CircleDiffuseMaterialProperty {
    constructor(options: JSON);
  }

  class CircleFadeMaterialProperty {
    constructor(options: JSON);
  }

  class CirclePulseMaterialProperty {
    constructor(options: JSON);
  }

  class CircleScanMaterialProperty {
    constructor(options: JSON);
  }

  class CircleSpiralMaterialProperty {
    constructor(options: JSON);
  }

  class CircleVaryMaterialProperty {
    constructor(options: JSON);
  }

  class CircleWaveMaterialProperty {
    constructor(options: JSON);
  }

  class EllipsoidElectricMaterialProperty {
    constructor(options: JSON);
  }

  class EllipsoidTrailMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineEmissionMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineFlickerMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineFlowMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineImageTrailMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineLightingMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineLightingTrailMaterialProperty {
    constructor(options: JSON);
  }

  class PolylineTrailMaterialProperty {
    constructor(options: JSON);
  }

  class RadarLineMaterialProperty {
    constructor(options: JSON);
  }

  class RadarSweepMaterialProperty {
    constructor(options: JSON);
  }

  class RadarWaveMaterialProperty {
    constructor(options: JSON);
  }

  class WallImageTrailMaterialProperty {
    constructor(options: JSON);
  }

  class WallLineTrailMaterialProperty {
    constructor(options: JSON);
  }

  class WaterMaterialProperty {
    constructor(options: JSON);
  }

  class Plot {
    constructor(viewer: Viewer, options: JSON);

    readonly viewer: Viewer;
    readonly layer: Cesium.CustomDataSource;
    readonly state: string;

    draw(
      type: string,
      callback?: Function,
      style?: JSON,
      clampToModel?: boolean
    ): Plot;

    edit(overlay: Overlay, callback?: Function, clampToModel?: boolean): this;

    stop(): this;

    destroy(): this;
  }

  class RoamingController {
    constructor(viewer: Viewer);

    addPath(path: RoamingPath): this;

    addPaths(paths: Array<RoamingPath>): this;

    removePath(path: RoamingPath): this;

    getPath(id: string): RoamingPath;

    getPaths(): RoamingPath[];

    activate(path: RoamingPath, viewOption: JSON): this;

    deactivate(): this;

    clear(): this;
  }

  class RoamingPath {
    constructor(
      positions: string | Array<string | Array<number> | JSON | Position>,
      duration: number,
      pathMode?: string
    );

    positions: string | Array<string | Array<number> | JSON | Position>;
    duration: number;
    pathMode?: string;
  }

  class Analysis {
    constructor(viewer: Viewer);

    contourLine(
      lineColor: any,
      lineWidth: number,
      lineSpacing: number
    ): Analysis;

    shadows(startTime: Date, multiplier: number): this;

    sightLine(
      startPosition: Position,
      endPosition: Position,
      excludes?: Array<any>,
      lerpNum?: number
    ): this;

    sightCircle(
      center: Position,
      radius: number,
      excludes?: Array<any>,
      lerpNum?: number
    ): this;

    viewshed(
      position: Position,
      radius: number,
      fov?: number,
      aspectRatio?: number,
      options?: JSON
    ): this;
  }

  class ModelManager {
    constructor(viewer: Viewer, models: Model[], options: JSON);

    models: Array<Model>;

    spread(height?: number, seconds?: number, type?: number): this;

    combine(seconds?: number): this;

    showModel(index: number): this;
  }

  class PositionEditor {
    constructor(viewer: Viewer, options: JSON);

    overlay: Overlay;

    activate(type: PositionEditorType, callback: Function): this;

    deactivate(): this;
  }

  class Measure {
    constructor();

    activate(type: MeasureType, options?: JSON): this;

    deactivate(): this;
  }

  class Cartesian3 extends Cesium.Cartesian3 {}
  class Matrix3 extends Cesium.Matrix3 {}
  class Matrix4 extends Cesium.Matrix4 {}
  class Material extends Cesium.Material {}
  class SkyBox extends Cesium.SkyBox {}
  class Color extends Cesium.Color {}
  class Rectangle extends Cesium.Rectangle {}
  class JulianDate extends Cesium.JulianDate {}
  class CallbackProperty extends Cesium.CallbackProperty {}
  class TilesetStyle extends Cesium.Cesium3DTileStyle {}
  class GeographicTilingScheme extends Cesium.GeographicTilingScheme {}
  class WebMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {}
  class ColorMaterialProperty extends Cesium.ColorMaterialProperty {}
  class ImageMaterialProperty extends Cesium.ImageMaterialProperty {}
  class PolylineDashMaterialProperty extends Cesium.PolylineDashMaterialProperty {}
  class PolylineGlowMaterialProperty extends Cesium.PolylineGlowMaterialProperty {}
  class PolylineOutlineMaterialProperty extends Cesium.PolylineOutlineMaterialProperty {}
  class PolylineArrowMaterialProperty extends Cesium.PolylineArrowMaterialProperty {}
  class CustomShader extends Cesium.CustomShader {}
  class Resource extends Cesium.Resource {}

  enum SceneMode {
    /**
     * Morphing between mode, e.g., 3D to 2D.
     */
    MORPHING = 0,
    /**
     * Columbus View mode.  A 2.5D perspective view where the map is laid out
     * flat and objects with non-zero height are drawn above it.
     */
    COLUMBUS_VIEW = 1,
    /**
     * 2D mode.  The map is viewed top-down with an orthographic projection.
     */
    SCENE2D = 2,
    /**
     * 3D mode.  A traditional 3D perspective view of the globe.
     */
    SCENE3D = 3,
  }

  enum HeightReference {
    /**
     * The position is absolute.
     */
    NONE = 0,
    /**
     * The position is clamped to the terrain.
     */
    CLAMP_TO_GROUND = 1,
    /**
     * The position height is the height above the terrain.
     */
    RELATIVE_TO_GROUND = 2,
  }

  enum HorizontalOrigin {
    /**
     * The origin is at the horizontal center of the object.
     */
    CENTER = 0,
    /**
     * The origin is on the left side of the object.
     */
    LEFT = 1,
    /**
     * The origin is on the right side of the object.
     */
    RIGHT = -1,
  }
  enum VerticalOrigin {
    /**
     * The origin is at the vertical center between <code>BASELINE</code> and <code>TOP</code>.
     */
    CENTER = 0,
    /**
     * The origin is at the bottom of the object.
     */
    BOTTOM = 1,
    /**
     * If the object contains text, the origin is at the baseline of the text, else the origin is at the bottom of the object.
     */
    BASELINE = 2,
    /**
     * The origin is at the top of the object.
     */
    TOP = -1,
  }

  enum ClassificationType {
    /**
     * Only terrain will be classified.
     */
    TERRAIN = 0,
    /**
     * Only 3D Tiles will be classified.
     */
    CESIUM_3D_TILE = 1,
    /**
     * Both terrain and 3D Tiles will be classified.
     */
    BOTH = 2,
  }

  export enum CustomShaderMode {
    /**
     * The custom shader will be used to modify the results of the material stage
     * before lighting is applied.
     */
    MODIFY_MATERIAL = 'MODIFY_MATERIAL',
    /**
     * The custom shader will be used instead of the material stage. This is a hint
     * to optimize out the material processing code.
     */
    REPLACE_MATERIAL = 'REPLACE_MATERIAL',
  }

  enum CustomShaderTranslucencyMode {
    /**
     * Inherit translucency settings from the primitive's material. If the primitive used a
     * translucent material, the custom shader will also be considered translucent. If the primitive
     * used an opaque material, the custom shader will be considered opaque.
     */
    INHERIT = 0,
    /**
     * Force the primitive to render the primitive as opaque, ignoring any material settings.
     */
    OPAQUE = 1,
    /**
     * Force the primitive to render the primitive as translucent, ignoring any material settings.
     */
    TRANSLUCENT = 2,
  }
  enum ModelAnimationLoop {
    /**
     * Play the animation once; do not loop it.
     */
    NONE = 0,
    /**
     * Loop the animation playing it from the start immediately after it stops.
     */
    REPEAT = 1,
    /**
     * Loop the animation.  First, playing it forward, then in reverse, then forward, and so on.
     */
    MIRRORED_REPEAT = 2,
  }
}

// eslint-disable-next-line @definitelytyped/export-just-namespace
export = DC;

export as namespace DC;
