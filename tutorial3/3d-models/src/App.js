
import React, { useRef, useState } from 'react'
import '@google/model-viewer/dist/model-viewer'


export default function App() {
  return (
<model-viewer id="window3d" loading="eager" camera-controls auto-rotate  src="https://res.cloudinary.com/dmj6tqnkw/image/upload/v1634513630/3d-models/helloGITF_dvxemm_djrvnl.glb" alt="A 3D model "></model-viewer>
  )
}

