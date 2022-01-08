### Text Editor

## Operations:

- INSERT <string>
- DELETE (last character)
- UNDO (last action)
- REDO (actions after undo)
- COPY
- PASTE

## Current Features:

- Sorts actions based on timestamps.

## Todos:

- MOVE<index>: Move the cursor at given index
- SELECT<startIndex> <endIndex>: Grab a slice of the text and given startIndex & endIndex
  - DELETE: Delete selected slice.
  - INSERT: Insert new string at selected slice.
  - COPY: Copy selected slice.
  - PASTE: Paste what was copied onto the selected slice.
- CHOOSEFILE<filename>: Saves current text into .txt / .csv file with a name, then open a different file with the given name.
