import Image from "next/image";

const photos = [
  { num: 1, file: "equipment-towing.jpg" },
  { num: 2, file: "services1.jpg" },
  { num: 3, file: "heavy-duty.jpg" },
  { num: 4, file: "services3.jpg" },
  { num: 5, file: "rv-towing.jpg" },
  { num: 6, file: "services5.jpg" },
  { num: 7, file: "ser1.jpg" },
  { num: 8, file: "services4.jpg" },
  { num: 9, file: "flatbed.jpg" },
  { num: 10, file: "services7.jpg" },
  { num: 11, file: "ser3.jpg" },
  { num: 12, file: "about.jpg" },
  { num: 13, file: "services2.jpg" },
  { num: 14, file: "light-duty.jpg" },
  { num: 15, file: "ser2.jpg" },
  { num: 16, file: "accident.jpg" },
  { num: 17, file: "services9.jpg" },
  { num: 18, file: "auto-hauling.jpg" },
  { num: 19, file: "services6.jpg" },
  { num: 20, file: "ser5.jpg" },
  { num: 21, file: "services11.jpg" },
  { num: 22, file: "ser7.jpg" },
  { num: 23, file: "services10.jpg" },
  { num: 24, file: "ser8.jpg" },
  { num: 25, file: "ser6.jpg" },
  { num: 26, file: "feature.jpg" },
];

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-white text-3xl font-bold mb-2">All Hero Photos</h1>
      <p className="text-gray-400 mb-8">Tell me which numbers to remove.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {photos.map((photo) => (
          <div key={photo.num} className="relative group">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-700">
              <Image
                src={`/images/${photo.file}`}
                alt={photo.file}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
              />
              {/* Big number overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {photo.num}
                </span>
              </div>
            </div>
            <div className="mt-1.5 text-center">
              <span className="text-yellow-400 font-bold text-sm">#{photo.num}</span>
              <span className="text-gray-500 text-xs block truncate">{photo.file}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
