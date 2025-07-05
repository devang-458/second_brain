import { connectDb } from "@/lib/mongo";
import Content from "@/models/Content";
import Link from "@/models/Link";
import { notFound } from "next/navigation";

export default async function SharedPage({ params }: { params: { hash: string } }) {
  await connectDb();

  const link = await Link.findOne({ hash: params.hash });
  if (!link) return notFound();

  const data = await Content.find({ userId: link.userId });

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-black">
      <h1 className="text-3xl font-bold mb-6">📤 Shared Notes</h1>

      {data.length === 0 ? (
        <p className="text-gray-600">No content shared.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((item: any) => (
            <div key={item._id} className="border bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-xl">{item.title}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {item.link}
              </a>
              <p className="text-sm text-gray-500 mt-1">{item.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
