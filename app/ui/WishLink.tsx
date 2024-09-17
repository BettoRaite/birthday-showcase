"use client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import clsx from "clsx";
import { useToast } from "@/hooks/use-toast";

type WishLinkProps = {
  user: User | null;
  createdWish: boolean;
};
export function WishLink({ user, createdWish }: WishLinkProps) {
  const { toast } = useToast();
  return (
    <Link
      className={clsx(
        `rounded-lg border-1
      p-4 shadow-lg cursor-pointer mt-4`,
        {
          "pointer-events-none": createdWish,
        }
      )}
      href={"/wish"}
      onClick={(e) => {
        if (!user) {
          e.preventDefault();
          toast({
            title: "Сперва войдите",
            className: "text-center text-2xl",
          });
        }
      }}
    >
      <span className="text-xl text-slate-400 font-bold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-200">
        Написать пожелание
      </span>
    </Link>
  );
}
