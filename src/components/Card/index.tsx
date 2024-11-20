interface Props {
  title: string;
  content: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export default function Card({
  title,
  content,
  isCurrency,
  isPercentage,
}: Props) {
  const formatedContent: string = isCurrency
    ? content.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : isPercentage
      ? content.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }) + "%"
      : content.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
  return (
    <div className="my-4 flex min-w-50 max-w-60 flex-col items-center justify-center rounded border-2 border-accent p-2">
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-lg">{formatedContent}</p>
    </div>
  );
}
