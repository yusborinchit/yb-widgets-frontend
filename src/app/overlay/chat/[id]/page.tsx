interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatOverlay({ params }: Readonly<Props>) {
  const { id } = await params;

  return <div>Chat de {id}</div>;
}
