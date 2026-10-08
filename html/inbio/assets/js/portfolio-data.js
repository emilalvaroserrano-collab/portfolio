window.PORTFOLIO_DATA = {
  "projects": [
    {
      "id": "beatrice",
      "name": "Beatrice",
      "title": "Voice-first assistant & orchestration",
      "category": "Mobile · Backend · AI",
      "status": "Architecture",
      "image": "portfolio/beatrice-voice.webp",
      "image_note": "Concept cover",
      "alt": "Microphone and smartphone illustrating a voice-first assistant",
      "summary": "Spoken requests, normalized tasks, realtime job state and a separate device execution layer.",
      "description": "Architected a voice-first system connecting microphone input, speech recognition, intent/LLM processing, task normalization, realtime job state, device execution, verification and voice response. The assistant orchestrates requests while mobile/computer executors perform actions and return results.",
      "detail": "Engineering scope: Flutter/mobile integration, Firebase Realtime Database, backend/executor integration, local/self-hosted models, STT/TTS and device-control workflows.",
      "tech": [
        "Flutter",
        "Firebase RTDB",
        "STT / TTS",
        "Task state"
      ],
      "links": [
        [
          "Engineering profile",
          "https://github.com/emilalvaroserrano-collab"
        ]
      ]
    },
    {
      "id": "dual",
      "name": "Eburon Dual Translator",
      "title": "Two-way speech translation",
      "category": "Mobile · Realtime speech",
      "status": "Offline-first design",
      "image": "portfolio/dual-translator.webp",
      "image_note": "Concept cover",
      "alt": "Two phones with different audio waveforms illustrating two-way speech translation",
      "summary": "Streaming speech, translation refinement and turn management for local-first mobile use.",
      "description": "Designed a two-way multilingual speech translation system targeting offline/local-first mobile operation. The pipeline includes streaming recognition, language detection, translation/refinement, target-language validation and streaming speech output.",
      "detail": "Engineering scope: Flutter/mobile, local inference, Sherpa-ONNX/Whisper-class runtimes and low-latency state machines. Speaker and microphone turn management is designed to prevent synthesized speech feeding back into recognition.",
      "tech": [
        "Flutter",
        "Sherpa-ONNX",
        "Local inference",
        "Streaming speech"
      ],
      "links": [
        [
          "Engineering profile",
          "https://github.com/emilalvaroserrano-collab"
        ]
      ]
    },
    {
      "id": "hub",
      "name": "Eburon Hub",
      "title": "Local AI runtime & server",
      "category": "Flutter · Native runtimes",
      "status": "R&D",
      "image": "portfolio/local-ai-runtime.svg",
      "image_note": "Architecture overview",
      "alt": "Local runtime diagram connecting a Flutter application, a local API server and model runtimes",
      "summary": "User-loadable models and local LLM, speech and image-generation runtimes coordinated from mobile.",
      "description": "Designed a mobile-oriented environment combining local LLM, speech recognition, speech synthesis and image-generation capabilities with user-loadable models and an OpenAI-compatible local server. Explored how Flutter can coordinate native model runtimes while preserving an offline-first experience.",
      "detail": "Engineering scope: Flutter, GGUF model loading, llama.cpp, whisper.cpp, Sherpa-ONNX, local API services and mobile inference optimization.",
      "tech": [
        "Flutter",
        "GGUF",
        "llama.cpp",
        "Local APIs"
      ],
      "links": [
        [
          "Engineering profile",
          "https://github.com/emilalvaroserrano-collab"
        ]
      ]
    },
    {
      "id": "codebox",
      "name": "Eburon CodeBox",
      "title": "AI-assisted development environment",
      "category": "Desktop · Full-stack",
      "status": "System design",
      "image": "portfolio/codebox-system.svg",
      "image_note": "Architecture overview",
      "alt": "Development environment diagram showing an Electron and React interface, agent orchestration and execution tools",
      "summary": "Coding agents, terminal integration, model routing and observable execution workflows.",
      "description": "Designed an engineering environment using Electron, React/Vite and backend services. The architecture covers coding-agent workflows, terminal integration, browser/computer-use agents, multi-model routing, provider failover, autonomous task execution and job monitoring.",
      "detail": "Engineering scope: desktop UI, backend services, terminal/process integration, agent orchestration and local/remote execution. Job state and monitoring are part of the execution design.",
      "tech": [
        "Electron",
        "React / Vite",
        "Agent routing",
        "Terminal"
      ],
      "links": [
        [
          "Engineering profile",
          "https://github.com/emilalvaroserrano-collab"
        ]
      ]
    },
    {
      "id": "offline",
      "name": "Mobile Offline AI Research",
      "title": "Inference on constrained devices",
      "category": "Android · Edge systems",
      "status": "Research",
      "image": "portfolio/mobile-edge-inference.svg",
      "image_note": "Research architecture",
      "alt": "On-device boundary containing quantized models, inference runtimes, local APIs and speech workloads",
      "summary": "Quantized LLM, speech and multimodal experiments within mobile memory and compute limits.",
      "description": "Conducted R&D into running LLM, STT, TTS and multimodal workloads on constrained mobile hardware. Focus areas include quantized inference, GGUF/ONNX runtimes, mobile Linux/Termux environments, streaming inference and memory limits.",
      "detail": "Engineering scope: Android/mobile, Termux/Linux, llama.cpp, whisper.cpp, local model APIs and resource optimization. Deployment choices depend on model size, memory, latency and product constraints.",
      "tech": [
        "Android / Termux",
        "GGUF / ONNX",
        "Quantization",
        "Local server"
      ],
      "links": [
        [
          "Public experiments",
          "https://huggingface.co/MasterDee"
        ]
      ]
    },
    {
      "id": "models",
      "name": "Public Models & Experiments",
      "title": "Eburon · GPH-Emilo · Medix-PH",
      "category": "Model packaging · Public R&D",
      "status": "Public footprint",
      "image": "portfolio/public-models.svg",
      "image_note": "Model portfolio overview",
      "alt": "Public model portfolio diagram separating Eburon model work, GPH-Emilo, Medix-PH and Hugging Face experiments",
      "summary": "Model packaging and experimentation across general, coding, vision and speech systems.",
      "description": "The résumé identifies lead development and maintenance of the Eburon Model Family across general-purpose, reasoning, coding and vision-oriented models. GPH-Emilo is a public multimodal model initiative with Filipino cultural context; its model page credits Emil as project lead. Medix-PH is a 6.74B Q4_0 model package whose public page credits Emil as developer.",
      "detail": "The MasterDee Hugging Face profile provides a separate public record of 40 experimental Spaces across agents, speech, image generation and multimodal work. These are research and demonstration projects, with individual runtime availability varying.",
      "tech": [
        "Ollama",
        "Model packaging",
        "Multimodal",
        "Hugging Face"
      ],
      "links": [
        [
          "GPH-Emilo",
          "https://ollama.com/chatgph/gph-main"
        ],
        [
          "Medix-PH",
          "https://ollama.com/chatgph/medix-ph"
        ],
        [
          "Hugging Face",
          "https://huggingface.co/MasterDee"
        ]
      ]
    }
  ],
  "articles": [
    {
      "id": "process",
      "title": "Constraints before code",
      "category": "System architecture",
      "image": "blog/product-delivery.svg",
      "image_note": "Engineering process",
      "alt": "Six-step delivery process: define, architect, build, integrate, deploy, optimize",
      "summary": "A practical sequence from user flow and platform limits to deployment and optimization.",
      "body": "<p>I start by defining the user flow, platform limits, offline boundaries and latency requirements. These constraints shape the system: the UI, services, data, realtime state, APIs and deployment topology.</p><h3>The delivery sequence</h3><ol><li><strong>Define:</strong> clarify requirements, device constraints and latency.</li><li><strong>Architect:</strong> map interfaces, services, data and deployment boundaries.</li><li><strong>Build:</strong> implement frontend/mobile, backend services and runtimes.</li><li><strong>Integrate:</strong> connect components through clear contracts and asynchronous workflows.</li><li><strong>Deploy:</strong> package for local devices, Linux/VPS environments or GPU infrastructure.</li><li><strong>Optimize:</strong> tune memory, latency, model selection and service execution.</li></ol><p>This sequence reflects the product-building approach described in my résumé. Implementation constraints remain part of the architecture throughout delivery.</p>"
    },
    {
      "id": "voice",
      "title": "Voice requests to verified actions",
      "category": "Beatrice · Voice systems",
      "image": "portfolio/beatrice-voice.webp",
      "image_note": "Concept cover",
      "alt": "Microphone and phone illustrating speech-driven orchestration",
      "summary": "Separate the assistant’s task planning from the executor that performs device actions.",
      "body": "<p>Beatrice’s architecture connects microphone input, speech recognition, intent/LLM processing, normalized tasks, realtime job state, device execution, verification and a spoken response.</p><h3>Orchestration and execution</h3><p>The assistant interprets and delegates the request. A separate mobile or computer executor performs the action and reports its outcome. Realtime task state connects these layers; verification provides the evidence for a completion report.</p><p>The engineering scope includes Flutter/mobile integration, Firebase RTDB, backend/executor integration, local/self-hosted models and STT/TTS. A saved task record is one stage of the workflow; the executor connection and returned result complete it.</p>"
    },
    {
      "id": "edge",
      "title": "Designing for mobile inference",
      "category": "Local / edge AI",
      "image": "portfolio/mobile-edge-inference.svg",
      "image_note": "Research architecture",
      "alt": "Quantized model and local inference pipeline inside an on-device boundary",
      "summary": "Choose model size, runtime and server boundaries around the device’s actual limits.",
      "body": "<p>Mobile inference begins with a device budget: memory, available compute, model size and acceptable latency. My research explores LLM, STT, TTS and multimodal workloads under those constraints.</p><h3>Local runtimes and boundaries</h3><p>GGUF/ONNX, quantization, llama.cpp, whisper.cpp and mobile Linux/Termux environments provide different paths for local execution. Local APIs connect these runtimes to the application. Streaming and memory management shape the user experience.</p><p>Eburon Hub and the Dual Translator target offline/local-first operation. Whether a particular workload stays on-device or moves to a server depends on the runtime, model and hardware; this is an architectural trade-off evaluated for each product.</p>"
    }
  ]
};
