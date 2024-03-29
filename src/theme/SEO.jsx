import Head from "next/head";
import { useRouter } from "next/router";
/**
    * @param {this.props} `title` `description` `canonical` `image`
*/
export default function SEO(props) {
    let route = useRouter()
    let domain = process?.env?.NEXT_PUBLIC_API.replace("/api", "")
    let {
        title = "عالم المبدعين",
        description = 'علم اطفالك بامان و ابداع مع عالم المبدعين',
        canonical = domain + route.asPath,
        image = `${domain}/images/logo-full.png`
    } = props
    let site_name = "عالم المبدعين"
    return (
        <Head>
            {/* ---------------  application  --------------- */}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#ffffff" />
            {/* ---------------  icons  --------------- */}
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
            <meta name="author" content="ktsyr1" />

            {/* ---------------  content  --------------- */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* ---------------  content google --------------- */}
            <meta property="og:locale" content="ar_AR" />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:image:url" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:site_name" content={site_name} />

            {/* ---------------  content google --------------- */}
            <meta name="twitter:card" content="summary_large_image" />
            {/* <meta name="twitter:site" content="@PesktopCo" />
            <meta name="twitter:creator" content="@PesktopCo" /> */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DOMAIN} />

            {/* ---------------  SEO Bots  --------------- */}
            <link rel="canonical" href={canonical} />
            <meta name="robots" content="index, follow" />
<meta name="google-site-verification" content="We08CdJvskR_O3unb5AeMzADlBjgoDL3OzU98jGlzCk" />
        </Head>
    );
}
