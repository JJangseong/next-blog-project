import ErrorPage from 'next/error';
import PageLayout from "components/PageLayout";
import {getAllBlogs, getBlogBySlug, urlFor} from "lib/api";
import {Col, Row} from "react-bootstrap";
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import moment from "moment";
import {useRouter} from "next/router";

const BlogDetail = ({blog}) => {
    const router = useRouter();

    if(!router.isFallback && !blog?.slug) {
        return <ErrorPage statusCode="404"/>
    }

    if(router.isFallback) {
        return <PageLayout className="blog-detail-page">
            Loading...
        </PageLayout>
    }

    return (
        <PageLayout className="blog-detail-page">
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <BlogHeader
                        title={blog.title}
                        subtitle={blog.subtitle}
                        coverImage={urlFor(blog.coverImage).height(600).url()}
                        date={moment(blog.date).format('LLL')}
                        author={blog.author}
                    />
                    <hr/>
                    {
                        blog.content &&
                            <BlogContent content={blog.content}/>
                    }
                </Col>
            </Row>
        </PageLayout>
    )
}

export async function getStaticProps({params}) {
    const blog = await getBlogBySlug(params.slug);
    return {
        props: {blog}
    }
}

export async function getStaticPaths() {
    const blogs = await getAllBlogs();
    return {
        paths: blogs?.map(b => ({params: {slug: b.slug}})),
        fallback: true
    }
}


export default BlogDetail;