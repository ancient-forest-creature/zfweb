import { SimpleForm } from "./_components/SimpleForm";

export default function HomePage() {
  return (
    <main>
      <div className="flex w-full flex-col items-center justify-center gap-16">
        <h1 className="text-4xl font-bold">Try Page</h1>
        <SimpleForm />
      </div>
    </main>
  );
}
