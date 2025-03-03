import { useRef } from 'react';
import { useControls, folder } from 'leva';

export function useCameraControls() {
  const controlsRef = useRef(null);

  // Create the controls using Leva with separate objects for position, fov, and target
  const positionControls = useControls('Camera Position', {
    x: { value: 8, min: -20, max: 20, step: 0.1 },
    y: { value: 5, min: 0, max: 20, step: 0.1 },
    z: { value: 8, min: -20, max: 20, step: 0.1 }
  });

  const fovControl = useControls('Camera FOV', {
    fov: { value: 24, min: 10, max: 100, step: 1 }
  });

  const targetControls = useControls('Camera Target', {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: 2, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 }
  });

  // Return the controls values in a format that can be used directly
  return {
    cameraPosition: [
      positionControls.x,
      positionControls.y,
      positionControls.z
    ],
    cameraFov: fovControl.fov,
    targetPosition: [
      targetControls.x,
      targetControls.y,
      targetControls.z
    ],
    controlsRef
  };
}