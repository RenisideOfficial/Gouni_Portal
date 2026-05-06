// src/lib/constants/hostel_data.ts

export const hostelData: Record<
  string,
  { blocks: string[]; rooms: number; bunks: string[] }
> = {
  "Sacred Heart Hostel": {
    blocks: ["Block A", "Block B", "Block C", "Block D"],
    rooms: 25,
    bunks: [
      "001 Lower Bunk",
      "002 Upper Bunk",
      "003 Lower Bunk",
      "004 Upper Bunk",
    ],
  },
  "Bishop C.V.C Onaga Hostel": {
    blocks: ["Block A", "Block B", "Block C"],
    rooms: 30,
    bunks: ["001 Lower Bunk", "002 Upper Bunk"],
  },
  "Odengene Foundation Hostel": {
    blocks: ["Block A", "Block B"],
    rooms: 20,
    bunks: ["001 Lower Bunk", "002 Upper Bunk", "003 Lower Bunk"],
  },
};
