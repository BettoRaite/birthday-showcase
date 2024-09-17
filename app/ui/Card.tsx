import type { SelectWish } from "../lib/db/schema";
import clsx from "clsx";

type CardProps = {
  item: SelectWish;
};
const SPECIAL_GROUP_CODE = "23-03";
export function Card({ item }: CardProps) {
  return (
    <section
      className={clsx(
        "card-bg p-6 rounded-lg relative border border-slate-300 min-h-96 min-w-full shadow-lg transition-transform transform hover:scale-105",
        {
          "moving-border": item.group === SPECIAL_GROUP_CODE,
        }
      )}
    >
      {/* <div className="absolute inset-0 rounded-lg opacity-20 bg-gradient-to-r from-pink-500 to-yellow-400" /> */}

      <div className="relative z-10 text-center text-gray-400">
        <h1 className="text-4xl text-gray-400 font-extrabold  mb-2">
          🎉 Happy Birthday! 🎉
        </h1>
        <p className="text-lg text-gray-400  mb-4">{item.content}</p>
        <p className="text-sm text-gray-400  italic">
          От {item.authorName ?? "Аноним"}
        </p>
      </div>
    </section>
  );
}
