import type { ImgHTMLAttributes } from "react";

type FloralImage = {
  src: string;
  alt?: string;
  className?: string;
};

type FloralDecorationsProps = {
  leftImage?: FloralImage;
  rightImage?: FloralImage;
  className?: string;
  leftImageProps?: ImgHTMLAttributes<HTMLImageElement>;
  rightImageProps?: ImgHTMLAttributes<HTMLImageElement>;
};

export function FloralDecorations({
  leftImage,
  rightImage,
  className = "",
  leftImageProps,
  rightImageProps,
}: FloralDecorationsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {leftImage ? (
        <img
          src={leftImage.src}
          alt={leftImage.alt ?? ""}
          className={
            leftImage.className ??
            "absolute left-[-40px] hidden w-[360px] select-none object-contain opacity-85 lg:block xl:left-[-40px] xl:w-[430px]"
          }
          {...leftImageProps}
        />
      ) : null}

      {rightImage ? (
        <img
          src={rightImage.src}
          alt={rightImage.alt ?? ""}
          className={
            rightImage.className ??
            "absolute right-[-20px] hidden w-[300px] select-none object-contain opacity-80 lg:block xl:right-[-20px] xl:w-[340px]"
          }
          {...rightImageProps}
        />
      ) : null}
    </div>
  );
}
