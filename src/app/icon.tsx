import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        }}
      >
        <span
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#fbbf24",
            letterSpacing: -1,
          }}
        >
          SP
        </span>
      </div>
    ),
    { ...size }
  );
}
