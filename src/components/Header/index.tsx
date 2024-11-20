import Image from "next/image";
import logo from "../../../public/images/logo/logo.svg";

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  return (
    <header className="sticky top-0 mb-2 flex flex-row items-center border-b-2 border-accent bg-background p-4 shadow md:mb-6">
      <Image
        className="w-1/5 min-w-30 max-w-60"
        src={logo}
        alt="Betinha logo"
      />
      {title ? (
        <h1 className="font-c ml-6 text-3xl font-bold text-foreground">
          Dashboard: {title}
        </h1>
      ) : null}
    </header>
  );
}
