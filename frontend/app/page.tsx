import Header from "@/components/Header/Header";
import React from "react";
import People from "@/components/PeopleForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <section className="flex items-center justify-center px-4 pb-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
            <People />
        </div>
      </section>
    </main>
  );
}

