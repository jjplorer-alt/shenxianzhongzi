import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** 四角星 ✦ 风格（与页内 logo 一致） */
const STAR_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1l2.8 8.4L24 12l-9.2 2.6L12 24l-2.8-9.4L0 12l9.2-2.6L12 1z" fill="#e8c678"/></svg>';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires raw img for data URI SVG */}
        <img
          src={`data:image/svg+xml,${encodeURIComponent(STAR_SVG)}`}
          width={20}
          height={20}
          alt=""
          style={{ display: "block" }}
        />
      </div>
    ),
  );
}
