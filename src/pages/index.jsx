import { SSRctx } from "@/lib/app2";
import { CardCourse } from "@/lib/ui";
import SEO from "@/theme/SEO";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx) {
    let url = `${process.env.NEXT_PUBLIC_API}/client/course-ads`
    console.log(url)
    let SSR = await SSRctx(ctx)
    let { data } = await axios.get(url, SSR?.config);
    return { props: { data } }
}
export default function Home({ data }) {
    useEffect(() => {
        if (data?.typeUser?.length > 0) {
            Cookies.set("typeUser", JSON.stringify(data.typeUser))
        }
    }, [])
    return (
        <>
            <SEO />
            {/* Hero */}
            <Hero />

            {/* Login or admin */}

            {/* Courses */}
            <div className="box grid j m-a p-20">
                {data?.map(co => <CardCourse data={co} key={co._id} slug={"/course/"} />)}
            </div>
            {/* Contact us and social media links  */}
            <Contact />
        </>
    )
}
function Hero() {
    let list = {
        "family": { slug: "/family", title: "صفحة الاهل" },
        "teacher": { slug: "/teacher", title: "صفحة المعلم" },
        "admin": { slug: "/admin", title: "لوحة التحكم" },
        "login": { slug: "/auth/login", title: "تسجيل الدخول" },
    }
    let [Btns, set] = useState(false)
    let Login = () => <Link href={list["login"].slug} className="btn w-200">{list["login"].title} </Link>
    let Rules = () => {
        let TYPE = Cookies.get("typeUser")
        if (TYPE) return (
            <> {JSON.parse(TYPE)?.map(a => (
                <Link href={list[a].slug} className="btn w-100 m-10" key={a} style={{ flex: "auto" }}>{list[a].title} </Link>
            ))} </>
        )
    }
    useEffect(() => {
        let TYPE = Cookies.get("typeUser")
        if (TYPE) set(true)
    }, [])

    return (
        <div className=" landing">
            <img src="/images/landing-hero.png" alt="" />
            <div className="box col m-10 info">
                <h1 > عالم المبدعين</h1>
                <p className="py-10">هل تبحث عن تعليم لطفلك </p>
                <div className="box grid">
                    {Btns ? <Rules /> : <Login />}
                </div>
            </div>
        </div>
    )
}
export function Contact() {
    function Line({ slug, src, title }) {
        return (
            <Link href={slug} className="box row p-10 aitem  "  >
                <Image src={`/icons/${src}`} width={40} height={40} alt="icon  social media" />
                <p className="px-10" style={{ direction: 'ltr' }}>{title}</p>
            </Link>
        )
    }
    function Con({ slug, src }) {
        return (
            <Link href={slug} className="box row aitem  "  >
                <Image src={`/icons/${src}`} width={40} height={40} alt="icon  social media" />
            </Link>
        )
    }
    return (
        <>
            <div className=" page   center m-a  p-10  ">
                <div className="box col bord aitem">
                    <h2 className="p-20 ">اتصل بنا</h2>
                    {/* wa lb */}
                    <div className="box col w-full  p-10">

                        <Line slug={"https://api.whatsapp.com/send?phone=905380594084"} src={"whatsapp.svg"} title={"+90 538 059 40 84"} />
                        {/* wa tr */}
                        <Line slug={"https://api.whatsapp.com/send?phone=96181324565"} src={"whatsapp.svg"} title={" +961 81 324 565"} />
                        {/* email */}
                        <Line slug={"mailto:info@alamalmoubdien.com"} src={"email.svg"} title={"info@alamalmoubdien.com"} />

                    </div>
                </div>
                <div className="box col bord aitem m-10">
                    <h3 className="my-10">تابعينا على </h3>
                    <div className="my-10 box row w-300 space">
                        <Con slug="https://www.facebook.com/profile.php?id=61551881518444" src="fb.svg" />
                        <Con slug="https://instagram.com/alam.almoubdien" src="insta.svg" />
                        <Con slug="https://t.me/alamalmoubdien" src="t.svg" />
                        <Con slug="https://twitter.com/Alamalmoubdien" src="twitter.svg" />
                        <Con slug="https://youtube.com/channel/UCQVLTT_gQrGLgFxyjmHWa1Q" src="youtube.svg" />
                    </div>
                </div>
            </div>
        </>
    )
}
