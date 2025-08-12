import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Country = {
  code: string; // ISO 3166-1 alpha-2 lowercased
  name: string;
  emoji?: string;
  isRestricted: boolean;
};
