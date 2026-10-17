type IconName = "arrow-right" | "arrow-up-right" | "x";

export function VogonIcon({
  name,
  size = 16,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`vogon-icon ${className}`}
    >
      {name === "arrow-right" && (
        <>
          <path d="M4 12h16" />
          <path d="m13 5 7 7-7 7" />
        </>
      )}
      {name === "arrow-up-right" && (
        <>
          <path d="M5 19 19 5" />
          <path d="M8 5h11v11" />
        </>
      )}
      {name === "x" && (
        <>
          <path d="M5 5 19 19" />
          <path d="M19 5 5 19" />
        </>
      )}
    </svg>
  );
}
