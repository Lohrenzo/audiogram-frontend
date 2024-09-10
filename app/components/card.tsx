import Link from "next/link";
import Image from "next/image";

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
      className="shadow-[#2d2a5494] bg-[#000000da] backdrop-blur flex flex-row justify-start items-start gap-x-1 rounded-lg hover:scale-95 duration-200 transition-all"
    >
      <Link
        className="flex flex-col border-slate-500 rounded-md w-[130px]"
        href={ `/songs/${id}` }
      >
        <Image
          src={ src }
          className=" object-cover object-center rounded-t-md h-[100px] min-w-[100%]"
          width={ 180 }
          height={ 150 }
          alt={ `${title} cover` }
        />
        <div className="p-2 max-h-[70px]">
          <h2 className="text-[0.6rem]">{ title }</h2>
          <p className="text-[0.5rem] opacity-30 capitalize">
            { type } - { artist }
          </p>
          { date && (
            <p className="text-[0.4rem]">
              Date: { new Date(date).getDate().toString().padStart(2, "0") }/
              { (new Date(date).getMonth() + 1).toString().padStart(2, "0") }/
              { new Date(date).getFullYear() }
            </p>
          ) }
        </div>
      </Link>
    </li>
  );
}
