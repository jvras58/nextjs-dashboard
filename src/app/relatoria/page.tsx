import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ArquivoUpload from "@/components/upload/upload";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "Relatório - Betinha",
  description: "Betinha Web",
};

const Relatoria = () => {
  return (
    <DefaultLayout HeaderTitle="Relatório">
      <h1 className="text-center text-5xl font-semibold">Relatório</h1>
      <p className="mb-20 text-center text-muted-foreground md:mb-40">
        Upload de arquivos para relatórios
      </p>
      <ArquivoUpload />

      {/*<div className="flex gap-4">*/}
      {/*    <Dialog>*/}
      {/*    <DialogTrigger asChild>*/}
      {/*        <Button className="rounded-full shadow" variant="outline">*/}
      {/*        Upload de Arquivos*/}
      {/*        </Button>*/}
      {/*    </DialogTrigger>*/}
      {/*    <DialogContent className="sm:max-w-[425px]">*/}
      {/*        <DialogHeader>*/}
      {/*        <DialogTitle className="text-center">*/}
      {/*            Envie seus arquivos*/}
      {/*        </DialogTitle>*/}
      {/*        <DialogDescription className="text-center">*/}
      {/*            Envie Arquivos CSV*/}
      {/*        </DialogDescription>*/}
      {/*        </DialogHeader>*/}
      {/*        <div className="grid gap-4 py-4">*/}
      {/*        <ArquivoUpload />*/}
      {/*        </div>*/}
      {/*    </DialogContent>*/}
      {/*    </Dialog>*/}
      {/*</div>*/}
    </DefaultLayout>
  );
};

export default Relatoria;
