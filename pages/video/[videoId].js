import { useRouter } from "next/router";

const Video = ()=>{
    const router = useRouter();
    const { videoId } = router.query;

    return <div>Video Page { videoId }</div>
}

export default Video;