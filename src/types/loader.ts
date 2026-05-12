// Loader component type definitions

/**
 * Props for portal loader component
 */
export interface PortalLoaderProps {
  /** Callback when loading finishes */
  onFinish: () => void;
}

/**
 * Props for progress indicator component
 */
export interface ProgressIndicatorProps {
  /** Loading progress percentage (0-100) */
  progress: number;
}
