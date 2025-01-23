import { TempMail } from "@/components/TempMail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TempMail />
      </main>
      <Footer />
    </div>
  );
};

export default Index;