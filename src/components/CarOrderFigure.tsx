import type { Vehicle } from '@prisma/client'
import Image from 'next/image'

type Props = {
  vehicle: Vehicle
}

export default async function CarOrderFigure({ vehicle }: Props) {
  const { id, name, image, merk, color, type, price } = vehicle

  return (
    <section className="flex h-auto w-fit flex-col justify-center gap-4 rounded-2xl border">
      <figure className="flex flex-col items-center">
        <Image
          src={image}
          alt={name}
          width={240}
          height={240}
          className="rounded-t-2xl"
        />
        <figcaption className="text-center">{name}</figcaption>
      </figure>

      <p className="text-center">Rp. {price}</p>

      <p className="flex flex-row justify-between">
        <span>{merk}</span>
        <span>{color}</span>
        <span>{type}</span>
      </p>

      <button>
        <a
          href={`/pesan/${id}`}
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Pesan
        </a>
      </button>
    </section>
  )
}
