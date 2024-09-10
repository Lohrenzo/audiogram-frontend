import Loader from "./components/loader";

export default function Loading() {
  return (
    <section className="w-full h-[100vh] text-center flex items-center justify-center">
      <Loader />
    </section>
  );
}
