import lavenderFloralDivider from "@/assets/images/illustration/lavender-floral-divider.png";

import { AppText } from "@/components/ui/AppText";

type AuthHeroProps = {
  title: string;
  description: string;
};

export function AuthHero({ title, description }: AuthHeroProps) {
  return (
    <section className="flex-1 items-center justify-center lg:flex">
      <div className="max-w-xl text-center">
        <AppText as="h1" variant="serifTitle">
          {title.split("\n").map((line, index, lines) => (
            <span key={line}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </AppText>

        <img
          src={lavenderFloralDivider}
          alt=""
          aria-hidden="true"
          className="mx-auto my-3 w-[220px] scale-125 object-contain sm:w-[300px] sm:scale-150"
        />

        <AppText
          variant="body"
          className="mx-auto max-w-md text-base leading-7 sm:text-xl sm:leading-8"
        >
          {description}
        </AppText>
      </div>
    </section>
  );
}
