export default function TruecredLogo({ size = 36, light = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer hexagon */}
      <path
        d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
        fill={light ? "rgba(255,255,255,0.08)" : "rgba(27,58,92,0.12)"}
        stroke={light ? "rgba(255,255,255,0.25)" : "rgba(37,99,168,0.35)"}
        strokeWidth="1.5"
      />
      {/* Inner shield */}
      <path
        d="M18 6L28 11V20C28 25.5 23.5 29.5 18 31C12.5 29.5 8 25.5 8 20V11L18 6Z"
        fill={light ? "rgba(255,255,255,0.12)" : "rgba(37,99,168,0.15)"}
        stroke={light ? "rgba(96,165,250,0.6)" : "#2563A8"}
        strokeWidth="1"
      />
      {/* TC monogram */}
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontFamily="'Syne', sans-serif"
        fontWeight="800"
        fontSize="11"
        fill={light ? "white" : "#1B3A5C"}
        letterSpacing="-0.5"
      >
        TC
      </text>
      {/* Corner dots */}
      <circle cx="18" cy="4.5" r="1.5" fill={light ? "rgba(96,165,250,0.8)" : "#2563A8"} />
    </svg>
  );
}