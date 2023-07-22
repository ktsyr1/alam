import Image from "next/image";
import Link from "next/link";

export function MenuLine({ data }) {
    return (
        <div className="box grid p-10 aitem">
            <Link href={"/admin"} className="px-10 btn aitem" >
                <Image src="/icons/home.svg" width={25} height={25} style={{ margin: '0 10px' }} alt="" />
                <p>	لوحة التحكم</p>
            </Link>
            {data ?
                <>
                    <b style={{ margin: '0 10px', fontSize: '35px' }}>/</b>
                    <Link href={`/admin${data.slug}`} className="px-10 btn aitem" >{data?.title}</Link>
                </>
                : <></>}
        </div>
    )
}
export function CardCourse({ data, slug }) {
    return (
        <Link href={`${slug}${data._id}`} className="card" key={data._id}>
            <img src={data.image} alt="" />
            <b>{data.title}</b>
        </Link>
    )
}