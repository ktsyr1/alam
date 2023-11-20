import { CourseAds } from "@/lib/models/index.js";
import API from "nextjs-vip";

export default async function api_course_ads(req, res, next) {
    let app = new API(req, res);
    app.get(async () => {
        let courses = await CourseAds.find({})
            .select("-part -register -bio ")
            .sort({ _id: -1 });
        app.Send(courses);
    });
}
