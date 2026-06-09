export interface SkillGroup {
  category: string;
  items: string[];
}

const skills: SkillGroup[] = [
  {
    category: "Technologies I'm using",
    items: ["C", "Python", "Bash", "OpenSSL", "ICU (Unicode)", "Arweave"],
  },
  {
    category: "Technical concepts I'm deploying",
    items: [
      "Cryptography",
      "Steganography",
      "Perfect Forward Secrecy",
      "Threshold Cryptography",
      "Decentralised Infrastructure",
      "Cryptocurrency",
    ],
  },
  {
    category: "Things I'm currently learning",
    items: [
      "Cryptographic Systems Architecture",
      "Smart Contract Development",
      "Rust",
      "WebAssembly",
      "System Administration",
      "Claude Code",
      "OpenClaw",
    ],
  },
];

export default skills;
