from pathlib import Path
import json
backup = Path(__file__).resolve().parent
root = backup.parent.parent
for name, info in json.loads((backup / 'manifest.json').read_text()).items():
    (root / name).write_bytes((backup / info['backup']).read_bytes())
print('Restored only voice-orb.tsx and new-hero.tsx from:', backup)
