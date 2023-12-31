import axios from "axios";
import Link from "next/link";

import { AuthServerSide } from "@/lib/app2";
import { useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd"; 
import { useForm } from "react-hook-form";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, 'admin', async ({ NEXT_PUBLIC_API, config }) => {
        return { config }
    })
}

export default function CreateChild({ config }) {
    let [Data, setData] = useState({})
    const { register, handleSubmit } = useForm(); 
    let { query, push } = useRouter()
    const onSubmit = res => {
        const file = res.image//.files[0];
        let image = null
        function send(image) {
            let data = { ...res, image }
            axios.post("/api/courses", data, config)
                .then(({ data }) => {
                    message.success(data.msg)
                    push("/admin/courses")
                })
        }
        if (file.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => send(reader.result)
            reader.readAsDataURL(file[0]);
        } else send(image)

    }

    return (
        <form className='bord box col p-20 center ' onSubmit={handleSubmit(onSubmit)}>
            <h1 className="center box my-20">اضافة دورة تدريبية </h1>
            <label htmlFor="title"  >عنوان الدورة </label>
            <input type="text" id="title" {...register("title")} />

            <label  >المدة</label>
            <input type="text"  {...register("duration")}  />

            <label  >فورم التسجيل</label>
            <input type="text"  {...register("register")} />

            <label htmlFor="description" >وصف الدورة  </label>
            <textarea type="text" id="description" {...register("description")} className="h-200" />

            <label htmlFor="price" > السعر  </label>
            <input type="number" id="price" {...register("price")} />

            <label htmlFor="image" >الصورة التعريفية  </label>
            <input type="file" id="image" {...register("image")} required={false} />

            <div className="mt-20 w-full box row">
                <Link href={"/admin/courses"} className="p-10 m-0 w-full btn off"  >الغاء </Link>
                <input type='submit' className="mr-10 w-full" />
            </div>
        </form>
    )
}

// .split(`src="`)[1].split(`"`)[0]
