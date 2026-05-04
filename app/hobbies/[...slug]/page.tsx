export default async function HobbyPage({ params }: { params: { hobby: string, filename: string } }) {
  const { hobby, filename } = params;
  return (
    <div>
      <h1 className="text-2xl font-bold">{hobby}</h1>
      <p>{filename}</p>
    </div>
  );
}