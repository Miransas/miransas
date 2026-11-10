type Scene = { element: HTMLElement; notify: (active: boolean) => void; visible: boolean };

const scenes = new Set<Scene>();
let current: Scene | undefined;
let observer: IntersectionObserver | undefined;
let frame = 0;

function visibleArea(element: Element) {
  const r = element.getBoundingClientRect();
  return Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) *
    Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
}

function reconcile() {
  frame = 0;
  let next: Scene | undefined;
  let largest = 0;
  // Existing voice scenes already pause offscreen. Yield while they are visible,
  // without changing their components or introducing another render loop there.
  const voiceVisible = Array.from(document.querySelectorAll('[data-voice-orb], #voice-agents canvas'))
    .some(element => visibleArea(element) > 100);
  if (!document.hidden && !voiceVisible) {
    for (const scene of scenes) {
      const area = scene.visible ? visibleArea(scene.element) : 0;
      if (area > largest) { largest = area; next = scene; }
    }
  }
  if (next === current) return;
  current?.notify(false);
  current = next;
  current?.notify(true);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(reconcile);
}

/** One active crystal experience across mounts; dormant scenes retain their resources. */
export function registerVisualScene(element: HTMLElement, notify: Scene['notify']) {
  if (!scenes.size) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        for (const scene of scenes) {
          if (scene.element === entry.target) scene.visible = entry.isIntersecting;
        }
      }
      schedule();
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    document.addEventListener('visibilitychange', schedule);
  }
  const scene = { element, notify, visible: false };
  scenes.add(scene);
  observer?.observe(element);
  return () => {
    observer?.unobserve(element);
    scenes.delete(scene);
    if (current === scene) current = undefined;
    if (scenes.size) schedule();
    else {
      observer?.disconnect();
      observer = undefined;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
