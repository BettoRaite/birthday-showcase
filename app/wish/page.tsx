import { WishForm } from "../ui/WishForm";
import { hasCreatedWish } from "../actions/db/actions";
import Link from "next/link";

export default async function Wish() {
  const hasCreated = await hasCreatedWish();
  return (
    <main className="min-h-svh flex items-center justify-center my-4">
      {!hasCreated && <WishForm />}
      {hasCreated && (
        <section className="bg-fuchsia-200 self-start text-center w-11/12 rounded-lg shadow-lg p-4">
          <h2 className="text-3xl font-bold">
            Спасибо за написание пожелания!
          </h2>
          <p>
            Вы можете вернусь обратно по этой
            <Link className="bg-blue-300" href={"/"}>
              {" "}
              ссылке
            </Link>
            , либо кпопке сверху
          </p>
        </section>
      )}
    </main>
  );
}
