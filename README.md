# format-ass-subtitle

Requirements:

- Bun: https://bun.sh/
- WhisperX: https://github.com/m-bain/whisperX
- pysubs2: `pip install pysubs2`

To install dependencies:

```bash
bun install
```

Activate Conda Environment
```
conda activate whisperx
```

Install globally as command:
```
bun link
```

To run:

```bash
format-ass-subtitle "2025-03-12 12-09-14-vertical0001.wav" "{\c&HFF&}" # ass subtitle color
```
