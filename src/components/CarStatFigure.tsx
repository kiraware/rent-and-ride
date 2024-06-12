import Image from 'next/image'

type Props = {
  vehicleStat: VehicleStats
}

export default async function CarStatFigure({ vehicleStat }: Props) {
  const { image, name, merk, color, type, totalOrders } = vehicleStat

  return (
    <section className="flex flex-row gap-4">
      <figure>
        <Image src={image} alt={name} width={240} height={240} />
      </figure>

      <section className="flex flex-col items-center justify-center">
        <p className="text-center">{name}</p>
        <p className="text-center">Disewakan {totalOrders} kali / bulan</p>
        <p className="flex flex-row justify-between gap-2">
          <span>{merk}</span>
          <span>{color}</span>
          <span>{type}</span>
        </p>
      </section>
    </section>
  )
}
