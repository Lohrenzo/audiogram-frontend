import Link from "next/link";
import Image from "next/image";
import TransitionLink from "./transitionLink";
import humanizeDate from "../lib/humanizeDate";

type Props = {
  id: number;
  title: string;
  date: string | null;
  src: string;
  type: string;
  artist: string;
};

export default function Card({ id, title, date, src, type, artist }: Props) {

  return (
    <li
      key={ id }
      className="w-[130px] shadow-[#2d2a5494] bg-[#000000da] backdrop-blur flex flex-row justify-start items-start gap-x-1 rounded-lg hover:scale-95 duration-200 transition-all"
    >
      <TransitionLink
        className="flex flex-col border-slate-500 rounded-md w-[130px]"
        href={ type === "album" ? `/album/${id}` : `/audio/${id}` }
      >
        <Image
          src={ src }
          className=" object-cover object-center rounded-t-md h-[100px] min-w-[100%]"
          width={ 180 }
          height={ 150 }
          alt={ `${title} cover` }
          priority
        />
        <div className="p-2 max-h-[70px]">
          <h2 className="text-[0.6rem]">{ title }</h2>
          <p className="text-[0.5rem] opacity-30 capitalize">
            { type } - { artist }
          </p>
          { date && (
            <p className="text-[0.4rem]">
              { humanizeDate(date) }
            </p>
          ) }
        </div>
      </TransitionLink>
    </li>
  );
}
