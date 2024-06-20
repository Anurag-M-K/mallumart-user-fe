import React from "react";
import clsx from "clsx";

// -------------------------------------------------------------------------------

type FontSize =
  | "text-2xl md:text-3xl"
  | "text-xl md:text-2xl"
  | "text-lg md:text-xl"
  | "text-base"
  | "text-sm";

type FontWeight = "font-extrabold" | "font-bold" | "font-normal";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface VariantConfig {
  fontSize: FontSize;
  fontWeight: FontWeight;
  tag: Tag;
}

const VARIANTS = {
  "heading-1": {
    fontSize: "text-2xl md:text-3xl",
    fontWeight: "font-extrabold",
    tag: "h1",
  },
  "heading-2": {
    fontSize: "text-xl md:text-2xl",
    fontWeight: "font-bold",
    tag: "h2",
  },
  "heading-3": {
    fontSize: "text-lg md:text-xl",
    fontWeight: "font-bold",
    tag: "h3",
  },
  para: {
    fontSize: "text-base",
    fontWeight: "font-normal",
    tag: "p",
  },
  span: {
    fontSize: "text-sm",
    fontWeight: "font-normal",
    tag: "span",
  },
  helperText: {
    fontSize: "text-xs",
    fontWeight: "font-normal",
    tag: "span",
  },
} as const;

type Variant = keyof typeof VARIANTS;

interface TypographyProps {
  variant: Variant;
  className?: string;
  children: React.ReactNode;
  testid?: string;
}

// -----------------------------------------------------------------------------

export function Typography({
  variant,
  className,
  children,
  testid,
}: TypographyProps) {
  const { fontSize, fontWeight, tag } = VARIANTS[variant];
  const Tag: Tag = tag || "p";

  const combinedClassNames = clsx(fontSize, fontWeight, className);

  return (
    <Tag className={combinedClassNames} data-testid={testid ? testid : null}>
      {children}
    </Tag>
  );
}
