/** Self-hosted meshopt WASM decoder — required for EXT_meshopt_compression GLBs. */
export const MESHOPT_DECODER_URL = "/libs/meshopt_decoder.js";

type ModelViewerElementClass = CustomElementConstructor & {
  meshoptDecoderLocation?: string;
};

/**
 * Configure meshopt before any <model-viewer> loads a compressed GLB.
 * Uses the element constructor (not window.ModelViewerElement) so this works with ES modules.
 * @see https://modelviewer.dev/examples/loading/#meshoptSupport
 */
export function configureModelViewerMeshoptDecoder(): boolean {
  const ModelViewerElement = customElements.get(
    "model-viewer",
  ) as ModelViewerElementClass | undefined;

  if (!ModelViewerElement) {
    return false;
  }

  if (!ModelViewerElement.meshoptDecoderLocation) {
    ModelViewerElement.meshoptDecoderLocation = MESHOPT_DECODER_URL;
  }

  return true;
}

/** Resolves when model-viewer is defined and the meshopt decoder path is set. */
export function whenModelViewerReady(): Promise<void> {
  if (customElements.get("model-viewer")) {
    configureModelViewerMeshoptDecoder();
    return Promise.resolve();
  }

  return customElements.whenDefined("model-viewer").then(() => {
    configureModelViewerMeshoptDecoder();
  });
}
