import { getUser } from "./actions/auth/actions";
import { getWishes, hasCreatedWish } from "./actions/db/actions";
import { Card } from "./ui/Card";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default async function Home() {
  const user = await getUser();
  let createdWish = false;
  if (user) {
    createdWish = await hasCreatedWish();
  }
  const wishes = await getWishes();

  return (
    <main>
      <section className="flex flex-col justify-center items-center gap-4 my-10">
        <Image
          className="rounded-lg shadow-lg border-1 border-purple-200"
          src={"https://imgur.com/hh3L4zd.jpeg"}
          width={300}
          height={500}
          alt="Нурия"
        />
        {user && (
          <Link
            className={clsx(
              `rounded-lg border-1
            p-4 shadow-lg cursor-pointer mt-4`,
              {
                "pointer-events-none": createdWish,
              }
            )}
            href={"/wish"}
          >
            <span className="text-xl text-slate-400 font-bold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-200">
              Написать пожелание
            </span>
          </Link>
        )}
      </section>
      <section>
        <h2 className="text-3xl font-bold text-center m-auto my-8 border-1 rounded-lg m-w-11/12 p-4">
          Да-да мы вас тоже любим! 💗
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {wishes?.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
        </div>
      </section>
    </main>
  );
}
