// Template Configuration with Specific Input Requirements
const TEMPLATES = [
  { 
    id: 1, 
    name: 'Template 1: Store Style', 
    type: 'text', 
    preview: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', 
    description: 'Bold typography focused on message clarity with star ratings.',
    inputs: {
      title: true,
      tagline: true,
      icon: true,
      images: 0,
      videos: 0
    }
  },
  { 
    id: 2, 
    name: 'Template 2: Feature Orbit', 
    type: 'images', 
    preview: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', 
    description: 'Interactive rotating feature showcase with 3 key highlights.',
    inputs: {
      title: true,
      tagline: true,
      icon: false,
      images: 3,
      videos: 0
    }
  },
  { 
    id: 3, 
    name: 'Template 3: Premium Cards', 
    type: 'images', 
    preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 
    description: 'Clean layout with glassmorphism cards and auto-rotation.',
    inputs: {
      title: true,
      tagline: true,
      icon: false,
      images: 3,
      videos: 0
    }
  },
  { 
    id: 4, 
    name: 'Template 4: 3D Scan Pane', 
    type: 'images', 
    preview: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80', 
    description: 'Futuristic 3D rotating pane with neon scan line effect.',
    inputs: {
      title: true,
      tagline: false,
      icon: false,
      images: 1,
      videos: 0
    }
  },
  { 
    id: 5, 
    name: 'Template 5: Minimal Blur', 
    type: 'text', 
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 
    description: 'Immersive blurred background with centered CTA button.',
    inputs: {
      title: true,
      tagline: false,
      icon: true,
      images: 0,
      videos: 0
    }
  },
  { 
    id: 6, 
    name: 'Template 6: Video Scan', 
    type: 'video', 
    preview: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80', 
    description: 'Full motion video with 3D scan pane and live effect overlay.',
    inputs: {
      title: true,
      tagline: false,
      icon: false,
      images: 0,
      videos: 1
    }
  },
];
