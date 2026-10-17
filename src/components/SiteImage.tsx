import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
} from "react";

type Props = ImgHTMLAttributes<HTMLImageElement>;

export function SiteImage({
  src,
  alt = "",
  loading = "lazy",
  decoding = "async",
  onError,
  onLoad,
  ...props
}: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      {...props}
      src={failed ? "/images/media-unavailable.svg" : src}
      alt={failed ? "Visual unavailable" : alt}
      loading={loading}
      decoding={decoding}
      onLoad={(event) => {
        window.dispatchEvent(new Event("vogon:image-ready"));
        onLoad?.(event);
      }}
      onError={(event) => {
        if (!failed) {
          setFailed(true);
          window.dispatchEvent(new Event("vogon:image-ready"));
        }
        onError?.(event);
      }}
    />
  );
}
